import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListTours } from "@workspace/api-client-react";

const DEST_EMOJI: Record<string, string> = {
  Umrah: "🇸🇦",
  Europe: "🇪🇺",
  Turkey: "🇹🇷",
  "Middle East": "🇦🇪",
  Asia: "🇮🇩",
  Americas: "🇨🇦",
};

export default function Tours() {
  const { data: tourList, isLoading } = useListTours();

  const allTours = (tourList ?? []).map((t) => ({
    id: t.id,
    title: t.title,
    dest: DEST_EMOJI[t.category] ?? "✈️",
    days: `${t.nights} Nights`,
    price: Number(t.price).toLocaleString(),
    old: t.originalPrice ? Number(t.originalPrice).toLocaleString() : null,
    tags: t.inclusions ?? [],
    cat: t.category,
  }));

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 text-center container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl font-bold mb-6"
          >
            Explore The <span className="gold-gradient-text">World.</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">Discover our carefully curated holiday packages. From spiritual journeys to European adventures, we handle the visas and itineraries.</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
            {isLoading && Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl h-96 animate-pulse bg-white/5" />
            ))}
            {allTours.map((tour, i) => (
              <motion.div 
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden group flex flex-col hover:-translate-y-2 transition-transform duration-300 h-full border-white/5 hover:border-primary/30"
              >
                <div className="relative h-48 w-full bg-gradient-to-br from-primary-900 to-background flex items-center justify-center overflow-hidden">
                  <span className="text-6xl group-hover:scale-125 transition-transform duration-700 drop-shadow-2xl">{tour.dest}</span>
                  <div className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-white/10">
                    <Clock className="w-3 h-3 text-primary" /> {tour.days}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex gap-2 mb-3">
                    {tour.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider text-muted-foreground bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{tour.title}</h3>
                  
                  <div className="mt-auto flex items-end justify-between border-t border-white/5 pt-4">
                    <div>
                      {tour.old && (
                        <p className="text-xs text-muted-foreground line-through decoration-red-500/50">PKR {tour.old}</p>
                      )}
                      <p className="text-lg font-bold">PKR <span className="text-primary">{tour.price}</span></p>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="text-xs font-semibold hover:bg-primary hover:text-black">
                      <Link href={`/tours/${tour.id}`}>Details →</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}