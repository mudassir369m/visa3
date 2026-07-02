import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useListVisas } from "@workspace/api-client-react";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const COUNTRY_META: Record<string, { flag: string; color: string; slug: string; hero: string }> = {
  uk: { flag: "🇬🇧", color: "from-indigo-900 to-primary-900", slug: "uk", hero: "United Kingdom" },
  usa: { flag: "🇺🇸", color: "from-red-900 to-primary-900", slug: "usa", hero: "United States" },
  canada: { flag: "🇨🇦", color: "from-red-800 to-primary-900", slug: "canada", hero: "Canada" },
  australia: { flag: "🇦🇺", color: "from-yellow-900 to-primary-900", slug: "australia", hero: "Australia" },
  turkey: { flag: "🇹🇷", color: "from-red-900 to-primary-800", slug: "turkey", hero: "Turkey" },
  schengen: { flag: "🇪🇺", color: "from-blue-900 to-primary-900", slug: "schengen", hero: "Schengen" },
};

const DEFAULT_COUNTRIES = [
  { slug: "uk", name: "United Kingdom", flag: "🇬🇧", types: "Tourist · Business · Family", days: "15 days", success: "98%" },
  { slug: "usa", name: "United States", flag: "🇺🇸", types: "B1/B2 Visit · Business", days: "30–90 days", success: "95%" },
  { slug: "canada", name: "Canada", flag: "🇨🇦", types: "Visitor · Family · Business", days: "30–60 days", success: "96%" },
  { slug: "australia", name: "Australia", flag: "🇦🇺", types: "Tourist · Business", days: "20–40 days", success: "97%" },
  { slug: "turkey", name: "Turkey", flag: "🇹🇷", types: "e-Visa · Sticker Visa", days: "3–7 days", success: "99%" },
  { slug: "schengen", name: "Schengen", flag: "🇪🇺", types: "Tourist · Business · Transit", days: "15–30 days", success: "97%" },
];

export default function VisaOverview() {
  const { data: visas } = useListVisas();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="py-24 md:py-36 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="container relative z-10 text-center max-w-3xl">
            <motion.p {...fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Visa Services</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.05 }} className="text-display-xl font-bold mb-6">
              Your Destination, <span className="gold-gradient-text">Our Expertise.</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground leading-relaxed">
              Specialized visa pathways for 6 major regions. Embassy-grade documentation. Honest eligibility assessment.
            </motion.p>
          </div>
        </section>

        {/* Countries grid */}
        <section className="pb-24 container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEFAULT_COUNTRIES.map((country, i) => {
              const meta = COUNTRY_META[country.slug];
              // Check if we have DB data for this country
              const dbVisa = visas?.find((v) => v.slug === country.slug || v.country?.toLowerCase() === country.name.toLowerCase());
              const processingDays = dbVisa?.processingDays ? `${dbVisa.processingDays} days` : country.days;
              const success = dbVisa?.successRate ?? country.success;

              return (
                <motion.div
                  key={country.slug}
                  {...fadeUp}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <Link href={`/visa/${country.slug}`} className="block h-full">
                    <div className={`relative rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 group h-full bg-gradient-to-br ${meta.color}`}>
                      {/* Flag as background element */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-[120px]">{country.flag}</span>
                      </div>

                      <div className="relative z-10 p-8">
                        {/* Flag + Country name */}
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-5xl">{country.flag}</span>
                          <div>
                            <h2 className="text-2xl font-display font-bold gold-gradient-text">{country.name}</h2>
                            <p className="text-xs text-muted-foreground">{country.types}</p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="glass-card rounded-xl p-3 text-center">
                            <div className="text-sm font-bold text-foreground">{processingDays}</div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Avg Processing</div>
                          </div>
                          <div className="glass-card rounded-xl p-3 text-center">
                            <div className="text-sm font-bold text-green-400">{success}</div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Success Rate</div>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">New Euro Consultants</span>
                          <span className="text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">View Details →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Process teaser */}
        <section className="py-24 bg-card border-y border-white/5">
          <div className="container text-center max-w-2xl">
            <motion.h2 {...fadeUp} className="text-display-l font-bold mb-4">
              Not Sure Which <span className="gold-gradient-text">Visa?</span>
            </motion.h2>
            <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg mb-10">
              Take our free eligibility check. We'll assess your profile for the right visa type across all 6 destinations and tell you honestly where you stand.
            </motion.p>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gold-gradient-bg text-black font-semibold px-8 py-4 text-base rounded-sm hover:shadow-glow-gold transition-all">
                <Link href="/eligibility-check">Free Eligibility Check</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 hover:bg-white/5 px-8 py-4 text-base rounded-sm">
                <Link href="/process">See Our Process</Link>
              </Button>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
