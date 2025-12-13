import { LucideIcon, TrendingUp } from "lucide-react";
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
  const hasValue = displayValue !== "—";

  return (
    <Card className="rounded-xl border-border/50 bg-gradient-to-br from-card to-card/80 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/15 transition-all duration-300">
              <Icon className="w-4 h-4 text-primary" />
            </div>
          </div>
          {hasValue && (
            <div className="flex items-center gap-1 text-xs text-status-success/80">
              <TrendingUp className="w-3 h-3" />
              <span>—</span>
            </div>
          )}
        </div>
        
        <span className="text-xs text-muted-foreground uppercase tracking-wide block mb-1">
          {label}
        </span>
        
        <p className={`text-2xl font-semibold mb-1 transition-colors ${
          hasValue ? "text-foreground" : "text-muted-foreground/50"
        }`}>
          {displayValue}
        </p>
        
        <p className="text-xs text-muted-foreground/70 mb-3">
          {desc}
        </p>
        
        <button className="text-xs text-primary hover:text-primary/80 font-medium transition-colors group-hover:underline underline-offset-2">
          View details →
        </button>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
