import { Suspense, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RiWhatsappFill } from "react-icons/ri";
import HeroEarth from "@/components/three/HeroEarth";
import MeshGradient from "@/components/three/MeshGradient";
import ParticleField from "@/components/three/ParticleField";
import GoldSeal from "@/components/three/GoldSeal";
import { useMagneticHover } from "@/hooks/useMagneticHover";

const headlineWords = ["A", "Step", "Before"];

export default function Hero() {
  const { ref: ctaRef, handlers: ctaHandlers } = useMagneticHover<HTMLDivElement>();
  const { ref: waRef, handlers: waHandlers } = useMagneticHover<HTMLAnchorElement>();

  return (
    <section id="hero-section" className="relative w-full min-h-[100dvh] flex items-center bg-background overflow-hidden border-b border-white/5">

      {/* ── Background layers ── */}
      {/* Layer 1: dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050E1F]/95 via-[#0A1A33]/55 to-[#050E1F]/98 z-0" />

      {/* Layer 2: WebGL mesh gradient (existing) */}
      <MeshGradient />

      {/* Layer 3: Golden particle field */}
      <ParticleField className="z-[1]" />

      {/* Layer 4: radial accent */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 80% 20%, rgba(30,70,133,0.12) 0%, transparent 60%)' }} />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '256px 256px' }}
      />

      {/* ── Main layout ── */}
      <div className="container relative z-10 grid lg:grid-cols-[58fr_42fr] gap-8 items-center pt-20 lg:pt-0">

        {/* LEFT: Content */}
        <div className="space-y-8 flex flex-col justify-center">

          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <GoldSeal years={18} size={72} className="flex-shrink-0" />
            <p
              className="font-bold tracking-widest text-xs uppercase"
              style={{ color: '#D4AF37' }}
            >
              ✦ 18 YEARS · LICENSED · ISLAMABAD ✦
            </p>
          </motion.div>

          {/* Headline — word-by-word mask reveal */}
          <div>
            <h1 className="text-display-xl flex flex-wrap gap-x-[0.25em]">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' }}
                  animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.span
              initial={{ opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="gold-gradient-text text-display-xl block mt-1"
            >
              Embassy.
            </motion.span>
          </div>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-body-l text-muted-foreground max-w-xl leading-relaxed"
          >
            Premium visa consultancy for UK, USA, Canada, Australia, Turkey &amp; Schengen.
            Real eligibility checks. No hidden fees. Embassy-grade documentation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 items-center"
          >
            {/* Primary CTA — magnetic */}
            <div ref={ctaRef} {...ctaHandlers} className="inline-block">
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden text-black font-bold border-none rounded-[10px] px-8 h-14 text-base transition-all duration-300 group"
                style={{
                  background: 'linear-gradient(135deg, #F0D78A 0%, #D4AF37 50%, #B8941F 100%)',
                  boxShadow: '0 0 0 1px rgba(212,175,55,0.4), 0 8px 32px rgba(212,175,55,0.3)',
                }}
              >
                <Link href="/eligibility-check">
                  {/* Shine sweep */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  Free Eligibility Check
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  >→</motion.span>
                </Link>
              </Button>
            </div>

            {/* Secondary CTA — magnetic */}
            <motion.a
              ref={waRef}
              {...waHandlers}
              href="https://wa.me/923145352222?text=Hi%20New%20Euro%20Consultants%2C%20I%20need%20visa%20assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 h-14 rounded-[10px] text-base font-semibold text-white border transition-all duration-300 backdrop-blur-md"
              style={{ borderColor: 'rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.04)' }}
              whileHover={{ borderColor: 'rgba(37,211,102,0.5)', background: 'rgba(37,211,102,0.06)' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
              </span>
              <RiWhatsappFill className="text-[#25D366] text-xl" />
              Talk on WhatsApp
            </motion.a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground pt-2 uppercase tracking-wider font-semibold"
          >
            {[
              '🛡️ Licensed',
              '⭐ 4.9/5 (500+ Reviews)',
              '✅ 99% Success Rate',
              '🌍 50+ Countries',
              '🗓️ Since 2007',
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: 3D Earth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-[420px] lg:h-[680px] w-full relative"
        >
          {/* Glow behind globe */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(91,141,239,0.12) 0%, transparent 65%)' }} />

          <Suspense fallback={
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-xs uppercase tracking-widest font-semibold text-primary/50">Loading Globe…</p>
            </div>
          }>
            <HeroEarth />
          </Suspense>
        </motion.div>
      </div>

      {/* Bottom indicators */}
      <div className="absolute bottom-8 left-0 w-full px-8 lg:px-16 flex justify-between items-end z-10 pointer-events-none hidden md:flex">
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border-2 border-white/25 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/50">Scroll to explore</span>
        </motion.div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex gap-8 text-xs font-display font-bold uppercase tracking-[0.15em] text-white grayscale"
        >
          <span>PIA</span>
          <span>Emirates</span>
          <span>Qatar</span>
          <span>Turkish Airlines</span>
        </motion.div>
      </div>
    </section>
  );
}
