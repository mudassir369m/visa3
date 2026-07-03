import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Plane, Globe, Clock, Shield } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const airlines = ["PIA", "Emirates", "Qatar Airways", "Turkish Airlines", "Etihad", "Air Arabia", "FlyDubai", "Saudi Airlines"];

const features = [
  { icon: Globe, title: "200+ Destinations", desc: "International & domestic flights to every major city worldwide." },
  { icon: Clock, title: "Best Fares Guaranteed", desc: "We compare across airlines to get you the lowest available fare." },
  { icon: Shield, title: "Flexible Booking", desc: "Refundable & date-change options available on most tickets." },
  { icon: Plane, title: "Group & Corporate", desc: "Special rates for group bookings, corporate travel, and delegations." },
];

export default function AirTicketing() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none" />
          <div className="container relative z-10 max-w-4xl text-center">
            <motion.p {...fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">✈️ Air Ticketing</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.05 }} className="text-display-xl font-bold mb-6">
              Fly Smart. <span className="gold-gradient-text">Fly Affordable.</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              International & domestic air tickets at best fares. We handle bookings for individuals, families, groups, and corporate clients from our F-11 Markaz office.
            </motion.p>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gold-gradient-bg text-black font-bold h-14 px-8 rounded-full shadow-glow-gold">
                <a href="https://wa.me/923145352222?text=I%20need%20an%20air%20ticket%20quote" target="_blank">WhatsApp for Quote →</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 h-14 px-8 rounded-full">
                <a href="tel:+923145352222">Call +92 314 535 2222</a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features */}
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

        {/* Airlines */}
        <section className="py-16 bg-card/30 border-y border-white/5">
          <div className="container text-center">
            <motion.h2 {...fadeUp} className="text-2xl font-display font-bold mb-10">Partner <span className="gold-gradient-text">Airlines</span></motion.h2>
            <div className="flex flex-wrap justify-center gap-3">
              {airlines.map((a, i) => (
                <motion.span key={i} {...fadeUp} transition={{ delay: i * 0.04 }}
                  className="px-5 py-2 glass-card rounded-full border-white/10 text-sm font-medium">
                  {a}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="py-20 container max-w-3xl">
          <motion.h2 {...fadeUp} className="text-2xl font-display font-bold mb-8 text-center">What You <span className="gold-gradient-text">Get</span></motion.h2>
          <div className="space-y-3">
            {[
              "E-ticket confirmation sent to your WhatsApp within minutes",
              "Best price comparison across all major airlines",
              "Advice on baggage allowance & transit visas",
              "Flexible date change & cancellation assistance",
              "Group discounts for 10+ passengers",
              "Corporate account management & monthly invoicing",
              "Both one-way & return tickets available",
              "Infant, child & senior citizen fares available",
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 p-4 glass-card rounded-xl border-white/5">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 container text-center">
          <motion.h2 {...fadeUp} className="text-3xl font-display font-bold mb-4">Ready to Book Your <span className="gold-gradient-text">Flight?</span></motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground mb-8 max-w-md mx-auto">Visit us at F-11 Markaz or send us a WhatsApp with your travel dates.</motion.p>
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gold-gradient-bg text-black font-bold rounded-full h-14 px-10">
              <a href="https://wa.me/923145352222" target="_blank">Book on WhatsApp</a>
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
