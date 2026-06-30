import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function EligibilityTeaser() {
  return (
    <section className="py-24 bg-card border-y border-border overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Are You Eligible? <br/><span className="gold-gradient-text">Find Out in 60 Seconds</span></h2>
          <p className="text-xl text-muted-foreground mb-10">
            Our smart assessment tool analyzes your profile against current embassy requirements to give you an instant success probability score.
          </p>
          
          <div className="bg-background/80 backdrop-blur-md border border-border p-8 rounded-2xl shadow-xl max-w-xl mx-auto mb-8 text-left">
            <div className="space-y-4 mb-6">
              <div className="h-10 bg-secondary/30 rounded-md w-full border border-border/50"></div>
              <div className="h-10 bg-secondary/30 rounded-md w-3/4 border border-border/50"></div>
              <div className="h-10 bg-secondary/30 rounded-md w-5/6 border border-border/50"></div>
            </div>
            <div className="flex justify-end">
              <Button size="lg" className="gold-gradient-bg text-primary-foreground font-bold border-none w-full sm:w-auto" asChild>
                <Link href="/eligibility-check">Start Free Assessment</Link>
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">100% Free • No Credit Card Required • Instant Results</p>
        </div>
      </div>
    </section>
  );
}
