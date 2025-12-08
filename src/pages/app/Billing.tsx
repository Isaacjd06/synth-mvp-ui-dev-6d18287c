import { useNavigate } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals getting started",
    features: [
      "5 active workflows",
      "1,000 executions/month",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams",
    features: [
      "25 active workflows",
      "10,000 executions/month",
      "Priority support",
      "Advanced integrations",
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "For larger organizations",
    features: [
      "Unlimited workflows",
      "100,000 executions/month",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
  },
];

const addons = [
  {
    id: "extra-executions",
    name: "Extra Executions",
    description: "Add 10,000 additional executions to your monthly limit",
  },
  {
    id: "priority-support",
    name: "Priority Support",
    description: "Get faster response times and dedicated support",
  },
  {
    id: "onboarding",
    name: "Business Systems Jumpstart",
    description: "One-time setup assistance to get your workflows running",
  },
];

const Billing = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    navigate(`/app/checkout?plan=${planId}`);
  };

  const handleAddAddon = (addonId: string) => {
    navigate(`/app/checkout?addon=${addonId}`);
  };

  return (
    <AppShell>
      <div className="px-4 lg:px-6 py-6 space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground mt-1">
            Choose your plan to get started
          </p>
        </div>

        {/* Plans */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card key={plan.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 flex-1 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className="w-full"
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Add-ons</h2>
          <div className="space-y-3">
            {addons.map((addon) => (
              <Card key={addon.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-foreground">{addon.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {addon.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleAddAddon(addon.id)}
                  >
                    Add to Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Billing;
