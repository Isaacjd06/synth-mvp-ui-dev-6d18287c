import { createContext, useContext, useState, ReactNode } from "react";

interface SubscriptionContextType {
  isSubscribed: boolean;
  planName: string | null;
  setSubscribed: (subscribed: boolean, plan?: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [planName, setPlanName] = useState<string | null>(null);

  const setSubscribed = (subscribed: boolean, plan?: string) => {
    setIsSubscribed(subscribed);
    setPlanName(plan || null);
  };

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, planName, setSubscribed }}>
      {children}
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
