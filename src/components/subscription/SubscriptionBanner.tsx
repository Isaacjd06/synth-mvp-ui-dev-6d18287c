import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubscriptionBannerProps {
  feature?: string;
}

const SubscriptionBanner = ({ feature }: SubscriptionBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">
              {feature
                ? `Upgrade to unlock ${feature}`
                : "Unlock the full power of Synth"}
            </h4>
            <p className="text-sm text-muted-foreground font-light">
              Subscribe to access all features and automations
            </p>
          </div>
        </div>
        <Button asChild className="btn-synth gap-2 shrink-0">
          <Link to="/app/billing">
            View Plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default SubscriptionBanner;
