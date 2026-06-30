import { useListEmbassyUpdates } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";

export default function EmbassyUpdates() {
  const { data: updates, isLoading } = useListEmbassyUpdates();

  if (isLoading || !updates?.length) return null;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Latest from the Embassies</h2>
          <p className="text-muted-foreground">Stay informed with the newest regulations and processing times.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.slice(0, 3).map((update) => (
            <Card key={update.id} className="bg-card border-border hover:border-primary/30 transition-colors group">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <span className="text-4xl drop-shadow-md">{update.flag}</span>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{update.country}</h3>
                  <time className="text-xs text-muted-foreground uppercase tracking-wider">
                    {format(new Date(update.publishedAt), 'MMM dd, yyyy')}
                  </time>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-display font-bold text-xl mb-3 group-hover:text-primary transition-colors">{update.headline}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{update.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
