import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

const descriptions: Record<string, string> = {
  "Active Automations": "Workflows currently enabled",
  "Total Executions": "All-time workflow runs",
  "Activity (24h)": "Executions in the last day",
  "Execution Reliability": "Success rate of runs",
};

const DashboardStatCard = ({ label, value, icon: Icon, description }: DashboardStatCardProps) => {
  const displayValue = value === 0 || value === "0" ? "—" : value;
  const desc = description || descriptions[label] || "";

  return (
    <Card className="rounded-xl border-border/40 bg-card hover:border-primary/30 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
        </div>
        <p className={`text-lg font-medium mb-1 ${
          displayValue === "—" ? "text-muted-foreground" : "text-foreground"
        }`}>
          {displayValue}
        </p>
        <p className="text-xs text-muted-foreground/70">
          {desc}
        </p>
        <button className="text-xs text-primary hover:text-primary/80 mt-2 transition-colors">
          View details
        </button>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
