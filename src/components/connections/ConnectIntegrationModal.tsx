import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import IntegrationIcon from "./IntegrationIcon";

interface ConnectIntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integrationName: string;
  onConfirm: () => void;
}

const ConnectIntegrationModal = ({
  open,
  onOpenChange,
  integrationName,
  onConfirm,
}: ConnectIntegrationModalProps) => {
  const handleContinue = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border/60">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <IntegrationIcon app={integrationName} size="lg" />
            <DialogTitle className="text-xl font-semibold text-foreground">
              Connect {integrationName}
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            Synth will redirect you to securely authenticate this integration. Your credentials are encrypted and never stored directly.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 sm:gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-border/60 text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            className="flex-1 bg-primary hover:bg-primary/90 shadow-[0_0_20px_-5px_hsl(var(--primary))]"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectIntegrationModal;
