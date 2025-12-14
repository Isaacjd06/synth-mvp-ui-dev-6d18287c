import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data
const mockExecutions = [
  { id: "1", workflowName: "Lead Intake → CRM", status: "success", timestamp: "2 hours ago", duration: "1.2s" },
  { id: "2", workflowName: "Stripe Payment Notifier", status: "success", timestamp: "3 hours ago", duration: "0.5s" },
  { id: "3", workflowName: "Slack Support Router", status: "error", timestamp: "5 hours ago", duration: "0.3s" },
  { id: "4", workflowName: "Daily Report Generator", status: "running", timestamp: "Just now", duration: "—" },
  { id: "5", workflowName: "Lead Intake → CRM", status: "success", timestamp: "Yesterday", duration: "0.9s" },
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
  error: "Error",
};

const Executions = () => {
  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 space-y-6">
        {/* Page Description */}
        <PageItem>
          <p className="text-sm text-muted-foreground">
            A log of workflow runs managed by Synth.
          </p>
        </PageItem>

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
      </PageTransition>
    </AppShell>
  );
};

export default Executions;
