import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data
const mockExecutions = [
  {
    id: "1",
    workflowName: "Lead Intake → CRM",
    status: "success",
    timestamp: "Today, 2:45 PM",
    duration: "1.2s",
  },
  {
    id: "2",
    workflowName: "Stripe Payment Notifier",
    status: "success",
    timestamp: "Today, 1:30 PM",
    duration: "0.5s",
  },
  {
    id: "3",
    workflowName: "Slack Support Router",
    status: "error",
    timestamp: "Today, 11:20 AM",
    duration: "0.3s",
  },
  {
    id: "4",
    workflowName: "Daily Report Generator",
    status: "running",
    timestamp: "Today, 9:00 AM",
    duration: "Running...",
  },
  {
    id: "5",
    workflowName: "Lead Intake → CRM",
    status: "success",
    timestamp: "Yesterday, 4:15 PM",
    duration: "0.9s",
  },
  {
    id: "6",
    workflowName: "Contact Form Handler",
    status: "success",
    timestamp: "Yesterday, 2:00 PM",
    duration: "1.5s",
  },
  {
    id: "7",
    workflowName: "New Lead Autoresponder",
    status: "success",
    timestamp: "2 days ago",
    duration: "2.1s",
  },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "success":
      return "default";
    case "error":
      return "destructive";
    case "running":
      return "secondary";
    default:
      return "secondary";
  }
};

const Executions = () => {
  return (
    <AppShell>
      <div className="px-4 lg:px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Executions</h1>
          <p className="text-muted-foreground mt-1">Recent workflow runs</p>
        </div>

        {/* Executions List */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {mockExecutions.map((execution) => (
                <div
                  key={execution.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {execution.workflowName}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span>{execution.timestamp}</span>
                      <span>•</span>
                      <span>{execution.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    <Badge variant={getStatusVariant(execution.status)}>
                      {execution.status}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/app/workflows/${execution.id}`}>
                        Open Workflow
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default Executions;
