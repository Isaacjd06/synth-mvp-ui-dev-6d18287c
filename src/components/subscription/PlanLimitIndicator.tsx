import { AlertTriangle, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

interface PlanLimitIndicatorProps {
  resource: "workflows" | "executions";
  showUpgradeButton?: boolean;
  compact?: boolean;
  className?: string;
}

const PlanLimitIndicator = ({
  resource,
  showUpgradeButton = true,
  compact = false,
  className,
}: PlanLimitIndicatorProps) => {
  const { isSubscribed, planLimits, usageStats, openSubscriptionModal, planTier } = useSubscription();

  if (!isSubscribed || !planLimits) return null;

  const current = resource === "workflows" ? usageStats.workflowsUsed : usageStats.executionsUsed;
  const max = resource === "workflows" ? planLimits.maxWorkflows : planLimits.maxExecutions;
  const percentage = Math.min((current / max) * 100, 100);
  const isAtLimit = current >= max;
  const isNearLimit = percentage >= 80;

  const resourceLabel = resource === "workflows" ? "active workflows" : "executions/month";
  const upgradePlan = planTier === "starter" ? "Pro" : planTier === "pro" ? "Agency" : null;

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2 text-xs", className)}>
        <span className={cn(
          "font-mono",
          isAtLimit ? "text-destructive" : isNearLimit ? "text-amber-400" : "text-muted-foreground"
        )}>
          {current.toLocaleString()}/{max.toLocaleString()}
        </span>
        {isAtLimit && <AlertTriangle className="w-3 h-3 text-destructive" />}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground capitalize">{resourceLabel}</span>
        <span className={cn(
          "font-mono text-xs",
          isAtLimit ? "text-destructive" : isNearLimit ? "text-amber-400" : "text-foreground"
        )}>
          {current.toLocaleString()} / {max.toLocaleString()}
        </span>
      </div>
      
      <Progress 
        value={percentage} 
        className={cn(
          "h-1.5",
          isAtLimit && "[&>div]:bg-destructive",
          isNearLimit && !isAtLimit && "[&>div]:bg-amber-500"
        )}
      />

      {isAtLimit && showUpgradeButton && upgradePlan && (
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-amber-400 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Limit reached
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs text-primary hover:text-primary"
            onClick={() => openSubscriptionModal(`unlock more ${resource}`)}
          >
            Upgrade to {upgradePlan}
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanLimitIndicator;
