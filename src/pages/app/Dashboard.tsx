import { Zap, AlertTriangle, PlayCircle, Clock, Plus, List } from "lucide-react";
import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import DashboardSetupChecklist from "@/components/dashboard/DashboardSetupChecklist";
import DashboardRecentActivity from "@/components/dashboard/DashboardRecentActivity";
import DashboardAdvisory from "@/components/dashboard/DashboardAdvisory";

// Placeholder stat data
const statCards = [
  { 
    label: "Active automations", 
    value: 0, 
    icon: Zap,
    helper: "Enabled workflows currently running.",
    accent: false,
  },
  { 
    label: "Needs attention", 
    value: 0, 
    icon: AlertTriangle,
    helper: "Automations requiring review.",
    accent: true,
  },
  { 
    label: "Runs today", 
    value: 0, 
    icon: PlayCircle,
    helper: "Automation activity in the past 24 hours.",
    accent: false,
  },
  { 
    label: "Time saved", 
    value: "—", 
    icon: Clock,
    helper: "Estimated productivity gain.",
    accent: false,
  },
];

const Dashboard = () => {
  return (
    <AppShell>
      <TooltipProvider>
        <PageTransition className="max-w-screen-xl mx-auto px-4 py-6 space-y-5">

          {/* Page Header - Compact */}
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

          {/* TIER 1: Primary Intelligence - Two Column, Large */}
          <PageItem>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Synth Advisory - Takes 3/5 of space */}
              <div className="lg:col-span-3">
                <DashboardAdvisory />
              </div>
              {/* Recent Business Activity - Takes 2/5 of space */}
              <div className="lg:col-span-2">
                <DashboardRecentActivity />
              </div>
            </div>
          </PageItem>

          {/* TIER 2: System State - Medium */}
          <PageItem>
            <DashboardSetupChecklist />
          </PageItem>

          {/* TIER 3: Metrics - Compact */}
          <PageItem>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {statCards.map((stat) => (
                <DashboardStatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  helper={stat.helper}
                  accent={stat.accent}
                />
              ))}
            </div>
          </PageItem>

        </PageTransition>
      </TooltipProvider>
    </AppShell>
  );
};

export default Dashboard;
