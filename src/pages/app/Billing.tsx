import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { synthToast } from "@/lib/synth-toast";
import { useStripePrices, StripePlan } from "@/hooks/use-stripe-prices";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentMethodModal from "@/components/billing/PaymentMethodModal";

// Subscription type
interface SubscriptionData {
  planId: string;
  planName: string;
  status: "active" | "trialing" | "past_due" | "canceling" | "canceled";
  billingInterval: "monthly" | "yearly";
  renewalDate: string;
  trialEndDate?: string;
  ownedAddons: string[];
  usageLimits: {
    workflowsUsed: number;
    workflowsLimit: number;
    executionsUsed: number;
    executionsLimit: number;
  };
  paymentMethod: {
    type: string;
    last4: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
  };
}

// Plan feature definitions
const planFeatures: Record<string, string[]> = {
  starter: [
    "Up to 5 workflows",
    "Up to 2,000 executions per month",
    "Core automation monitoring",
    "Execution history (basic)",
    "Community support",
  ],
  pro: [
    "Up to 25 workflows",
    "Up to 10,000 executions per month",
    "Full execution history & diagnostics",
    "Workflow insights & reliability tracking",
    "Priority execution queue",
  ],
  agency: [
    "Up to 100 workflows",
    "Up to 50,000 executions per month",
    "Advanced execution analytics",
    "Higher concurrency limits",
    "Agency-grade reliability & priority",
  ],
};

// Default subscription data - always have an active subscription
const defaultSubscription: SubscriptionData = {
  planId: "pro",
  planName: "Pro",
  status: "active",
  billingInterval: "monthly",
  renewalDate: "2025-01-14",
  ownedAddons: [],
  usageLimits: {
    workflowsUsed: 8,
    workflowsLimit: 25,
    executionsUsed: 1847,
    executionsLimit: 10000,
  },
  paymentMethod: {
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2026,
  },
};

const mockInvoices = [
  { id: "INV-001", date: "2025-01-01", amount: 149, status: "paid" },
  { id: "INV-002", date: "2024-12-01", amount: 149, status: "paid" },
  { id: "INV-003", date: "2024-11-01", amount: 49, status: "paid" },
];

const mockPurchaseLog = [
  { addon: "Business Systems Jumpstart", date: "2024-12-15", amount: 500, status: "completed" },
];

