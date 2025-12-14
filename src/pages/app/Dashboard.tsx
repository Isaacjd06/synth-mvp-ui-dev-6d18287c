import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import DashboardSuggestionCard from "@/components/dashboard/DashboardSuggestionCard";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import DashboardActivityRow from "@/components/dashboard/DashboardActivityRow";
import DashboardAdvisoryCard from "@/components/dashboard/DashboardAdvisoryCard";

// Placeholder data
const stats = {
  activeAutomations: 12,
  totalExecutions: 2847,
  activity24h: 156,
  executionReliability: "98.4%",
};

const statCards = [
  { label: "Active Automations", value: stats.activeAutomations },
  { label: "Total Executions", value: stats.totalExecutions.toLocaleString() },
  { label: "Activity (24h)", value: stats.activity24h },
  { label: "Execution Reliability", value: stats.executionReliability },
];

const recentActivity = [
  { workflow: "Daily Report Generator", status: "success" as const, duration: "1.2s", timestamp: "5 min ago" },
  { workflow: "Lead Sync Automation", status: "running" as const, duration: "—", timestamp: "12 min ago" },
  { workflow: "Invoice Processor", status: "success" as const, duration: "0.8s", timestamp: "45 min ago" },
  { workflow: "Email Campaign Trigger", status: "error" as const, duration: "2.1s", timestamp: "2 hours ago" },
  { workflow: "Data Backup Routine", status: "success" as const, duration: "0.5s", timestamp: "3 hours ago" },
];

const Dashboard = () => {
  return (
    <AppShell>
      <PageTransition className="max-w-screen-xl mx-auto px-4 py-10 space-y-12">

          {/* Synth Suggestion Section */}
          <PageItem>
            <DashboardSuggestionCard />
          </PageItem>

          {/* Section Divider */}
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/20" />
            </div>
          </div>

          {/* 4. Metrics Row - 4 Stat Cards */}
          <PageItem>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {statCards.map((stat) => (
                <DashboardStatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </PageItem>

          {/* 5. Recent Activity Section */}
          <PageItem>
            <Card className="overflow-hidden rounded-2xl border-border/30 bg-card">
              <CardHeader className="border-b border-border/20 px-5 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wide text-foreground/90">
                    Recent Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-muted-foreground/60 hover:text-foreground h-7 px-3 text-xs">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/10">
                  {recentActivity.map((activity, index) => (
                    <DashboardActivityRow
                      key={index}
                      workflow={activity.workflow}
                      status={activity.status}
                      duration={activity.duration}
                      timestamp={activity.timestamp}
                    />
                  ))}
                </div>
                
                {/* Hidden empty state - will be shown when no activity exists */}
                <div className="hidden py-12 text-center">
                  <p className="text-muted-foreground font-light">No workflow activity found.</p>
                </div>
              </CardContent>
            </Card>
          </PageItem>

          {/* 6. Synth Advisory Section */}
          <PageItem>
            <DashboardAdvisoryCard />
          </PageItem>

        </PageTransition>
    </AppShell>
  );
};

export default Dashboard;
