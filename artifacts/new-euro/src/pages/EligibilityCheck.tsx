import { useSubmitEligibility } from "@workspace/api-client-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

// Combine the schemas for all steps
const schema = z.object({
  destinationCountry: z.string().min(1, "Required"),
  visaPurpose: z.string().min(1, "Required"),
  ageRange: z.string().optional(),
  maritalStatus: z.string().optional(),
  employmentStatus: z.string().optional(),
  monthlyIncome: z.string().optional(),
  bankBalance: z.string().optional(),
  propertyOwnership: z.boolean().optional(),
  previousTravel: z.array(z.string()).default([]),
  previousRefusals: z.boolean().optional(),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(5, "Phone is required"),
  email: z.string().email("Valid email required"),
});

type FormValues = z.infer<typeof schema>;

export default function EligibilityCheck() {
  const [step, setStep] = useState(1);
  const totalSteps = 10;
  const submitElig = useSubmitEligibility();
  const [result, setResult] = useState<any>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      destinationCountry: "",
      visaPurpose: "",
      previousTravel: [],
      propertyOwnership: false,
      previousRefusals: false,
      name: "",
      phone: "",
      email: ""
    },
    mode: "onChange"
  });

  const nextStep = async () => {
    // Validate current step fields before proceeding
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["destinationCountry"];
    else if (step === 2) fieldsToValidate = ["visaPurpose"];
    else if (step === 10) fieldsToValidate = ["name", "phone", "email"];
    
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setStep((s) => Math.min(s + 1, totalSteps));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data: FormValues) => {
    submitElig.mutate({ data }, {
      onSuccess: (res) => {
        setResult(res);
      },
      onError: () => {
        toast.error("An error occurred submitting your assessment. Please try again.");
      }
    });
  };

  if (result) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-lg w-full bg-card rounded-2xl p-8 border border-border shadow-2xl text-center"
          >
            <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner" style={{
              backgroundColor: result.band === "High" ? "rgba(45, 106, 79, 0.2)" : result.band === "Medium" ? "rgba(201, 168, 76, 0.2)" : "rgba(220, 38, 38, 0.2)",
              color: result.band === "High" ? "#4ADE80" : result.band === "Medium" ? "#C9A84C" : "#EF4444"
            }}>
              <span className="text-4xl font-display font-bold">{result.score}</span>
            </div>
            
            <h2 className="text-3xl font-display font-bold mb-2">Assessment Complete</h2>
            <p className="text-muted-foreground mb-8">Based on the provided information, your success probability band is <strong style={{color: result.band === "High" ? "#4ADE80" : result.band === "Medium" ? "#C9A84C" : "#EF4444"}}>{result.band}</strong>.</p>
            
            <div className="bg-secondary/20 p-6 rounded-lg text-left mb-8">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Recommendations</h3>
              <ul className="space-y-3">
                {result.recommendations?.map((rec: string, i: number) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button size="lg" className="w-full gold-gradient-bg text-primary-foreground font-bold border-none" asChild>
              <a href="https://wa.me/923145352222" target="_blank" rel="noreferrer">
                Book Detailed Consultation
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Progress Bar */}
      <div className="w-full h-1 bg-secondary/50">
        <div 
          className="h-full gold-gradient-bg transition-all duration-500 ease-out"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-xl w-full">
          <div className="mb-8 flex items-center justify-between">
            {step > 1 ? (
              <Button variant="ghost" size="sm" onClick={prevStep} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            ) : <div />}
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Step {step} of {totalSteps}
            </span>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl overflow-hidden relative">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    
                    {step === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-3xl font-display font-bold">Where do you want to go?</h2>
                        <FormField control={form.control} name="destinationCountry" render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                                {["UK", "USA", "Canada", "Australia", "Turkey", "Schengen"].map(country => (
                                  <div key={country}>
                                    <RadioGroupItem value={country} id={`c-${country}`} className="peer sr-only" />
                                    <Label htmlFor={`c-${country}`} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all">
                                      {country}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-3xl font-display font-bold">Purpose of visit?</h2>
                        <FormField control={form.control} name="visaPurpose" render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid gap-3">
                                {["Tourism / Visit", "Business / Meetings", "Family Reunion", "Study", "Medical"].map(purpose => (
                                  <div key={purpose}>
                                    <RadioGroupItem value={purpose} id={`p-${purpose}`} className="peer sr-only" />
                                    <Label htmlFor={`p-${purpose}`} className="flex items-center rounded-md border border-muted bg-popover px-4 py-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all">
                                      {purpose}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-3xl font-display font-bold">What is your age range?</h2>
                        <FormField control={form.control} name="ageRange" render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 text-lg">
                                  <SelectValue placeholder="Select age range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="18-25">18 - 25 years</SelectItem>
                                <SelectItem value="26-35">26 - 35 years</SelectItem>
                                <SelectItem value="36-45">36 - 45 years</SelectItem>
                                <SelectItem value="46-55">46 - 55 years</SelectItem>
                                <SelectItem value="55+">55+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )} />
                      </div>
                    )}

                    {/* Simulating steps 4-9 as simplified selects/radios for brevity */}
                    {step > 3 && step < 10 && (
                      <div className="space-y-6">
                        <h2 className="text-3xl font-display font-bold">Let's gather some profile details</h2>
                        <p className="text-muted-foreground">This helps our system calculate accurate probabilities.</p>
                        
                        {/* We'll just show one generic field here for the mockup, but ideally it would be separate screens */}
                        <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg text-primary text-sm mb-4">
                          (Wizard continues gathering: marital status, employment, income, bank balance, property, travel history...)
                        </div>
                        
                        <FormField control={form.control} name="maritalStatus" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marital Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Married">Married</SelectItem>
                                <SelectItem value="Divorced">Divorced</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )} />
                      </div>
                    )}

                    {step === 10 && (
                      <div className="space-y-6">
                        <h2 className="text-3xl font-display font-bold">Where should we send your results?</h2>
                        
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input placeholder="John Doe" className="h-12" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl><Input type="email" placeholder="john@example.com" className="h-12" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone/WhatsApp Number</FormLabel>
                            <FormControl><Input placeholder="+92 300 0000000" className="h-12" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>

                <div className="mt-10">
                  {step < totalSteps ? (
                    <Button type="button" size="lg" className="w-full gold-gradient-bg text-primary-foreground font-bold border-none" onClick={nextStep}>
                      Next <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" size="lg" className="w-full gold-gradient-bg text-primary-foreground font-bold border-none" disabled={submitElig.isPending}>
                      {submitElig.isPending ? "Calculating Results..." : "Get My Results"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
