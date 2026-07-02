import { useRef, useEffect, useState, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FloatingPassport from "@/components/three/FloatingPassport";

const steps = [
  {
    num: "01",
    title: "Free Eligibility Check",
    desc: "Submit basic info, we assess your profile instantly against current embassy rules. No guesswork — real policy-grade scoring.",
    stat: "Takes 60 seconds",
    icon: "🔍",
  },
  {
    num: "02",
    title: "Document Preparation",
    desc: "We guide you on exactly which documents to gather. Embassy-grade formatting. Zero errors tolerated.",
    stat: "Zero errors",
    icon: "📋",
  },
  {
    num: "03",
    title: "Application Filing",
    desc: "We book your appointment, fill the complex forms, and submit the application correctly the first time.",
    stat: "Priority booking",
    icon: "📨",
  },
  {
    num: "04",
    title: "Visa Stamped ✈️",
    desc: "Track your status online. Collect your passport. Celebrate and fly with confidence.",
    stat: "99% Success Rate",
    icon: "🛂",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const passportContainerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [passportProgress, setPassportProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });

  // Map scroll progress to active step + passport progress
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const step = Math.min(3, Math.floor(v * 4));
      setActiveStep(step);
      setPassportProgress(Math.min(1, v * 1.2)); // passport slightly ahead
    });
    return unsub;
  }, [scrollYProgress]);

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-card relative overflow-hidden"
      id="how-it-works"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest text-xs uppercase mb-4"
          >
            ✦ THE PROCESS ✦
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-display-l"
          >
            Visa Approved in{" "}
            <span className="gold-gradient-text">4 Simple Steps</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Steps list */}
          <div className="relative pl-10 md:pl-14">
            {/* Animated vertical line */}
            <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-white/8 rounded-full overflow-hidden">
              <motion.div
                className="w-full rounded-full"
                style={{ height: lineHeight, background: 'linear-gradient(180deg, #D4AF37, #E5C25D)' }}
              />
            </div>

            <div className="space-y-14">
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                const isPast = activeStep > i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative transition-all duration-500 ${
                      isActive ? "opacity-100" : isPast ? "opacity-60" : "opacity-35"
                    }`}
                  >
                    {/* Step node on timeline */}
                    <div
                      className="absolute -left-[52px] md:-left-[60px] top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                      style={{
                        borderColor: isPast || isActive ? '#D4AF37' : 'rgba(255,255,255,0.15)',
                        background: isPast || isActive ? 'rgba(212,175,55,0.15)' : 'transparent',
                      }}
                    >
                      {isPast ? (
                        <span className="text-xs" style={{ color: '#D4AF37' }}>✓</span>
                      ) : (
                        <div
                          className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                          style={{ background: isActive ? '#D4AF37' : 'rgba(255,255,255,0.2)' }}
                        />
                      )}
                    </div>

                    {/* Step content */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{step.icon}</span>
                        <span
                          className="text-xs font-mono font-bold tracking-widest uppercase"
                          style={{ color: isActive ? '#D4AF37' : 'rgba(212,175,55,0.4)' }}
                        >
                          {step.num}
                        </span>
                      </div>
                      <h3
                        className="text-2xl md:text-3xl font-display font-bold mb-3 transition-colors duration-300"
                        style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)' }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 max-w-md text-base leading-relaxed">
                        {step.desc}
                      </p>
                      <motion.span
                        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border"
                        style={{
                          borderColor: isActive ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.1)',
                          color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                          background: isActive ? 'rgba(212,175,55,0.08)' : 'transparent',
                        }}
                      >
                        <span style={{ color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.3)' }}>⚡</span>
                        {step.stat}
                      </motion.span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: 3D Floating Passport */}
          <div
            ref={passportContainerRef}
            className="hidden lg:block sticky top-28 h-[520px]"
          >
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              {/* Glow backdrop */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
              />

              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
              }>
                <FloatingPassport progress={passportProgress} />
              </Suspense>

              {/* Step label overlay */}
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-card px-6 py-3 rounded-2xl border border-white/10 text-center"
                key={activeStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#D4AF37' }}>
                  Step {steps[activeStep].num}
                </p>
                <p className="text-sm text-white/80 font-medium">{steps[activeStep].title}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
