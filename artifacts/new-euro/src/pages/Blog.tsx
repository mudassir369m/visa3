import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Calendar, Clock } from "lucide-react";
import { useListBlogPosts } from "@workspace/api-client-react";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const CATEGORY_COLORS: Record<string, string> = {
  Guide: "bg-blue-500/20 text-blue-400",
  Tips: "bg-green-500/20 text-green-400",
  News: "bg-amber-500/20 text-amber-400",
  UK: "bg-indigo-500/20 text-indigo-400",
  USA: "bg-red-500/20 text-red-400",
  Canada: "bg-red-500/20 text-red-300",
  Australia: "bg-yellow-500/20 text-yellow-400",
  Turkey: "bg-red-500/20 text-red-400",
  Schengen: "bg-blue-500/20 text-blue-300",
};

export default function Blog() {
  const { data: posts, isLoading } = useListBlogPosts();

  const published = (posts ?? []).filter((p) => p.published);
  const featured = published[0];
  const rest = published.slice(1);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="container relative z-10 text-center max-w-3xl">
            <motion.p {...fadeUp} className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">Insights & Guides</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.05 }} className="text-display-xl font-bold mb-6">
              Insights for <span className="gold-gradient-text">Smart Travelers.</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-xl text-muted-foreground">
              Embassy updates, visa guides, and travel tips from Pakistan's most trusted consultancy.
            </motion.p>
          </div>
        </section>

        <section className="pb-24 container">

          {isLoading && (
            <div className="grid lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card rounded-2xl h-72 animate-pulse bg-white/5" />
              ))}
            </div>
          )}

          {!isLoading && published.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <span className="text-5xl block mb-4">📰</span>
              <p>Blog posts coming soon. Check back for visa guides and embassy updates.</p>
            </div>
          )}

          {/* Featured post */}
          {featured && (
            <motion.div {...fadeUp} className="mb-12">
              <Link href={`/blog/${featured.slug}`} className="block">
                <div className="glass-card rounded-2xl overflow-hidden grid lg:grid-cols-2 hover:border-primary/20 border border-white/5 transition-all duration-300 hover:-translate-y-1 group">
                  <div className="relative h-64 lg:h-auto bg-gradient-to-br from-primary-900 to-background flex items-center justify-center min-h-[240px]">
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-700">📰</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 lg:to-transparent" />
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit ${CATEGORY_COLORS[featured.category ?? ""] ?? "bg-white/10 text-muted-foreground"}`}>
                      {featured.category ?? "Article"}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime ?? "5 min read"}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featured.createdAt ? new Date(featured.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" }) : "Recent"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Rest of posts */}
          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <motion.div key={post.id} {...fadeUp} transition={{ delay: i * 0.05 }}>
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border-white/5 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 group">
                      <div className="h-48 bg-gradient-to-br from-primary-900 to-background flex items-center justify-center">
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-500">📰</span>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit ${CATEGORY_COLORS[post.category ?? ""] ?? "bg-white/10 text-muted-foreground"}`}>
                          {post.category ?? "Article"}
                        </span>
                        <h3 className="font-display font-bold text-base mb-2 group-hover:text-primary transition-colors flex-1">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-white/5 pt-4">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime ?? "5 min"}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-PK", { month: "short", year: "numeric" }) : "Recent"}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
}
