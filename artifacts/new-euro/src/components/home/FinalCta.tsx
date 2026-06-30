import { useSubscribeNewsletter } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Send } from "lucide-react";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function FinalCta() {
  const subscribe = useSubscribeNewsletter();
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    subscribe.mutate({ data }, {
      onSuccess: () => {
        toast.success("Successfully subscribed to newsletter!");
        form.reset();
      },
      onError: () => {
        toast.error("Failed to subscribe. Please try again.");
      }
    });
  };

  return (
    <section className="relative py-32 overflow-hidden bg-card border-t border-border">
      {/* Abstract particle/mesh background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      
      <div className="container mx-auto relative z-10 text-center max-w-3xl">
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">Ready to Take Off?</h2>
        <p className="text-xl text-muted-foreground mb-12">
          Join our newsletter for exclusive embassy updates, travel deals, and visa success strategies.
        </p>
        
        <div className="max-w-md mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        placeholder="Enter your email address" 
                        className="h-12 bg-background/50 border-primary/30 focus-visible:ring-primary backdrop-blur"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="h-12 px-8 gold-gradient-bg text-primary-foreground font-bold border-none group" disabled={subscribe.isPending}>
                {subscribe.isPending ? "Joining..." : (
                  <>
                    Subscribe <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </Form>
          <p className="text-xs text-muted-foreground mt-4 text-center">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
