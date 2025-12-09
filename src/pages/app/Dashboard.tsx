import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RecentActivityFeed from "@/components/dashboard/RecentActivityFeed";
import NextSuggestionCard from "@/components/dashboard/NextSuggestionCard";
import SubscriptionBanner from "@/components/subscription/SubscriptionBanner";
import { Workflow, Zap, Activity, TrendingUp, Plus, MessageSquare, Sparkles } from "lucide-react";

// Placeholder data
const stats = {
  activeWorkflows: 12,
  totalExecutions: 2847,
  executionsLast24h: 156,
  successRate: 98.4,
};

// Mock subscription state - set to false to show banner
const hasSubscription = true;

const statCards = [
  { 
    label: "Active Automations", 
    value: stats.activeWorkflows, 
    icon: Workflow,
    color: "text-primary" 
  },
  { 
    label: "Total Executions", 
    value: stats.totalExecutions.toLocaleString(), 
    icon: Zap,
    color: "text-primary" 
  },
  { 
    label: "Activity (24h)", 
    value: stats.executionsLast24h, 
    icon: Activity,
    color: "text-primary" 
  },
  { 
    label: "Execution Reliability", 
    value: `${stats.successRate}%`, 
    icon: TrendingUp,
    color: "text-status-success" 
  },
];

const Dashboard = () => {
  return (
    <AppShell>
      <PageTransition className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
        {/* Subscription Banner */}
        <SubscriptionBanner show={!hasSubscription} />

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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => (
              <Card key={stat.label} className="group">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-3xl font-display font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageItem>

        {/* Recent Activity Feed */}
        <PageItem>
          <RecentActivityFeed />
        </PageItem>

        {/* Synth Suggestion */}
        <PageItem>
          <NextSuggestionCard />
        </PageItem>

        {/* Quick Actions */}
        <PageItem className="flex gap-3 flex-wrap">
          <Button asChild className="btn-synth gap-2">
            <Link to="/app/chat">
              <Plus className="w-4 h-4" />
              Create Automation
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link to="/app/chat">
              <MessageSquare className="w-4 h-4" />
              Consult Synth
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link to="/app/skills">
              <Sparkles className="w-4 h-4" />
              Prebuilt Skills
            </Link>
          </Button>
        </PageItem>

        {/* Empty State - shown if no workflows */}
        {stats.activeWorkflows === 0 && (
          <PageItem>
            <Card className="border-dashed border-2">
              <CardContent className="py-16 text-center">
                <Workflow className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No automations yet</h3>
                <p className="text-muted-foreground mb-6 font-light max-w-md mx-auto">
                  Synth is ready to help you build intelligent automations. Start by describing what you'd like to automate.
                </p>
                <Button asChild className="btn-synth">
                  <Link to="/app/chat">Create Your First Automation</Link>
                </Button>
              </CardContent>
            </Card>
          </PageItem>
        )}
      </PageTransition>
    </AppShell>
  );
};

export default Dashboard;