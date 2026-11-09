import "server-only";

type Mail = { subject: string; text: string; replyTo?: string };

/**
 * Sends an email through Resend (https://resend.com) when RESEND_API_KEY is set.
 * Env: RESEND_API_KEY, CONTACT_TO_EMAIL (default info@jlsmiths.com), CONTACT_FROM_EMAIL (a verified sender).
 * Without a key, development logs the message instead; production reports a failure so nothing is silently lost.
 */
export async function sendMail({ subject, text, replyTo }: Mail): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "info@jlsmiths.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "JLSmith Website <onboarding@resend.dev>";

  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[contact] RESEND_API_KEY not set — email not sent.\nTo: ${to}\nSubject: ${subject}\n\n${text}`);
      return true;
    }
    console.error("[contact] RESEND_API_KEY is not configured; enquiry could not be delivered.");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!res.ok) console.error(`[contact] Resend responded ${res.status}: ${await res.text()}`);
    return res.ok;
  } catch (err) {
    console.error("[contact] Failed to reach Resend", err);
    return false;
  }
}
