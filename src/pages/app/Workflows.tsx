import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Lock, Eye, AlertTriangle } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SubscriptionBanner from "@/components/subscription/SubscriptionBanner";
import LockedButton from "@/components/subscription/LockedButton";
import PlanLimitIndicator from "@/components/subscription/PlanLimitIndicator";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { synthToast } from "@/lib/synth-toast";
import { cn } from "@/lib/utils";

// Mock data
const initialWorkflows = [
  {
    id: "1",
    name: "Lead Intake → CRM",
    status: "active",
    lastRunTime: "2 hours ago",
  },
  {
    id: "2",
    name: "Stripe Payment Notifier",
    status: "active",
    lastRunTime: "30 min ago",
  },
  {
    id: "3",
    name: "Daily Report Generator",
    status: "active",
    lastRunTime: "Yesterday 9:00 AM",
  },
  {
    id: "4",
    name: "New Lead Autoresponder",
    status: "inactive",
    lastRunTime: "1 week ago",
  },
  {
    id: "5",
    name: "Slack Support Router",
    status: "inactive",
    lastRunTime: "Never run",
  },
];

const Workflows = () => {
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const { isSubscribed, requireSubscription, isAtLimit, planLimits, usageStats } = useSubscription();

  const handleToggleStatus = (id: string) => {
    if (!requireSubscription("activate workflows")) return;
    
    const workflow = workflows.find(w => w.id === id);
    const willBeActive = workflow ? workflow.status !== "active" : false;
    
    // Check if at workflow limit when trying to activate
    if (willBeActive && isAtLimit("workflows")) {
      synthToast.error("Workflow Limit Reached", "Upgrade your plan to activate more workflows.");
      return;
    }
    
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === "active" ? "inactive" : "active" }
          : w
      )
    );
    
    if (workflow) {
      if (willBeActive) {
        synthToast.success("Workflow Activated", `"${workflow.name}" is now running.`);
      } else {
        synthToast.warning("Workflow Paused", `"${workflow.name}" has been deactivated.`);
      }
    }
  };

  const activeCount = workflows.filter(w => w.status === "active").length;
  const maxWorkflows = planLimits?.maxWorkflows || 3;
  const isAtWorkflowLimit = isSubscribed && activeCount >= maxWorkflows;

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 space-y-8">
        {/* Subscription Banner */}
        {!isSubscribed && (
          <PageItem>
            <SubscriptionBanner feature="activate and manage workflows" />
          </PageItem>
        )}

        {/* Plan Limit Indicator for subscribed users */}
        {isSubscribed && planLimits && (
          <PageItem>
            <Card className="border-border/50">
              <CardContent className="py-4">
                <PlanLimitIndicator resource="workflows" />
              </CardContent>
            </Card>
          </PageItem>
        )}

        {/* Header */}
        <PageItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              Workflows
            </h1>
            <p className="text-muted-foreground mt-2 font-light">
              Manage your automations. Synth will optimize them over time.
            </p>
          </div>
          
          <TooltipProvider>
            {isSubscribed && !isAtWorkflowLimit ? (
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/app/chat">Create Workflow</Link>
              </Button>
            ) : isSubscribed && isAtWorkflowLimit ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="opacity-40 cursor-not-allowed" disabled>
                    <Lock className="w-3.5 h-3.5 mr-1.5" />
                    Workflow limit reached ({activeCount}/{maxWorkflows})
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Upgrade for more workflows</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <LockedButton feature="create workflows">
                Create Workflow
              </LockedButton>
            )}
          </TooltipProvider>
        </PageItem>

        {/* Empty State */}
        {workflows.length === 0 ? (
          <PageItem>
            <Card className="border-dashed border-2 border-border/50 bg-card/50">
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Workflows Yet
                </h3>
                <p className="text-muted-foreground mb-6 font-light max-w-md mx-auto">
                  Synth is ready. Create your first automation to begin optimizing your operations.
                </p>
                <LockedButton className="bg-primary hover:bg-primary/90" feature="create workflows">
                  Create Workflow
                </LockedButton>
              </CardContent>
            </Card>
          </PageItem>
        ) : (
          /* Workflows List */
          <PageItem>
            <TooltipProvider>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="divide-y divide-border/40">
                    {workflows.map((workflow) => {
                      // Show limit warning on inactive workflows if at limit
                      const showLimitWarning = isSubscribed && isAtWorkflowLimit && workflow.status === "inactive";
                      
                      return (
                        <div
                          key={workflow.id}
                          className={cn(
                            "flex items-center justify-between p-4 transition-colors",
                            !isSubscribed ? "opacity-60" : "hover:bg-muted/40"
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground truncate">
                                {workflow.name}
                              </p>
                              {!isSubscribed && (
                                <Badge variant="outline" className="text-[10px] border-muted-foreground/30 text-muted-foreground">
                                  <Eye className="w-2.5 h-2.5 mr-1" />
                                  View only
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground font-light">
                              Last run: {workflow.lastRunTime}
                            </p>
                            {showLimitWarning && (
                              <p className="text-xs text-amber-400 flex items-center gap-1 mt-1">
                                <AlertTriangle className="w-3 h-3" />
                                Upgrade to activate more workflows
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-3 ml-4">
                            <Badge
                              className={workflow.status === "active" 
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                : "bg-muted/50 text-muted-foreground border-border/50"
                              }
                            >
                              {workflow.status === "active" ? "Active" : "Inactive"}
                            </Badge>

                            {isSubscribed ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleStatus(workflow.id)}
                                disabled={showLimitWarning}
                                className={cn(
                                  "border-border/50 hover:border-primary/30",
                                  showLimitWarning && "opacity-50 cursor-not-allowed"
                                )}
                              >
                                {workflow.status === "active" ? "Deactivate" : "Activate"}
                              </Button>
                            ) : (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled
                                    className="opacity-40 cursor-not-allowed"
                                  >
                                    <Lock className="w-3 h-3 mr-1.5" />
                                    {workflow.status === "active" ? "Deactivate" : "Activate"}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Subscribe to manage workflows</p>
                                </TooltipContent>
                              </Tooltip>
                            )}

                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/app/workflows/${workflow.id}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TooltipProvider>
          </PageItem>
        )}
      </PageTransition>
    </AppShell>
  );
};

export default Workflows;