const Billing = () => {
  const { plans, addons, loading: pricesLoading, error: pricesError } = useStripePrices();
  const [subscription, setSubscription] = useState<SubscriptionData>(defaultSubscription);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showStartSubscriptionModal, setShowStartSubscriptionModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cancelConfirmation, setCancelConfirmation] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [changePlanLoading, setChangePlanLoading] = useState(false);

  const isCancelConfirmValid = cancelConfirmation === "UNSUBSCRIBE";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPrice = (plan: StripePlan) => {
    return billingInterval === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getMonthlyEquivalent = (plan: StripePlan) => {
    return billingInterval === "yearly"
      ? Math.round(plan.yearlyPrice / 12)
      : plan.monthlyPrice;
  };

  const handlePlanSelect = (planId: string) => {
    // Always set the selected plan (not toggle)
    setSelectedPlan(planId);
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };
  const handleCancelSubscription = async () => {
    if (!isCancelConfirmValid) return;
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 1500));

      setIsSubscribed(false);
      setShowCancelModal(false);
      setCancelConfirmation("");
      setCancelReason("");
      synthToast.success("Subscription Canceled", "Your plan has been canceled.");
    } catch (error) {
      setErrorMessage("Failed to cancel subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartSubscription = async () => {
    if (!selectedPlan) return;
    
    // Check if payment method exists
    const hasPaymentMethod = subscription?.paymentMethod?.last4;
    
    if (!hasPaymentMethod) {
      synthToast.error("Payment Method Required", "Please add a payment method before subscribing.");
      setShowPaymentModal(true);
      return;
    }
    
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      
      const planData = plans.find(p => p.id === selectedPlan);
      if (planData) {
        setSubscription({
          ...subscription,
          planId: selectedPlan,
          planName: planData.name,
          status: "active",
          billingInterval,
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          usageLimits: {
            workflowsUsed: 0,
            workflowsLimit: selectedPlan === "starter" ? 5 : selectedPlan === "pro" ? 25 : 100,
            executionsUsed: 0,
            executionsLimit: selectedPlan === "starter" ? 1000 : selectedPlan === "pro" ? 10000 : 50000,
          },
        });
        setIsSubscribed(true);
        setShowStartSubscriptionModal(false);
        setSelectedPlan(null);
        synthToast.success("Subscription Started", `Welcome to ${planData.name}!`);
      }
    } catch (error) {
      synthToast.error("Subscription Failed", "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentMethodUpdate = (newCard: { brand: string; last4: string; expiryMonth: number; expiryYear: number }) => {
    if (subscription) {
      setSubscription({
        ...subscription,
        paymentMethod: {
          type: "card",
          last4: newCard.last4,
          brand: newCard.brand,
          expiryMonth: newCard.expiryMonth,
          expiryYear: newCard.expiryYear,
        },
      });
    }
  };

  const handleConfirmPlanChange = async () => {
    if (!selectedPlan || selectedPlan === subscription?.planId) return;
    
    setChangePlanLoading(true);
    
    try {
      // Simulate API call to change plan
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newPlan = plans.find(p => p.id === selectedPlan);
      if (newPlan && subscription) {
        // Update subscription state with new plan
        setSubscription({
          ...subscription,
          planId: selectedPlan,
          planName: newPlan.name,
        });
        
        synthToast.success("Plan Changed", `Your plan has been updated to ${newPlan.name}. Changes take effect next billing cycle.`);
        setShowChangePlanModal(false);
        setSelectedPlan(null);
      }
    } catch (error) {
      synthToast.error("Plan Change Failed", "Failed to update your plan. Please try again.");
    } finally {
      setChangePlanLoading(false);
    }
  };

  const handlePurchaseAddon = (addonId: string) => {
    const addon = addons.find((a) => a.id === addonId);
    if (addon) {
      synthToast.success("Add-on Purchased", `${addon.name} has been added to your plan.`);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      active: { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", label: "Active" },
      trialing: { color: "bg-primary/20 text-primary border-primary/30", label: "Trial" },
      past_due: { color: "bg-destructive/20 text-destructive border-destructive/30", label: "Past Due" },
      canceling: { color: "bg-amber-500/20 text-amber-400 border-amber-500/30", label: "Canceling" },
      canceled: { color: "bg-muted text-muted-foreground border-border", label: "Canceled" },
    };
    const variant = variants[status] || variants.canceled;
    return (
      <Badge variant="outline" className={variant.color}>
        {variant.label}
      </Badge>
    );
  };

  // Calculate checkout totals for the sticky footer
  const selectedPlanData = plans.find((p) => p.id === selectedPlan);
  const planTotal = selectedPlanData ? getPrice(selectedPlanData) : 0;
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addons.find((a) => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);

  // Loading skeleton for plans
  const PlanSkeleton = () => (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="text-center mb-6">
        <Skeleton className="h-6 w-24 mx-auto mb-2" />
        <Skeleton className="h-4 w-40 mx-auto" />
      </div>
      <div className="text-center mb-6">
        <Skeleton className="h-10 w-28 mx-auto mb-2" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
      <div className="space-y-3 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );

  // Loading skeleton for addons
  const AddonSkeleton = () => (
    <div className="p-5 rounded-xl border border-border">
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4 mt-1" />
    </div>
  );

  // Plan Selection Component (reusable)
  const PlanSelectionUI = ({ compact = false }: { compact?: boolean }) => (
    <>
      <div className={`text-center ${compact ? "mb-4" : "mb-6"}`}>
        {!compact && <h2 className="font-accent text-2xl text-foreground mb-4">Choose Your Plan</h2>}
        <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-secondary/50 border border-border">
          <button
            onClick={() => setBillingInterval("monthly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              billingInterval === "monthly"
                ? "bg-primary text-primary-foreground shadow-button"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval("yearly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              billingInterval === "yearly"
                ? "bg-primary text-primary-foreground shadow-button"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
              Save 20%
            </Badge>
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${compact ? "md:grid-cols-3 gap-4" : "md:grid-cols-3 gap-6"}`}>
        {pricesLoading ? (
          <>
            <PlanSkeleton />
            <PlanSkeleton />
            <PlanSkeleton />
          </>
        ) : (
          plans.map((plan) => {
            const isCurrentPlan = subscription.planId === plan.id;
            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -4 }}
                onClick={() => !isCurrentPlan && handlePlanSelect(plan.id)}
                className={`relative rounded-2xl border p-${compact ? "4" : "6"} transition-all ${
                  isCurrentPlan
                    ? "border-emerald-500/50 bg-emerald-500/5 cursor-default"
                    : selectedPlan === plan.id
                    ? "border-primary ring-2 ring-primary/30 bg-gradient-to-b from-primary/10 to-transparent cursor-pointer"
                    : plan.popular
                    ? "border-primary/50 bg-gradient-to-b from-primary/5 to-transparent hover:border-primary cursor-pointer"
                    : "border-border bg-card hover:border-primary/50 cursor-pointer"
                }`}
              >
                {isCurrentPlan && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white border-0">
                    CURRENT PLAN
                  </Badge>
                )}
                {selectedPlan === plan.id && !isCurrentPlan && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    SELECTED
                  </Badge>
                )}
                {plan.popular && selectedPlan !== plan.id && !isCurrentPlan && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-500 text-white border-0">
                    MOST POPULAR
                  </Badge>
                )}
                <div className={`text-center ${compact ? "mb-3" : "mb-6"}`}>
                  <h3 className="font-accent text-xl text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                {/* Plan features list in modal */}
                {compact && planFeatures[plan.id] && (
                  <ul className="space-y-1.5 mb-4 text-left">
                    {planFeatures[plan.id].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <span className="text-primary/70 mt-0.5">•</span>
                        <span className="text-muted-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className={`text-center ${compact ? "mb-4" : "mb-6"}`}>
                  {billingInterval === "yearly" ? (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        ${plan.monthlyPrice}/mo
                      </span>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-foreground">
                          ${getMonthlyEquivalent(plan)}
                        </span>
                        <span className="text-muted-foreground">/mo</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        (billed yearly)
                      </p>
                    </>
                  ) : (
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        ${plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  )}
                </div>
                {!compact && (
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Button
                  className={`w-full ${
                    isCurrentPlan
                      ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 cursor-default"
                      : selectedPlan === plan.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? "Current" : selectedPlan === plan.id ? "Selected" : "Select"}
                </Button>
              </motion.div>
            );
          })
        )}
      </div>
    </>
  );

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 max-w-5xl mx-auto pb-32">

        {/* Success/Error Messages */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300">{successMessage}</span>
              <button
                onClick={() => setSuccessMessage(null)}
                className="ml-auto text-emerald-400 hover:text-emerald-300"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-r from-destructive/20 to-destructive/10 border border-destructive/30 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-destructive" />
              <span className="text-red-300">{errorMessage}</span>
              <button
                onClick={() => setErrorMessage(null)}
                className="ml-auto text-destructive hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
          {pricesError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-r from-destructive/20 to-destructive/10 border border-destructive/30 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-destructive" />
              <span className="text-red-300">{pricesError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subscription Summary Card */}
        <PageItem className="mb-6">
          <Card className="border-t-2 border-t-primary/60 border-border/40 bg-card/95 shadow-[0_4px_24px_-4px_hsl(217_100%_60%/0.08)]">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-foreground/90">
                      Subscription Summary
                    </CardTitle>
                    {getStatusBadge(subscription.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plan Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/40 border border-border/60">
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Current Plan</p>
                      <p className="text-2xl font-bold text-primary">{subscription.planName}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/40 border border-border/60">
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Billing Cycle</p>
                      <p className="text-lg font-semibold text-foreground capitalize">{subscription.billingInterval}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/40 border border-border/60">
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                        Renewal Date
                      </p>
                      <p className="text-lg font-semibold text-foreground">{formatDate(subscription.renewalDate)}</p>
                    </div>
                  </div>

                  <Separator className="bg-border/40" />

                  {/* What's Included - Dynamic based on current plan */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">What's Included in {subscription.planName}</p>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {(planFeatures[subscription.planId] || planFeatures.pro).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary/80 mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator className="bg-border/40" />

                  {/* Usage Limits */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wide">
                      Usage This Period
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Workflows</span>
                          <span className="text-foreground font-medium">
                            {subscription.usageLimits.workflowsUsed} / {subscription.usageLimits.workflowsLimit}
                          </span>
                        </div>
                        <Progress 
                          value={(subscription.usageLimits.workflowsUsed / subscription.usageLimits.workflowsLimit) * 100} 
                          className="h-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Executions</span>
                          <span className="text-foreground font-medium">
                            {subscription.usageLimits.executionsUsed.toLocaleString()} / {subscription.usageLimits.executionsLimit.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={(subscription.usageLimits.executionsUsed / subscription.usageLimits.executionsLimit) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>

                  {subscription.trialEndDate && (
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                      <p className="text-primary text-sm">
                        Trial ends: {formatDate(subscription.trialEndDate)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </PageItem>

            {/* Plan Management */}
            <PageItem className="mb-6">
              <Card className="bg-card/90 border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground/90">
                    Manage Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      {isSubscribed ? (
                        <>
                          <p className="text-foreground">
                            You're currently on the <span className="font-semibold text-primary">{subscription.planName}</span> plan
                          </p>
                          <p className="text-sm text-muted-foreground/70">
                            Upgrade or downgrade your plan anytime
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-foreground">
                            You don't have an active subscription
                          </p>
                          <p className="text-sm text-muted-foreground/70">
                            Subscribe to activate workflows and automations
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {isSubscribed ? (
                        <>
                          <Button 
                            onClick={() => setShowChangePlanModal(true)} 
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Change Plan
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShowCancelModal(true)}
                            className="border-red-500/40 text-red-400/80 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/60"
                          >
                            Cancel Subscription
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => setShowStartSubscriptionModal(true)}
                          className="bg-emerald-600 text-white hover:bg-emerald-500"
                        >
                          Start Subscription
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </PageItem>

            {/* Payment Method */}
            <PageItem className="mb-6">
              <Card className="bg-card/90 border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground/90">
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/40 border border-border/60">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 rounded bg-background/80 flex items-center justify-center border border-border/60">
                        <span className="text-xs font-semibold text-foreground/80">{subscription.paymentMethod.brand.toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          •••• {subscription.paymentMethod.last4}
                        </p>
                        <p className="text-sm text-muted-foreground/70">
                          Expires {subscription.paymentMethod.expiryMonth}/{subscription.paymentMethod.expiryYear}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleOpenPaymentModal} className="border-border/60 hover:border-border">
                      Update
                    </Button>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground/60">
                    Payments are securely processed by Stripe
                  </p>
                </CardContent>
              </Card>
            </PageItem>


            {/* Billing History */}
            <PageItem className="mb-8">
              <Card className="bg-card/90 border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground/90">Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  {mockInvoices.length > 0 ? (
                    <div className="space-y-4">
                      {mockInvoices.map((invoice) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between py-4 px-4 rounded-lg bg-secondary/30 border border-border/50"
                        >
                          <div className="flex flex-col gap-0.5">
                            <p className="font-medium text-foreground">{invoice.id}</p>
                            <p className="text-sm text-muted-foreground/70">{formatDate(invoice.date)}</p>
                          </div>
                          <div className="flex items-center gap-5">
                            <span className="font-medium text-foreground">${invoice.amount}</span>
                            <span className={`text-xs font-medium uppercase tracking-wide ${
                              invoice.status === "paid"
                                ? "text-emerald-500/80"
                                : "text-amber-500/80"
                            }`}>
                              {invoice.status}
                            </span>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-muted-foreground/60 hover:text-foreground"
                            >
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground/70 py-8">No invoices yet</p>
                  )}
                </CardContent>
              </Card>
            </PageItem>

        {/* Cancel Subscription Modal */}
        <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Subscription</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Your subscription will remain active until the end of your current billing period.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <p className="text-sm text-destructive">
                  To confirm cancellation, please type <strong>UNSUBSCRIBE</strong> below:
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmation">Confirmation</Label>
                <Input
                  id="confirmation"
                  value={cancelConfirmation}
                  onChange={(e) => setCancelConfirmation(e.target.value)}
                  placeholder="Type UNSUBSCRIBE to confirm"
                  className={
                    cancelConfirmation && !isCancelConfirmValid
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for cancellation (optional)</Label>
                <Textarea
                  id="reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Tell us why you're leaving..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelConfirmation("");
                  setCancelReason("");
                }}
              >
                Keep Subscription
              </Button>
              <Button
                variant="outline"
                onClick={handleCancelSubscription}
                disabled={!isCancelConfirmValid || loading}
                className="border-destructive/50 text-destructive hover:bg-destructive/10"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Plan Modal */}
        <Dialog open={showChangePlanModal} onOpenChange={setShowChangePlanModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Change Your Plan</DialogTitle>
              <DialogDescription>
                Select a new plan. Changes will take effect at the start of your next billing cycle.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <PlanSelectionUI compact />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowChangePlanModal(false)} disabled={changePlanLoading}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirmPlanChange}
                disabled={!selectedPlan || selectedPlan === subscription?.planId || changePlanLoading}
                className="btn-synth"
              >
                {changePlanLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Confirm Change
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Start Subscription Modal */}
        <Dialog open={showStartSubscriptionModal} onOpenChange={(open) => {
          setShowStartSubscriptionModal(open);
          if (open && !isSubscribed) {
            setSelectedPlan(null);
          }
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Start Subscription</DialogTitle>
              <DialogDescription>
                Select a plan to get started with Synth.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <PlanSelectionUI compact />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowStartSubscriptionModal(false)} disabled={loading}>
                Cancel
              </Button>
              <Button
                onClick={handleStartSubscription}
                disabled={!selectedPlan || loading}
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
                variant="outline"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Start Subscription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Payment Method Modal */}
        <PaymentMethodModal
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          currentCard={subscription?.paymentMethod ? {
            brand: subscription.paymentMethod.brand,
            last4: subscription.paymentMethod.last4,
            expiryMonth: subscription.paymentMethod.expiryMonth,
            expiryYear: subscription.paymentMethod.expiryYear,
          } : null}
          onSuccess={handlePaymentMethodUpdate}
        />
      </PageTransition>

    </AppShell>
  );
};

export default Billing;
