/**
 * Email sending via Resend (https://resend.com).
 *
 * Setup:
 *   wrangler pages secret put RESEND_API_KEY --project-name photo
 *   wrangler pages secret put EMAIL_FROM --project-name photo   (optional)
 *
 * EMAIL_FROM defaults to Resend's shared onboarding address, which can only
 * deliver to the email address of the Resend account owner. To email real
 * users, verify a domain you own in Resend (DNS records in Cloudflare) and
 * set EMAIL_FROM to e.g. "Photo <no-reply@yourdomain.com>".
 * A *.pages.dev address cannot be used as a sender — its DNS is owned by
 * Cloudflare, so SPF/DKIM verification is impossible.
 *
 * Note: the old MailChannels fallback was removed — MailChannels shut down
 * its free Cloudflare Workers API in August 2024.
 */

export interface EmailEnv {
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
}

interface EmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

const DEFAULT_FROM = "Photo <onboarding@resend.dev>";

export async function sendEmail(opts: EmailOptions, env?: EmailEnv): Promise<boolean> {
  if (!env?.RESEND_API_KEY) {
    console.error("sendEmail: RESEND_API_KEY is not configured — email not sent.");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM || DEFAULT_FROM,
        to: [opts.to],
        subject: opts.subject,
        html: opts.htmlBody,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send failed:", err);
    return false;
  }
}
