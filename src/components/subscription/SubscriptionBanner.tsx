import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SubscriptionBannerProps {
  show: boolean;
}

const SubscriptionBanner = ({ show }: SubscriptionBannerProps) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 rounded-xl p-4 mb-6"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">Subscription Required</h4>
            <p className="text-sm text-muted-foreground">
              Upgrade to activate workflows and use Synth's full capabilities.
            </p>
          </div>
        </div>
        <Button 
          onClick={() => navigate("/app/billing")}
          className="btn-synth gap-2"
        >
          Choose a Plan
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default SubscriptionBanner;
