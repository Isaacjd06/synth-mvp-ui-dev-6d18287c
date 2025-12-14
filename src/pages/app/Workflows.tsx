import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  const handleToggleStatus = (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    const willBeActive = workflow ? workflow.status !== "active" : false;
    
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

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 space-y-6">
        {/* Page Header */}
        <PageItem className="space-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-light">
                Automations Synth has created and manages on your behalf.
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <Link to="/app/chat">New via Chat</Link>
            </Button>
          </div>
        </PageItem>

        {/* Empty State */}
        {workflows.length === 0 ? (
          <PageItem>
            <Card className="border border-border/40 bg-card/50">
              <CardContent className="py-16 text-center">
                <h3 className="text-base font-medium text-foreground mb-2">
                  No Workflows Yet
                </h3>
                <p className="text-sm text-muted-foreground mb-6 font-light max-w-md mx-auto">
                  Synth will create automations as you describe what you need in Chat.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild 
                  className="border-border/50"
                >
                  <Link to="/app/chat">Open Chat</Link>
                </Button>
              </CardContent>
            </Card>
          </PageItem>
        ) : (
          /* Workflows List */
          <PageItem>
            <div className="space-y-2">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-card/40 transition-colors hover:bg-card/60"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {workflow.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-light mt-0.5">
                      Last run: {workflow.lastRunTime}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    <span 
                      className={cn(
                        "text-xs px-2 py-0.5 rounded",
                        workflow.status === "active" 
                          ? "text-green-400 bg-green-500/10" 
                          : "text-muted-foreground bg-muted/30"
                      )}
                    >
                      {workflow.status === "active" ? "Active" : "Inactive"}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(workflow.id)}
                      className="text-xs text-muted-foreground hover:text-foreground h-7"
                    >
                      {workflow.status === "active" ? "Pause" : "Activate"}
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild 
                      className="text-xs h-7"
                    >
                      <Link to={`/app/workflows/${workflow.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </PageItem>
        )}
      </PageTransition>
    </AppShell>
  );
};

export default Workflows;
