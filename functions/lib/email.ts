/**
 * Email sending via MailChannels (free) or Resend (reliable).
 * Set RESEND_API_KEY secret for production delivery.
 *   wrangler pages secret put RESEND_API_KEY --project-name photo
 */

interface EmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

export async function sendEmail(opts: EmailOptions, env?: { RESEND_API_KEY?: string }): Promise<boolean> {
  // Try Resend first if API key is configured
  if (env?.RESEND_API_KEY) {
    return sendViaResend(opts, env.RESEND_API_KEY);
  }
  // Fall back to MailChannels (may not work with .pages.dev domains)
  return sendViaMailChannels(opts);
}

async function sendViaResend(opts: EmailOptions, apiKey: string): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Photo <noreply@photo-ll2.pages.dev>",
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

async function sendViaMailChannels(opts: EmailOptions): Promise<boolean> {
  try {
    const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: opts.to }] }],
        from: { email: "noreply@photo-ll2.pages.dev", name: "Photo App" },
        subject: opts.subject,
        content: [{ type: "text/html", value: opts.htmlBody }],
      }),
    });

    if (!res.ok) {
      console.error("MailChannels error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("MailChannels send failed:", err);
    return false;
  }
}
