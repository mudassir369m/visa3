import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Free Eligibility Check", desc: "Submit basic info, we assess your profile instantly against current embassy rules.", stat: "Takes 60 seconds" },
  { num: "02", title: "Document Preparation", desc: "We guide you on exactly which documents to gather. No guesswork. Embassy-grade formatting.", stat: "Zero errors" },
  { num: "03", title: "Application Filing", desc: "We book your appointment, fill the complex forms, and submit the application correctly.", stat: "Priority booking" },
  { num: "04", title: "Visa Stamped", desc: "Track your status online. Collect your passport. Celebrate and fly with confidence.", stat: "99% Success" }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-display-l"
          >
            Visa Approved in <span className="gold-gradient-text">4 Simple Steps</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Steps List */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-0 top-4 bottom-8 w-[2px] bg-white/10 rounded-full">
              <motion.div 
                className="w-full gold-gradient-bg rounded-full transition-all duration-500 ease-out"
                style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onViewportEnter={() => setActiveStep(i)}
                  className={`relative cursor-default transition-all duration-500 ${activeStep === i ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}
                >
                  <div className="absolute -left-12 md:-left-16 top-0 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${activeStep >= i ? 'bg-primary' : 'bg-transparent'}`} />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 flex items-center gap-4">
                    <span className="text-primary/50 text-xl font-mono">{step.num}</span>
                    <span className={activeStep === i ? 'text-white' : 'text-white/70'}>{step.title}</span>
                  </h3>
                  <p className="text-muted-foreground mb-3 max-w-md text-base leading-relaxed">
                    {step.desc}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20">
                    {step.stat}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Visual */}
          <div className="hidden lg:flex justify-center items-center h-[500px] relative">
            <div className="relative w-full max-w-md aspect-[3/4] perspective-[1200px]">
              {steps.map((_, i) => {
                const isActive = activeStep === i;
                const isPast = activeStep > i;
                return (
                  <motion.div
                    key={i}
                    animate={{
                      y: isActive ? 0 : isPast ? -40 - (activeStep - i) * 20 : 40 + (i - activeStep) * 20,
                      scale: isActive ? 1 : 0.9 - Math.abs(activeStep - i) * 0.05,
                      opacity: isActive ? 1 : 0.3,
                      rotateX: isActive ? 0 : 20,
                      zIndex: steps.length - Math.abs(activeStep - i)
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 glass-card rounded-2xl border-white/20 p-8 shadow-2xl flex flex-col justify-between bg-card/80 backdrop-blur-2xl"
                  >
                    <div>
                      <div className="text-primary font-mono text-5xl opacity-20 mb-4">{steps[i].num}</div>
                      <h4 className="text-2xl font-display font-bold text-white mb-2">{steps[i].title}</h4>
                      <div className="w-16 h-1 gold-gradient-bg rounded-full mb-6"></div>
                      <div className="space-y-3">
                        <div className="h-2 w-full bg-white/10 rounded"></div>
                        <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                        <div className="h-2 w-5/6 bg-white/10 rounded"></div>
                      </div>
                    </div>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="self-end w-12 h-12 rounded-full border-2 border-[#25D366] text-[#25D366] flex items-center justify-center text-xl"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}