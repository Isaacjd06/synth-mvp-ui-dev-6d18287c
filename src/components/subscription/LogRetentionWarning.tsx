import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

interface LogRetentionWarningProps {
  className?: string;
}

const LogRetentionWarning = ({ className }: LogRetentionWarningProps) => {
  const { isSubscribed, planLimits, planTier, openSubscriptionModal } = useSubscription();

  if (!isSubscribed || !planLimits) return null;

  const retentionDays = planLimits.logRetentionDays;
  const upgradePlan = planTier === "starter" ? "Pro" : planTier === "pro" ? "Agency" : null;

  if (!upgradePlan) return null;

  return (
    <div
      className={cn(
        "p-4 rounded-xl bg-muted/30 border border-border/50 text-center",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">Log Retention Limit</span>
      </div>
      <p className="text-xs text-muted-foreground/80 mb-3">
        Execution logs older than {retentionDays} days require {upgradePlan} or Agency.
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => openSubscriptionModal("extended log retention")}
        className="text-xs text-primary hover:text-primary"
      >
        Upgrade for longer retention
        <ArrowRight className="w-3 h-3 ml-1" />
      </Button>
    </div>
  );
};

export default LogRetentionWarning;
