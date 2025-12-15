import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate auth - in production this would call Supabase
      await new Promise(r => setTimeout(r, 500));
      navigate("/app/chat");
    } catch (err) {
      setError("Unable to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <div className="absolute inset-0 grid-computation opacity-20" />
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm"
      >
        <Card className="relative overflow-hidden border-border/60 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/20">
          {/* Subtle glow effect at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <CardHeader className="text-center space-y-6 pt-10 pb-4">
            {/* Logo */}
            <motion.div 
              className="mx-auto w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)]"
              variants={itemVariants}
            >
              <Sparkles className="w-8 h-8 text-primary drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)]" />
            </motion.div>
            
            {/* Title & Subtitle */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-2xl font-display font-bold text-foreground">
                Welcome to Synth
              </h1>
              <p className="text-sm text-muted-foreground font-light">
                Log in to access your automations.
              </p>
            </motion.div>
          </CardHeader>
          
          <CardContent className="pt-4 pb-10 px-8">
            {/* Error Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                    <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                    <p className="text-sm text-destructive flex-1">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="text-destructive/60 hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants}>
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                disabled={isLoading}
                className="w-full h-12 bg-white hover:bg-gray-50 border-gray-200 text-gray-700 font-medium shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50"
                size="lg"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin mr-3" />
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
                )}
                {isLoading ? "Signing in..." : "Continue with Google"}
              </Button>
            </motion.div>
            
            <motion.p 
              className="text-center text-xs text-muted-foreground/70 mt-6 font-light"
              variants={itemVariants}
            >
              Synth will manage your automations intelligently
            </motion.p>
          </CardContent>
        </Card>
        
        {/* Footer branding */}
        <motion.div 
          className="text-center mt-8"
          variants={itemVariants}
        >
          <p className="text-xs text-muted-foreground/50 font-light">
            Powered by intelligent automation
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;