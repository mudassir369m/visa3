import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const categories = ["All", "Office", "Team", "Events", "Embassy"] as const;

// Placeholder gallery items with gradient backgrounds until real images are uploaded via admin
const placeholders = [
  { emoji: "🏢", label: "F-11 Markaz Office", cat: "Office", color: "from-primary-900 to-primary-800" },
  { emoji: "👨‍💼", label: "S. Mustafa — CEO", cat: "Team", color: "from-primary-800 to-background" },
  { emoji: "📋", label: "Document Review Session", cat: "Office", color: "from-primary-900 to-slate-900" },
  { emoji: "🤝", label: "Client Meeting", cat: "Office", color: "from-slate-900 to-primary-900" },
  { emoji: "✈️", label: "Visa Celebration", cat: "Events", color: "from-primary-800 to-primary-900" },
  { emoji: "🛂", label: "Embassy Visit", cat: "Embassy", color: "from-primary-900 to-background" },
  { emoji: "📸", label: "Team Photo 2024", cat: "Team", color: "from-background to-primary-800" },
  { emoji: "🏆", label: "Award Ceremony", cat: "Events", color: "from-primary-800 to-slate-900" },
  { emoji: "📰", label: "Media Feature", cat: "Events", color: "from-slate-900 to-primary-800" },
];

export default function Gallery() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="container relative z-10 text-center max-w-3xl">
            <motion.p {...fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Gallery</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.05 }} className="text-display-xl font-bold mb-6">
              Behind the <span className="gold-gradient-text">Scenes.</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground">
              Our office, team, embassy visits, and the moments that make 18 years of excellence.
            </motion.p>
          </div>
        </section>

        {/* Filter pills */}
        <section className="container pb-8">
          <motion.div {...fadeUp} className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button key={cat} className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 hover:bg-primary/15 hover:border-primary/30 hover:text-primary transition-all duration-200">
                {cat}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Masonry grid */}
        <section className="pb-24 container">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {placeholders.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className={`break-inside-avoid rounded-2xl overflow-hidden bg-gradient-to-br ${item.color} border border-white/5 hover:border-primary/20 transition-all duration-300 group cursor-pointer`}
                style={{ height: i % 3 === 0 ? "280px" : i % 3 === 1 ? "200px" : "240px" }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 group-hover:scale-105 transition-transform duration-500">
                  <span className="text-5xl">{item.emoji}</span>
                  <p className="text-xs text-muted-foreground font-medium tracking-wide">{item.label}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">{item.cat}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-16 glass-card rounded-2xl p-8 border-white/5 max-w-xl mx-auto">
            <span className="text-4xl block mb-4">📸</span>
            <h3 className="font-display font-bold text-lg mb-2">More Photos Coming Soon</h3>
            <p className="text-muted-foreground text-sm">
              Our full photo gallery is managed through the admin panel. Visit our Instagram{" "}
              <a href="https://instagram.com/neweuroconsultants" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                @neweuroconsultants
              </a>{" "}
              for the latest photos.
            </p>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
