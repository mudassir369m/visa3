import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function EligibilityTeaser() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gold-gradient-bg opacity-10"></div>
      
      <div className="container relative z-10">
        <div className="glass-card rounded-3xl p-8 md:p-16 border-primary/30 shadow-glow-gold overflow-hidden relative">
          {/* Decorative background glow */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
              >
                Are You Eligible? <br/>
                <span className="gold-gradient-text">Find Out in 60 Seconds</span>
              </motion.h2>
              <p className="text-lg text-white/80 max-w-md">
                Stop guessing. Our smart assessment tool compares your profile against current embassy requirements to give you a real probability score.
              </p>
              
              <ul className="space-y-3 text-sm font-medium text-white/90">
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> Free instant result</li>
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> Identifies weak points</li>
                <li className="flex items-center gap-3"><span className="text-primary text-lg">✓</span> Personalized consultation offer</li>
              </ul>

              <Button asChild size="lg" className="gold-gradient-bg text-black font-bold h-14 px-8 text-lg rounded-sm shadow-float hover:-translate-y-1 transition-transform">
                <Link href="/eligibility-check">Start Full Assessment →</Link>
              </Button>
            </div>

            {/* 3D Checkmark Vis */}
            <div className="hidden lg:flex items-center justify-center relative h-[400px]">
              <motion.div
                animate={{ rotateY: [0, 10, -10, 0], rotateX: [0, 5, -5, 0], y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative z-10 perspective-[1000px] transform-style-3d"
              >
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/40 to-transparent flex items-center justify-center border-4 border-primary/50 shadow-glow-gold backdrop-blur-md">
                  <svg viewBox="0 0 24 24" fill="none" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-32 h-32">
                    <defs>
                      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#F0D78A" />
                      </linearGradient>
                    </defs>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </motion.div>
              
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 + i, delay: i * 0.5 }}
                  className="absolute w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#D4AF37]"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${80 - i * 10}%`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}