import { useState, useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { 
  RiPlaneLine, RiBriefcaseLine, RiGroupLine, RiHospitalLine, RiBookLine,
  RiArrowLeftLine, RiArrowRightLine, RiCheckLine, RiWhatsappFill
} from "react-icons/ri";

// Types & State
type State = {
  country: string;
  purpose: string;
  age: string;
  marital: string;
  employment: string;
  income: string;
  balance: string;
  property: string;
  refusal: string;
  contact: { name: string; phone: string; email: string };
};

const initialState: State = {
  country: "", purpose: "", age: "", marital: "", employment: "",
  income: "", balance: "", property: "", refusal: "", contact: { name: "", phone: "", email: "" }
};

type Action = { type: 'SET_FIELD'; field: keyof State; value: any };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIELD': return { ...state, [action.field]: action.value };
    default: return state;
  }
}

// Data definitions
const countries = [
  { id: "uk", flag: "🇬🇧", name: "UK" }, { id: "usa", flag: "🇺🇸", name: "USA" },
  { id: "canada", flag: "🇨🇦", name: "Canada" }, { id: "australia", flag: "🇦🇺", name: "Australia" },
  { id: "turkey", flag: "🇹🇷", name: "Turkey" }, { id: "schengen", flag: "🇪🇺", name: "Schengen" }
];

const purposes = [
  { id: "visit", icon: RiPlaneLine, name: "Tourism / Visit" },
  { id: "business", icon: RiBriefcaseLine, name: "Business / Conference" },
  { id: "family", icon: RiGroupLine, name: "Family Visit" },
  { id: "medical", icon: RiHospitalLine, name: "Medical Treatment" },
  { id: "study", icon: RiBookLine, name: "Short Study" }
];

const employments = ["Employed (Private)", "Employed (Govt)", "Self-employed", "Business Owner", "Retired", "Student", "Unemployed"];
const incomes = ["Under 100k PKR", "100k - 300k PKR", "300k - 500k PKR", "500k - 1M PKR", "Above 1M PKR"];
const balances = ["Under 500k PKR", "500k - 1.5M PKR", "1.5M - 3M PKR", "3M - 5M PKR", "Above 5M PKR"];

