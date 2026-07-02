import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing our website, submitting an eligibility check, contacting us, or engaging our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.

These terms apply to all visitors, clients, and users of New Euro Consultants Travel & Tours.`,
  },
  {
    title: "2. Nature of Our Services",
    content: `New Euro Consultants provides visa consultancy, document preparation, and travel arrangement services. We are NOT a law firm and do not provide legal advice. Our consultants are experienced immigration practitioners, not lawyers.

Our services include:
• Visa eligibility assessment
• Document checklist preparation and review
• Visa application submission assistance
• Air ticketing, hotel booking, and travel insurance arrangement

We do not guarantee visa approval. All visa decisions are made solely by the relevant embassy or immigration authority.`,
  },
  {
    title: "3. No Visa Guarantee",
    content: `This is the most important term you must understand:

New Euro Consultants does NOT guarantee visa approval. Our 99% success rate reflects the quality of applications we submit, not a promise of approval for every case.

Visa decisions are at the absolute discretion of the embassy or immigration authority. Factors beyond our control — including changes in embassy policy, applicant-provided information, or geopolitical conditions — can affect outcomes.

We strongly advise against booking non-refundable flights or hotels until your visa is approved.`,
  },
  {
    title: "4. Client Responsibilities",
    content: `As a client, you are responsible for:

• Providing accurate, complete, and truthful information about yourself and your circumstances
• Disclosing previous visa refusals, criminal history, or immigration violations
• Providing genuine original documents (fraud is a criminal offence and will result in immediate termination of services)
• Meeting deadlines for document submission
• Paying agreed fees on time

Providing false information is a serious offence under Pakistani law and the laws of the destination country. We reserve the right to report suspected fraud to relevant authorities.`,
  },
  {
    title: "5. Fees and Refund Policy",
    content: `Our fees are quoted before services begin and must be agreed in writing (WhatsApp or email is acceptable).

Fee structure:
• Consultation fee: payable before the eligibility assessment
• Service fee: payable before document preparation begins
• Government/VFS fees: passed through at cost, non-refundable

Refund policy:
• If we determine your case is not viable after accepting your fee, we will refund the service fee in full
• If you withdraw from the process after document preparation has begun, a partial fee (proportional to work completed) is retained
• Government and embassy fees are non-refundable under any circumstances
• In case of visa refusal due to reasons within our control, we offer a free re-application review`,
  },
  {
    title: "6. Intellectual Property",
    content: `All content on this website — including text, images, design, logo, and code — is the property of New Euro Consultants Travel & Tours and protected by Pakistani and international copyright law.

You may not copy, reproduce, distribute, or create derivative works without our express written permission.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `To the fullest extent permitted by Pakistani law, New Euro Consultants shall not be liable for:

• Visa refusals
• Loss of travel bookings, flights, or hotel costs due to visa delays or refusals
• Any indirect, incidental, or consequential damages arising from use of our services
• Changes in embassy processing times or policies beyond our control

Our total liability to you for any claim shall not exceed the service fees you paid us for the specific application in question.`,
  },
  {
    title: "8. Changes to Terms",
    content: `We may update these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms. We will post the updated date at the top of this page.`,
  },
  {
    title: "9. Governing Law & Jurisdiction",
    content: `These terms are governed by the laws of Pakistan. Any dispute arising from these terms or our services shall be resolved first through negotiation, then through mediation, and if necessary, through the courts of Islamabad, Pakistan.`,
  },
  {
    title: "10. Contact",
    content: `For any questions about these Terms of Service:

New Euro Consultants Travel & Tours
Office No. 17-18, 1st Floor, Lord Trade Centre, F-11 Markaz, Islamabad
Phone / WhatsApp: +92 314 535 2222
Email: info@neweuroconsultants.com`,
  },
];

export default function Terms() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="container relative z-10 max-w-3xl">
            <motion.div {...fadeUp}>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Legal</p>
              <h1 className="text-display-l font-bold mb-4">Terms of <span className="gold-gradient-text">Service.</span></h1>
              <p className="text-muted-foreground mb-12">Last updated: January 2026</p>
              <p className="text-muted-foreground leading-relaxed">
                Please read these Terms of Service carefully before using our website or engaging New Euro Consultants Travel & Tours for any service. These terms govern the relationship between you (the client) and us.
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
