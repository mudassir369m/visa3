import { useListVisas } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function CountryCards() {
  const { data: visas, isLoading } = useListVisas();

  if (isLoading) return <div className="py-24 text-center text-primary">Loading destinations...</div>;
  if (!visas?.length) return null;

  return (
    <section className="py-24 container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Your Destination, Our Expertise</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Discover seamless visa processing for the world's most sought-after destinations.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visas.map((visa) => (
          <Link key={visa.id} href={`/visa/${visa.slug}`}>
            <motion.div whileHover={{ y: -10, scale: 1.02 }} className="h-full cursor-pointer">
              <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors overflow-hidden group">
                <CardContent className="p-0">
                  <div className="h-32 bg-secondary/30 flex items-center justify-center relative overflow-hidden">
                    <span className="text-6xl z-10 group-hover:scale-110 transition-transform">{visa.flag}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-50"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-display font-bold gold-gradient-text mb-2">{visa.country}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{visa.headline}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing:</span>
                        <span className="font-medium text-foreground">{visa.processingDays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Success Rate:</span>
                        <span className="font-medium text-success">{visa.successRate}</span>
                      </div>
                    </div>
                    <div className="mt-6 font-medium text-primary flex items-center">
                      View Details <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
