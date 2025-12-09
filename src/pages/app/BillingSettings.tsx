import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Package,
  ArrowUpRight,
  Shield
} from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data - in production this would come from an API
const mockSubscription = {
  plan: "Pro",
  status: "active",
  renewalDate: "January 15, 2025",
  paymentMethod: {
    type: "card",
    last4: "4242",
    brand: "Visa",
  },
  addOns: [
    { name: "Extra Executions", description: "+5,000 executions/month" },
    { name: "Priority Support", description: "24/7 dedicated support" },
  ],
};

const BillingSettings = () => {
  const [subscription] = useState(mockSubscription);

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 space-y-8 max-w-3xl">
        {/* Header */}
        <PageItem>
          <h1 className="text-3xl font-display font-bold text-gradient synth-header">
            Billing Settings
          </h1>
          <p className="text-muted-foreground mt-2 font-light">
            Manage your subscription, add-ons, and payment method.
          </p>
        </PageItem>

        {/* Current Plan */}
        <PageItem>
          <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-display font-bold text-foreground">
                    {subscription.plan}
                  </span>
                  <Badge variant="success" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {subscription.status}
                  </Badge>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/app/billing" className="gap-2">
                    Upgrade Plan
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              
              <Separator className="bg-border/50" />
              
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Renews on {subscription.renewalDate}</span>
              </div>
            </CardContent>
          </Card>
        </PageItem>

        {/* Add-ons */}
        {subscription.addOns.length > 0 && (
          <PageItem>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Add-ons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {subscription.addOns.map((addon, index) => (
                  <motion.div
                    key={addon.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <div>
                      <p className="font-medium text-foreground">{addon.name}</p>
                      <p className="text-sm text-muted-foreground font-light">
                        {addon.description}
                      </p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </PageItem>
        )}

        {/* Payment Method */}
        <PageItem>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                    <CreditCard className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
                    </p>
                    <p className="text-sm text-muted-foreground font-light">
                      Default payment method
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Update
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5" />
                <span>Payments are securely processed by Stripe</span>
              </div>
            </CardContent>
          </Card>
        </PageItem>

        {/* Manage in Stripe */}
        <PageItem>
          <Card>
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="font-medium text-foreground">
                    Need more options?
                  </h4>
                  <p className="text-sm text-muted-foreground font-light">
                    View invoices, update billing info, or cancel subscription
                  </p>
                </div>
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Manage in Stripe Portal
                </Button>
              </div>
            </CardContent>
          </Card>
        </PageItem>
      </PageTransition>
    </AppShell>
  );
};

export default BillingSettings;
