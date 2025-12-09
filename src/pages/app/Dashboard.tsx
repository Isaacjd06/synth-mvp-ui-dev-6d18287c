import { Link } from "react-router-dom";
import { Zap, Activity, Clock, CheckCircle, MessageSquare, Plus, ChevronRight, Sparkles } from "lucide-react";
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

const statusColors: Record<StatusKey, string> = {
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  running: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  error: "bg-red-500/10 text-red-400 border-red-500/20",
  failure: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statCards = [
  { 
    label: "Active Automations", 
    value: stats.activeWorkflows,
    icon: Zap,
    color: "text-primary",
    bgColor: "bg-primary/10 border-primary/20"
  },
  { 
    label: "Total Executions", 
    value: stats.totalExecutions.toLocaleString(),
    icon: Activity,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20"
  },
  { 
    label: "Activity (24h)", 
    value: stats.executionsLast24h,
    icon: Clock,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/20"
  },
  { 
    label: "Execution Reliability", 
    value: `${stats.successRate}%`,
    icon: CheckCircle,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10 border-cyan-500/20"
  },
];

const Dashboard = () => {
  const { isSubscribed } = useSubscription();
  const hasExecutions = recentExecutions.length > 0;
  const hasAutomations = stats.activeWorkflows > 0;

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
        <PageItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 font-light">
              Synth is monitoring your operations. Here's your system overview.
            </p>
          </div>
        </PageItem>

        {/* Statistics Grid - 2x2 */}
        <PageItem>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => (
              <Card key={stat.label} className="group relative overflow-hidden hover:border-primary/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${stat.bgColor} border flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-display font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground font-light">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageItem>

        {/* Recent Activity */}
        <PageItem>
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Recent Activity
                </CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                  <Link to="/app/executions" className="flex items-center gap-1">
                    View All
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {hasExecutions ? (
                <div className="divide-y divide-border/40">
                  {recentExecutions.map((execution) => (
                    <div
                      key={execution.id}
                      className="flex items-center justify-between py-3.5 px-5 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-sm font-medium text-foreground truncate">
                          {execution.workflow}
                        </span>
                        <Badge className={`${statusColors[execution.status as StatusKey]} text-xs`}>
                          {execution.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-xs text-muted-foreground font-mono hidden sm:block">
                          {execution.duration}
                        </span>
                        <span className="text-xs text-muted-foreground font-light">
                          {execution.timestamp}
                        </span>
                        <Button variant="ghost" size="sm" asChild className="h-7 px-2">
                          <Link to={`/app/executions/${execution.id}`}>
                            View
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground font-light mb-4">
                    No recent activity to display.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/app/chat">
                      <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                      Create your first automation
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </PageItem>

        {/* Next Suggestion Card */}
        <PageItem>
          <NextSuggestionCard />
        </PageItem>

        {/* Synth Advisory Panel */}
        <PageItem>
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardHeader className="relative">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                Synth Advisory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <p className="text-sm text-muted-foreground font-light">
                Synth is observing your workflows and ready to provide intelligent recommendations. Start a conversation to optimize your operations.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/app/chat">
                  Open Chat
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </PageItem>

        {/* Quick Actions */}
        <PageItem className="flex flex-wrap gap-3">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/app/chat">
              <Plus className="w-4 h-4 mr-1.5" />
              Create Automation
            </Link>
          </Button>
          <Button variant="outline" asChild className="border-border/50 hover:border-primary/30">
            <Link to="/app/workflows">
              <Zap className="w-4 h-4 mr-1.5" />
              View Workflows
            </Link>
          </Button>
        </PageItem>
      </PageTransition>
    </AppShell>
  );
};

export default Dashboard;