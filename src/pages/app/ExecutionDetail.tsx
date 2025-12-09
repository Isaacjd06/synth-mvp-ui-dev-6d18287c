import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Clock, 
  Hash,
  ExternalLink,
  MessageSquare,
  AlertTriangle
} from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import JsonViewer from "@/components/executions/JsonViewer";
import ExecutionTimeline from "@/components/executions/ExecutionTimeline";

// Mock execution data
const mockExecutionData = {
  id: "exec_abc123xyz",
  pipedreamId: "pd_1234567890",
  workflowId: "1",
  workflowName: "Lead Intake → CRM",
  status: "error" as "success" | "error" | "running",
  startTime: "2024-12-09 14:32:15",
  endTime: "2024-12-09 14:32:17",
  duration: "2.1s",
  input: {
    email: "john.doe@example.com",
    name: "John Doe",
    company: "Acme Inc",
    source: "contact_form",
    metadata: {
      utm_source: "google",
      utm_campaign: "winter_promo",
      landing_page: "/pricing",
    },
  },
  output: {
    crmId: "CRM-12345",
    enriched: true,
    enrichmentData: {
      company_size: "50-100",
      industry: "Technology",
      linkedin: "linkedin.com/in/johndoe",
    },
    slackNotified: false,
  },
  error: {
    message: "Failed to send Slack notification: channel_not_found",
    code: "SLACK_API_ERROR",
    stack: `Error: channel_not_found
    at SlackClient.postMessage (/workflows/slack-integration.js:42:15)
    at ExecutionRunner.runStep (/core/runner.js:128:22)
    at async ExecutionRunner.execute (/core/runner.js:85:12)`,
  },
  steps: [
    { id: "s1", label: "Form Submission Received", status: "completed" as const, duration: "0.1s" },
    { id: "s2", label: "Validate Input Data", status: "completed" as const, duration: "0.2s" },
    { id: "s3", label: "Enrich with Clearbit", status: "completed" as const, duration: "1.2s" },
    { id: "s4", label: "Create CRM Contact", status: "completed" as const, duration: "0.4s" },
    { id: "s5", label: "Send Slack Notification", status: "error" as const, duration: "0.2s" },
  ],
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case "success":
      return {
        variant: "success" as const,
        icon: CheckCircle2,
        label: "Completed",
        color: "text-emerald-400",
        bgColor: "bg-emerald-400/10",
        borderColor: "border-emerald-400/30",
      };
    case "error":
      return {
        variant: "error" as const,
        icon: XCircle,
        label: "Failed",
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        borderColor: "border-destructive/30",
      };
    case "running":
      return {
        variant: "running" as const,
        icon: Loader2,
        label: "Running",
        color: "text-primary",
        bgColor: "bg-primary/10",
        borderColor: "border-primary/30",
      };
    default:
      return {
        variant: "secondary" as const,
        icon: Clock,
        label: "Unknown",
        color: "text-muted-foreground",
        bgColor: "bg-muted/10",
        borderColor: "border-border",
      };
  }
};

const ExecutionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const execution = mockExecutionData;
  const statusConfig = getStatusConfig(execution.status);
  const StatusIcon = statusConfig.icon;

  const handleFixInChat = () => {
    // Navigate to chat with context preloaded
    navigate("/app/chat", {
      state: {
        prefill: `Help me fix this workflow error: ${execution.error?.message}`,
      },
    });
  };

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-6 space-y-6 max-w-4xl">
        {/* Back Button */}
        <PageItem>
          <Button variant="ghost" size="sm" asChild className="group">
            <Link to="/app/executions" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Executions
            </Link>
          </Button>
        </PageItem>

        {/* Execution Summary Card */}
        <PageItem>
          <Card className={`${statusConfig.borderColor} ${statusConfig.bgColor}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <StatusIcon className={`w-5 h-5 ${statusConfig.color} ${execution.status === "running" ? "animate-spin" : ""}`} />
                  Execution Summary
                </CardTitle>
                <Badge variant={statusConfig.variant}>
                  {statusConfig.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Workflow Link */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Workflow</p>
                  <Link 
                    to={`/app/workflows/${execution.workflowId}`}
                    className="text-foreground font-medium hover:text-primary transition-colors flex items-center gap-2"
                  >
                    {execution.workflowName}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <Separator className="bg-border/50" />

              {/* IDs and Timestamps */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Hash className="w-3 h-3" />
                    Execution ID
                  </p>
                  <p className="text-foreground font-mono text-sm">{execution.id}</p>
                </div>
                {execution.pipedreamId && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Pipedream ID
                    </p>
                    <p className="text-foreground font-mono text-sm">{execution.pipedreamId}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    Start Time
                  </p>
                  <p className="text-foreground text-sm">{execution.startTime}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    End Time
                  </p>
                  <p className="text-foreground text-sm">{execution.endTime}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-4 p-3 rounded-lg bg-background/50 border border-border/30">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Duration</p>
                  <p className="text-lg font-mono font-medium text-foreground">{execution.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </PageItem>

        {/* Error Inspector (only if error) */}
        {execution.status === "error" && execution.error && (
          <PageItem>
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  Error Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Error Message */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Error Message</p>
                  <p className="text-destructive font-medium">{execution.error.message}</p>
                  {execution.error.code && (
                    <Badge variant="outline" className="border-destructive/30 text-destructive">
                      {execution.error.code}
                    </Badge>
                  )}
                </div>

                {/* Stack Trace */}
                {execution.error.stack && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Stack Trace</p>
                    <pre className="p-3 rounded-lg bg-background/80 border border-destructive/20 text-xs font-mono text-muted-foreground overflow-x-auto max-h-[200px]">
                      {execution.error.stack}
                    </pre>
                  </div>
                )}

                {/* Fix in Chat Button */}
                <Button onClick={handleFixInChat} className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Fix in Chat
                </Button>
              </CardContent>
            </Card>
          </PageItem>
        )}

        {/* Input Data Viewer */}
        <PageItem>
          <Card>
            <CardContent className="p-0">
              <JsonViewer data={execution.input} title="Input Data" defaultExpanded={true} />
            </CardContent>
          </Card>
        </PageItem>

        {/* Output Data Viewer */}
        <PageItem>
          <Card>
            <CardContent className="p-0">
              <JsonViewer data={execution.output} title="Output Data" defaultExpanded={true} />
            </CardContent>
          </Card>
        </PageItem>

        {/* Execution Timeline */}
        <PageItem>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Execution Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ExecutionTimeline steps={execution.steps} />
            </CardContent>
          </Card>
        </PageItem>
      </PageTransition>
    </AppShell>
  );
};

export default ExecutionDetail;