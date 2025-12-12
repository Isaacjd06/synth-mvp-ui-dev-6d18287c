import { TrendingUp, Clock, CheckCircle2, Activity, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  totalRuns: number;
  avgExecutionTime: string;
  successRate: string;
  lastRun: string;
}

const AnalyticsCard = ({ totalRuns, avgExecutionTime, successRate, lastRun }: AnalyticsCardProps) => {
  const stats = [
    { 
      label: "Total Runs", 
      value: totalRuns.toLocaleString(), 
      icon: Activity,
      color: "text-primary"
    },
    { 
      label: "Avg. Execution Time", 
      value: avgExecutionTime, 
      icon: Clock,
      color: "text-yellow-400"
    },
    { 
      label: "Success Rate", 
      value: successRate, 
      icon: CheckCircle2,
      color: "text-green-400"
    },
    { 
      label: "Last Run", 
      value: lastRun, 
      icon: TrendingUp,
      color: "text-cyan-400"
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-muted-foreground" />
          Workflow Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className="p-4 rounded-xl bg-muted/20 border border-border/30 hover:border-border/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={cn("w-4 h-4", stat.color)} />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <p className="text-xl font-semibold text-foreground">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Chart Placeholder */}
        <div className="p-6 rounded-xl bg-muted/20 border border-border/30">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-foreground">Execution Timeline</p>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          {/* Mini Chart Placeholder */}
          <div className="h-24 flex items-end gap-1">
            {[40, 65, 45, 80, 55, 70, 60].map((height, i) => (
              <div 
                key={i}
                className="flex-1 bg-primary/30 rounded-t transition-all hover:bg-primary/50"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <span key={day} className="text-[10px] text-muted-foreground">
                {day}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
