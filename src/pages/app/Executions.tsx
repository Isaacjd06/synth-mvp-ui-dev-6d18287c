import { useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data
const mockExecutions = [
  {
    id: "1",
    workflowName: "Lead Intake → CRM",
    status: "success",
    timestamp: "Today, 2:45 PM",
    duration: "1.2s",
    input: { email: "user@example.com", name: "John Doe" },
    output: { crmId: "CRM-12345", status: "created" },
    error: null,
  },
  {
    id: "2",
    workflowName: "Stripe Payment Notifier",
    status: "success",
    timestamp: "Today, 1:30 PM",
    duration: "0.5s",
    input: { paymentId: "pay_abc123" },
    output: { notified: true },
    error: null,
  },
  {
    id: "3",
    workflowName: "Slack Support Router",
    status: "error",
    timestamp: "Today, 11:20 AM",
    duration: "0.3s",
    input: { ticketId: "T-789" },
    output: null,
    error: "Failed to connect to Slack API: timeout",
  },
  {
    id: "4",
    workflowName: "Daily Report Generator",
    status: "running",
    timestamp: "Today, 9:00 AM",
    duration: "—",
    input: { reportType: "daily" },
    output: null,
    error: null,
  },
  {
    id: "5",
    workflowName: "Lead Intake → CRM",
    status: "success",
    timestamp: "Yesterday, 4:15 PM",
    duration: "0.9s",
    input: { email: "jane@company.com", name: "Jane Smith" },
    output: { crmId: "CRM-12346", status: "created" },
    error: null,
  },
];

type Execution = (typeof mockExecutions)[0];

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
  const [selectedExecution, setSelectedExecution] = useState<Execution | null>(
    null
  );
  const executions = mockExecutions;

  return (
    <AppShell>
      <div className="px-4 lg:px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Executions</h1>
          <p className="text-muted-foreground mt-1">Recent workflow runs</p>
        </div>

        {/* Empty State */}
        {executions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No executions yet.</p>
              <Button asChild>
                <Link to="/app/chat">Create a Workflow</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Executions List */
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {executions.map((execution) => (
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedExecution(execution)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Execution Details Modal */}
      <Dialog
        open={!!selectedExecution}
        onOpenChange={(open) => !open && setSelectedExecution(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Execution Details</DialogTitle>
          </DialogHeader>

          {selectedExecution && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge
                    variant={getStatusVariant(selectedExecution.status)}
                    className="mt-1"
                  >
                    {selectedExecution.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="text-foreground mt-1">
                    {selectedExecution.duration}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Timestamp</p>
                  <p className="text-foreground mt-1">
                    {selectedExecution.timestamp}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-sm mb-1">Input Data</p>
                <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-32">
                  {JSON.stringify(selectedExecution.input, null, 2)}
                </pre>
              </div>

              {selectedExecution.output && (
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Output Data
                  </p>
                  <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-32">
                    {JSON.stringify(selectedExecution.output, null, 2)}
                  </pre>
                </div>
              )}

              {selectedExecution.error && (
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Error Message
                  </p>
                  <p className="text-destructive text-sm bg-destructive/10 p-3 rounded">
                    {selectedExecution.error}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
};

export default Executions;
