import { ReactNode } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription, PlanTier } from "@/contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

interface FeatureLockedCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  requiredPlan: PlanTier;
  feature?: string;
  className?: string;
  children?: ReactNode;
}

const planLabels: Record<string, string> = {
  starter: "Starter",
  pro: "Pro",
  agency: "Agency",
};

const FeatureLockedCard = ({
  title,
  description,
  icon,
  requiredPlan,
  feature,
  className,
  children,
}: FeatureLockedCardProps) => {
  const { isSubscribed, planTier, openSubscriptionModal } = useSubscription();

  // Check if user has access
  const planHierarchy = { starter: 1, pro: 2, agency: 3 };
  const userPlanLevel = planTier ? planHierarchy[planTier] : 0;
  const requiredPlanLevel = requiredPlan ? planHierarchy[requiredPlan] : 1;
  const isLocked = !isSubscribed || userPlanLevel < requiredPlanLevel;

  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/50 bg-card/50",
        className
      )}
    >
      <CardContent className="p-6">
        {/* Dimmed preview content */}
        {children && (
          <div className="opacity-20 pointer-events-none select-none mb-4">
            {children}
          </div>
        )}

        {/* Locked overlay */}
        <div className="absolute inset-0 locked-overlay flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            {icon && (
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center opacity-60">
                {icon}
              </div>
            )}
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{title}</h3>
            </div>
            
            <Badge variant="outline" className="mb-3 text-xs border-primary/30 text-primary">
              {requiredPlan ? `${planLabels[requiredPlan]} Plan Required` : "Subscription Required"}
            </Badge>
            
            <p className="text-sm text-muted-foreground font-light mb-4">
              {description}
            </p>
            
            <Button
              onClick={() => openSubscriptionModal(feature || title)}
              size="sm"
              className="gap-2"
            >
              Upgrade to {requiredPlan ? planLabels[requiredPlan] : "Unlock"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureLockedCard;
