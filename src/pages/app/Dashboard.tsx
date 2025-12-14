import { useState } from "react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

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

const gatedStatCards = [
  { label: "Active Automations", value: "—" },
  { label: "Total Executions", value: "—" },
  { label: "Activity (24h)", value: "—" },
  { label: "Execution Reliability", value: "—" },
];

const recentActivity = [
  { workflow: "Daily Report Generator", status: "success" as const, duration: "1.2s", timestamp: "5 min ago" },
  { workflow: "Lead Sync Automation", status: "running" as const, duration: "—", timestamp: "12 min ago" },
  { workflow: "Invoice Processor", status: "success" as const, duration: "0.8s", timestamp: "45 min ago" },
  { workflow: "Email Campaign Trigger", status: "error" as const, duration: "2.1s", timestamp: "2 hours ago" },
  { workflow: "Data Backup Routine", status: "success" as const, duration: "0.5s", timestamp: "3 hours ago" },
];

const gatedActivity = [
  { workflow: "Workflow Name", status: "success" as const, duration: "—", timestamp: "—" },
  { workflow: "Workflow Name", status: "success" as const, duration: "—", timestamp: "—" },
  { workflow: "Workflow Name", status: "success" as const, duration: "—", timestamp: "—" },
];

const Dashboard = () => {
  const [isSubscribed, setIsSubscribed] = useState(true);

  return (
    <AppShell>
      <PageTransition className="max-w-screen-xl mx-auto px-4 py-10 space-y-12">

        {/* DEV-ONLY Toggle */}
        <div className="flex items-center justify-between rounded-lg border border-dashed border-amber-500/40 bg-amber-500/5 px-4 py-2.5">
          <span className="text-xs font-medium text-amber-400/80 uppercase tracking-wide">
            DEV: Subscribed State
          </span>
          <div className="flex items-center gap-3">
            <span className={cn("text-xs", isSubscribed ? "text-muted-foreground/50" : "text-foreground/80")}>
              False
            </span>
            <Switch 
              checked={isSubscribed} 
              onCheckedChange={setIsSubscribed}
              className="data-[state=checked]:bg-primary"
            />
            <span className={cn("text-xs", isSubscribed ? "text-foreground/80" : "text-muted-foreground/50")}>
              True
            </span>
          </div>
        </div>

        {/* Subscription Banner (when not subscribed) */}
        {!isSubscribed && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">You are not subscribed</p>
                <p className="text-xs text-muted-foreground/70">Upgrade to unlock full dashboard insights and automation features</p>
              </div>
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-background shrink-0">
                Upgrade Now
              </Button>
            </div>
          </div>
        )}

          {/* Synth Suggestion Section */}
          <PageItem>
            <div className={cn("relative", !isSubscribed && "pointer-events-none")}>
              {!isSubscribed && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-[2px]">
                  <p className="text-sm text-muted-foreground/80">Upgrade to unlock suggestions</p>
                </div>
              )}
              <div className={cn(!isSubscribed && "opacity-40")}>
                <DashboardSuggestionCard />
              </div>
            </div>
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
              {(isSubscribed ? statCards : gatedStatCards).map((stat) => (
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
            <div className={cn("relative", !isSubscribed && "pointer-events-none")}>
              {!isSubscribed && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-[2px]">
                  <p className="text-sm text-muted-foreground/80">Upgrade to unlock activity insights</p>
                </div>
              )}
              <div className={cn(!isSubscribed && "opacity-40")}>
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
                      {(isSubscribed ? recentActivity : gatedActivity).map((activity, index) => (
                        <DashboardActivityRow
                          key={index}
                          workflow={activity.workflow}
                          status={activity.status}
                          duration={activity.duration}
                          timestamp={activity.timestamp}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </PageItem>

          {/* 6. Synth Advisory Section */}
          <PageItem>
            <div className={cn("relative", !isSubscribed && "pointer-events-none")}>
              {!isSubscribed && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-[2px]">
                  <p className="text-sm text-muted-foreground/80">Upgrade to unlock advisory insights</p>
                </div>
              )}
              <div className={cn(!isSubscribed && "opacity-40")}>
                <DashboardAdvisoryCard />
              </div>
            </div>
          </PageItem>

        </PageTransition>
    </AppShell>
  );
};

export default Dashboard;
