import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const BUSINESS_TYPES = [
  { id: "agency", label: "Agency" },
  { id: "coaching", label: "Coaching" },
  { id: "saas", label: "SaaS" },
  { id: "service", label: "Service Business" },
  { id: "other", label: "Other" },
];

const CLIENT_COUNTS = [
  { id: "0-5", label: "0–5" },
  { id: "6-20", label: "6–20" },
  { id: "21-50", label: "21–50" },
  { id: "50+", label: "50+" },
];

const STORAGE_KEY = "synth_onboarding_answers";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({
    businessType: "",
    automationGoal: "",
    clientCount: "",
  });

  const totalSteps = 4; // 3 questions + final step

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return answers.businessType !== "";
      case 1:
        return answers.automationGoal.trim() !== "";
      case 2:
        return answers.clientCount !== "";
      default:
        return true;
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    // Store answers in localStorage for retrieval after OAuth redirect
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    
    // Simulate OAuth redirect delay
    await new Promise((r) => setTimeout(r, 800));
    // In real implementation, this would trigger Supabase Google OAuth
    // and after callback, retrieve answers from localStorage and send to backend
    window.location.href = "/app/dashboard";
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    window.location.href = "/app/dashboard";
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-xl font-semibold text-foreground">Synth</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Get started with Synth in under 60 seconds
        </h1>
        <p className="text-muted-foreground text-lg">
          3-day free trial. No credit card required.
        </p>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 mb-6 relative z-10"
      >
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i <= step ? "bg-primary w-8" : "bg-border w-4"
            }`}
          />
        ))}
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl shadow-primary/5">
          <AnimatePresence mode="wait" custom={step}>
            {/* Step 1: Business Type */}
            {step === 0 && (
              <motion.div
                key="step-0"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  What type of business do you run?
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  This helps us personalize your experience
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {BUSINESS_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() =>
                        setAnswers({ ...answers, businessType: type.id })
                      }
                      className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        answers.businessType === type.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background/50 text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Automation Goal */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  What do you want Synth to automate?
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Describe your main automation goal
                </p>
                <Input
                  placeholder="e.g., Client onboarding, lead follow-ups..."
                  value={answers.automationGoal}
                  onChange={(e) =>
                    setAnswers({ ...answers, automationGoal: e.target.value })
                  }
                  className="bg-background/50 border-border h-12"
                />
              </motion.div>
            )}

            {/* Step 3: Client Count */}
            {step === 2 && (
              <motion.div
                key="step-2"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  How many clients do you manage?
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  This helps us recommend the right workflows
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {CLIENT_COUNTS.map((count) => (
                    <button
                      key={count.id}
                      onClick={() =>
                        setAnswers({ ...answers, clientCount: count.id })
                      }
                      className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        answers.clientCount === count.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background/50 text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {count.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Sign Up with Google */}
            {step === 3 && (
              <motion.div
                key="step-3"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  You're all set!
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Create your account to start automating
                </p>
                <Button
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                  className="w-full h-12 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-xl shadow-lg"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <GoogleIcon />
                      <span className="ml-2">Sign up with Google</span>
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          {step < 3 && (
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-11 rounded-xl border-border"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`h-11 rounded-xl ${step === 0 ? "w-full" : "flex-1"}`}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Already have an account */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-muted-foreground text-sm mb-3">
            Already have an account?
          </p>
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="h-11 px-6 rounded-xl border-border bg-background/50 hover:bg-background"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <GoogleIcon />
                <span className="ml-2">Log in with Google</span>
              </>
            )}
          </Button>
        </motion.div>

        {/* Footer reassurance */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground/70 text-xs mt-6"
        >
          Your business information is only used to personalize Synth's
          experience.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp;
