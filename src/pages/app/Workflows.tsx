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
      <PageTransition className="px-4 lg:px-6 py-8 space-y-8">
        {/* Action Button */}
        <PageItem className="flex justify-end">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/app/chat">Create Workflow</Link>
          </Button>
        </PageItem>

        {/* Empty State */}
        {workflows.length === 0 ? (
          <PageItem>
            <Card className="border-dashed border-2 border-border/50 bg-card/50">
              <CardContent className="py-16 text-center">
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Workflows Yet
                </h3>
                <p className="text-muted-foreground mb-6 font-light max-w-md mx-auto">
                  Synth is ready. Create your first automation to begin optimizing your operations.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/app/chat">Create Workflow</Link>
                </Button>
              </CardContent>
            </Card>
          </PageItem>
        ) : (
          /* Workflows List */
          <PageItem>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="divide-y divide-border/40">
                  {workflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className="flex items-center justify-between p-4 transition-colors hover:bg-muted/40"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {workflow.name}
                        </p>
                        <p className="text-sm text-muted-foreground font-light">
                          Last run: {workflow.lastRunTime}
                        </p>
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

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(workflow.id)}
                          className="border-border/50 hover:border-primary/30"
                        >
                          {workflow.status === "active" ? "Deactivate" : "Activate"}
                        </Button>

                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/app/workflows/${workflow.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </PageItem>
        )}
      </PageTransition>
    </AppShell>
  );
};

export default Workflows;
