import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Check, ArrowRight, Crown, Zap, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  feature?: string;
}

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    period: "/month",
    icon: Zap,
    color: "slate",
    features: [
      "3 active workflows",
      "5,000 runs/month",
      "Basic integrations",
      "7-day execution logs",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$149",
    period: "/month",
    icon: Crown,
    color: "primary",
    popular: true,
    features: [
      "10 active workflows",
      "25,000 runs/month",
      "All integrations",
      "30-day execution logs",
      "Custom webhooks",
      "Team collaboration",
      "Priority support",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    price: "$399",
    period: "/month",
    icon: Building2,
    color: "cyan",
    features: [
      "40 active workflows",
      "100,000 runs/month",
      "90-day execution logs",
      "White-label options",
      "API access",
      "Custom integrations",
      "Dedicated support",
    ],
  },
];

const colorStyles = {
  slate: {
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
    text: "text-slate-300",
    icon: "text-slate-400",
    button: "bg-slate-600 hover:bg-slate-500",
  },
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/40",
    text: "text-primary",
    icon: "text-primary",
    button: "bg-primary hover:bg-primary/90",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-300",
    icon: "text-cyan-400",
    button: "bg-cyan-600 hover:bg-cyan-500",
  },
};

const SubscriptionModal = ({ open, onClose, feature }: SubscriptionModalProps) => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    onClose();
    navigate("/app/billing", { state: { selectedPlan: planId } });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl border-border/60 bg-card/95 backdrop-blur-xl overflow-hidden p-0">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="p-6">
          <DialogHeader className="relative mb-6">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)]"
            >
              <Sparkles className="w-7 h-7 text-primary drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)]" />
            </motion.div>
            <DialogTitle className="text-center text-2xl font-display font-bold text-foreground">
              Unlock More Power with Synth
            </DialogTitle>
            <p className="text-center text-sm text-muted-foreground font-light mt-2">
              {feature
                ? `Subscribe to ${feature}`
                : "Choose a plan to activate workflows, runs, and advanced features."}
            </p>
          </DialogHeader>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, index) => {
              const styles = colorStyles[plan.color as keyof typeof colorStyles];
              const Icon = plan.icon;
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={cn(
                      "relative overflow-hidden transition-all duration-300 cursor-pointer h-full",
                      "hover:scale-[1.02] hover:shadow-lg",
                      styles.bg,
                      plan.popular ? "border-primary/50 ring-1 ring-primary/20" : styles.border
                    )}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.popular && (
                      <Badge className="absolute top-0 right-0 rounded-none rounded-bl-lg bg-primary text-primary-foreground text-xs">
                        Most Popular
                      </Badge>
                    )}
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          styles.bg, styles.border, "border"
                        )}>
                          <Icon className={cn("w-4 h-4", styles.icon)} />
                        </div>
                        <h3 className="font-semibold text-foreground">{plan.name}</h3>
                      </div>
                      
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-sm text-muted-foreground">{plan.period}</span>
                      </div>
                      
                      <ul className="space-y-2 mb-5">
                        {plan.features.slice(0, 5).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <Check className={cn("w-3.5 h-3.5 shrink-0 mt-0.5", styles.icon)} />
                            <span>{feat}</span>
                          </li>
                        ))}
                        {plan.features.length > 5 && (
                          <li className="text-xs text-muted-foreground/70 pl-5">
                            +{plan.features.length - 5} more features
                          </li>
                        )}
                      </ul>
                      
                      <Button className={cn("w-full gap-2", styles.button)} size="sm">
                        Select {plan.name}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="text-sm text-muted-foreground/70 hover:text-muted-foreground transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
