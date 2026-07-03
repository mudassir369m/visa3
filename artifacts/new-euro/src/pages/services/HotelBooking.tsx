import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Building, MapPin, Star, Shield } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const features = [
  { icon: Building, title: "Verified Hotels", desc: "Only verified, embassy-approved hotels for visa invitation letters." },
  { icon: MapPin, title: "Worldwide Coverage", desc: "Hotels in UK, USA, Canada, Australia, Turkey, Europe & beyond." },
  { icon: Star, title: "3★ to 5★ Options", desc: "Budget-friendly to luxury stays — we match your visa requirements." },
  { icon: Shield, title: "Embassy-Valid Booking", desc: "Hotel booking confirmations accepted by all major embassies." },
];

export default function HotelBooking() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none" />
          <div className="container relative z-10 max-w-4xl text-center">
            <motion.p {...fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">🏨 Hotel Booking</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.05 }} className="text-display-xl font-bold mb-6">
              The Right Hotel. <span className="gold-gradient-text">Embassy-Ready.</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Verified hotel bookings worldwide — with official confirmation letters accepted by UK, Schengen, USA, Canada, and Australia embassies.
            </motion.p>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gold-gradient-bg text-black font-bold h-14 px-8 rounded-full shadow-glow-gold">
                <a href="https://wa.me/923145352222?text=I%20need%20a%20hotel%20booking" target="_blank">WhatsApp for Booking →</a>
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

        <section className="py-20 container max-w-3xl">
          <motion.h2 {...fadeUp} className="text-2xl font-display font-bold mb-8 text-center">What We <span className="gold-gradient-text">Provide</span></motion.h2>
          <div className="space-y-3">
            {[
              "Official hotel booking confirmation letter on letterhead",
              "Accepted by Schengen, UK, USA, Canada & Australia embassies",
              "Both refundable & non-refundable options available",
              "Budget (3★), business (4★) & luxury (5★) options",
              "Confirmation within 2–4 hours",
              "Hotels near visa-required tourist spots",
              "Group hotel blocks for delegations & families",
              "No advance payment required in many cases",
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.04 }} className="flex items-center gap-3 p-4 glass-card rounded-xl border-white/5">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-20 container text-center">
          <motion.h2 {...fadeUp} className="text-3xl font-display font-bold mb-4">Need a Hotel <span className="gold-gradient-text">Booking?</span></motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground mb-8 max-w-md mx-auto">Tell us your destination, dates, and star preference — we'll handle the rest.</motion.p>
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
