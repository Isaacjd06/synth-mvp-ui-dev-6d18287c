import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

interface SubscriptionCalloutProps {
  title?: string;
  subtitle?: string;
  feature?: string;
  variant?: "centered" | "inline";
  className?: string;
}

const SubscriptionCallout = ({
  title = "Subscription Required",
  subtitle = "Your account is in read-only mode until you subscribe.",
  feature,
  variant = "centered",
  className,
}: SubscriptionCalloutProps) => {
  const { openSubscriptionModal, isSubscribed } = useSubscription();

  if (isSubscribed) return null;

  if (variant === "inline") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex items-center justify-between gap-4",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <p className="font-medium text-foreground text-sm">{title}</p>
            <p className="text-xs text-muted-foreground font-light">{subtitle}</p>
          </div>
        </div>
        <Button
          onClick={() => openSubscriptionModal(feature)}
          size="sm"
          className="bg-amber-500 hover:bg-amber-600 text-black gap-2 shrink-0"
        >
          Upgrade
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
    >
      <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent overflow-hidden">
        <CardContent className="py-10 text-center relative">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl -translate-y-1/2" />
          
          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shadow-[0_0_30px_-5px_hsl(45_90%_50%/0.3)]">
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            </div>
            
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              {title}
            </h3>
            <p className="text-muted-foreground font-light max-w-md mx-auto mb-6">
              {subtitle}
            </p>
            
            <Button
              onClick={() => openSubscriptionModal(feature)}
              className="bg-amber-500 hover:bg-amber-600 text-black gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubscriptionCallout;
