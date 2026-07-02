import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import * as LucideIcons from "lucide-react";
import { PlaneTakeoff, CheckCircle2 } from "lucide-react";
import { useListServices } from "@workspace/api-client-react";

type LucideIcon = typeof PlaneTakeoff;

const FEATURES: Record<string, string[]> = {
  "air-ticketing": ["Global airline network", "Corporate discounts", "Date change assistance", "Group booking rates"],
  "hotel-booking": ["Visa-compliant bookings", "Pay-later options", "Budget to Luxury range", "Instant confirmation"],
  "travel-insurance": ["Schengen approved (€30k coverage)", "Covid-19 coverage included", "Instant policy generation", "Baggage loss protection"],
  tours: ["Customized itineraries", "Honeymoon packages", "Family group tours", "Dedicated local guides"],
};

export default function Services() {
  const { data: serviceList, isLoading } = useListServices();

  const services = (serviceList ?? []).map((s) => ({
    id: s.slug,
    icon: (LucideIcons as unknown as Record<string, LucideIcon>)[s.icon] ?? PlaneTakeoff,
    title: s.title,
    desc: s.description,
    features: FEATURES[s.slug] ?? [],
  }));

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="py-24 text-center container max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl font-bold mb-6"
          >
            Complete <span className="gold-gradient-text">Travel Solutions.</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground">Beyond visa processing, we handle every logistical detail of your journey so you can travel with absolute peace of mind.</p>
        </section>

        <section className="pb-24 container max-w-5xl space-y-16">
          {isLoading && Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card h-64 rounded-3xl animate-pulse bg-white/5" />
          ))}
          {services.map((svc) => (
            <motion.div
              key={svc.id}
              id={svc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-card p-8 md:p-12 rounded-3xl border-white/10 grid md:grid-cols-[1fr_2fr] gap-8 items-center"
            >
              <div className="flex flex-col items-center text-center md:items-start md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <svc.icon className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-2 text-white">{svc.title}</h2>
              </div>

              <div>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                  {svc.desc}
                </p>
                {svc.features.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {svc.features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm font-medium text-white/90">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
