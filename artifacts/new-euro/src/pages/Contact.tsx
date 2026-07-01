import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OfficeMap from "@/components/home/OfficeMap";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  visaType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", visaType: "", message: "" }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We will get back to you within 24 hours.",
      });
      form.reset();
    }, 1500);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-24 container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Form */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-display-l font-bold mb-6"
              >
                Let's Start Your <span className="gold-gradient-text">Journey.</span>
              </motion.h1>
              <p className="text-muted-foreground mb-10 text-lg">
                Fill out the form below or reach out via WhatsApp for immediate assistance. Our consultants are ready.
              </p>

              <div className="glass-card p-8 rounded-3xl border-white/10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-white/5 border-white/10 text-white h-12 rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 text-white h-12 rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Phone</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="0300 1234567" className="bg-white/5 border-white/10 text-white h-12 rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="visaType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">Interested Visa (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. UK Visit Visa" className="bg-white/5 border-white/10 text-white h-12 rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell us about your travel plans..." className="bg-white/5 border-white/10 text-white min-h-[120px] rounded-xl resize-none" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isSubmitting} className="w-full gold-gradient-bg text-black font-bold h-14 rounded-xl shadow-glow-gold hover:-translate-y-1 transition-transform">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Map/Info side */}
            <div className="lg:pt-24 space-y-8">
              <div className="glass-card p-8 rounded-3xl border-primary/20 bg-primary/5">
                <h3 className="font-display font-bold text-2xl mb-4">Fastest Response</h3>
                <p className="text-muted-foreground mb-6">Our dedicated WhatsApp line is the quickest way to get an initial assessment.</p>
                <a href="https://wa.me/923145352222" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white h-14 rounded-xl font-bold transition-colors">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            
          </div>
        </section>

        {/* Bring in the map component from Home */}
        <OfficeMap />
      </main>

      <Footer />
    </div>
  );
}