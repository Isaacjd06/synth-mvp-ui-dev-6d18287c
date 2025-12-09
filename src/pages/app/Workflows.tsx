import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === "active" ? "inactive" : "active" }
          : w
      )
    );
  };

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 space-y-8">
        {/* Header */}
        <PageItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gradient synth-header">
              Workflows
            </h1>
            <p className="text-muted-foreground mt-2 font-light">
              Manage your automations. Synth will optimize them over time.
            </p>
          </div>
          <Button asChild className="btn-synth">
            <Link to="/app/chat">Create Workflow</Link>
          </Button>
        </PageItem>

        {/* Empty State */}
        {workflows.length === 0 ? (
          <PageItem>
            <Card className="border-dashed border-2">
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground mb-6 font-light">
                  Synth is ready. Create your first automation to begin optimizing your operations.
                </p>
                <Button asChild className="btn-synth">
                  <Link to="/app/chat">Create Workflow</Link>
                </Button>
              </CardContent>
            </Card>
          </PageItem>
        ) : (
          /* Workflows List */
          <PageItem>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border/30">
                  {workflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className="flex items-center justify-between p-4 synth-row"
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
                          variant={workflow.status === "active" ? "default" : "inactive"}
                        >
                          {workflow.status === "active" ? "Active" : "Inactive"}
                        </Badge>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(workflow.id)}
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