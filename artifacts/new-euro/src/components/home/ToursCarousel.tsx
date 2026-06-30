import { useListTours } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, Moon, Sun } from "lucide-react";

export default function ToursCarousel() {
  const { data: tours, isLoading } = useListTours();

  if (isLoading || !tours?.length) return null;

  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-display font-bold mb-4">Curated Travel Experiences</h2>
            <p className="text-muted-foreground">Handpicked tour packages for unforgettable memories.</p>
          </div>
          <Button variant="link" className="text-primary p-0 h-auto mt-4 md:mt-0" asChild>
            <Link href="/tours">View All Packages →</Link>
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {tours.map((tour) => (
              <CarouselItem key={tour.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full bg-background border-border overflow-hidden flex flex-col group">
                  <CardContent className="p-0 flex-1 flex flex-col">
                    <div className="h-48 bg-secondary/50 relative overflow-hidden">
                      {/* Placeholder for image */}
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <span className="text-4xl uppercase opacity-20 font-bold">{tour.category}</span>
                      </div>
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                        {tour.category}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{tour.title}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1"><Sun className="w-4 h-4 text-primary"/> {tour.days} Days</div>
                        <div className="flex items-center gap-1"><Moon className="w-4 h-4 text-primary"/> {tour.nights} Nights</div>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">Starting from</p>
                          <p className="text-xl font-bold gold-gradient-text">{tour.price}</p>
                        </div>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full" asChild>
                          <Link href={`/tours/${tour.slug}`}>Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8">
            <CarouselPrevious className="relative inset-auto translate-y-0 h-10 w-10 bg-card border-border hover:bg-primary/20 hover:text-primary hover:border-primary" />
            <CarouselNext className="relative inset-auto translate-y-0 h-10 w-10 bg-card border-border hover:bg-primary/20 hover:text-primary hover:border-primary" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
