import { Zap, Activity, Clock, CheckCircle, ChevronRight, Sparkles, AlertCircle } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

import DashboardWarningBanner from "@/components/dashboard/DashboardWarningBanner";
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
  { label: "Active Automations", value: stats.activeAutomations, icon: Zap },
  { label: "Total Executions", value: stats.totalExecutions.toLocaleString(), icon: Activity },
  { label: "Activity (24h)", value: stats.activity24h, icon: Clock },
  { label: "Execution Reliability", value: stats.executionReliability, icon: CheckCircle },
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
      <TooltipProvider>
        <PageTransition className="max-w-screen-xl mx-auto px-4 py-8 space-y-10">
          
          {/* 1. Subscription Warning Banner */}
          <PageItem>
            <DashboardWarningBanner />
          </PageItem>

          {/* 2. Page Header */}
          <PageItem>
            <div className="space-y-3">
              <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                Dashboard
              </h1>
              <p className="text-muted-foreground font-light text-base pl-14">
                Synth is monitoring your operations. Here's your system overview.
              </p>
            </div>
          </PageItem>

          {/* 3. Synth Suggestion Section */}
          <PageItem>
            <DashboardSuggestionCard />
          </PageItem>

          {/* Section Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />
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
                  icon={stat.icon}
                />
              ))}
            </div>
          </PageItem>

          {/* 5. Recent Activity Section */}
          <PageItem>
            <Card className="overflow-hidden rounded-2xl border-border/40 bg-gradient-to-b from-card to-synth-navy-light">
              <CardHeader className="border-b border-border/30 bg-muted/10 px-5 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2.5">
                    <Activity className="w-4.5 h-4.5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary h-8 px-3">
                    View All
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/20">
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
                  <Activity className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
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
      </TooltipProvider>
    </AppShell>
  );
};

export default Dashboard;
