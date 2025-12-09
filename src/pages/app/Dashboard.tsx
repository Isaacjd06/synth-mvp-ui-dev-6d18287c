import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NextSuggestionCard from "@/components/dashboard/NextSuggestionCard";
import SubscriptionBanner from "@/components/subscription/SubscriptionBanner";
import { useSubscription } from "@/contexts/SubscriptionContext";

// Placeholder data
const stats = {
  activeWorkflows: 12,
  totalExecutions: 2847,
  executionsLast24h: 156,
  successRate: 98.4,
};

const recentExecutions = [
  { id: 1, workflow: "Daily Report Generator", status: "success", timestamp: "2 min ago", duration: "1.2s" },
  { id: 2, workflow: "Lead Sync", status: "running", timestamp: "5 min ago", duration: "—" },
  { id: 3, workflow: "Invoice Processor", status: "success", timestamp: "12 min ago", duration: "0.8s" },
  { id: 4, workflow: "Email Campaign", status: "error", timestamp: "1 hour ago", duration: "2.1s" },
  { id: 5, workflow: "Data Backup", status: "success", timestamp: "2 hours ago", duration: "0.5s" },
];

type StatusKey = "success" | "running" | "error" | "failure";

const statusVariants: Record<StatusKey, "success" | "running" | "error"> = {
  success: "success",
  running: "running",
  error: "error",
  failure: "error",
};

const Dashboard = () => {
  const { isSubscribed } = useSubscription();

  return (
    <AppShell>
      <PageTransition className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
        {/* Subscription Banner */}
        {!isSubscribed && (
          <PageItem>
            <SubscriptionBanner />
          </PageItem>
        )}

        {/* Page Header */}
        <PageItem>
          <h1 className="text-3xl font-display font-bold text-gradient synth-header">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 font-light">
            Synth is monitoring your operations. Here's your system overview.
          </p>
        </PageItem>

        {/* Statistics Grid - 2x2 */}
        <PageItem>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Active Automations", value: stats.activeWorkflows },
              { label: "Total Executions", value: stats.totalExecutions.toLocaleString() },
              { label: "Activity (24h)", value: stats.executionsLast24h },
              { label: "Execution Reliability", value: `${stats.successRate}%` },
            ].map((stat) => (
              <Card key={stat.label} className="group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground font-light">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageItem>

        {/* Recent Activity */}
        <PageItem>
          <Card>
            <CardHeader>
              <CardTitle className="text-gradient">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentExecutions.map((execution) => (
                <div
                  key={execution.id}
                  className="flex items-center justify-between py-3 px-3 -mx-3 rounded-lg synth-row border-b border-border/30 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">
                      {execution.workflow}
                    </span>
                    <Badge variant={statusVariants[execution.status as StatusKey]}>
                      {execution.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground font-mono">{execution.duration}</span>
                    <span className="text-sm text-muted-foreground font-light">{execution.timestamp}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/app/executions`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </PageItem>

        {/* Next Suggestion Card */}
        <PageItem>
          <NextSuggestionCard />
        </PageItem>

        {/* Synth Advisory Panel */}
        <PageItem>
          <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
            <CardHeader>
              <CardTitle className="text-gradient">Synth Advisory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground font-light">
                Synth is observing your workflows and ready to provide intelligent recommendations. Start a conversation to optimize your operations.
              </p>
              <Button asChild className="btn-synth">
                <Link to="/app/chat">Open Chat</Link>
              </Button>
            </CardContent>
          </Card>
        </PageItem>

        {/* Quick Actions */}
        <PageItem className="flex gap-3">
          <Button asChild className="btn-synth">
            <Link to="/app/workflows/new">Create Automation</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/app/chat">Consult Synth</Link>
          </Button>
        </PageItem>
      </PageTransition>
    </AppShell>
  );
};

export default Dashboard;