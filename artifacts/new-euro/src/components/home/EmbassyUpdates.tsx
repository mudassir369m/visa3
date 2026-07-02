import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListEmbassyUpdates } from "@workspace/api-client-react";

export default function EmbassyUpdates() {
  const { data: updateList } = useListEmbassyUpdates();

  const updates = (updateList ?? []).map((u) => ({
    id: u.id,
    flag: u.flag,
    date: new Date(u.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    title: u.headline,
    desc: u.summary,
  }));

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display-l mb-2"
            >
              Latest from the <span className="gold-gradient-text">Embassies</span>
            </motion.h2>
            <p className="text-muted-foreground">Stay informed on policy changes that affect your travel plans.</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-primary hover:text-white transition-colors">
            View All Updates →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {updates.map((update, i) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl group hover:-translate-y-1 transition-transform border border-white/5 hover:border-primary/30 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                <span className="text-3xl">{update.flag}</span>
                <span className="text-xs font-mono text-muted-foreground">{update.date}</span>
              </div>
              <h3 className="text-lg font-bold font-display mb-3 text-white group-hover:text-primary transition-colors line-clamp-2">
                {update.title}
              </h3>
              <p className="text-sm text-white/60 mb-6 line-clamp-3">
                {update.desc}
              </p>
              <Link href="/blog" className="mt-auto text-xs font-bold uppercase tracking-wider text-primary group-hover:translate-x-1 transition-transform inline-block w-fit">
                Read More →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}