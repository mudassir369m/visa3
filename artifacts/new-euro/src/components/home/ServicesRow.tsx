import { motion } from "framer-motion";
import { Link } from "wouter";
import { PlaneTakeoff, Hotel, ShieldCheck, Map } from "lucide-react";

const services = [
  { icon: PlaneTakeoff, title: "Air Ticketing", desc: "Best fares to 200+ destinations globally.", link: "/services#air" },
  { icon: Hotel, title: "Hotel Booking", desc: "Verified accommodations worldwide.", link: "/services#hotel" },
  { icon: ShieldCheck, title: "Travel Insurance", desc: "Schengen-approved medical coverage.", link: "/services#insurance" },
  { icon: Map, title: "Tour Packages", desc: "Curated Europe, Umrah, & Asia tours.", link: "/tours" }
];

export default function ServicesRow() {
  return (
    <section className="py-20 relative bg-background border-t border-white/5" id="services">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="container">
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            Beyond Visas — <span className="gold-gradient-text">Complete Travel</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <Link key={i} href={svc.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group glass-card p-8 rounded-2xl h-full cursor-pointer hover:-translate-y-2 transition-all duration-300 hover:shadow-glow-blue relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
                
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all border border-white/10 relative z-10">
                  <svc.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-display font-bold mb-3 text-white group-hover:text-primary transition-colors relative z-10">
                  {svc.title}
                </h3>
                
                <p className="text-sm text-muted-foreground relative z-10">
                  {svc.desc}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}