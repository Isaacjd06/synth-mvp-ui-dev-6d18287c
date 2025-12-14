import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

interface SubscriptionBannerProps {
  feature?: string;
  variant?: "warning" | "info" | "compact";
  className?: string;
  dismissible?: boolean;
}

const SubscriptionBanner = ({ 
  feature, 
  variant = "warning", 
  className,
  dismissible = false,
}: SubscriptionBannerProps) => {
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
        <span className="text-xs text-amber-300">Subscription required</span>
        <Button 
          onClick={() => openSubscriptionModal(feature)}
          size="sm"
          variant="ghost"
          className="h-6 text-xs text-amber-300 hover:text-amber-200 hover:bg-amber-500/20 px-2"
        >
          Upgrade
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 rounded-xl border backdrop-blur-sm relative overflow-hidden",
        variant === "warning" 
          ? "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30"
          : "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/30",
        className
      )}
    >
      {/* Subtle glow effect */}
      <div className={cn(
        "absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2",
        variant === "warning" ? "bg-amber-500/15" : "bg-primary/15"
      )} />

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="font-medium text-foreground">
            You are not subscribed
          </h4>
          <p className="text-sm text-muted-foreground font-light">
            {feature
              ? `Subscribe to ${feature}`
              : "Subscribe to activate workflows, runs, integrations, and more."}
          </p>
        </div>
        <Button 
          onClick={() => openSubscriptionModal(feature)}
          className={cn(
            "shrink-0",
            variant === "warning" 
              ? "bg-amber-500 hover:bg-amber-600 text-black" 
              : "bg-primary hover:bg-primary/90"
          )}
        >
          Upgrade Now
        </Button>
      </div>
    </motion.div>
  );
};

export default SubscriptionBanner;