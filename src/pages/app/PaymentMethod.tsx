import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Shield, ArrowLeft, Lock, Trash2, CheckCircle2, AlertCircle, RefreshCw, Calendar, CreditCard as CardIcon } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock existing card data - in production this would come from Stripe API
const existingCard = {
  brand: "Visa",
  last4: "4242",
  expMonth: 12,
  expYear: 2026,
};

const PaymentMethod = () => {
  const [hasPaymentMethod, setHasPaymentMethod] = useState(!!existingCard);
  const [isLoading, setIsLoading] = useState(false);

  const handleSavePaymentMethod = async () => {
    // Placeholder handler - Stripe integration will be added
    // This will call stripe.confirmSetup() with the PaymentElement
    setIsLoading(true);
    console.log("Save payment method clicked - Stripe integration pending");
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleRemovePaymentMethod = async () => {
    // Placeholder handler - Stripe integration will be added
    // This will call the backend to detach the payment method
    setIsLoading(true);
    console.log("Remove payment method clicked - Stripe integration pending");
    setTimeout(() => {
      setHasPaymentMethod(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <PageItem>
          <div className="space-y-2 max-w-4xl">
            <h1 className="text-3xl font-display font-bold text-gradient synth-header">
              Payment Method Settings
            </h1>
            <p className="text-muted-foreground font-light">
              Manage your payment method and understand how billing works in Synth.
            </p>
          </div>
        </PageItem>

        {/* Two-Column Layout */}
        <PageItem>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT COLUMN - Subscription System Explanation (45% on desktop) */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-display flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    How Billing Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Synth uses a flexible subscription system designed around your workflow needs.
                  </p>

                  {/* Billing Rules */}
                  <div className="space-y-5">
                    {/* Rule 1 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-sm font-medium text-primary">
                        1
                      </div>
                      <div className="space-y-1 pt-1">
                        <p className="font-medium text-foreground">Add a payment method once</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          After your payment method is saved, you can switch between plans at any time.
                        </p>
                      </div>
                    </div>

                    {/* Rule 2 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-sm font-medium text-primary">
                        2
                      </div>
                      <div className="space-y-1 pt-1">
                        <p className="font-medium text-foreground">Plan switches take effect next cycle</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          When you switch plans, your current access remains the same until your next payment processes.
                        </p>
                      </div>
                    </div>

                    {/* Rule 3 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-sm font-medium text-primary">
                        3
                      </div>
                      <div className="space-y-1 pt-1">
                        <p className="font-medium text-foreground">Change plans once every 14 days</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          This prevents rapid switching and ensures billing cycles stay predictable.
                        </p>
                      </div>
                    </div>

                    {/* Rule 4 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center text-sm font-medium text-destructive">
                        4
                      </div>
                      <div className="space-y-1 pt-1">
                        <p className="font-medium text-foreground">Failed payments pause your subscription</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          You will lose access to your paid plan until payment is successful again.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Note */}
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your current plan and your next scheduled plan will always be shown in your{" "}
                      <Link to="/app/billing" className="text-primary hover:underline">
                        Billing Dashboard
                      </Link>.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-muted/20 border border-border/30 space-y-2">
                  <Calendar className="w-5 h-5 text-primary/70" />
                  <p className="text-sm font-medium text-foreground">Monthly Billing</p>
                  <p className="text-xs text-muted-foreground">Charged on the same date each month</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/20 border border-border/30 space-y-2">
                  <RefreshCw className="w-5 h-5 text-primary/70" />
                  <p className="text-sm font-medium text-foreground">Easy Changes</p>
                  <p className="text-xs text-muted-foreground">Upgrade or downgrade anytime</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Payment Method Form (55% on desktop) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Current Card on File */}
              {hasPaymentMethod && (
                <Card className="border-border/50 bg-card/80">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-muted-foreground">
                      <CreditCard className="w-4 h-4" />
                      Current Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                      <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {existingCard.brand} •••• {existingCard.last4}
                        </p>
                        <p className="text-sm text-muted-foreground font-light">
                          Expires {existingCard.expMonth}/{existingCard.expYear}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs border-green-500/30 text-green-500">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            disabled={isLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Payment Method</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove this payment method? 
                              You'll need to add a new one to continue your subscription.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleRemovePaymentMethod}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Stripe Elements Form */}
              <Card className="border-primary/20 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    {hasPaymentMethod ? "Update Payment Method" : "Add Payment Method"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stripe Elements Mount Point
                      The PaymentElement or CardElement will be mounted here.
                      Stripe.js will replace this container's contents.
                      
                      Integration notes for Cursor:
                      1. Wrap app with Elements provider using stripe promise
                      2. Use useStripe() and useElements() hooks
                      3. Mount <PaymentElement /> or <CardElement /> inside this div
                      4. Call stripe.confirmSetup() on form submit
                  */}
                  <div 
                    id="stripe-payment-element"
                    className="min-h-[200px] p-6 rounded-xl bg-muted/20 border border-dashed border-border/60 flex items-center justify-center"
                  >
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center mx-auto">
                        <CardIcon className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground/70">
                          Secure payment form will appear here
                        </p>
                        <p className="text-xs text-muted-foreground/50">
                          Powered by Stripe
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">Your payment is secure</p>
                      <p className="text-xs text-muted-foreground">
                        All payment information is encrypted and securely processed by Stripe. We never store your full card details.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button 
                      onClick={handleSavePaymentMethod}
                      className="flex-1 gap-2 h-11"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          {hasPaymentMethod ? "Update Payment Method" : "Save Payment Method"}
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      asChild
                      className="gap-2 h-11"
                    >
                      <Link to="/app/billing/settings">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Billing
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Help Text */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground/70 px-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Having trouble? Contact support for assistance with billing issues.</span>
              </div>
            </div>
          </div>
        </PageItem>
      </PageTransition>
    </AppShell>
  );
};

export default PaymentMethod;
