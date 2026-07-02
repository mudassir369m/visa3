import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListBlogPosts } from "@workspace/api-client-react";

const CATEGORY_EMOJI: Record<string, string> = {
  Guide: "📘",
  Tips: "💡",
};

export default function BlogPreview() {
  const { data: posts } = useListBlogPosts();

  const articles = (posts ?? []).map((p) => ({
    id: p.id,
    cat: p.category,
    title: p.title,
    time: p.readTime,
    date: new Date(p.createdAt ?? Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    emoji: CATEGORY_EMOJI[p.category] ?? "📰",
    excerpt: p.excerpt,
  }));

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1);

  if (!mainArticle) return null;

  return (
    <section className="py-24 bg-card border-t border-white/5">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-display-l"
          >
            Insights for <span className="gold-gradient-text">Smart Travelers</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
          {/* Main Article */}
          <Link href="/blog">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl overflow-hidden h-full group cursor-pointer relative"
            >
              <div className="h-64 lg:h-80 w-full bg-gradient-to-tr from-primary-900 to-primary-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
                <span className="text-8xl group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">{mainArticle.emoji}</span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                    {mainArticle.cat}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{mainArticle.date} • {mainArticle.time}</span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                  {mainArticle.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  {mainArticle.excerpt}
                </p>
                <span className="text-sm font-bold text-white group-hover:translate-x-2 transition-transform inline-block">
                  Read Article →
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Side Articles */}
          <div className="flex flex-col gap-6">
            {sideArticles.map((art, i) => (
              <Link key={art.id} href="/blog">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 group cursor-pointer h-full flex flex-col justify-center border-white/5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                      {art.emoji}
                    </div>
                    <div>
                      <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{art.cat}</span>
                      <p className="text-xs text-muted-foreground font-mono">{art.date}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors mb-4">
                    {art.title}
                  </h3>
                  <span className="text-xs font-bold text-white/50 group-hover:text-white mt-auto">
                    {art.time} →
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}