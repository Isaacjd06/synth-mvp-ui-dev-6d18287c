import { Link } from "react-router-dom";
import { CreditCard, Shield, ArrowLeft, Lock } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock existing card data - in production this would come from an API
const existingCard = {
  brand: "Visa",
  last4: "4242",
  expMonth: 12,
  expYear: 2026,
};

const PaymentMethod = () => {
  const handleSavePaymentMethod = () => {
    // Placeholder handler - Stripe integration will be added by Cursor
    console.log("Save payment method clicked - Stripe integration pending");
  };

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 space-y-8 max-w-2xl">
        {/* Header */}
        <PageItem>
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold text-gradient synth-header">
              Update Payment Method
            </h1>
            <p className="text-muted-foreground font-light">
              Add or update the card used for your Synth subscription.
            </p>
          </div>
        </PageItem>

        {/* Current Card on File */}
        <PageItem>
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                Current Card on File
              </CardTitle>
            </CardHeader>
            <CardContent>
              {existingCard ? (
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="w-12 h-8 rounded bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {existingCard.brand} •••• {existingCard.last4}
                    </p>
                    <p className="text-sm text-muted-foreground font-light">
                      Expires {existingCard.expMonth}/{existingCard.expYear}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Active
                  </Badge>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-muted/20 border border-border/30 text-center">
                  <p className="text-muted-foreground text-sm">
                    No payment method on file.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </PageItem>

        {/* Stripe Elements Placeholder */}
        <PageItem>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Enter New Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stripe Elements Mount Point */}
              <div 
                id="stripe-payment-element"
                className="min-h-[180px] p-6 rounded-lg bg-muted/20 border border-dashed border-border/60 flex items-center justify-center"
              >
                <div className="text-center space-y-2">
                  <CreditCard className="w-8 h-8 text-muted-foreground/50 mx-auto" />
                  <p className="text-sm text-muted-foreground/70">
                    Your secure payment form will appear here.
                  </p>
                  <p className="text-xs text-muted-foreground/50">
                    Stripe Elements integration pending
                  </p>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5 text-primary/70" />
                <span>Your payment information is encrypted and securely processed by Stripe.</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  onClick={handleSavePaymentMethod}
                  className="flex-1 gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Save Payment Method
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="gap-2"
                >
                  <Link to="/app/billing/settings">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Billing
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </PageItem>
      </PageTransition>
    </AppShell>
  );
};

export default PaymentMethod;
