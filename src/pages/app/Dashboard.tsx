import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Placeholder data
const stats = {
  activeWorkflows: 12,
  totalExecutions: 2847,
  executionsLast24h: 156,
  successRate: 98.4,
};

const recentExecutions = [
  { id: 1, workflow: "Daily Report Generator", status: "success", timestamp: "2 min ago" },
  { id: 2, workflow: "Lead Sync", status: "running", timestamp: "5 min ago" },
  { id: 3, workflow: "Invoice Processor", status: "success", timestamp: "12 min ago" },
  { id: 4, workflow: "Email Campaign", status: "error", timestamp: "1 hour ago" },
  { id: 5, workflow: "Data Backup", status: "success", timestamp: "2 hours ago" },
];

const statusStyles: Record<string, string> = {
  success: "bg-green-500/20 text-green-400 border-green-500/30",
  running: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  error: "bg-red-500/20 text-red-400 border-red-500/30",
  failure: "bg-red-500/20 text-red-400 border-red-500/30",
};

const Dashboard = () => {
  return (
    <AppShell>
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your workflows and recent activity
          </p>
        </div>

        {/* Statistics Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Workflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{stats.activeWorkflows}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Executions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{stats.totalExecutions.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Executions (Last 24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{stats.executionsLast24h}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{stats.successRate}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Executions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Executions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentExecutions.map((execution) => (
              <div
                key={execution.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">
                    {execution.workflow}
                  </span>
                  <Badge variant="outline" className={statusStyles[execution.status]}>
                    {execution.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{execution.timestamp}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/app/executions`}>View Execution</Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Synth Advisory Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Synth Advisory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Synth is ready to provide recommendations and insights for your workflows.
            </p>
            <Button asChild>
              <Link to="/app/chat">Open Chat</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button asChild>
            <Link to="/app/workflows/new">Create Workflow</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/app/chat">Open Chat With Synth</Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
