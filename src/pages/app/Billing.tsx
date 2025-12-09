import { useNavigate } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
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
      <PageTransition className="px-4 lg:px-6 py-8 space-y-10 max-w-4xl mx-auto">
        {/* Header */}
        <PageItem className="text-center">
          <h1 className="text-3xl font-display font-bold text-gradient synth-header">
            Billing
          </h1>
          <p className="text-muted-foreground mt-2 font-light">
            Select the plan that fits your automation needs
          </p>
        </PageItem>

        {/* Plans */}
        <PageItem>
          <h2 className="text-lg font-accent font-semibold text-foreground mb-5">
            Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <Card key={plan.id} className="flex flex-col h-full group">
                <CardHeader>
                  <CardTitle className="text-gradient">{plan.name}</CardTitle>
                  <CardDescription className="font-light">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1 mb-5">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5 drop-shadow-[0_0_4px_hsl(217_100%_60%/0.4)]" />
                        <span className="text-muted-foreground font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className="w-full btn-synth"
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageItem>

        {/* Add-ons */}
        <PageItem>
          <h2 className="text-lg font-accent font-semibold text-foreground mb-5">
            Add-ons
          </h2>
          <div className="space-y-3">
            {addons.map((addon) => (
              <Card key={addon.id}>
                <CardContent className="flex items-center justify-between py-5">
                  <div>
                    <p className="font-medium text-foreground">{addon.name}</p>
                    <p className="text-sm text-muted-foreground font-light">
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
        </PageItem>
      </PageTransition>
    </AppShell>
  );
};

export default Billing;