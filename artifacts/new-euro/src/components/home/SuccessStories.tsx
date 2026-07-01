import { motion } from "framer-motion";
import { Link } from "wouter";

const reviews = [
  { name: "Ali Hassan", visa: "UK Student Visa", initials: "AH", color: "bg-blue-600", text: "Got my UK student visa in just 12 days! The team guided me perfectly on bank statements. Very professional.", rating: 5 },
  { name: "Sana Tariq", visa: "USA B1/B2 Visa", initials: "ST", color: "bg-pink-600", text: "I had a previous refusal, but New Euro rebuilt my case beautifully. The mock interviews gave me so much confidence.", rating: 5 },
  { name: "Fahad M.", visa: "Schengen Visa", initials: "FM", color: "bg-emerald-600", text: "Zero hassle. They arranged the appointment, filled the forms, and booked the hotels. My family's Schengen visa was approved smoothly.", rating: 5 },
  { name: "Zainab R.", visa: "Canada Visit", initials: "ZR", color: "bg-amber-600", text: "Super transparent about their fees. No hidden charges. The portal to track documents is very helpful.", rating: 4 },
  { name: "Usman A.", visa: "Australia Visa", initials: "UA", color: "bg-purple-600", text: "Best consultancy in F-11 Markaz. Mustafa bhai is very knowledgeable about current immigration laws.", rating: 5 },
  { name: "Kamran K.", visa: "Turkey E-Visa", initials: "KK", color: "bg-indigo-600", text: "Got it in 24 hours. Excellent service for ticketing and hotel bookings as well.", rating: 5 }
];

export default function SuccessStories() {
  return (
    <section className="py-24 bg-card border-y border-white/5 relative overflow-hidden">
      {/* Decorative text watermark */}
      <div className="absolute top-10 left-10 text-[150px] font-display font-bold text-white/5 pointer-events-none tracking-tighter leading-none mix-blend-overlay">
        APPROVED.
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-display-l mb-4"
          >
            Real Visas. <span className="gold-gradient-text">Real People.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-8 rounded-2xl relative group hover:-translate-y-1 transition-transform"
            >
              {/* Stamp Animation */}
              <motion.div 
                initial={{ opacity: 0, scale: 2, rotate: -45 }}
                whileInView={{ opacity: 0.2, scale: 1, rotate: -15 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring", bounce: 0.5 }}
                className="absolute top-4 right-4 border-4 border-green-500 text-green-500 rounded px-2 py-1 font-mono font-bold text-xl uppercase tracking-widest z-0 pointer-events-none"
              >
                APPROVED
              </motion.div>

              <div className="flex gap-1 mb-4 text-primary relative z-10">
                {[...Array(rev.rating)].map((_, j) => <span key={j}>★</span>)}
              </div>
              
              <p className="text-white/80 text-base leading-relaxed mb-8 relative z-10">
                "{rev.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto relative z-10">
                <div className={`w-12 h-12 rounded-full ${rev.color} flex items-center justify-center font-bold text-white shadow-inner`}>
                  {rev.initials}
                </div>
                <div>
                  <h4 className="font-bold font-display">{rev.name}</h4>
                  <p className="text-xs text-primary font-medium">{rev.visa}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex -space-x-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white bg-slate-700`}>
                User
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-black gold-gradient-bg">
              +500
            </div>
          </div>
          <Link href="/about" className="text-sm font-semibold text-white/70 hover:text-primary transition-colors underline decoration-white/20 underline-offset-4">
            Read all 500+ success stories →
          </Link>
        </div>
      </div>
    </section>
  );
}