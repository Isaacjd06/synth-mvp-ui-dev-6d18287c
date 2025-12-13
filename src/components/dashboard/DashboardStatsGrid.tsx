import { Zap, Activity, Clock, CheckCircle } from "lucide-react";
import DashboardStatCard from "./DashboardStatCard";

// Placeholder data - will be replaced with API data
const placeholderStats = {
  activeWorkflows: 12,
  totalExecutions: 2847,
  executionsLast24h: 156,
  successRate: 98.4,
};

const DashboardStatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <DashboardStatCard
        label="Active Automations"
        value={placeholderStats.activeWorkflows}
        icon={Zap}
      />
      <DashboardStatCard
        label="Total Executions"
        value={placeholderStats.totalExecutions.toLocaleString()}
        icon={Activity}
      />
      <DashboardStatCard
        label="Activity (24h)"
        value={placeholderStats.executionsLast24h}
        icon={Clock}
      />
      <DashboardStatCard
        label="Execution Reliability"
        value={`${placeholderStats.successRate}%`}
        icon={CheckCircle}
      />
    </div>
  );
};

export default DashboardStatsGrid;
