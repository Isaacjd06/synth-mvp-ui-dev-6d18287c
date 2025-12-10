import { forwardRef, ReactNode } from "react";
import { Lock } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface LockedButtonProps extends Omit<ButtonProps, "onClick"> {
  children: ReactNode;
  feature?: string;
  requiredPlan?: "starter" | "pro" | "agency";
  onClick?: () => void;
  tooltipText?: string;
}

const LockedButton = forwardRef<HTMLButtonElement, LockedButtonProps>(
  ({ children, feature, requiredPlan, onClick, tooltipText, className, ...props }, ref) => {
    const { isSubscribed, planTier, openSubscriptionModal } = useSubscription();

    // Check if user has access based on plan tier
    const planHierarchy = { starter: 1, pro: 2, agency: 3 };
    const userPlanLevel = planTier ? planHierarchy[planTier] : 0;
    const requiredPlanLevel = requiredPlan ? planHierarchy[requiredPlan] : 1;
    
    const isLocked = !isSubscribed || userPlanLevel < requiredPlanLevel;

    if (!isLocked) {
      return (
        <Button ref={ref} onClick={onClick} className={className} {...props}>
          {children}
        </Button>
      );
    }

    const handleLockedClick = () => {
      openSubscriptionModal(feature);
    };

    const tooltip = tooltipText || (
      !isSubscribed 
        ? "Subscribe to unlock this feature" 
        : `Upgrade to ${requiredPlan?.charAt(0).toUpperCase()}${requiredPlan?.slice(1)} to unlock`
    );

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            onClick={handleLockedClick}
            className={cn(
              "opacity-40 cursor-pointer relative group locked-button",
              className
            )}
            {...props}
          >
            <Lock className="w-3.5 h-3.5 mr-1.5 shrink-0" />
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="text-xs bg-popover/95 backdrop-blur-sm border-border/60"
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }
);

LockedButton.displayName = "LockedButton";

export default LockedButton;
