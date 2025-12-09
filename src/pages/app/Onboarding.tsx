import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Briefcase, Code, Rocket, Target, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const roles = [
  { id: "founder", label: "Founder / CEO", icon: Rocket },
  { id: "operations", label: "Operations", icon: Briefcase },
  { id: "developer", label: "Developer", icon: Code },
  { id: "marketing", label: "Marketing", icon: Target },
  { id: "sales", label: "Sales", icon: Users },
  { id: "other", label: "Other", icon: Zap },
];

const goals = [
  { id: "automate-tasks", label: "Automate repetitive tasks" },
  { id: "connect-apps", label: "Connect my apps together" },
  { id: "save-time", label: "Save time on manual work" },
  { id: "scale-operations", label: "Scale my operations" },
  { id: "reduce-errors", label: "Reduce human errors" },
  { id: "explore", label: "Just exploring" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleComplete = () => {
    // In a real app, save onboarding data to backend
    console.log("Onboarding complete:", { role: selectedRole, goal: selectedGoal });
    navigate("/app/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <div className="absolute inset-0 grid-computation opacity-20" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-2 h-2 rounded-full transition-all ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
          <div className={`w-8 h-0.5 transition-all ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div className={`w-2 h-2 rounded-full transition-all ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-strong border-border/50">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_-5px_hsl(217_100%_60%/0.4)]">
                      <Sparkles className="w-7 h-7 text-primary" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-gradient mb-2">
                      Welcome to Synth
                    </h1>
                    <p className="text-muted-foreground font-light">
                      What best describes your role?
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          selectedRole === role.id
                            ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                            : "border-border/50 bg-muted/20 hover:border-primary/30"
                        }`}
                      >
                        <role.icon className={`w-5 h-5 mb-2 ${selectedRole === role.id ? "text-primary" : "text-muted-foreground"}`} />
                        <span className="text-sm font-medium text-foreground">{role.label}</span>
                      </button>
                    ))}
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedRole}
                    className="w-full btn-synth gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-strong border-border/50">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_-5px_hsl(217_100%_60%/0.4)]">
                      <Target className="w-7 h-7 text-primary" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-gradient mb-2">
                      What's your main goal?
                    </h1>
                    <p className="text-muted-foreground font-light">
                      This helps Synth personalize your experience
                    </p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {goals.map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => setSelectedGoal(goal.id)}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${
                          selectedGoal === goal.id
                            ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                            : "border-border/50 bg-muted/20 hover:border-primary/30"
                        }`}
                      >
                        <span className="text-sm font-medium text-foreground">{goal.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleComplete}
                      disabled={!selectedGoal}
                      className="flex-1 btn-synth gap-2"
                    >
                      Get Started
                      <Sparkles className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
