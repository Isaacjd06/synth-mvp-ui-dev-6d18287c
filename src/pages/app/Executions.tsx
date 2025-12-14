import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Mock data
const mockExecutions = [
  { id: "1", workflowName: "Lead Intake → CRM", status: "success", timestamp: "2 hours ago", duration: "1.2s" },
  { id: "2", workflowName: "Stripe Payment Notifier", status: "success", timestamp: "3 hours ago", duration: "0.5s" },
  { id: "3", workflowName: "Slack Support Router", status: "error", timestamp: "5 hours ago", duration: "0.3s" },
  { id: "4", workflowName: "Daily Report Generator", status: "running", timestamp: "Just now", duration: "—" },
  { id: "5", workflowName: "Lead Intake → CRM", status: "success", timestamp: "Yesterday", duration: "0.9s" },
];

// Gated mock data - simplified preview
const gatedExecutions = [
  { id: "1", workflowName: "Workflow Name", status: "success", timestamp: "—" },
  { id: "2", workflowName: "Workflow Name", status: "success", timestamp: "—" },
  { id: "3", workflowName: "Workflow Name", status: "error", timestamp: "—" },
  { id: "4", workflowName: "Workflow Name", status: "success", timestamp: "—" },
];

type StatusKey = "success" | "running" | "error";

const statusStyles: Record<StatusKey, string> = {
  success: "text-green-500/80",
  running: "text-amber-500/80",
  error: "text-red-500/80",
};

const statusLabels: Record<StatusKey, string> = {
  success: "Success",
  running: "Running",
  error: "Failed",
};

const Executions = () => {
  const navigate = useNavigate();
  
  // UI-ONLY: Temporary preview toggle (will be replaced by backend logic)
  const [isSubscribedPreview, setIsSubscribedPreview] = useState(true);

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 space-y-6">
        {/* DEV-ONLY Toggle - z-index above any overlay */}
        <PageItem className="relative z-[60]">
          <div className="flex items-center justify-between rounded-lg border border-dashed border-amber-500/40 bg-amber-500/5 px-4 py-2.5">
            <span className="text-xs font-medium text-amber-400/80 uppercase tracking-wide">
              DEV: Subscribed
            </span>
            <div className="flex items-center gap-3">
              <span className={cn("text-xs", isSubscribedPreview ? "text-muted-foreground/50" : "text-foreground/80")}>
                OFF
              </span>
              <Switch 
                checked={isSubscribedPreview} 
                onCheckedChange={setIsSubscribedPreview}
                className="data-[state=checked]:bg-primary"
              />
              <span className={cn("text-xs", isSubscribedPreview ? "text-foreground/80" : "text-muted-foreground/50")}>
                ON
              </span>
            </div>
          </div>
        </PageItem>

        {/* Page Description */}
        <PageItem>
          <p className="text-sm text-muted-foreground">
            {isSubscribedPreview 
              ? "A log of workflow runs managed by Synth."
              : "Execution history is available on a paid plan."
            }
          </p>
        </PageItem>

        {isSubscribedPreview ? (
          /* SUBSCRIBED STATE - Full Executions UI */
          <>
            {mockExecutions.length === 0 ? (
              <PageItem>
                <Card className="border-dashed border border-border/50 bg-card/30">
                  <CardContent className="py-16 text-center">
                    <h3 className="text-base font-medium text-foreground mb-2">No Executions Yet</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Your workflow runs will appear here once Synth begins executing automations.
                    </p>
                  </CardContent>
                </Card>
              </PageItem>
            ) : (
              <PageItem>
                <Card className="border-border/40">
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/30">
                      {mockExecutions.map((execution) => (
                        <div 
                          key={execution.id} 
                          className="flex items-center justify-between px-5 py-4 hover:bg-muted/20 transition-colors"
                        >
                          <div className="flex-1 min-w-0 space-y-1">
                            <p className="text-sm font-medium text-foreground truncate">
                              {execution.workflowName}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{execution.timestamp}</span>
                              {execution.duration !== "—" && (
                                <>
                                  <span className="text-border">•</span>
                                  <span className="font-mono">{execution.duration}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 ml-4">
                            <span className={`text-xs font-medium ${statusStyles[execution.status as StatusKey]}`}>
                              {statusLabels[execution.status as StatusKey]}
                            </span>
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground" asChild>
                              <Link to={`/app/executions/${execution.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </PageItem>
            )}
          </>
        ) : (
          /* GATED STATE - Locked preview */
          <>
            {/* Muted Execution List Preview */}
            <PageItem>
              <Card className="border-border/30 bg-card/30">
                <CardContent className="p-0">
                  <div className="divide-y divide-border/20">
                    {gatedExecutions.map((execution, index) => (
                      <div 
                        key={execution.id} 
                        className="flex items-center justify-between px-5 py-4 opacity-50"
                      >
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="text-sm font-medium text-foreground/70 truncate">
                            {execution.workflowName}
                          </p>
                          <p className="text-xs text-muted-foreground/50">
                            {execution.timestamp}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          <span className={`text-xs font-medium ${statusStyles[execution.status as StatusKey]}`}>
                            {statusLabels[execution.status as StatusKey]}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Failed execution with error hint */}
                    <div className="px-5 py-3 bg-muted/10">
                      <p className="text-xs text-muted-foreground/60 italic">
                        Error details available on paid plans
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </PageItem>

            {/* Gating Callout */}
            <PageItem>
              <Card className="border-border/50 bg-card/80">
                <CardContent className="py-8 text-center space-y-4">
                  <div>
                    <h3 className="text-base font-medium text-foreground mb-1">
                      Unlock Execution History
                    </h3>
                    <p className="text-sm text-muted-foreground/80">
                      View detailed execution logs, errors, and performance insights.
                    </p>
                  </div>
                  <Button 
                    onClick={() => navigate("/app/billing")}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    Upgrade to View Executions
                  </Button>
                </CardContent>
              </Card>
            </PageItem>
          </>
        )}
      </PageTransition>
    </AppShell>
  );
};

export default Executions;
