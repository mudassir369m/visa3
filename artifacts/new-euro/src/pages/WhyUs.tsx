import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Award, Clock, Users, Star, CheckCircle2, TrendingUp, Globe } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const differentiators = [
  {
    icon: Shield,
    title: "Embassy-Grade Honesty",
    desc: "We tell you the truth about your profile — even if it costs us the sale. No false promises. No inflated success guarantees. If your case is weak, we say so upfront and help you strengthen it before applying.",
  },
  {
    icon: Award,
    title: "18+ Years of Proven Experience",
    desc: "Since 2007, we have processed thousands of visas. We know the exact documentation standards, embassy psychology, and common rejection triggers for UK, USA, Canada, Australia, Turkey, and Schengen.",
  },
  {
    icon: Clock,
    title: "Faster Processing",
    desc: "Our pre-vetted document checklist and embassy-grade formatting means your application is complete on the first submission — no back-and-forth delays from missing paperwork.",
  },
  {
    icon: Users,
    title: "Personalized Consultation",
    desc: "Every client gets a dedicated consultant, not a call-centre agent. S. Mustafa personally reviews complex cases. You talk to experts, not order-takers.",
  },
  {
    icon: Star,
    title: "No Hidden Fees",
    desc: "Our fee structure is transparent from the first call. What we quote is what you pay. No last-minute 'processing charges', 'documentation fees', or surprise markups.",
  },
  {
    icon: TrendingUp,
    title: "99% Success Rate",
    desc: "We don't just file applications — we engineer approvals. Our success rate is the result of rejecting weak cases early and only filing when we're confident in the outcome.",
  },
  {
    icon: Globe,
    title: "6 Visa Jurisdictions Mastered",
    desc: "UK, USA, Canada, Australia, Turkey, and all Schengen states. Each country has different embassy culture and documentation standards. We specialize in all of them.",
  },
  {
    icon: CheckCircle2,
    title: "Full-Service Under One Roof",
    desc: "Visa? Done. Air ticket? Done. Hotel? Done. Travel insurance? Done. You plan the trip — we handle every paperwork detail so nothing falls through the cracks.",
  },
];

const competitors = [
  { label: "Personalized consultant (not a call centre)", us: true, them: false },
  { label: "Honest profile assessment before taking your money", us: true, them: false },
  { label: "99%+ documented success rate", us: true, them: false },
  { label: "No hidden fees — full transparency", us: true, them: false },
  { label: "18+ years specialized in Pakistani applicants", us: true, them: false },
  { label: "Embassy-format document preparation", us: true, them: false },
  { label: "Complete travel services (ticket, hotel, insurance)", us: true, them: true },
  { label: "WhatsApp-accessible support", us: true, them: true },
];

export default function WhyUs() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="container relative z-10 max-w-3xl text-center">
            <motion.p {...fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Why New Euro Consultants</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.05, duration: 0.6 }} className="text-display-xl font-bold mb-6">
              The Honest Choice <span className="gold-gradient-text">in a Sea of Agents.</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1, duration: 0.6 }} className="text-xl text-muted-foreground leading-relaxed">
              Pakistan has thousands of visa agents. Only a handful tell you the truth from day one. We are one of them — and that is why clients who come to us rarely go anywhere else.
            </motion.p>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="py-12 bg-card border-y border-white/5">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: "18+", label: "Years Active" },
              { n: "5,000+", label: "Visas Processed" },
              { n: "99%", label: "Success Rate" },
              { n: "6", label: "Countries Covered" },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <div className="text-4xl font-display font-bold gold-gradient-text mb-1">{s.n}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Differentiators grid */}
        <section className="py-24 container">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-display-l font-bold mb-4">What Sets Us <span className="gold-gradient-text">Apart.</span></h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Every agency claims to be the best. Here is what we actually do differently.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.05, duration: 0.5 }} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 border-white/5 hover:border-primary/20">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                  <d.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-base mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-24 bg-card border-y border-white/5">
          <div className="container max-w-3xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="text-display-l font-bold mb-4">Us vs <span className="gold-gradient-text">The Rest.</span></h2>
              <p className="text-muted-foreground">A frank comparison with typical Pakistan visa agents.</p>
            </motion.div>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 border-b border-white/10 bg-white/5 text-xs uppercase tracking-widest font-semibold">
                <div className="p-4 col-span-1 text-muted-foreground">Feature</div>
                <div className="p-4 text-center text-primary">New Euro</div>
                <div className="p-4 text-center text-muted-foreground">Typical Agent</div>
              </div>
              {competitors.map((row, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.04 }} className="grid grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <div className="p-4 text-sm text-muted-foreground col-span-1">{row.label}</div>
                  <div className="p-4 text-center">
                    {row.us ? <CheckCircle2 className="w-5 h-5 text-green-400 inline" /> : <span className="text-red-400 text-lg">✗</span>}
                  </div>
                  <div className="p-4 text-center">
                    {row.them ? <CheckCircle2 className="w-5 h-5 text-green-400/60 inline" /> : <span className="text-red-400/60 text-lg">✗</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 container text-center">
          <motion.h2 {...fadeUp} className="text-display-l font-bold mb-6">
            Ready to Experience <span className="gold-gradient-text">the Difference?</span>
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg mb-10">Start with a free eligibility check. No commitment. No sales pressure. Just honest advice.</motion.p>
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gold-gradient-bg text-black font-semibold px-8 py-4 text-base rounded-sm hover:shadow-glow-gold transition-all duration-300">
              <Link href="/eligibility-check">Free Eligibility Check</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 hover:bg-white/5 px-8 py-4 text-base rounded-sm">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
