import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { useGetBlogPost } from "@workspace/api-client-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useGetBlogPost(slug ?? "");

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center py-24 container">
          <span className="text-6xl mb-6">📭</span>
          <h1 className="text-3xl font-display font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">This article may have been moved or doesn't exist.</p>
          <Button asChild variant="outline" className="border-white/20 hover:bg-white/5">
            <Link href="/blog"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">

        {/* Back link */}
        <div className="container pt-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>

        {/* Hero */}
        <section className="py-12 md:py-16 container max-w-3xl">
          <motion.div {...fadeUp}>
            {post.category && (
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/15 text-primary mb-6">
                {post.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">{post.title}</h1>
            {post.excerpt && <p className="text-xl text-muted-foreground leading-relaxed mb-8">{post.excerpt}</p>}
            <div className="flex items-center gap-6 text-sm text-muted-foreground border-y border-white/5 py-4">
              {post.readTime && <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>}
              {post.createdAt && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              )}
            </div>
          </motion.div>
        </section>

        {/* Cover image placeholder */}
        <div className="container max-w-3xl mb-12">
          <div className="rounded-2xl overflow-hidden h-64 md:h-80 bg-gradient-to-br from-primary-900 to-background flex items-center justify-center border border-white/5">
            <span className="text-8xl">📰</span>
          </div>
        </div>

        {/* Content */}
        <section className="pb-24 container max-w-3xl">
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            {typeof post.content === "string" ? (
              <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-primary">
                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">{post.content}</p>
              </div>
            ) : post.content && typeof post.content === "object" ? (
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-muted-foreground">Article content loaded from rich text editor.</p>
              </div>
            ) : (
              <p className="text-muted-foreground">Content not available.</p>
            )}
          </motion.div>

          {/* CTA at end of post */}
          <div className="mt-16 p-8 glass-card rounded-2xl border-white/5 text-center">
            <h3 className="text-xl font-display font-bold mb-3">Ready to Apply for Your Visa?</h3>
            <p className="text-muted-foreground mb-6">Get a free eligibility check from New Euro Consultants — no commitment required.</p>
            <Button asChild className="gold-gradient-bg text-black font-semibold px-8 rounded-sm hover:shadow-glow-gold transition-all">
              <Link href="/eligibility-check">Check My Eligibility — Free</Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
