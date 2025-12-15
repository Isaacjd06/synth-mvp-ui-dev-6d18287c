import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { PageTransition } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ActiveConnection {
  id: string;
  name: string;
  usedFor: string;
}

const initialConnections: ActiveConnection[] = [
  { id: "google-calendar", name: "Google Calendar", usedFor: "Scheduling and event management" },
  { id: "slack", name: "Slack", usedFor: "Notifications and team updates" },
];

const exampleTools = [
  "Gmail",
  "Google Sheets",
  "Notion",
  "Stripe",
  "Slack",
  "HubSpot",
];

const Connections = () => {
  const navigate = useNavigate();
  
  // UI-ONLY: Temporary preview toggle (will be replaced by backend logic)
  const [isSubscribedPreview, setIsSubscribedPreview] = useState(true);
  
  const [activeConnections, setActiveConnections] = useState<ActiveConnection[]>(initialConnections);
  const [disconnectTarget, setDisconnectTarget] = useState<ActiveConnection | null>(null);

  const handleDisconnect = (connection: ActiveConnection) => {
    setDisconnectTarget(connection);
  };

  const confirmDisconnect = () => {
    if (disconnectTarget) {
      setActiveConnections(prev => prev.filter(c => c.id !== disconnectTarget.id));
      setDisconnectTarget(null);
    }
  };

  return (
    <AppShell>
      <PageTransition>
        <div className="space-y-6 max-w-2xl">
          {/* DEV-ONLY Toggle */}
          <div className="relative z-[60]">
            <div className="flex items-center justify-between rounded-lg border border-dashed border-amber-500/40 bg-amber-500/5 px-4 py-2.5">
              <span className="text-xs font-medium text-amber-400/80 uppercase tracking-wide">
                DEV: isSubscribedPreview
              </span>
              <div className="flex items-center gap-3">
                <span className={cn("text-xs", isSubscribedPreview ? "text-muted-foreground/50" : "text-foreground/80")}>
                  False
                </span>
                <Switch 
                  checked={isSubscribedPreview} 
                  onCheckedChange={setIsSubscribedPreview}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={cn("text-xs", isSubscribedPreview ? "text-foreground/80" : "text-muted-foreground/50")}>
                  True
                </span>
              </div>
            </div>
          </div>

          {/* UNSUBSCRIBED STATE */}
          {!isSubscribedPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="rounded-lg border border-primary/20 bg-primary/5 px-6 py-5 space-y-3">
                <h2 className="text-base font-medium text-foreground">
                  Connections are available on an active plan.
                </h2>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  Synth connects tools automatically to run automations. An active plan is required for Synth to use external services.
                </p>
                <Button 
                  onClick={() => navigate("/pricing")}
                  className="mt-2"
                >
                  View Plans
                </Button>
              </div>
            </motion.div>
          )}

          {/* SUBSCRIBED STATE */}
          {isSubscribedPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Page Header */}
              <div className="space-y-1.5">
                <h1 className="text-xl font-semibold text-foreground">Connections</h1>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">
                  Synth automatically chooses and connects tools when needed. You don't need to manage integrations manually.
                </p>
              </div>

              {/* Section 1: Active Connections */}
              <section className="rounded-lg border border-border/30 bg-card/40 p-5 space-y-4">
                <div className="space-y-0.5">
                  <h2 className="text-sm font-medium text-foreground/90">
                    Active Connections
                  </h2>
                  <p className="text-xs text-muted-foreground/50">
                    These tools are currently authorized for Synth to use.
                  </p>
                </div>
                
                {activeConnections.length > 0 ? (
                  <div className="space-y-2">
                    {activeConnections.map((connection) => (
                      <div
                        key={connection.id}
                        className="flex items-start justify-between rounded-md border border-border/20 bg-background/50 px-4 py-3"
                      >
                        <div>
                          <div className="flex items-baseline gap-2.5">
                            <span className="text-sm font-medium text-foreground">
                              {connection.name}
                            </span>
                            <span className="text-[10px] text-green-500/70 uppercase tracking-wide">
                              Connected
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground/50 mt-0.5">
                            {connection.usedFor}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDisconnect(connection)}
                          className="text-xs text-muted-foreground/40 hover:text-red-400/80 transition-colors mt-0.5"
                        >
                          Disconnect
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border border-border/15 bg-muted/20 px-4 py-6 text-center">
                    <p className="text-sm font-medium text-foreground/70 mb-1">
                      No active connections yet
                    </p>
                    <p className="text-xs text-muted-foreground/50 leading-relaxed max-w-sm mx-auto">
                      Synth will connect tools automatically when you ask it to perform tasks that require them.
                    </p>
                    <p className="text-xs text-muted-foreground/40 mt-3">
                      Try asking Synth to automate something in chat to get started.
                    </p>
                  </div>
                )}
              </section>

              {/* Section 2: How Connections Work */}
              <section className="rounded-lg border border-border/30 bg-card/40 p-5 space-y-3">
                <h2 className="text-sm font-medium text-foreground/90">
                  How Connections Work
                </h2>
                <p className="text-sm text-muted-foreground/60 leading-relaxed">
                  Synth decides which tools to use based on what you ask it to do.
                  <br />
                  You'll only be asked for access when it's required to complete a task.
                </p>
              </section>

              {/* Section 3: Example Tools */}
              <section className="rounded-lg border border-border/30 bg-card/40 p-5 space-y-3">
                <div className="space-y-0.5">
                  <h2 className="text-sm font-medium text-foreground/90">
                    Examples of tools Synth can work with
                  </h2>
                  <p className="text-xs text-muted-foreground/50">
                    These are examples, not tools you need to configure.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {exampleTools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs text-muted-foreground/50 border border-border/25 bg-muted/20 rounded px-2.5 py-1"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </div>
      </PageTransition>

      {/* Disconnect Confirmation Dialog */}
      <AlertDialog open={!!disconnectTarget} onOpenChange={() => setDisconnectTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect {disconnectTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Disconnecting will revoke Synth's access to this tool.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDisconnect}
              className="bg-red-500/90 hover:bg-red-500 text-white"
            >
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
};

export default Connections;
