import { ReactNode } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

interface LockedOverlayProps {
  children: ReactNode;
  feature?: string;
  message?: string;
  requiredPlan?: "starter" | "pro" | "agency";
  className?: string;
  showButton?: boolean;
}

const LockedOverlay = ({
  children,
  feature,
  message,
  requiredPlan,
  className,
  showButton = true,
}: LockedOverlayProps) => {
  const { isSubscribed, planTier, openSubscriptionModal } = useSubscription();

  // Check if user has access based on plan tier
  const planHierarchy = { starter: 1, pro: 2, agency: 3 };
  const userPlanLevel = planTier ? planHierarchy[planTier] : 0;
  const requiredPlanLevel = requiredPlan ? planHierarchy[requiredPlan] : 1;
  
  const isLocked = !isSubscribed || userPlanLevel < requiredPlanLevel;

  if (!isLocked) {
    return <>{children}</>;
  }

  const displayMessage = message || (
    !isSubscribed 
      ? "This feature requires a subscription" 
      : `Available on ${requiredPlan?.charAt(0).toUpperCase()}${requiredPlan?.slice(1)} plan`
  );

  return (
    <div className={cn("relative", className)}>
      {/* Dimmed content */}
      <div className="opacity-30 pointer-events-none select-none">
        {children}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
        <div className="text-center p-6 max-w-sm">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center">
            <Lock className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">{displayMessage}</p>
          {showButton && (
            <Button 
              onClick={() => openSubscriptionModal(feature)}
              size="sm"
              className="gap-2"
            >
              Upgrade Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LockedOverlay;
