import { Crown, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSubscription, PlanTier } from "@/contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

const planStyles: Record<PlanTier & string, { bg: string; text: string; border: string; icon: string }> = {
  starter: {
    bg: "bg-slate-500/15",
    text: "text-slate-300",
    border: "border-slate-500/30",
    icon: "text-slate-400",
  },
  pro: {
    bg: "bg-primary/15",
    text: "text-primary",
    border: "border-primary/30",
    icon: "text-primary",
  },
  agency: {
    bg: "bg-cyan-500/15",
    text: "text-cyan-300",
    border: "border-cyan-500/30",
    icon: "text-cyan-400",
  },
};

const SubscriptionPill = () => {
  const { isSubscribed, planTier, planName, openSubscriptionModal } = useSubscription();

  if (!isSubscribed) {
    return (
      <Badge
        variant="outline"
        onClick={() => openSubscriptionModal()}
        className={cn(
          "cursor-pointer transition-all duration-300 hover:scale-105",
          "bg-amber-500/15 text-amber-300 border-amber-500/30",
          "hover:bg-amber-500/25 hover:border-amber-500/50",
          "shadow-[0_0_12px_-3px_hsl(45_90%_50%/0.3)]"
        )}
      >
        <AlertTriangle className="w-3 h-3 mr-1.5 text-amber-400" />
        No Active Subscription
      </Badge>
    );
  }

  const styles = planTier ? planStyles[planTier] : planStyles.starter;

  return (
    <Badge
      variant="outline"
      className={cn(
        "transition-all duration-300",
        styles.bg,
        styles.text,
        styles.border,
        planTier === "pro" && "shadow-[0_0_12px_-3px_hsl(217_91%_60%/0.3)]",
        planTier === "agency" && "shadow-[0_0_12px_-3px_hsl(180_70%_50%/0.3)]"
      )}
    >
      <Crown className={cn("w-3 h-3 mr-1.5", styles.icon)} />
      {planName} Plan
    </Badge>
  );
};

export default SubscriptionPill;
