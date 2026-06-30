import { useListBlogPosts } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

export default function BlogPreview() {
  const { data: posts, isLoading } = useListBlogPosts();

  if (isLoading || !posts?.length) return null;

  const featured = posts[0];
  const secondary = posts.slice(1, 3);

  return (
    <section className="py-24 bg-secondary/10 border-y border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-display font-bold mb-4">Insights for Smart Travelers</h2>
            <p className="text-muted-foreground">Expert advice, destination guides, and visa tips.</p>
          </div>
          <Link href="/blog" className="text-primary font-medium hover:underline mt-4 md:mt-0 inline-flex items-center">
            View All Articles <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Featured Post */}
          <div className="lg:col-span-7">
            <Link href={`/blog/${featured.slug}`}>
              <Card className="h-full bg-card border-border overflow-hidden group cursor-pointer">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="h-64 sm:h-80 bg-muted relative overflow-hidden">
                    {featured.imageUrl && (
                      <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    )}
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {featured.category}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      {featured.createdAt && <time>{format(new Date(featured.createdAt), 'MMM dd, yyyy')}</time>}
                      <span>•</span>
                      <span>{featured.readTime} read</span>
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{featured.title}</h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">{featured.excerpt}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Secondary Posts */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {secondary.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="flex-1">
                <Card className="h-full bg-card border-border overflow-hidden group cursor-pointer">
                  <CardContent className="p-6 h-full flex flex-col justify-center">
                    <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">{post.category}</div>
                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="mt-auto text-xs text-muted-foreground">
                      {post.createdAt && format(new Date(post.createdAt), 'MMM dd, yyyy')} • {post.readTime} read
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
