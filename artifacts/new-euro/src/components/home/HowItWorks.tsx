import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Free Eligibility Check", desc: "Start by evaluating your profile to find the right visa option." },
    { num: "02", title: "Document Preparation", desc: "Our experts help you gather and format all required paperwork." },
    { num: "03", title: "Application Filing", desc: "We submit your application with precision to maximize success." },
    { num: "04", title: "Visa Stamped", desc: "Get ready to fly! We guide you until the visa is in your passport." }
  ];

  return (
    <section className="py-24 container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-display font-bold mb-12">The Journey to Your Visa</h2>
          <div className="space-y-8 relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border -z-10"></div>
            {steps.map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex gap-6"
              >
                <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center text-primary-foreground font-bold shrink-0 shadow-lg border border-primary/20">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="relative h-[600px] rounded-2xl overflow-hidden bg-secondary/20 border border-border flex items-center justify-center perspective-[1000px]">
           <motion.div 
             initial={{ rotateY: 30, rotateX: 10 }}
             whileInView={{ rotateY: 0, rotateX: 0 }}
             transition={{ duration: 1 }}
             className="w-64 h-80 bg-card rounded-md border border-primary/30 shadow-2xl flex flex-col items-center justify-center p-6 text-center transform-style-3d"
           >
             <div className="w-16 h-20 bg-primary/20 mb-6 flex items-center justify-center rounded">
               <span className="text-2xl text-primary font-display font-bold">NE</span>
             </div>
             <h4 className="font-display text-xl text-primary mb-2">PASSPORT</h4>
             <div className="w-full h-px bg-primary/20 my-4"></div>
             <p className="text-xs text-muted-foreground uppercase tracking-widest">New Euro Consultants</p>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
