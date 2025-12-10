import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

interface SubscriptionBannerProps {
  feature?: string;
  variant?: "warning" | "info" | "compact";
  className?: string;
}

const SubscriptionBanner = ({ feature, variant = "warning", className }: SubscriptionBannerProps) => {
  const { openSubscriptionModal, isSubscribed } = useSubscription();

  if (isSubscribed) return null;

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs text-amber-300">Subscription required</span>
        </div>
        <Button 
          onClick={() => openSubscriptionModal(feature)}
          size="sm"
          variant="ghost"
          className="h-6 text-xs text-amber-300 hover:text-amber-200 hover:bg-amber-500/20 px-2"
        >
          Upgrade
          <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 rounded-xl border backdrop-blur-sm",
        variant === "warning" 
          ? "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30"
          : "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/30",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            variant === "warning" ? "bg-amber-500/20" : "bg-primary/20"
          )}>
            <AlertTriangle className={cn(
              "w-5 h-5",
              variant === "warning" ? "text-amber-400" : "text-primary"
            )} />
          </div>
          <div>
            <h4 className="font-medium text-foreground">
              You are not subscribed
            </h4>
            <p className="text-sm text-muted-foreground font-light">
              {feature
                ? `Subscribe to ${feature}`
                : "Subscribe to activate workflows, runs, integrations, and advanced features."}
            </p>
          </div>
        </div>
        <Button 
          onClick={() => openSubscriptionModal(feature)}
          className={cn(
            "gap-2 shrink-0",
            variant === "warning" 
              ? "bg-amber-500 hover:bg-amber-600 text-black" 
              : "bg-primary hover:bg-primary/90"
          )}
        >
          Upgrade Now
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default SubscriptionBanner;
