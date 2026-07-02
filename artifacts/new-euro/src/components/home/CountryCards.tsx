import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "wouter";
import { useListVisas } from "@workspace/api-client-react";

const COUNTRY_GRADIENTS: Record<string, string> = {
  uk:        'linear-gradient(135deg, #012169 0%, #C8102E 70%)',
  usa:       'linear-gradient(135deg, #3C3B6E 0%, #B22234 70%)',
  canada:    'linear-gradient(135deg, #CC0000 0%, #FF6666 70%)',
  australia: 'linear-gradient(135deg, #00008B 0%, #C8102E 70%)',
  turkey:    'linear-gradient(135deg, #E30A17 0%, #FF4444 70%)',
  schengen:  'linear-gradient(135deg, #003399 0%, #FFCC00 70%)',
};

const COUNTRY_FLAGS: Record<string, string> = {
  uk: '🇬🇧', usa: '🇺🇸', canada: '🇨🇦',
  australia: '🇦🇺', turkey: '🇹🇷', schengen: '🇪🇺',
};

// Visa type icons for back face
const VISA_ICONS: Record<string, string[]> = {
  uk:        ['🎓 Student', '💼 Business', '👪 Family', '✈️ Tourist'],
  usa:       ['💼 B1/B2', '🎓 F-1', '👪 Family', '🏥 Medical'],
  canada:    ['✈️ Tourist', '💼 Business', '👪 Family', '🎓 Study'],
  australia: ['✈️ Tourist', '💼 Business', '🎓 Student', '👪 Family'],
  turkey:    ['✈️ e-Visa', '💼 Business', '🏖️ Tourist'],
  schengen:  ['✈️ Tourist', '💼 Business', '🎓 Student', '🏥 Medical'],
};

interface CountryCardProps {
  name: string;
  flag: string;
  slug: string;
  types: string;
  time: string | number;
  success: string;
  index: number;
}

function CountryCard({ name, flag, slug, types, time, success, index }: CountryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // 3-D tilt (active on front face only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const gradient = COUNTRY_GRADIENTS[slug] ?? 'linear-gradient(135deg, #1E4685, #0F2647)';
  const emoji    = COUNTRY_FLAGS[slug] ?? flag;
  const backTypes = VISA_ICONS[slug] ?? types.split(', ').map(t => `✈️ ${t}`);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => { setIsFlipped(false); handleMouseLeave(); }}
      className="h-[360px] cursor-pointer"
      style={{ perspective: 1200 }}
    >
      {/* Tilt wrapper — only applies when not flipped */}
      <motion.div
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >

        {/* ── FRONT FACE ── */}
        <div
          className="absolute inset-0 rounded-[22px] overflow-hidden border border-white/8"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Country-colour gradient BG */}
          <div className="absolute inset-0 opacity-25" style={{ background: gradient }} />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A33]/85 via-[#0A1A33]/65 to-[#050E1F]/95" />
          {/* Animated top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 opacity-70"
            style={{ background: gradient, animation: 'slideBar 3s ease-in-out infinite alternate' }}
          />

          <div className="absolute inset-0 p-7 flex flex-col justify-between">
            {/* Top: name + flag */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-4xl font-display font-bold text-white mb-2">{name}</h3>
                <div className="w-8 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg,#D4AF37,#E5C25D)' }} />
              </div>
              <span className="text-6xl" style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}>
                {emoji}
              </span>
            </div>

            {/* Stats grid */}
            <div className="space-y-3">
              <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Visa Types</p>
                <p className="text-sm font-medium text-white/90 leading-snug">{types}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Processing</p>
                  <p className="text-white font-semibold text-sm">{time}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-white/5">
                  <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Success</p>
                  <p className="font-bold text-sm" style={{ color: '#D4AF37' }}>{success}</p>
                </div>
              </div>
            </div>

            {/* Hover hint */}
            <p className="text-[10px] text-white/25 uppercase tracking-widest text-center">Hover to explore →</p>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <Link href={`/visa/${slug}`}>
          <div
            className="absolute inset-0 rounded-[22px] overflow-hidden border flex flex-col"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderColor: 'rgba(212,175,55,0.3)',
              background: 'linear-gradient(160deg, #0A1A33 0%, #050E1F 100%)',
              boxShadow: '0 0 0 1px rgba(212,175,55,0.2), 0 24px 60px rgba(212,175,55,0.12)',
            }}
          >
            {/* Gold top band */}
            <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg,#D4AF37,#E5C25D,#D4AF37)' }} />

            <div className="flex-1 p-7 flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl">{emoji}</span>
                <div>
                  <h3 className="text-2xl font-display font-bold" style={{ color: '#D4AF37' }}>{name} Visa</h3>
                  <p className="text-xs text-white/50 uppercase tracking-widest mt-0.5">Available Types</p>
                </div>
              </div>

              {/* Visa types list */}
              <ul className="space-y-2.5 flex-1">
                {backTypes.map((type, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80 font-medium">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                      style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}>✓</span>
                    {type}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div
                className="mt-5 flex items-center justify-between p-4 rounded-xl border"
                style={{ borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.06)' }}
              >
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-0.5">Success Rate</p>
                  <p className="font-bold text-lg" style={{ color: '#D4AF37' }}>{success}</p>
                </div>
                <div className="flex items-center gap-2 font-semibold text-sm" style={{ color: '#D4AF37' }}>
                  View Details
                  <span className="w-7 h-7 rounded-full border flex items-center justify-center text-xs"
                    style={{ borderColor: 'rgba(212,175,55,0.4)' }}>→</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

      </motion.div>
    </motion.div>
  );
}

export default function CountryCards() {
  const { data: visas, isLoading } = useListVisas();

  const countries = (visas ?? [])
    .filter((v) => v.published)
    .map((v) => ({
      name: v.country,
      flag: v.flag,
      slug: v.slug,
      types: v.visaTypes.join(', '),
      time: v.processingDays,
      success: v.successRate,
    }));

  return (
    <section className="py-28 bg-background relative overflow-hidden" id="visas">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bold tracking-widest text-xs uppercase mb-4"
            style={{ color: '#D4AF37' }}
          >✦ SPECIALIZED PATHWAYS ✦</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
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
            Specialized visa pathways for 6 major regions. 18 years of embassy-grade expertise.
            <br className="hidden md:block" />
            <span className="text-white/60 text-sm">Hover each card to explore visa types.</span>
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[360px] rounded-[22px] animate-pulse bg-white/5 border border-white/5" />
          ))}
          {countries.map((country, i) => (
            <CountryCard key={country.slug} {...country} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideBar {
          0%   { opacity: 0.5; transform: scaleX(0.6) translateX(-20%); }
          100% { opacity: 0.9; transform: scaleX(1) translateX(0); }
        }
      `}</style>
    </section>
  );
}
