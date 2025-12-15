import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { PageTransition } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ActiveConnection {
  id: string;
  name: string;
  usedFor: string;
}

const mockActiveConnections: ActiveConnection[] = [
  { id: "google-calendar", name: "Google Calendar", usedFor: "Scheduling and event management" },
  { id: "slack", name: "Slack", usedFor: "Notifications and team updates" },
];

const suggestedTools = [
  "Gmail",
  "Google Sheets",
  "Notion",
  "Stripe",
];

const Connections = () => {
  const navigate = useNavigate();
  
  // UI-ONLY: Temporary preview toggle (will be replaced by backend logic)
  const [isSubscribedPreview, setIsSubscribedPreview] = useState(true);
  
  const [activeConnections] = useState<ActiveConnection[]>(mockActiveConnections);

  return (
    <AppShell>
      <PageTransition>
        <div className="space-y-10 max-w-3xl">
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
              className="space-y-8"
            >
              {/* Gated Banner */}
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
              className="space-y-10"
            >
              {/* Page Header */}
              <div className="space-y-1">
                <h1 className="text-xl font-semibold text-foreground">Connections</h1>
                <p className="text-sm text-muted-foreground/70">
                  Synth securely connects to tools on your behalf when needed.
                </p>
              </div>

              {/* Section 1: Active Connections */}
              <section className="space-y-4">
                <h2 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-widest">
                  Active Connections
                </h2>
                
                {activeConnections.length > 0 ? (
                  <div className="space-y-3">
                    {activeConnections.map((connection) => (
                      <div
                        key={connection.id}
                        className="flex items-start justify-between rounded-lg border border-border/40 bg-card/50 px-5 py-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-foreground">
                              {connection.name}
                            </span>
                            <span className="text-[10px] font-medium text-green-500/80 uppercase tracking-wide">
                              Connected
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground/60">
                            {connection.usedFor}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground/50 py-4">
                    No active connections yet. Synth will connect tools as needed.
                  </p>
                )}
              </section>

              {/* Section 2: How Connections Work */}
              <section className="space-y-4">
                <h2 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-widest">
                  How Connections Work
                </h2>
                <div className="rounded-lg border border-border/30 bg-muted/20 px-5 py-4">
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">
                    Synth chooses and connects tools automatically based on what you ask it to do.
                    You'll only be asked for access when it's required.
                  </p>
                </div>
              </section>

              {/* Section 3: Suggested Tools */}
              <section className="space-y-4">
                <h2 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-widest">
                  Tools Synth may use
                </h2>
                <div className="flex flex-wrap gap-2">
                  {suggestedTools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs text-muted-foreground/60 border border-border/30 rounded-full px-3 py-1.5"
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
    </AppShell>
  );
};

export default Connections;
