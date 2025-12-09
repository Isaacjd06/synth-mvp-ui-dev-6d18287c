import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Building2, User, Briefcase, Code, ArrowRight, Zap, Clock, TrendingUp, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OnboardingWizardProps {
  open: boolean;
  onComplete: () => void;
}

const roles = [
  { id: "founder", label: "Founder / CEO", icon: Building2 },
  { id: "manager", label: "Manager / Lead", icon: Briefcase },
  { id: "individual", label: "Individual Contributor", icon: User },
  { id: "developer", label: "Developer / Technical", icon: Code },
];

const goals = [
  { id: "automate", label: "Automate repetitive tasks", icon: Zap },
  { id: "save-time", label: "Save time on operations", icon: Clock },
  { id: "scale", label: "Scale my business", icon: TrendingUp },
  { id: "integrate", label: "Connect my tools", icon: FileText },
];

const OnboardingWizard = ({ open, onComplete }: OnboardingWizardProps) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && selectedRole) {
      setStep(2);
    } else if (step === 2 && selectedGoal) {
      // In production, save to backend
      console.log("Onboarding complete:", { role: selectedRole, goal: selectedGoal });
      onComplete();
      navigate("/app/dashboard");
    }
  };

  const canProceed = step === 1 ? !!selectedRole : !!selectedGoal;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-md glass-strong border-primary/20 overflow-hidden [&>button]:hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <DialogHeader className="relative">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shadow-[0_0_30px_-5px_hsl(217_100%_60%/0.4)]"
          >
            <Sparkles className="w-7 h-7 text-primary" />
          </motion.div>
          <DialogTitle className="text-center text-xl text-gradient">
            {step === 1 ? "Welcome to Synth" : "What's your goal?"}
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground font-light mt-2">
            {step === 1
              ? "Let's personalize your experience. What's your role?"
              : "This helps Synth suggest the right automations for you."}
          </p>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 my-4">
          <div className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            step === 1 ? "bg-primary w-6" : "bg-muted-foreground/30"
          )} />
          <div className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            step === 2 ? "bg-primary w-6" : "bg-muted-foreground/30"
          )} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 relative"
          >
            {step === 1 ? (
              /* Role Selection */
              roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-300",
                    selectedRole === role.id
                      ? "bg-primary/10 border-primary/50 shadow-[0_0_20px_-5px_hsl(217_100%_60%/0.3)]"
                      : "bg-muted/30 border-border/50 hover:border-primary/30 hover:bg-muted/50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                    selectedRole === role.id ? "bg-primary/20" : "bg-muted/50"
                  )}>
                    <role.icon className={cn(
                      "w-5 h-5 transition-colors",
                      selectedRole === role.id ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <span className={cn(
                    "font-medium transition-colors",
                    selectedRole === role.id ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {role.label}
                  </span>
                </button>
              ))
            ) : (
              /* Goal Selection */
              goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-300",
                    selectedGoal === goal.id
                      ? "bg-primary/10 border-primary/50 shadow-[0_0_20px_-5px_hsl(217_100%_60%/0.3)]"
                      : "bg-muted/30 border-border/50 hover:border-primary/30 hover:bg-muted/50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                    selectedGoal === goal.id ? "bg-primary/20" : "bg-muted/50"
                  )}>
                    <goal.icon className={cn(
                      "w-5 h-5 transition-colors",
                      selectedGoal === goal.id ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <span className={cn(
                    "font-medium transition-colors",
                    selectedGoal === goal.id ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {goal.label}
                  </span>
                </button>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="w-full mt-6 btn-synth gap-2"
        >
          {step === 2 ? "Get Started" : "Continue"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingWizard;
