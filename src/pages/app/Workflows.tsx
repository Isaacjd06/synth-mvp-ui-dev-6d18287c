import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
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
      <div className="px-4 lg:px-6 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Workflows</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your workflows
            </p>
          </div>
          <Button asChild>
            <Link to="/app/chat">Create Workflow</Link>
          </Button>
        </div>

        {/* Empty State */}
        {workflows.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                You have no workflows yet.
              </p>
              <Button asChild>
                <Link to="/app/chat">Create Workflow</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Workflows List */
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {workflow.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last run: {workflow.lastRunTime}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 ml-4">
                      <Badge
                        variant={
                          workflow.status === "active" ? "default" : "secondary"
                        }
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
        )}
      </div>
    </AppShell>
  );
};

export default Workflows;