export default function EligibilityCheck() {
  const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{score: number, type: 'strong'|'moderate'|'weak'} | null>(null);

  const totalSteps = 10;
  const progress = ((step - 1) / totalSteps) * 100;

  const nextStep = () => {
    if (step < totalSteps) setStep(s => s + 1);
    else calculateResult();
  };
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const calculateResult = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      let score = 50; // base score
      
      // Calculate basic logic based on selections
      if (state.employment.includes("Business") || state.employment === "Employed (Govt)") score += 15;
      if (state.income.includes("500k") || state.income.includes("1M")) score += 15;
      if (state.balance.includes("3M") || state.balance.includes("5M")) score += 15;
      if (state.property === "yes") score += 10;
      if (state.refusal === "yes") score -= 20;

      score = Math.min(100, Math.max(0, score));

      setResult({
        score,
        type: score >= 80 ? 'strong' : score >= 50 ? 'moderate' : 'weak'
      });
      setIsSubmitting(false);
      setStep(11); // Result screen
    }, 1500);
  };

  const isStepValid = () => {
    switch(step) {
      case 1: return !!state.country;
      case 2: return !!state.purpose;
      case 3: return !!state.age;
      case 4: return !!state.marital;
      case 5: return !!state.employment;
      case 6: return !!state.income;
      case 7: return !!state.balance;
      case 8: return !!state.property;
      case 9: return !!state.refusal;
      case 10: return state.contact.name.length > 2 && state.contact.phone.length > 8;
      default: return true;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <Navbar />
      
      {/* Progress Bar */}
      <div className="fixed top-[72px] left-0 w-full h-1 bg-white/5 z-40">
        <motion.div 
          className="h-full gold-gradient-bg"
          animate={{ width: `${step <= 10 ? progress : 100}%` }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />
      </div>

      <main className="flex-1 container max-w-3xl mx-auto py-12 flex flex-col justify-center relative">
        
        {/* Step Indicator */}
        {step <= 10 && (
          <div className="text-center mb-8 text-muted-foreground font-mono text-sm tracking-widest">
            STEP {step} OF {totalSteps}
          </div>
        )}

        <div className="glass-card rounded-3xl p-6 md:p-12 relative overflow-hidden min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Country */}
            {step === 1 && (
              <StepWrapper key="s1" title="Where do you want to go?">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {countries.map(c => (
                    <SelectionCard 
                      key={c.id} 
                      selected={state.country === c.id} 
                      onClick={() => { dispatch({ type: 'SET_FIELD', field: 'country', value: c.id }); setTimeout(nextStep, 300); }}
                    >
                      <span className="text-4xl mb-2 block">{c.flag}</span>
                      <span className="font-semibold">{c.name}</span>
                    </SelectionCard>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 2: Purpose */}
            {step === 2 && (
              <StepWrapper key="s2" title="What is the purpose of your trip?">
                <div className="grid sm:grid-cols-2 gap-4">
                  {purposes.map(p => (
                    <SelectionCard 
                      key={p.id} 
                      selected={state.purpose === p.id} 
                      onClick={() => { dispatch({ type: 'SET_FIELD', field: 'purpose', value: p.id }); setTimeout(nextStep, 300); }}
                    >
                      <p.icon className="w-8 h-8 mb-3 opacity-80" />
                      <span className="font-semibold">{p.name}</span>
                    </SelectionCard>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 3: Age */}
            {step === 3 && (
              <StepWrapper key="s3" title="What is your age group?">
                <div className="grid sm:grid-cols-2 gap-4">
                  {["Under 25", "25 - 35", "36 - 50", "Over 50"].map(a => (
                    <SelectionCard key={a} selected={state.age === a} onClick={() => { dispatch({ type: 'SET_FIELD', field: 'age', value: a }); setTimeout(nextStep, 300); }}>
                      <span className="font-semibold text-lg">{a}</span>
                    </SelectionCard>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 4: Marital Status */}
            {step === 4 && (
              <StepWrapper key="s4" title="What is your marital status?">
                <div className="grid sm:grid-cols-2 gap-4">
                  {["Single", "Married", "Divorced", "Widowed"].map(m => (
                    <SelectionCard key={m} selected={state.marital === m} onClick={() => { dispatch({ type: 'SET_FIELD', field: 'marital', value: m }); setTimeout(nextStep, 300); }}>
                      <span className="font-semibold text-lg">{m}</span>
                    </SelectionCard>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 5: Employment */}
            {step === 5 && (
              <StepWrapper key="s5" title="What is your current employment status?">
                <div className="grid sm:grid-cols-2 gap-3">
                  {employments.map(e => (
                    <SelectionCard key={e} selected={state.employment === e} onClick={() => { dispatch({ type: 'SET_FIELD', field: 'employment', value: e }); setTimeout(nextStep, 300); }} className="py-4">
                      <span className="font-semibold">{e}</span>
                    </SelectionCard>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 6: Income */}
            {step === 6 && (
              <StepWrapper key="s6" title="What is your average monthly income?">
                <p className="text-sm text-muted-foreground mb-6 -mt-2">This helps us understand your financial ties to your home country.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {incomes.map(i => (
                    <SelectionCard key={i} selected={state.income === i} onClick={() => { dispatch({ type: 'SET_FIELD', field: 'income', value: i }); setTimeout(nextStep, 300); }} className="py-4">
                      <span className="font-semibold">{i}</span>
                    </SelectionCard>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 7: Bank Balance */}
            {step === 7 && (
              <StepWrapper key="s7" title="Average closing balance (Last 6 Months)">
                <div className="grid sm:grid-cols-2 gap-3">
                  {balances.map(b => (
                    <SelectionCard key={b} selected={state.balance === b} onClick={() => { dispatch({ type: 'SET_FIELD', field: 'balance', value: b }); setTimeout(nextStep, 300); }} className="py-4">
                      <span className="font-semibold">{b}</span>
                    </SelectionCard>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 8: Property */}
            {step === 8 && (
              <StepWrapper key="s8" title="Do you own property in Pakistan?">
                <div className="grid grid-cols-2 gap-4">
                  <SelectionCard selected={state.property === "yes"} onClick={() => { dispatch({ type: 'SET_FIELD', field: 'property', value: "yes" }); setTimeout(nextStep, 300); }}>
                    <span className="font-semibold text-xl">Yes</span>
                  </SelectionCard>
                  <SelectionCard selected={state.property === "no"} onClick={() => { dispatch({ type: 'SET_FIELD', field: 'property', value: "no" }); setTimeout(nextStep, 300); }}>
                    <span className="font-semibold text-xl">No</span>
                  </SelectionCard>
                </div>
              </StepWrapper>
            )}

            {/* Step 9: Refusals */}
            {step === 9 && (
              <StepWrapper key="s9" title="Have you ever had a visa refusal?">
                <p className="text-sm text-muted-foreground mb-6 -mt-2">Be honest. A previous refusal does not mean you cannot get a visa.</p>
                <div className="grid grid-cols-2 gap-4">
                  <SelectionCard selected={state.refusal === "yes"} onClick={() => { dispatch({ type: 'SET_FIELD', field: 'refusal', value: "yes" }); setTimeout(nextStep, 300); }}>
                    <span className="font-semibold text-xl text-red-400">Yes</span>
                  </SelectionCard>
                  <SelectionCard selected={state.refusal === "no"} onClick={() => { dispatch({ type: 'SET_FIELD', field: 'refusal', value: "no" }); setTimeout(nextStep, 300); }}>
                    <span className="font-semibold text-xl text-green-400">No</span>
                  </SelectionCard>
                </div>
              </StepWrapper>
            )}

            {/* Step 10: Contact */}
            {step === 10 && (
              <StepWrapper key="s10" title="Where should we send your results?">
                <div className="space-y-6 max-w-md mx-auto w-full">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Full Name</label>
                    <input 
                      type="text" 
                      value={state.contact.name}
                      onChange={e => dispatch({ type: 'SET_FIELD', field: 'contact', value: { ...state.contact, name: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      value={state.contact.phone}
                      onChange={e => dispatch({ type: 'SET_FIELD', field: 'contact', value: { ...state.contact, phone: e.target.value } })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                      placeholder="0300 1234567"
                    />
                  </div>
                </div>
              </StepWrapper>
            )}

            {/* Result Screen */}
            {step === 11 && result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-8 h-full"
              >
                <div className="relative w-48 h-48 mb-8">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                    <motion.circle 
                      cx="50" cy="50" r="45" fill="none" 
                      stroke={result.type === 'strong' ? '#22c55e' : result.type === 'moderate' ? '#eab308' : '#ef4444'} 
                      strokeWidth="10" 
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 283 - (283 * result.score) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-display font-bold">{result.score}%</span>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Score</span>
                  </div>
                </div>

                <h2 className={`text-3xl font-display font-bold mb-4 ${
                  result.type === 'strong' ? 'text-green-400' : result.type === 'moderate' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {result.type === 'strong' ? 'Strong Eligibility 🎉' : result.type === 'moderate' ? 'Moderate Profile' : 'Needs Strengthening'}
                </h2>
                
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  {result.type === 'strong' ? 'Your profile looks excellent for a visa application. Let’s prepare the documents.' : 
                   result.type === 'moderate' ? 'You have a fair chance, but your application requires careful preparation and expert justification.' : 
                   'Your profile has high refusal risks currently. We highly recommend a consultation to improve your ties before applying.'}
                </p>

                <Button size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-14 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
                  <a href={`https://wa.me/923145352222?text=Hi, I completed the eligibility check for ${state.country.toUpperCase()} visa. My score is ${result.score}%.`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <RiWhatsappFill className="text-2xl" /> Book Free Consultation Now
                  </a>
                </Button>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation Footer */}
          {step <= 10 && (
            <div className="mt-auto pt-8 flex items-center justify-between border-t border-white/10">
              <Button 
                variant="ghost" 
                onClick={prevStep} 
                disabled={step === 1 || isSubmitting}
                className="text-white/60 hover:text-white"
              >
                <RiArrowLeftLine className="mr-2" /> Back
              </Button>
              
              <Button 
                onClick={nextStep} 
                disabled={!isStepValid() || isSubmitting}
                className="gold-gradient-bg text-black font-semibold min-w-[120px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Analyzing...
                  </span>
                ) : step === 10 ? (
                  "Show Results"
                ) : (
                  <span className="flex items-center">Next <RiArrowRightLine className="ml-2" /></span>
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Helper Components
function StepWrapper({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-8">{title}</h2>
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>
    </motion.div>
  );
}

function SelectionCard({ children, selected, onClick, className = "" }: { children: React.ReactNode, selected: boolean, onClick: () => void, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 border ${
        selected 
          ? 'bg-primary/10 border-primary text-white shadow-glow-gold' 
          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
      } ${className}`}
    >
      {selected && (
        <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-black">
          <RiCheckLine className="w-3 h-3" />
        </div>
      )}
      {children}
    </button>
  );
}