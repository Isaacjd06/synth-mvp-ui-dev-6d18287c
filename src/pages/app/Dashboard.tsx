import { Zap, Activity, Clock, CheckCircle, Plus, List } from "lucide-react";
import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import DashboardSetupChecklist from "@/components/dashboard/DashboardSetupChecklist";
import DashboardRecentActivity from "@/components/dashboard/DashboardRecentActivity";
import DashboardAdvisory from "@/components/dashboard/DashboardAdvisory";

// Placeholder data
const stats = {
  activeAutomations: 0,
  totalExecutions: 0,
  activity24h: 0,
  executionReliability: "—",
};

const statCards = [
  { label: "Active Automations", value: stats.activeAutomations, icon: Zap },
  { label: "Total Executions", value: stats.totalExecutions, icon: Activity },
  { label: "Activity (24h)", value: stats.activity24h, icon: Clock },
  { label: "Execution Reliability", value: stats.executionReliability, icon: CheckCircle },
];

const recentActivity = [
  { workflow: "Daily Report Generator", status: "success" as const, timestamp: "5 min ago" },
  { workflow: "Lead Sync Automation", status: "running" as const, timestamp: "12 min ago" },
  { workflow: "Invoice Processor", status: "success" as const, timestamp: "45 min ago" },
  { workflow: "Email Campaign Trigger", status: "error" as const, timestamp: "2 hours ago" },
  { workflow: "Data Backup Routine", status: "success" as const, timestamp: "3 hours ago" },
];

const Dashboard = () => {
  return (
    <AppShell>
      <TooltipProvider>
        <PageTransition className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">

          {/* Page Header */}
          <PageItem>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Dashboard
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Overview of your automations and system activity
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-3 text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link to="/app/workflows">
                    <List className="w-3.5 h-3.5 mr-1.5" />
                    View workflows
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  className="h-8 px-3 bg-primary/90 hover:bg-primary text-primary-foreground"
                  asChild
                >
                  <Link to="/app/workflows">
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Create workflow
                  </Link>
                </Button>
              </div>
            </div>
          </PageItem>

          {/* Setup Checklist */}
          <PageItem>
            <DashboardSetupChecklist />
          </PageItem>

          {/* Stats Grid */}
          <PageItem>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* Two Column Layout for Activity and Advisory */}
          <PageItem>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <DashboardAdvisory />
              <DashboardRecentActivity activities={recentActivity} />
            </div>
          </PageItem>

        </PageTransition>
      </TooltipProvider>
    </AppShell>
  );
};

export default Dashboard;
