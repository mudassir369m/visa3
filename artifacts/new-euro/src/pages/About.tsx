import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function About() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 to-transparent"></div>
          <div className="container relative z-10 text-center max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-display-xl font-bold mb-6"
            >
              18 Years of <span className="gold-gradient-text">Trust.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              We are not just visa filers. We are consultants who understand immigration law, embassy psychology, and the dreams of Pakistani travelers.
            </motion.p>
          </div>
        </section>

        {/* Founder Profile */}
        <section className="py-24 bg-card border-y border-white/5 overflow-hidden">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square md:aspect-[3/4] max-w-md mx-auto w-full">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl rotate-6"></div>
                <div className="absolute inset-0 bg-card border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700 bg-gradient-to-tr from-slate-900 to-slate-800">
                  {/* Placeholder for founder image */}
                  <div className="text-center text-white/30">
                    <span className="text-6xl block mb-4">👨‍💼</span>
                    <span className="font-mono text-sm uppercase tracking-widest">S. Mustafa</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-display font-bold">Meet the <span className="gold-gradient-text">Founder</span></h2>
                <h3 className="text-xl text-primary font-medium">S. Mustafa (@worldofmustafa1)</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  With nearly two decades of experience in the travel and immigration sector, S. Mustafa established New Euro Consultants to bring transparency to an industry often clouded by misinformation.
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                  "Our philosophy is simple: Treat every passport as if it were our own. We tell our clients the truth about their profiles, even if it means losing a sale. That integrity is why we have a 99% success rate today."
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="flex flex-col">
                    <span className="text-3xl font-display font-bold gold-gradient-text">2007</span>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Established</span>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-display font-bold gold-gradient-text">5k+</span>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Happy Clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Our <span className="gold-gradient-text">Core Values</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Transparency", desc: "No hidden fees. No false promises. If your case is weak, we tell you upfront." },
              { title: "Excellence", desc: "Embassy-grade documentation. Zero room for clerical errors." },
              { title: "Trust", desc: "Your personal data and documents are handled with utmost security and confidentiality." }
            ].map((v, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-4 text-white">{v.title}</h3>
                <p className="text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}