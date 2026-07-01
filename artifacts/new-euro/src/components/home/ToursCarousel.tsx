import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const tours = [
  { id: 1, title: "Umrah Package", dest: "🇸🇦", days: "7 Nights", price: "85,000", old: "95,000", tags: ["Visa", "Hotels", "Transport"], cat: "Umrah" },
  { id: 2, title: "Europe Explorer", dest: "🇪🇺", days: "14 Nights", price: "350,000", old: "400,000", tags: ["Schengen", "Flights", "Guide"], cat: "Europe" },
  { id: 3, title: "Turkey Discovery", dest: "🇹🇷", days: "8 Nights", price: "120,000", old: "145,000", tags: ["Bosphorus", "Cappadocia", "Flights"], cat: "Turkey" },
  { id: 4, title: "UK Experience", dest: "🇬🇧", days: "10 Nights", price: "280,000", old: "310,000", tags: ["London", "Scotland", "Visa"], cat: "Europe" },
  { id: 5, title: "Dubai Weekend", dest: "🇦🇪", days: "4 Nights", price: "65,000", old: "80,000", tags: ["Desert Safari", "Visa", "Hotel"], cat: "Middle East" },
  { id: 6, title: "Bali Escape", dest: "🇮🇩", days: "8 Nights", price: "95,000", old: "115,000", tags: ["Resort", "Tours", "Flights"], cat: "Asia" },
];

const categories = ["All", "Umrah", "Europe", "Asia", "Middle East", "Turkey"];

export default function ToursCarousel() {
  const [activeCat, setActiveCat] = useState("All");
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, dragFree: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const filtered = tours.filter(t => activeCat === "All" || t.cat === activeCat);

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-l mb-6"
            >
              Curated <span className="gold-gradient-text">Travel Experiences</span>
            </motion.h2>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCat === cat ? 'bg-primary text-black' : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button onClick={scrollPrev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={scrollNext} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 pb-8">
            {filtered.map((tour, i) => (
              <motion.div 
                key={tour.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
              >
                <div className="glass-card rounded-2xl overflow-hidden group h-full flex flex-col hover:-translate-y-2 transition-transform duration-300">
                  {/* Image Placeholder */}
                  <div className="relative h-48 w-full bg-gradient-to-br from-primary-800 to-background overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                    <span className="text-6xl filter drop-shadow-xl group-hover:scale-125 transition-transform duration-700">{tour.dest}</span>
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
                        <p className="text-xs text-muted-foreground line-through decoration-red-500/50">PKR {tour.old}</p>
                        <p className="text-lg font-bold">PKR <span className="text-primary">{tour.price}</span></p>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-xs font-semibold hover:bg-primary hover:text-black">
                        <Link href="/tours">Details →</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-white/20">
            <Link href="/tours">View All Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}