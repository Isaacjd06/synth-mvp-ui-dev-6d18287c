import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SubscriptionBanner from "@/components/subscription/SubscriptionBanner";
import LockedButton from "@/components/subscription/LockedButton";
import LogRetentionWarning from "@/components/subscription/LogRetentionWarning";
import { useSubscription } from "@/contexts/SubscriptionContext";

// Mock data
const mockExecutions = [
  { id: "1", workflowName: "Lead Intake → CRM", status: "success", timestamp: "Today, 2:45 PM", duration: "1.2s" },
  { id: "2", workflowName: "Stripe Payment Notifier", status: "success", timestamp: "Today, 1:30 PM", duration: "0.5s" },
  { id: "3", workflowName: "Slack Support Router", status: "error", timestamp: "Today, 11:20 AM", duration: "0.3s" },
  { id: "4", workflowName: "Daily Report Generator", status: "running", timestamp: "Today, 9:00 AM", duration: "—" },
  { id: "5", workflowName: "Lead Intake → CRM", status: "success", timestamp: "Yesterday, 4:15 PM", duration: "0.9s" },
];

type StatusKey = "success" | "running" | "error" | "failure";
const statusVariants: Record<StatusKey, "success" | "running" | "error"> = {
  success: "success", running: "running", error: "error", failure: "error",
};

const Executions = () => {
  const { isSubscribed, requireSubscription } = useSubscription();

  const handleRetryExecution = (executionId: string) => {
    if (!requireSubscription("retry executions")) return;
  };

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 space-y-8">
        {!isSubscribed && (
          <PageItem>
            <SubscriptionBanner feature="access execution tools" />
          </PageItem>
        )}


        {mockExecutions.length === 0 ? (
          <PageItem>
            <Card className="border-dashed border-2 border-border/50 bg-card/50">
              <CardContent className="py-16 text-center">
                <h3 className="text-lg font-medium text-foreground mb-2">No Executions Found</h3>
                <p className="text-muted-foreground mb-6 font-light max-w-md mx-auto">
                  Your automations will appear here when they run.
                </p>
                <div className="flex justify-center gap-3">
                  <LockedButton className="bg-primary hover:bg-primary/90" feature="create workflows">
                    Create Workflow
                  </LockedButton>
                  <Button variant="outline" asChild>
                    <Link to="/app/workflows">View Workflows</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </PageItem>
        ) : (
          <PageItem>
            <TooltipProvider>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/40">
                    {mockExecutions.map((execution) => (
                      <div key={execution.id} className="flex items-center justify-between p-4 synth-row">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{execution.workflowName}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 font-light">
                            <span>{execution.timestamp}</span>
                            <span>•</span>
                            <span className="font-mono">{execution.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <Badge variant={statusVariants[execution.status as StatusKey]}>{execution.status}</Badge>
                          {execution.status === "error" && (
                            isSubscribed ? (
                              <Button variant="outline" size="sm" onClick={() => handleRetryExecution(execution.id)}>
                                Retry
                              </Button>
                            ) : (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="sm" className="opacity-40 cursor-not-allowed locked-button" disabled>
                                    Retry
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent><p className="text-xs">Subscribe to retry executions</p></TooltipContent>
                              </Tooltip>
                            )
                          )}
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/app/executions/${execution.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TooltipProvider>
          </PageItem>
        )}

        {isSubscribed && (
          <PageItem>
            <LogRetentionWarning />
          </PageItem>
        )}
      </PageTransition>
    </AppShell>
  );
};

export default Executions;
