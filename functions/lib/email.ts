/**
 * Email sending via Zoho ZeptoMail (https://www.zoho.com/zeptomail/).
 *
 * Setup:
 *   wrangler pages secret put ZOHO_API_KEY --project-name photo
 *     (the full "Zoho-enczapikey ..." send-mail token from ZeptoMail → Mail
 *     Agent → SMTP/API; the code accepts it with or without the prefix)
 *   wrangler pages secret put EMAIL_FROM --project-name photo   (optional)
 *
 * The sender domain must be verified in ZeptoMail (SPF/DKIM records added in
 * Cloudflare DNS). EMAIL_FROM defaults to "FrameNest <noreply@framenest.photos>";
 * accepts "Name <addr@domain>" or a bare address.
 */

export interface EmailEnv {
  ZOHO_API_KEY?: string;
  EMAIL_FROM?: string;
}

interface EmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

const DEFAULT_FROM = "FrameNest <noreply@framenest.photos>";
const ZEPTOMAIL_API = "https://api.zeptomail.com/v1.1/email";

function parseFrom(from: string): { address: string; name?: string } {
  const match = from.match(/^\s*(.*?)\s*<\s*([^<>\s]+@[^<>\s]+)\s*>\s*$/);
  if (match && match[2]) {
    return { address: match[2], name: match[1] || undefined };
  }
  return { address: from.trim() };
}

export async function sendEmail(opts: EmailOptions, env?: EmailEnv): Promise<boolean> {
  if (!env?.ZOHO_API_KEY) {
    console.error("sendEmail: ZOHO_API_KEY is not configured — email not sent.");
    return false;
  }

  const key = env.ZOHO_API_KEY.trim();
  const authorization = key.startsWith("Zoho-enczapikey") ? key : `Zoho-enczapikey ${key}`;
  const from = parseFrom(env.EMAIL_FROM || DEFAULT_FROM);

  try {
    const res = await fetch(ZEPTOMAIL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify({
        from: { address: from.address, name: from.name ?? "FrameNest" },
        to: [{ email_address: { address: opts.to } }],
        subject: opts.subject,
        htmlbody: opts.htmlBody,
      }),
    });

    if (!res.ok) {
      console.error("ZeptoMail error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("ZeptoMail send failed:", err);
    return false;
  }
}
