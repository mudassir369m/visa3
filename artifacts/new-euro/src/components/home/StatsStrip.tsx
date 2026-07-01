import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const stats = [
  { value: 18, suffix: "+", label: "Years of Excellence" },
  { value: 5000, suffix: "+", label: "Visas Processed" },
  { value: 99, suffix: "%", label: "Success Rate" },
  { value: 50, suffix: "+", label: "Countries" }
];

function Counter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let start: number | null = null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function StatsStrip() {
  return (
    <section className="bg-primary-800 py-16 relative z-20 border-y border-white/5">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center group transition-transform duration-300 hover:-translate-y-2 hover:shadow-float"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <div className="text-display-l gold-gradient-text mb-2 flex items-baseline">
                <Counter from={0} to={stat.value} />
                <span className="text-4xl ml-1">{stat.suffix}</span>
              </div>
              <div className="w-12 h-1 gold-gradient-bg rounded-full mb-4 opacity-50 group-hover:w-full transition-all duration-500"></div>
              <p className="text-sm md:text-base font-medium text-white/90 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}