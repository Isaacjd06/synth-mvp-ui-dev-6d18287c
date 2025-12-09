import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Activity, MessageSquare, Zap } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
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
type StatusKey = "success" | "running" | "error" | "failure";

const statusVariants: Record<StatusKey, "success" | "running" | "error"> = {
  success: "success",
  running: "running",
  error: "error",
  failure: "error",
};

const Executions = () => {
  const [selectedExecution, setSelectedExecution] = useState<Execution | null>(null);
  const executions = mockExecutions;

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 space-y-8">
        {/* Header */}
        <PageItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              Executions
            </h1>
            <p className="text-muted-foreground mt-2 font-light">
              Monitor your workflow activity. Synth tracks every operation.
            </p>
          </div>
        </PageItem>

        {/* Empty State */}
        {executions.length === 0 ? (
          <PageItem>
            <Card className="border-dashed border-2 border-border/50 bg-card/50">
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Activity className="w-8 h-8 text-primary/60" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Executions Found
                </h3>
                <p className="text-muted-foreground mb-2 font-light max-w-md mx-auto">
                  Your automations will appear here when they run.
                </p>
                <p className="text-sm text-muted-foreground/70 mb-6">
                  Create a workflow and Synth will begin tracking executions.
                </p>
                <div className="flex justify-center gap-3">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link to="/app/chat">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Create Workflow
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/app/workflows">
                      <Zap className="w-4 h-4 mr-2" />
                      View Workflows
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </PageItem>
        ) : (
          /* Executions List */
          <PageItem>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border/40">
                  {executions.map((execution) => (
                    <div
                      key={execution.id}
                      className="flex items-center justify-between p-4 synth-row"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {execution.workflowName}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 font-light">
                          <span>{execution.timestamp}</span>
                          <span>•</span>
                          <span className="font-mono">{execution.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 ml-4">
                        <Badge variant={statusVariants[execution.status as StatusKey]}>
                          {execution.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <Link to={`/app/executions/${execution.id}`}>
                            View Details
                          </Link>
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

      {/* Execution Details Modal */}
      <AnimatePresence>
        {selectedExecution && (
          <Dialog
            open={!!selectedExecution}
            onOpenChange={(open) => !open && setSelectedExecution(null)}
          >
            <DialogContent className="max-w-lg glass-strong border-border/50">
              <DialogHeader>
                <DialogTitle className="text-gradient">{selectedExecution.workflowName}</DialogTitle>
              </DialogHeader>

              <div className="space-y-5 mt-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground font-light">Status:</span>
                  <Badge variant={statusVariants[selectedExecution.status as StatusKey]}>
                    {selectedExecution.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground font-light">Timestamp</span>
                    <p className="text-foreground text-sm mt-1">{selectedExecution.timestamp}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground font-light">Duration</span>
                    <p className="text-foreground font-mono text-sm mt-1">{selectedExecution.duration}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground font-light">Input Data</span>
                  <pre className="mt-2 p-3 rounded-lg bg-muted/50 text-xs font-mono text-foreground overflow-x-auto border border-border/40">
                    {JSON.stringify(selectedExecution.input, null, 2)}
                  </pre>
                </div>

                {selectedExecution.output && (
                  <div>
                    <span className="text-sm text-muted-foreground font-light">Output Data</span>
                    <pre className="mt-2 p-3 rounded-lg bg-muted/50 text-xs font-mono text-foreground overflow-x-auto border border-border/40">
                      {JSON.stringify(selectedExecution.output, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedExecution.error && (
                  <div>
                    <span className="text-sm text-muted-foreground font-light">Error</span>
                    <p className="mt-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-mono border border-destructive/20">
                      {selectedExecution.error}
                    </p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </AppShell>
  );
};

export default Executions;