import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Heart, Plane, AlertTriangle } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const features = [
  { icon: Shield, title: "Schengen-Approved", desc: "Fully compliant with Schengen embassy minimum coverage of €30,000." },
  { icon: Heart, title: "Medical Coverage", desc: "Emergency hospitalization, doctor visits, and evacuation covered." },
  { icon: Plane, title: "Trip Cancellation", desc: "Get refunded if your visa is denied or trip is cancelled for covered reasons." },
  { icon: AlertTriangle, title: "Baggage Loss", desc: "Coverage for lost, stolen, or damaged baggage during travel." },
];

export default function TravelInsurance() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none" />
          <div className="container relative z-10 max-w-4xl text-center">
            <motion.p {...fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">🛡️ Travel Insurance</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.05 }} className="text-display-xl font-bold mb-6">
              Fly Protected. <span className="gold-gradient-text">Travel Confident.</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Schengen-approved and embassy-accepted travel insurance. Required for visa applications to UK, Schengen, and many more — we get it sorted same day.
            </motion.p>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gold-gradient-bg text-black font-bold h-14 px-8 rounded-full shadow-glow-gold">
                <a href="https://wa.me/923145352222?text=I%20need%20travel%20insurance" target="_blank">Get Insurance Today →</a>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-20 container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="glass-card rounded-2xl p-6 border-white/5 text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Coverage table */}
        <section className="py-16 container max-w-3xl">
          <motion.h2 {...fadeUp} className="text-2xl font-display font-bold mb-8 text-center">Coverage <span className="gold-gradient-text">Details</span></motion.h2>
          <div className="glass-card rounded-2xl border-white/5 overflow-hidden">
            {[
              ["Medical Expenses", "Up to €50,000 / £50,000"],
              ["Emergency Evacuation", "Included"],
              ["Trip Cancellation", "Up to 100% of trip cost"],
              ["Baggage Loss", "Up to PKR 100,000"],
              ["Flight Delay", "6+ hour coverage"],
              ["Personal Liability", "€1,000,000"],
              ["Dental Emergency", "Included"],
              ["24/7 Emergency Helpline", "Worldwide"],
            ].map(([item, val], i) => (
              <div key={i} className={`flex justify-between items-center px-6 py-4 ${i % 2 === 0 ? 'bg-white/3' : ''}`}>
                <span className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />{item}</span>
                <span className="text-sm font-semibold text-primary">{val}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 container text-center">
          <motion.h2 {...fadeUp} className="text-3xl font-display font-bold mb-4">Get Your <span className="gold-gradient-text">Insurance</span></motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground mb-8 max-w-md mx-auto">Same-day issuance. Policy document delivered to your WhatsApp or email.</motion.p>
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gold-gradient-bg text-black font-bold rounded-full h-14 px-10">
              <a href="https://wa.me/923145352222" target="_blank">Apply on WhatsApp</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 rounded-full h-14 px-10">
              <Link href="/contact">Visit Our Office</Link>
            </Button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
