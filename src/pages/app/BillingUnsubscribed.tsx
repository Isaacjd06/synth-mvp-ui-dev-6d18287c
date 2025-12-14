import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Static placeholder data for locked preview
const previewSubscription = {
  planName: "—",
  billingInterval: "—",
  renewalDate: "—",
  usageLimits: {
    workflowsUsed: 0,
    workflowsLimit: 0,
    executionsUsed: 0,
    executionsLimit: 0,
  },
};

const previewInvoices = [
  { id: "INV-XXX", date: "—", amount: "—", status: "—" },
  { id: "INV-XXX", date: "—", amount: "—", status: "—" },
];

const BillingUnsubscribed = () => {
  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 max-w-5xl mx-auto pb-32">
        
        {/* Upgrade CTA Banner */}
        <PageItem className="mb-6">
          <div className="p-6 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-foreground mb-1">
                  Unlock Billing & Subscription Management
                </p>
                <p className="text-sm text-muted-foreground">
                  Subscribe to access plan management, usage tracking, and billing history.
                </p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                Upgrade to unlock this feature
              </Button>
            </div>
          </div>
        </PageItem>

        {/* Subscription Summary Card - Locked */}
        <PageItem className="mb-6">
          <Card className="relative overflow-hidden border-t-2 border-t-primary/30 border-border/40 bg-card/80">
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="text-center px-6 py-4 rounded-lg border border-border/50 bg-card/90">
                <p className="text-sm text-muted-foreground">
                  Subscription details are available after upgrading
                </p>
              </div>
            </div>
            
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-foreground/60">
                  Subscription Summary
                </CardTitle>
                <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                  Inactive
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Plan Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/40">
                  <p className="text-xs text-muted-foreground/60 mb-1 uppercase tracking-wide">Current Plan</p>
                  <p className="text-2xl font-bold text-muted-foreground/40">{previewSubscription.planName}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/40">
                  <p className="text-xs text-muted-foreground/60 mb-1 uppercase tracking-wide">Billing Cycle</p>
                  <p className="text-lg font-semibold text-muted-foreground/40">{previewSubscription.billingInterval}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/40">
                  <p className="text-xs text-muted-foreground/60 mb-1 uppercase tracking-wide">Renewal Date</p>
                  <p className="text-lg font-semibold text-muted-foreground/40">{previewSubscription.renewalDate}</p>
                </div>
              </div>

              <Separator className="bg-border/30" />

              {/* What's Included - Locked */}
              <div>
                <p className="text-xs text-muted-foreground/60 mb-3 uppercase tracking-wide">What's Included</p>
                <ul className="space-y-2 text-sm text-muted-foreground/40">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground/30 mt-0.5">•</span>
                    <span>Up to — workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground/30 mt-0.5">•</span>
                    <span>Up to — executions per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground/30 mt-0.5">•</span>
                    <span>Workflow monitoring & insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground/30 mt-0.5">•</span>
                    <span>Error diagnostics & execution history</span>
                  </li>
                </ul>
              </div>

              <Separator className="bg-border/30" />

              {/* Usage Limits - Locked */}
              <div>
                <p className="text-xs text-muted-foreground/60 mb-4 uppercase tracking-wide">Usage This Period</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground/50">Workflows</span>
                      <span className="text-muted-foreground/40">— / —</span>
                    </div>
                    <Progress value={0} className="h-2 opacity-40" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground/50">Executions</span>
                      <span className="text-muted-foreground/40">— / —</span>
                    </div>
                    <Progress value={0} className="h-2 opacity-40" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </PageItem>

        {/* Plan Management - Locked */}
        <PageItem className="mb-6">
          <Card className="relative overflow-hidden bg-card/70 border-border/40">
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="text-center px-6 py-4 rounded-lg border border-border/50 bg-card/90">
                <p className="text-sm text-muted-foreground">
                  Plan management requires an active subscription
                </p>
              </div>
            </div>
            
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-foreground/60">
                Manage Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-foreground/50">
                    You don't have an active subscription
                  </p>
                  <p className="text-sm text-muted-foreground/50">
                    Subscribe to activate workflows and automations
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button disabled className="opacity-40">
                    Change Plan
                  </Button>
                  <Button
                    variant="outline"
                    disabled
                    className="opacity-40 border-border/40"
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </PageItem>

        {/* Payment Method - Locked */}
        <PageItem className="mb-6">
          <Card className="relative overflow-hidden bg-card/70 border-border/40">
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="text-center px-6 py-4 rounded-lg border border-border/50 bg-card/90">
                <p className="text-sm text-muted-foreground">
                  Payment method setup requires upgrading first
                </p>
              </div>
            </div>
            
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-foreground/60">
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/40">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 rounded bg-background/50 flex items-center justify-center border border-border/40">
                    <span className="text-xs font-semibold text-muted-foreground/40">CARD</span>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground/40">
                      •••• ••••
                    </p>
                    <p className="text-sm text-muted-foreground/40">
                      No card on file
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" disabled className="opacity-40 border-border/40">
                  Update
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground/40">
                Payments are securely processed by Stripe
              </p>
            </CardContent>
          </Card>
        </PageItem>

        {/* Billing History - Locked */}
        <PageItem className="mb-8">
          <Card className="relative overflow-hidden bg-card/70 border-border/40">
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="text-center px-6 py-4 rounded-lg border border-border/50 bg-card/90">
                <p className="text-sm text-muted-foreground">
                  Billing history is available to subscribers
                </p>
              </div>
            </div>
            
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-foreground/60">Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previewInvoices.map((invoice, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 px-4 rounded-lg bg-secondary/20 border border-border/30"
                  >
                    <div className="flex flex-col gap-0.5">
                      <p className="font-medium text-muted-foreground/40">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground/30">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="font-medium text-muted-foreground/40">{invoice.amount}</span>
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/30">
                        {invoice.status}
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        disabled
                        className="opacity-40"
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </PageItem>

        {/* Bottom CTA */}
        <PageItem>
          <div className="text-center py-8 border-t border-border/30">
            <p className="text-muted-foreground mb-4">
              Ready to unlock full billing and subscription features?
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Upgrade to unlock this feature
            </Button>
          </div>
        </PageItem>

      </PageTransition>
    </AppShell>
  );
};

export default BillingUnsubscribed;
