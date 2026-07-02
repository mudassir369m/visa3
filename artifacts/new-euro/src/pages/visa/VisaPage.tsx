import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RiCheckLine, RiTimeLine, RiPercentLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useGetVisaBySlug } from "@workspace/api-client-react";

const GRADIENTS: Record<string, string> = {
  uk: "bg-gradient-to-br from-blue-900 via-slate-900 to-red-900",
  usa: "bg-gradient-to-br from-blue-900 via-slate-900 to-red-800",
  canada: "bg-gradient-to-br from-red-900 via-slate-900 to-slate-800",
  australia: "bg-gradient-to-br from-blue-900 via-slate-900 to-amber-900",
  turkey: "bg-gradient-to-br from-red-900 via-slate-900 to-slate-900",
  schengen: "bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900",
};

export default function VisaPage({ slug }: { slug: string }) {
  const { data: visa, isLoading, isError } = useGetVisaBySlug(slug);
  const heroImgGradient = GRADIENTS[slug] ?? "bg-gradient-to-br from-primary-900 via-slate-900 to-slate-800";

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !visa) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-3xl font-display font-bold">Visa page not found</h1>
          <p className="text-muted-foreground">This destination isn't available right now.</p>
          <Button asChild className="gold-gradient-bg text-black font-bold">
            <Link href="/">Back to Home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const { country, flag, visaTypes, processingDays, successRate, requirements } = visa;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className={`relative pt-32 pb-24 overflow-hidden border-b border-white/10 ${heroImgGradient}`}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]"></div>
          <div className="container relative z-10 flex flex-col items-center text-center">
            <span className="text-8xl drop-shadow-2xl mb-6">{flag}</span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-display-xl font-bold mb-4"
            >
              <span className="gold-gradient-text">{country}</span> Visa Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/80 max-w-2xl mb-8"
            >
              Expert preparation, flawless documentation, and priority appointment booking for all {country} visa categories.
            </motion.p>

            <div className="flex gap-4">
              <Button size="lg" className="gold-gradient-bg text-black font-bold px-8" asChild>
                <Link href="/eligibility-check">Assess Eligibility</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <div className="bg-card border-b border-white/5">
          <div className="container py-8 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            <div className="flex flex-col items-center gap-2 py-4 min-w-0 w-full">
              <RiTimeLine className="w-8 h-8 text-primary opacity-80" />
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Avg Processing</span>
              <span className="text-2xl font-bold text-white">{processingDays}</span>
            </div>
            <div className="flex flex-col items-center gap-2 py-4 min-w-0 w-full">
              <RiPercentLine className="w-8 h-8 text-primary opacity-80" />
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Success Rate</span>
              <span className="text-2xl font-bold text-white">{successRate}</span>
            </div>
            <div className="flex flex-col items-center gap-2 py-4 min-w-0 w-full">
              <span className="text-3xl">🛂</span>
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Categories</span>
              <span className="text-2xl font-bold text-white text-center px-4 break-words max-w-full">{visaTypes.join(" · ")}</span>
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <section className="py-24 container max-w-4xl">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">General <span className="gold-gradient-text">Requirements</span></h2>
          <div className="grid md:grid-cols-2 gap-4">
            {requirements.map((req, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-4 rounded-xl flex items-start gap-4"
              >
                <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <RiCheckLine className="w-4 h-4" />
                </div>
                <span className="text-white/80">{req}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-primary/10 border border-primary/30 rounded-2xl text-center">
            <p className="text-primary font-medium">Note: Additional documents may be required based on your specific employment status and visa subclass.</p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
