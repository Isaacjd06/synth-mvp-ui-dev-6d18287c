import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Play, Pencil, Trash2 } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data
const mockWorkflow = {
  id: "1",
  name: "Lead Intake → CRM",
  description: "Automatically captures leads from web forms and syncs them to your CRM with enrichment data.",
  status: "active",
  trigger: "Webhook: New form submission",
  steps: [
    "Receive webhook payload",
    "Enrich lead data with Clearbit",
    "Add contact to HubSpot CRM",
    "Send Slack notification",
  ],
};

const mockExecutions = [
  { id: "e1", status: "success", timestamp: "2 hours ago" },
  { id: "e2", status: "success", timestamp: "4 hours ago" },
  { id: "e3", status: "error", timestamp: "6 hours ago" },
  { id: "e4", status: "success", timestamp: "Yesterday" },
  { id: "e5", status: "success", timestamp: "Yesterday" },
];

const WorkflowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleRun = () => {
    toast.success("Workflow started");
  };

  const handleEdit = () => {
    navigate("/app/chat");
  };

  const handleDelete = () => {
    toast.success("Workflow deleted");
    navigate("/app/workflows");
  };

  return (
    <AppShell>
      <div className="px-4 lg:px-6 py-6 space-y-6 max-w-3xl">
        {/* Back */}
        <Button variant="ghost" size="sm" asChild>
          <Link to="/app/workflows">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workflows
          </Link>
        </Button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground">
                {mockWorkflow.name}
              </h1>
              <Badge variant={mockWorkflow.status === "active" ? "default" : "secondary"}>
                {mockWorkflow.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-muted-foreground">{mockWorkflow.description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleRun}>
            <Play className="w-4 h-4 mr-2" />
            Run Workflow
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit Workflow
          </Button>
          <Button
            variant="outline"
            className="text-destructive hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Workflow
          </Button>
        </div>

        {/* Workflow Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Workflow Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Trigger</p>
              <p className="text-foreground">{mockWorkflow.trigger}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Steps</p>
              <ol className="list-decimal list-inside space-y-1">
                {mockWorkflow.steps.map((step, index) => (
                  <li key={index} className="text-foreground">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Recent Executions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {mockExecutions.map((exec) => (
                <div
                  key={exec.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={exec.status === "success" ? "default" : "destructive"}
                    >
                      {exec.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {exec.timestamp}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/app/executions">View Execution</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default WorkflowDetail;
