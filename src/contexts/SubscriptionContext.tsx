import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import SubscriptionModal from "@/components/subscription/SubscriptionModal";

export type PlanTier = "starter" | "pro" | "agency" | null;

export interface PlanLimits {
  maxWorkflows: number;
  maxExecutions: number;
  logRetentionDays: number;
  hasCustomWebhooks: boolean;
  hasTeamCollaboration: boolean;
  hasWhiteLabel: boolean;
  hasApiAccess: boolean;
  hasCustomIntegrations: boolean;
  hasAdvancedIntegrations: boolean;
}

const PLAN_LIMITS: Record<PlanTier & string, PlanLimits> = {
  starter: {
    maxWorkflows: 3,
    maxExecutions: 5000,
    logRetentionDays: 7,
    hasCustomWebhooks: false,
    hasTeamCollaboration: false,
    hasWhiteLabel: false,
    hasApiAccess: false,
    hasCustomIntegrations: false,
    hasAdvancedIntegrations: false,
  },
  pro: {
    maxWorkflows: 10,
    maxExecutions: 25000,
    logRetentionDays: 30,
    hasCustomWebhooks: true,
    hasTeamCollaboration: true,
    hasWhiteLabel: false,
    hasApiAccess: false,
    hasCustomIntegrations: false,
    hasAdvancedIntegrations: true,
  },
  agency: {
    maxWorkflows: 40,
    maxExecutions: 100000,
    logRetentionDays: 90,
    hasCustomWebhooks: true,
    hasTeamCollaboration: true,
    hasWhiteLabel: true,
    hasApiAccess: true,
    hasCustomIntegrations: true,
    hasAdvancedIntegrations: true,
  },
};

export interface UsageStats {
  workflowsUsed: number;
  executionsUsed: number;
}

interface SubscriptionContextType {
  isSubscribed: boolean;
  planTier: PlanTier;
  planName: string | null;
  planLimits: PlanLimits | null;
  usageStats: UsageStats;
  setSubscribed: (subscribed: boolean, plan?: PlanTier) => void;
  setUsageStats: (stats: UsageStats) => void;
  requireSubscription: (feature?: string) => boolean;
  openSubscriptionModal: (feature?: string) => void;
  canUseFeature: (feature: keyof PlanLimits) => boolean;
  isAtLimit: (resource: "workflows" | "executions") => boolean;
  getUpgradePlanFor: (feature: keyof PlanLimits) => PlanTier;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  // Default to subscribed with pro plan for development
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [planTier, setPlanTier] = useState<PlanTier>("pro");
  const [usageStats, setUsageStats] = useState<UsageStats>({ workflowsUsed: 2, executionsUsed: 1500 });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFeature, setModalFeature] = useState<string | undefined>();

  const planLimits = planTier ? PLAN_LIMITS[planTier] : null;
  const planName = planTier ? planTier.charAt(0).toUpperCase() + planTier.slice(1) : null;

  const setSubscribed = (subscribed: boolean, plan?: PlanTier) => {
    setIsSubscribed(subscribed);
    setPlanTier(plan || null);
  };

  const openSubscriptionModal = useCallback((feature?: string) => {
    setModalFeature(feature);
    setModalOpen(true);
  }, []);

  const requireSubscription = useCallback((feature?: string): boolean => {
    if (isSubscribed) return true;
    openSubscriptionModal(feature);
    return false;
  }, [isSubscribed, openSubscriptionModal]);

  const canUseFeature = useCallback((feature: keyof PlanLimits): boolean => {
    if (!isSubscribed || !planLimits) return false;
    const value = planLimits[feature];
    return typeof value === "boolean" ? value : true;
  }, [isSubscribed, planLimits]);

  const isAtLimit = useCallback((resource: "workflows" | "executions"): boolean => {
    if (!isSubscribed || !planLimits) return true;
    if (resource === "workflows") {
      return usageStats.workflowsUsed >= planLimits.maxWorkflows;
    }
    return usageStats.executionsUsed >= planLimits.maxExecutions;
  }, [isSubscribed, planLimits, usageStats]);

  const getUpgradePlanFor = useCallback((feature: keyof PlanLimits): PlanTier => {
    if (PLAN_LIMITS.pro[feature]) return "pro";
    if (PLAN_LIMITS.agency[feature]) return "agency";
    return "starter";
  }, []);

  return (
    <SubscriptionContext.Provider value={{ 
      isSubscribed, 
      planTier,
      planName, 
      planLimits,
      usageStats,
      setSubscribed,
      setUsageStats,
      requireSubscription,
      openSubscriptionModal,
      canUseFeature,
      isAtLimit,
      getUpgradePlanFor,
    }}>
      {children}
      <SubscriptionModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        feature={modalFeature}
      />
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};
