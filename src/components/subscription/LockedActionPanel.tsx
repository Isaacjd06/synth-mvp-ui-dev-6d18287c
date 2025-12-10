import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

interface LockedActionPanelProps {
  title?: string;
  message?: string;
  feature?: string;
  className?: string;
}

const LockedActionPanel = ({
  title = "Actions Locked",
  message = "Workflow actions require a subscription.",
  feature,
  className,
}: LockedActionPanelProps) => {
  const { openSubscriptionModal } = useSubscription();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-6",
        "locked-overlay",
        className
      )}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
          <Lock className="w-7 h-7 text-amber-400" />
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground font-light">{message}</p>
        </div>
        
        <Button
          onClick={() => openSubscriptionModal(feature)}
          className="bg-amber-500 hover:bg-amber-600 text-black gap-2"
        >
          Upgrade to Use
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default LockedActionPanel;
