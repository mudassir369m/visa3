import { motion } from "framer-motion";
import { Link } from "wouter";

const countries = [
  { name: "UK", flag: "🇬🇧", slug: "uk", types: "Tourist, Business, Family Visit", time: "15 days", success: "98%" },
  { name: "USA", flag: "🇺🇸", slug: "usa", types: "Tourist B1/B2, Business, Family", time: "45 days", success: "95%" },
  { name: "Canada", flag: "🇨🇦", slug: "canada", types: "Tourist, Super Visa, ETA", time: "30 days", success: "96%" },
  { name: "Australia", flag: "🇦🇺", slug: "australia", types: "Tourist, Business, Working Holiday", time: "25 days", success: "97%" },
  { name: "Turkey", flag: "🇹🇷", slug: "turkey", types: "e-Visa, Tourist", time: "3 days", success: "99%" },
  { name: "Schengen", flag: "🇪🇺", slug: "schengen", types: "Tourist, Business, Family", time: "15 days", success: "97%" }
];

export default function CountryCards() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="visas">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-display-l mb-6"
          >
            Your <span className="gold-gradient-text">Destination</span>, Our Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-l text-muted-foreground"
          >
            Specialized visa pathways for 6 major regions. We handle the complexity so you can focus on the journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, i) => (
            <Link key={country.slug} href={`/visa/${country.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group glass-card rounded-2xl p-8 flex flex-col h-full cursor-pointer relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-float hover:border-primary/30"
              >
                {/* Hover gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="flex justify-between items-start mb-auto relative z-10">
                  <h3 className="text-4xl font-display font-bold text-white group-hover:gold-gradient-text transition-all duration-300">
                    {country.name}
                  </h3>
                  <span className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">{country.flag}</span>
                </div>

                <div className="mt-12 space-y-4 relative z-10">
                  <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/5">
                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold text-[10px]">Visa Types</p>
                    <p className="text-sm font-medium text-white/90">{country.types}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                      <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold text-[10px]">Avg Processing</p>
                      <p className="text-white font-semibold">{country.time}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5">
                      <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold text-[10px]">Success Rate</p>
                      <p className="text-primary font-bold">{country.success}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center text-primary font-semibold text-sm opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 relative z-10">
                  View Details <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}