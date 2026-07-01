import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function FinalCta() {
  return (
    <section className="relative py-32 overflow-hidden border-t border-white/5">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-primary-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-60"></div>
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full opacity-30 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-display-xl mb-6 leading-tight"
          >
            Ready to <span className="gold-gradient-text block mt-2">Take Off?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto"
          >
            Get your free eligibility check today. No commitment. Just clear answers from Islamabad's premier visa experts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild size="lg" className="gold-gradient-bg text-black font-bold h-16 px-10 text-xl rounded-full shadow-glow-gold hover:-translate-y-1 transition-transform">
              <Link href="/eligibility-check">Start My Application →</Link>
            </Button>
          </motion.div>

          {/* Newsletter Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 pt-12 border-t border-white/10"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">Stay Updated</p>
            <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email for embassy updates" 
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition-colors"
                required
              />
              <Button type="submit" className="bg-white/10 text-white hover:bg-primary hover:text-black transition-colors rounded-lg px-6 border border-white/10">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">We respect your inbox. Monthly updates only.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}