import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useGetTour } from "@workspace/api-client-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

const DEST_EMOJI: Record<string, string> = {
  Umrah: "🕌", Europe: "🇪🇺", Turkey: "🇹🇷", "Middle East": "🇦🇪", Asia: "🌏", Americas: "🌎",
};

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: tour, isLoading, isError } = useGetTour(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !tour) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center py-24 container">
          <span className="text-6xl mb-6">✈️</span>
          <h1 className="text-3xl font-display font-bold mb-4">Tour Not Found</h1>
          <p className="text-muted-foreground mb-8">This tour package may have been removed or doesn't exist.</p>
          <Button asChild variant="outline" className="border-white/20 hover:bg-white/5">
            <Link href="/tours"><ArrowLeft className="w-4 h-4 mr-2" /> All Tours</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const emoji = DEST_EMOJI[tour.category] ?? "✈️";
  const inclusions: string[] = Array.isArray(tour.inclusions) ? tour.inclusions.map(String) : [];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">

        {/* Back */}
        <div className="container pt-8">
          <Link href="/tours" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Tours
          </Link>
        </div>

        {/* Hero */}
        <section className="py-12 md:py-16 relative overflow-hidden">
          <div className="container grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/15 text-primary mb-4">{tour.category}</span>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{tour.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {tour.nights} Nights / {tour.days} Days</span>
                <span>📍 {tour.category}</span>
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div>
                  {tour.originalPrice && (
                    <span className="text-muted-foreground line-through text-sm">PKR {Number(tour.originalPrice).toLocaleString()}</span>
                  )}
                  <div className="text-3xl font-display font-bold gold-gradient-text">
                    PKR {Number(tour.price).toLocaleString()}
                  </div>
                  <span className="text-xs text-muted-foreground">per person</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="gold-gradient-bg text-black font-semibold px-8 rounded-sm hover:shadow-glow-gold transition-all">
                  <a href={`https://wa.me/923145352222?text=Hi%20New%20Euro%20Consultants%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20tour%20package`} target="_blank" rel="noopener noreferrer">
                    Book on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white/20 hover:bg-white/5 px-8 rounded-sm">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>
            </motion.div>

            {/* Hero image placeholder */}
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <div className="rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-primary-900 to-background flex items-center justify-center border border-white/5">
                <span className="text-8xl">{emoji}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Inclusions */}
        {inclusions.length > 0 && (
          <section className="py-16 bg-card border-y border-white/5">
            <div className="container">
              <h2 className="text-2xl font-display font-bold mb-8">What's <span className="gold-gradient-text">Included</span></h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {inclusions.map((item, i) => (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 glass-card rounded-xl p-4 border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Description */}
        {tour.description && (
          <section className="py-16 container max-w-3xl">
            <h2 className="text-2xl font-display font-bold mb-6">About This <span className="gold-gradient-text">Package</span></h2>
            <div className="glass-card rounded-2xl p-8 border-white/5">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{tour.description}</p>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-card border-t border-white/5">
          <div className="container text-center max-w-2xl">
            <h2 className="text-2xl font-display font-bold mb-4">Ready to <span className="gold-gradient-text">Book?</span></h2>
            <p className="text-muted-foreground mb-8">Contact us on WhatsApp or fill in our inquiry form to secure your spot for this package.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="gold-gradient-bg text-black font-semibold px-8 rounded-sm hover:shadow-glow-gold transition-all">
                <a href={`https://wa.me/923145352222?text=I%20want%20to%20book%3A%20${encodeURIComponent(tour.title)}`} target="_blank" rel="noopener noreferrer">
                  Book on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white/20 hover:bg-white/5 px-8 rounded-sm">
                <Link href="/tours">Browse All Tours</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
