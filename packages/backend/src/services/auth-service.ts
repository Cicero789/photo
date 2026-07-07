import { Errors, generateId, MIN_PASSWORD } from '@framenest/shared';
import type { UserRow, SpaceRow } from '@framenest/shared';
import { UserRepo } from '../repos/user-repo.js';
import { SpaceRepo } from '../repos/space-repo.js';
import { hashPassword, verifyPassword } from '../lib/password.js';
import { signToken } from '../lib/jwt.js';
import { log } from '../lib/logger.js';

export class AuthService {
  constructor(
    private userRepo: UserRepo,
    private spaceRepo: SpaceRepo,
    private env: { JWT_SECRET: string },
  ) {}

  async signup(input: {
    name: string; email: string; password: string;
    spaceName: string; spaceSlug: string; gateKey: string;
  }): Promise<{ token: string; user: UserRow; space: SpaceRow }> {
    // Check uniqueness
    const existing = await this.userRepo.getByEmail(input.email);
    if (existing) throw Errors.conflict('User', 'email');

    const existingSpace = await this.spaceRepo.getBySlug(input.spaceSlug);
    if (existingSpace) throw Errors.conflict('Space', 'slug');

    const userId = generateId('user');
    const spaceId = generateId('space');
    const userHash = await hashPassword(input.password);
    const gateHash = await hashPassword(input.gateKey);

    // Create user + space + owner membership in a batch
    const user = await this.userRepo.create({
      id: userId, email: input.email, name: input.name,
      password_hash: userHash, role: 'page_admin', space_id: spaceId,
    });

    const space = await this.spaceRepo.create({
      id: spaceId, name: input.spaceName, slug: input.spaceSlug,
      password_hash: gateHash, owner_id: userId,
    });

    await this.spaceRepo.addMember({ id: generateId('connection'), space_id: spaceId, user_id: userId, role: 'page_admin' });

    const token = await signToken({ userId, spaceId, role: 'page_admin', tokenVersion: 0 }, this.env);

    log({ level: 'info', message: 'User signed up', actor: userId, action: 'signup' });

    return { token, user, space };
  }

  async login(email: string, password: string): Promise<{ token: string; user: UserRow; space: SpaceRow }> {
    const user = await this.userRepo.getByEmail(email);
    if (!user) throw Errors.unauthorized('Invalid email or password');

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) throw Errors.unauthorized('Invalid email or password');

    const space = await this.spaceRepo.getById(user.space_id);
    if (!space) throw Errors.internal('Space not found');

    const token = await signToken({
      userId: user.id, spaceId: user.space_id,
      role: user.role as 'viewer' | 'staff' | 'page_admin' | 'platform_owner',
      tokenVersion: user.token_version,
    }, this.env);

    log({ level: 'info', message: 'User logged in', actor: user.id, action: 'login' });

    return { token, user, space };
  }

  async gate(spaceSlug: string, gateKey: string): Promise<{ token: string; user: UserRow; space: SpaceRow }> {
    const space = await this.spaceRepo.getBySlug(spaceSlug);
    if (!space) throw Errors.notFound('Space');

    const valid = await verifyPassword(gateKey, space.password_hash);
    if (!valid) throw Errors.unauthorized('Invalid gate key');

    // Create or find a virtual "viewer" user for this space
    let viewer = await this.userRepo.getByEmail(`viewer-${space.id}@framenest.internal`);
    if (!viewer) {
      viewer = await this.userRepo.create({
        id: generateId('user'),
        email: `viewer-${space.id}@framenest.internal`,
        name: 'Guest Viewer',
        password_hash: '-',
        role: 'viewer',
        space_id: space.id,
        account_type: 'personal',
      });
    }

    const token = await signToken({
      userId: viewer.id, spaceId: space.id,
      role: 'viewer', tokenVersion: viewer.token_version,
    }, this.env);

    return { token, user: viewer, space };
  }

  async getMe(userId: string): Promise<{ user: UserRow; space: SpaceRow | null }> {
    const user = await this.userRepo.getById(userId);
    if (!user) throw Errors.notFound('User');
    const space = await this.spaceRepo.getById(user.space_id);
    return { user, space };
  }
}
