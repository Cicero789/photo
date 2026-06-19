import { hashPassword } from "../../lib/password";
import { signToken, getJwtSecret } from "../../lib/jwt";
import { getUserByEmail, getSpaceBySlug } from "../../lib/db";
import { json } from "../../lib/response";
import { validateSignup, sanitize, MAX_NAME, MAX_EMAIL } from "../../lib/validate";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function onRequestPost(context: {
  request: Request;
  env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string };
}): Promise<Response> {
  try {
    const db = context.env.DB!;

    // ── Parse and validate ──────────────────────────────────────
    const rawBody = (await context.request.json()) as {
      name?: string;
      email?: string;
      password?: string;
      spaceName?: string;
      spaceSlug?: string;
      gateKey?: string;
    };

    const validationError = validateSignup(rawBody);
    if (validationError) return json({ error: validationError }, 400);

    const name = sanitize(rawBody.name!, MAX_NAME);
    const email = sanitize(rawBody.email!, MAX_EMAIL).toLowerCase();
    const password = rawBody.password!;
    const spaceName = sanitize(rawBody.spaceName!, MAX_NAME);
    const spaceSlug = sanitize(rawBody.spaceSlug!, 50).toLowerCase();
    const gateKey = rawBody.gateKey!;

    // ── Validate slug format ────────────────────────────────────
    if (!SLUG_REGEX.test(spaceSlug)) {
      return json({
        error:
          "Link can only contain lowercase letters, numbers, and single hyphens between words.",
      }, 400);
    }

    // ── Check uniqueness ────────────────────────────────────────
    const [existingEmail, existingSlug] = await Promise.all([
      getUserByEmail(context.env, email),
      getSpaceBySlug(context.env, spaceSlug),
    ]);

    if (existingEmail) {
      return json({ error: "An account with this email already exists." }, 409);
    }
    if (existingSlug) {
      return json({ error: "This link is already taken. Please choose another." }, 409);
    }

    // ── Generate IDs ────────────────────────────────────────────
    const userId = crypto.randomUUID();
    const spaceId = crypto.randomUUID();
    const memberId = crypto.randomUUID();

    // ── Hash passwords (user password + space gate key) ─────────
    const [userPasswordHash, gateKeyHash] = await Promise.all([
      hashPassword(password),
      hashPassword(gateKey),
    ]);

    // ── Insert user, space, and membership in a transaction ─────
    const now = new Date().toISOString();
    const role = "page_admin";

    try {
      await db.batch([
        db.prepare(
          "INSERT INTO users (id, email, name, password_hash, role, space_id, avatar_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        ).bind(userId, email, name, userPasswordHash, role, spaceId, null, now),
        db.prepare(
          "INSERT INTO spaces (id, name, slug, password_hash, custom_domain, logo_url, theme_color, owner_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        ).bind(spaceId, spaceName, spaceSlug, gateKeyHash, null, null, "#3b82f6", userId, now, now),
        db.prepare(
          "INSERT INTO space_members (id, space_id, user_id, role) VALUES (?, ?, ?, ?)",
        ).bind(memberId, spaceId, userId, role),
      ]);
    } catch (dbErr) {
      console.error("Signup DB error:", dbErr);
      return json({ error: "Something went wrong while creating your account." }, 500);
    }

    // ── Sign JWT ────────────────────────────────────────────────
    const token = await signToken(
      { userId, spaceId, role },
      getJwtSecret(context.env),
    );

    return json(
      {
        user: {
          id: userId,
          email,
          name,
          role,
          spaceId,
          avatarUrl: null,
          createdAt: now,
        },
        space: {
          id: spaceId,
          name: spaceName,
          slug: spaceSlug,
        },
        token,
      },
      201,
    );
  } catch (err) {
    console.error("Signup error:", err);
    return json({ error: "Something went wrong." }, 500);
  }
}
