import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const sections = [
  {
    title: "1. Information We Collect",
    content: `When you use our services, submit an eligibility check, contact us, or sign up for our newsletter, we collect the following types of information:

• Personal identifiers: name, email address, phone number
• Travel-related information: passport number, travel history, visa history
• Financial information: income range, bank balance range (collected only for eligibility assessment purposes)
• Communication records: messages sent via contact forms or WhatsApp

We do not collect credit card or payment information directly — any payments are processed through secure third-party payment processors.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Assess your visa eligibility and provide personalized advice
• Contact you about your visa application or inquiry
• Send you embassy updates and newsletters (only if you opted in)
• Improve our services and understand client needs
• Comply with legal obligations

We do not sell, rent, or trade your personal information to third parties for marketing purposes.`,
  },
  {
    title: "3. Data Security",
    content: `We take the security of your personal information seriously. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.

Your documents and personal files are:
• Stored on encrypted servers
• Accessible only to authorized personnel handling your case
• Retained only for the duration necessary to complete your application

We strongly recommend you do not share sensitive financial documents (bank statements, property papers) via unsecured channels.`,
  },
  {
    title: "4. Sharing with Third Parties",
    content: `We share your information only in the following circumstances:

• With embassy, VFS Global, or relevant visa processing authorities as required for your visa application
• With airlines, hotels, or insurance providers if you have engaged our full travel services
• With service providers who help us operate our business (e.g., email services), bound by confidentiality agreements
• When required by law, court order, or government authority

We will always inform you before sharing your information with a third party unless legally prohibited from doing so.`,
  },
  {
    title: "5. Cookies & Analytics",
    content: `Our website may use cookies and similar tracking technologies to:

• Remember your preferences (e.g., language setting)
• Analyze website traffic and usage patterns
• Improve the user experience

You can control cookies through your browser settings. Disabling cookies may affect some functionality of our website.`,
  },
  {
    title: "6. Your Rights",
    content: `You have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your personal information (subject to legal retention requirements)
• Withdraw consent for marketing communications at any time

To exercise any of these rights, contact us at: info@neweuroconsultants.com or WhatsApp: +92 314 535 2222`,
  },
  {
    title: "7. Retention Period",
    content: `We retain client information for up to 5 years after your last interaction with us, as required by financial and immigration compliance standards. After this period, data is securely deleted or anonymized.

Anonymized, aggregated data (not linked to any individual) may be retained indefinitely for statistical purposes.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website or sending an email to the address on file.

The date of the latest revision is shown at the top of this page.`,
  },
  {
    title: "9. Contact Us",
    content: `If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us:

New Euro Consultants Travel & Tours
Office No. 17-18, 1st Floor, Lord Trade Centre, F-11 Markaz, Islamabad
Phone / WhatsApp: +92 314 535 2222
Email: info@neweuroconsultants.com`,
  },
];

export default function Privacy() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="container relative z-10 max-w-3xl">
            <motion.div {...fadeUp}>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Legal</p>
              <h1 className="text-display-l font-bold mb-4">Privacy <span className="gold-gradient-text">Policy.</span></h1>
              <p className="text-muted-foreground mb-12">Last updated: January 2026</p>
              <p className="text-muted-foreground leading-relaxed">
                New Euro Consultants Travel & Tours ("we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and protect the personal data you provide when using our services or visiting our website.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-24 container max-w-3xl">
          <div className="space-y-8">
            {sections.map((s, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.04 }} className="glass-card rounded-2xl p-8 border-white/5">
                <h2 className="font-display font-bold text-xl mb-4 text-primary">{s.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">{s.content}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
