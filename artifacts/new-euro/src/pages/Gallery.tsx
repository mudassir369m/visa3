import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useListGallery, type GalleryItem } from "@workspace/api-client-react";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const CATEGORIES = ["All", "office", "team", "events", "embassy"] as const;
type FilterCat = typeof CATEGORIES[number];

const LABEL: Record<string, string> = { All: "All", office: "Office", team: "Team", events: "Events", embassy: "Embassy" };

// Placeholder tiles shown when DB has no images yet
const placeholders = [
  { emoji: "🏢", label: "F-11 Markaz Office", cat: "office" },
  { emoji: "👨‍💼", label: "S. Mustafa — CEO", cat: "team" },
  { emoji: "📋", label: "Document Review", cat: "office" },
  { emoji: "🤝", label: "Client Meeting", cat: "office" },
  { emoji: "✈️", label: "Visa Celebration", cat: "events" },
  { emoji: "🛂", label: "Embassy Visit", cat: "embassy" },
  { emoji: "📸", label: "Team Photo 2024", cat: "team" },
  { emoji: "🏆", label: "Award Ceremony", cat: "events" },
  { emoji: "📰", label: "Media Feature", cat: "events" },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterCat>("All");
  const { data: apiItems = [] } = useListGallery();

  // Use real images from DB if available, fall back to placeholders
  const items: Array<{ imageUrl?: string; emoji?: string; label: string; cat: string }> =
    apiItems.length > 0 ? apiItems.map((g: GalleryItem) => ({ imageUrl: g.imageUrl, label: g.caption, cat: g.category ?? "office" })) : placeholders;

  const filtered = activeFilter === "All" ? items : items.filter(i => i.cat === activeFilter);

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
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-primary/20 border-primary/50 text-primary"
                    : "border-white/10 hover:bg-primary/15 hover:border-primary/30 hover:text-primary"
                }`}
              >
                {LABEL[cat]}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Masonry grid */}
        <section className="pb-24 container">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="break-inside-avoid rounded-2xl overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-300 group cursor-pointer"
                style={{ height: item.imageUrl ? "auto" : (i % 3 === 0 ? "280px" : i % 3 === 1 ? "200px" : "240px") }}
              >
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.label} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/20 via-primary/10 to-background group-hover:from-primary/30 transition-all duration-500">
                    <span className="text-5xl">{(item as { emoji?: string }).emoji}</span>
                    <p className="text-xs text-muted-foreground font-medium tracking-wide">{item.label}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">{LABEL[item.cat] ?? item.cat}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {apiItems.length === 0 && (
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
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
}
