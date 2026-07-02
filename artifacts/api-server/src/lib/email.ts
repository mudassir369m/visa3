import { Resend } from "resend";
import { logger } from "./logger";

const apiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
const emailToAdmin = process.env.EMAIL_TO_ADMIN;

const resend = apiKey ? new Resend(apiKey) : null;

// No-ops when RESEND_API_KEY isn't configured (e.g. local dev) so the
// leads/eligibility flows never fail just because email isn't set up.
export async function notifyAdmin(subject: string, html: string): Promise<void> {
  if (!resend || !emailToAdmin) {
    logger.info({ subject }, "Skipping admin email notification (RESEND_API_KEY or EMAIL_TO_ADMIN not set)");
    return;
  }
  try {
    await resend.emails.send({ from: emailFrom, to: emailToAdmin, subject, html });
  } catch (err) {
    logger.error({ err }, "Failed to send admin notification email");
  }
}
