import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "How long does a UK visa take?", a: "Typically, standard UK visit visas take 15-20 working days after biometrics. Priority services (at extra embassy cost) can reduce this to 5 working days." },
  { q: "What documents are needed for Schengen?", a: "Standard requirements include a valid passport, bank statements (last 6 months), confirmed flight itinerary, verified hotel bookings, and Schengen-approved travel insurance. We provide a customized checklist based on your profile." },
  { q: "Do you guarantee visa approval?", a: "No honest consultant guarantees approval, as the final decision rests solely with the visa officer. We guarantee embassy-grade application preparation, error-free documentation, and expert guidance to maximize your chances." },
  { q: "What are your consultation fees?", a: "We offer a FREE initial eligibility assessment. If you proceed, our service charges vary depending on the visa category and complexity of the case. All fees are transparently discussed upfront—no hidden charges." },
  { q: "Can you help if I was previously refused?", a: "Yes. Visa refusals are common. We specialize in analyzing refusal letters, addressing the visa officer's concerns, and preparing strong re-applications with necessary justification letters." },
  { q: "How do I start the process?", a: "Simply click the 'Free Eligibility Check' button on this site, or send us a message on WhatsApp. One of our senior consultants will review your details and guide you on the next steps." },
];

function FaqItem({ q, a, isOpen, onClick }: { q: string, a: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg md:text-xl font-display font-medium transition-colors ${isOpen ? 'text-primary' : 'text-white group-hover:text-primary/80'}`}>
          {q}
        </span>
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors shrink-0 ml-4 ${isOpen ? 'border-primary bg-primary text-black' : 'border-white/20 text-white group-hover:border-primary/50'}`}>
          <motion.span
            initial={false}
            animate={{ rotate: isOpen ? 45 : 0 }}
            className="text-lg font-light leading-none"
          >
            +
          </motion.span>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed pr-12">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-display-l mb-4"
          >
            Questions, <span className="gold-gradient-text">Answered</span>
          </motion.h2>
          <p className="text-muted-foreground">Clear answers to your most pressing visa concerns.</p>
        </div>

        <div className="glass-card rounded-2xl p-4 md:p-8">
          {faqs.map((faq, i) => (
            <FaqItem 
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}