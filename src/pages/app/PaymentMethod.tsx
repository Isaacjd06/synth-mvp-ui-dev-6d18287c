import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Shield, ArrowLeft, Lock, Trash2 } from "lucide-react";
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
              {hasPaymentMethod ? (
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

        {/* Stripe Elements Form */}
        <PageItem>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                {hasPaymentMethod ? "Update Payment Details" : "Add Payment Details"}
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
                  disabled={isLoading}
                >
                  <CreditCard className="w-4 h-4" />
                  {isLoading ? "Saving..." : "Save Payment Method"}
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
