import { useListTestimonials } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function SuccessStories() {
  const { data: testimonials, isLoading } = useListTestimonials();

  if (isLoading || !testimonials?.length) return null;

  return (
    <section className="py-24 container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Real Visas. Real People.</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Join thousands of successful applicants who trusted New Euro Consultants.</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {testimonials.map((test) => (
          <Card key={test.id} className="break-inside-avoid bg-card border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex gap-1 mb-4 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < test.rating ? "fill-current" : "opacity-30"}`} />
                ))}
              </div>
              <p className="text-foreground/90 italic mb-6">"{test.message}"</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-bold">{test.name}</p>
                  <p className="text-xs text-muted-foreground uppercase">{test.visaType} • {test.country}</p>
                </div>
                <div className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-900/50 rounded-full text-[10px] font-bold tracking-wider transform -rotate-12">
                  APPROVED
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
