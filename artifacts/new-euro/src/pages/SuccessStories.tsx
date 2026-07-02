import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useListTestimonials } from "@workspace/api-client-react";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const COUNTRY_FLAGS: Record<string, string> = {
  uk: "🇬🇧", "united kingdom": "🇬🇧", usa: "🇺🇸", "united states": "🇺🇸",
  canada: "🇨🇦", australia: "🇦🇺", turkey: "🇹🇷", schengen: "🇪🇺",
  europe: "🇪🇺", france: "🇫🇷", germany: "🇩🇪",
};

function getFlag(country: string) {
  return COUNTRY_FLAGS[country?.toLowerCase()] ?? "🌍";
}

export default function SuccessStories() {
  const { data: testimonials, isLoading } = useListTestimonials();

  const featured = testimonials?.filter((t) => t.rating >= 4) ?? [];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="container relative z-10 text-center max-w-3xl">
            <motion.p {...fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Real Visas. Real People.</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.05 }} className="text-display-xl font-bold mb-6">
              5,000+ Dreams <span className="gold-gradient-text">Made Real.</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground leading-relaxed">
              These are not actors or made-up reviews. These are real Pakistani families and professionals who trusted us with their visa applications — and got stamped.
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-y border-white/5">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: "5,000+", label: "Visas Processed" },
              { n: "99%", label: "Success Rate" },
              { n: "4.9/5", label: "Avg. Rating" },
              { n: "500+", label: "5-Star Reviews" },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.07 }}>
                <div className="text-4xl font-display font-bold gold-gradient-text mb-1">{s.n}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-24 container">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-display-l font-bold mb-4">Client <span className="gold-gradient-text">Reviews.</span></h2>
            <p className="text-muted-foreground text-lg">What our clients say after their visas are approved.</p>
          </motion.div>

          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="glass-card rounded-2xl h-56 animate-pulse bg-white/5" />
              ))}
            </div>
          )}

          {!isLoading && featured.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <span className="text-5xl block mb-4">⭐</span>
              <p>Success stories coming soon. Check back after we import our client reviews.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((t, i) => (
              <motion.div
                key={t.id}
                {...fadeUp}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="glass-card rounded-2xl p-6 border-white/5 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4 relative overflow-hidden"
              >
                {/* APPROVED stamp */}
                <div className="absolute top-4 right-4 rotate-6 opacity-30">
                  <div className="border-2 border-green-400 rounded px-2 py-0.5 text-green-400 text-[10px] font-bold tracking-[0.2em] uppercase">Approved ✓</div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < t.rating ? "fill-primary text-primary" : "text-white/20"}`} />
                  ))}
                </div>

                {/* Message */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{t.message}"</p>

                {/* Footer */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-sm text-primary">
                    {t.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{getFlag(t.country)} {t.country} Visa • {t.visaType}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-card border-y border-white/5">
          <div className="container text-center max-w-2xl">
            <motion.h2 {...fadeUp} className="text-display-l font-bold mb-4">
              Your Story Could Be <span className="gold-gradient-text">Next.</span>
            </motion.h2>
            <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg mb-10">
              Join 5,000+ satisfied clients who trusted New Euro Consultants with their visa journey.
            </motion.p>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gold-gradient-bg text-black font-semibold px-8 py-4 text-base rounded-sm hover:shadow-glow-gold transition-all">
                <Link href="/eligibility-check">Start My Application</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 hover:bg-white/5 px-8 py-4 text-base rounded-sm">
                <Link href="/contact">Talk to a Consultant</Link>
              </Button>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
