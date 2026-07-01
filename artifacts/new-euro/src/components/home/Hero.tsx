import { Suspense } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RiWhatsappFill } from "react-icons/ri";
import HeroEarth from "@/components/three/HeroEarth";
import MeshGradient from "@/components/three/MeshGradient";

export default function Hero() {
  const headlineWords = "A Step Before".split(" ");

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center bg-background overflow-hidden border-b border-white/5">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050E1F]/95 via-[#0A1A33]/60 to-[#050E1F]/98 z-0"></div>
      <MeshGradient />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent blur-3xl z-0 pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

      <div className="container relative z-10 grid lg:grid-cols-[60%_40%] gap-8 items-center pt-20 lg:pt-0">
        
        {/* Left Content */}
        <div className="space-y-8 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-primary font-bold tracking-widest text-xs uppercase mb-4">
              ✦ 18 YEARS · LICENSED · ISLAMABAD ✦
            </p>
            <h1 className="text-display-xl flex flex-wrap gap-[0.3em]">
              {headlineWords.map((word, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + headlineWords.length * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="gold-gradient-text w-full block mt-2"
              >
                Embassy.
              </motion.span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-body-l text-muted-foreground max-w-xl"
          >
            Premium visa consultancy for UK, USA, Canada, Australia, Turkey & Schengen. Real eligibility checks. No hidden fees. Embassy-grade documentation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Button asChild size="lg" className="gold-gradient-bg text-black font-semibold border-none rounded-sm px-8 h-14 text-base shadow-glow-gold hover:-translate-y-1 hover:shadow-float transition-all duration-300">
              <Link href="/eligibility-check">Free Eligibility Check →</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-sm px-8 h-14 text-base backdrop-blur-md transition-all duration-300">
              <a href="https://wa.me/923145352222" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <RiWhatsappFill className="text-[#25D366] text-xl" /> Talk on WhatsApp
              </a>
            </Button>
          </motion.div>

          {/* Trust Strip */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground pt-4 uppercase tracking-wider font-medium"
          >
            <span>🛡️ Licensed</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>⭐ 4.9/5 (500+)</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>✅ 99% Success</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>🌍 50+ Countries</span>
          </motion.div>
        </div>
        
        {/* Right 3D Earth */}
        <div className="h-[400px] lg:h-[700px] w-full relative -mr-8 lg:mr-0 opacity-0 animate-[fadeIn_1s_ease-in-out_0.5s_forwards] fill-mode-forwards">
          <Suspense fallback={
            <div className="w-full h-full flex flex-col items-center justify-center text-primary/50 gap-4">
              <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="text-sm uppercase tracking-widest font-semibold">Loading Globe...</p>
            </div>
          }>
            <HeroEarth />
          </Suspense>
        </div>

      </div>

      {/* Bottom Indicators */}
      <div className="absolute bottom-8 left-0 w-full container flex justify-between items-end z-10 pointer-events-none hidden md:flex">
        <div className="flex flex-col items-center gap-2 opacity-60">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
            />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
        </div>

        <div className="flex gap-6 opacity-40 grayscale text-xs font-display font-bold uppercase tracking-widest">
          <span>PIA</span>
          <span>Emirates</span>
          <span>Qatar</span>
          <span>Turkish Airlines</span>
        </div>
      </div>
    </section>
  );
}