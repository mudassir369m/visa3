import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PlaneTakeoff, Hotel, ShieldCheck, Map, CheckCircle2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "air",
      icon: PlaneTakeoff,
      title: "Air Ticketing",
      desc: "We provide competitive airfares for all major airlines operating from Pakistan. Our IATA certified booking agents ensure you get the best routes with optimal layovers.",
      features: ["Global airline network", "Corporate discounts", "Date change assistance", "Group booking rates"]
    },
    {
      id: "hotel",
      icon: Hotel,
      title: "Hotel Booking",
      desc: "Whether you need a confirmed booking for visa purposes or a luxury stay for your vacation, we offer global hotel reservations through verified international partners.",
      features: ["Visa-compliant bookings", "Pay-later options", "Budget to Luxury range", "Instant confirmation"]
    },
    {
      id: "insurance",
      icon: ShieldCheck,
      title: "Travel Insurance",
      desc: "Mandatory for Schengen and highly recommended for other regions. We provide recognized travel health insurance that meets all embassy requirements.",
      features: ["Schengen approved (€30k coverage)", "Covid-19 coverage included", "Instant policy generation", "Baggage loss protection"]
    },
    {
      id: "tours",
      icon: Map,
      title: "Tour Packages",
      desc: "Complete end-to-end holiday packages including visas, flights, hotels, and guided tours. Specialized in Europe, Turkey, Asia, and Umrah packages.",
      features: ["Customized itineraries", "Honeymoon packages", "Family group tours", "Dedicated local guides"]
    }
  ];

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
          {services.map((svc, i) => (
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
                <div className="grid sm:grid-cols-2 gap-4">
                  {svc.features.map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm font-medium text-white/90">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}