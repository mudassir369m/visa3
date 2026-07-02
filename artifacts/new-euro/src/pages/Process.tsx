import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const steps = [
  {
    num: "01",
    title: "Free Eligibility Check",
    time: "~1 Hour",
    emoji: "🔍",
    desc: "Submit your basic profile — travel history, income, property ownership, bank balance, and destination. Our consultant reviews your profile against the latest embassy criteria and gives you an honest assessment.",
    details: [
      "Online form or WhatsApp call",
      "Honest profile scoring",
      "Specific weak-point identification",
      "No charge for the assessment",
    ],
  },
  {
    num: "02",
    title: "Document Preparation",
    time: "3–7 Days",
    emoji: "📋",
    desc: "We give you a personalized document checklist (not a generic one). Every page, every stamp, every letter is reviewed to embassy standards before submission. We prepare covering letters and organize your file exactly how each embassy expects it.",
    details: [
      "Personalized checklist per embassy",
      "Cover letter drafting",
      "Document sequencing & tabbing",
      "Final review before submission",
    ],
  },
  {
    num: "03",
    title: "Application Filing",
    time: "1–2 Days",
    emoji: "📨",
    desc: "We book your VFS / embassy appointment and submit your application on your behalf. Our team handles all the paperwork, biometrics coordination, and appointment management so you don't have to stand in queues.",
    details: [
      "VFS / embassy appointment booking",
      "Application submission on your behalf",
      "Biometric coordination",
      "Real-time status tracking",
    ],
  },
  {
    num: "04",
    title: "Visa Approved — Fly!",
    time: "7–30 Days",
    emoji: "✈️",
    desc: "You collect your passport with visa stamp. We also arrange your air tickets, hotel bookings, and travel insurance if needed — complete end-to-end so your trip is stress-free from the moment you land.",
    details: [
      "Passport collection coordination",
      "Air ticket booking at best fares",
      "Hotel booking worldwide",
      "Travel insurance arrangement",
    ],
  },
];

const faqs = [
  { q: "How long does a UK visa take?", a: "Standard UK visit visa processing is 15 business days from biometrics. Priority service (available for extra fee) is 5 business days. We advise applying at least 6 weeks before travel." },
  { q: "Do I need to attend an appointment?", a: "Yes — you personally attend biometrics at VFS. The appointment takes 15–30 minutes. We prep you on exactly what to expect so there are no surprises." },
  { q: "What if my visa is refused?", a: "We analyse the refusal letter and advise on the strongest path — reapplication with stronger documents, appeal, or alternative visa types. Most of our clients get approved on a second application after addressing the refusal reason." },
  { q: "Is a bank balance guarantee enough?", a: "No — embassies look at the source, pattern, and duration of funds. A sudden large deposit is a red flag. We advise you on exactly how your bank statements should look before you apply." },
];

export default function Process() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="container relative z-10 text-center max-w-3xl">
            <motion.p {...fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Our Process</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.05 }} className="text-display-xl font-bold mb-6">
              Visa Approved in <span className="gold-gradient-text">4 Simple Steps.</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground leading-relaxed">
              A clear, transparent, step-by-step process — no surprises, no confusion, no hidden steps. From assessment to stamp.
            </motion.p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 container max-w-4xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent hidden md:block" />
            <div className="space-y-16">
              {steps.map((step, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1, duration: 0.6 }} className="relative grid md:grid-cols-[64px_1fr] gap-8 items-start">
                  {/* Number bubble */}
                  <div className="hidden md:flex w-16 h-16 rounded-full gold-gradient-bg items-center justify-center font-display font-bold text-black text-lg shrink-0 shadow-glow-gold z-10">
                    {step.num}
                  </div>
                  <div className="glass-card rounded-2xl p-8 border-white/5 hover:border-primary/20 transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl">{step.emoji}</span>
                      <div>
                        <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-1 block">{step.time}</span>
                        <h2 className="text-2xl font-display font-bold">{step.num} — {step.title}</h2>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">{step.desc}</p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((d, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-primary">✓</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 bg-card border-y border-white/5">
          <div className="container max-w-3xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="text-display-l font-bold mb-4">Common <span className="gold-gradient-text">Questions.</span></h2>
            </motion.div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.06 }} className="glass-card rounded-xl p-6 border-white/5">
                  <h3 className="font-display font-bold text-base mb-3 text-primary">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 container text-center">
          <motion.h2 {...fadeUp} className="text-display-l font-bold mb-6">
            Start <span className="gold-gradient-text">Step 1</span> Today — It's Free.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg mb-10">No commitment. No payment. Just an honest assessment of your chances.</motion.p>
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gold-gradient-bg text-black font-semibold px-8 py-4 text-base rounded-sm hover:shadow-glow-gold transition-all">
              <Link href="/eligibility-check">Check My Eligibility</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 hover:bg-white/5 px-8 py-4 text-base rounded-sm">
              <a href="https://wa.me/923145352222?text=Hi%20New%20Euro%20Consultants%2C%20I%27d%20like%20to%20start%20the%20visa%20process" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
