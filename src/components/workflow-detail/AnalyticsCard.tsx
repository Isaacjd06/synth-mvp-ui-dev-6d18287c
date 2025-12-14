import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsCardProps {
  totalRuns: number;
  avgExecutionTime: string;
  successRate: string;
  lastRun: string;
}

const AnalyticsCard = ({ totalRuns, avgExecutionTime, successRate, lastRun }: AnalyticsCardProps) => {
  const stats = [
    { label: "Total Runs", value: totalRuns.toLocaleString() },
    { label: "Avg. Time", value: avgExecutionTime },
    { label: "Success Rate", value: successRate },
    { label: "Last Run", value: lastRun },
  ];

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="p-3 rounded-md bg-muted/20 border border-border/30"
            >
              <p className="text-xs text-muted-foreground mb-1">
                {stat.label}
              </p>
              <p className="text-lg font-medium text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="p-4 rounded-md bg-muted/20 border border-border/30">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground">Execution Timeline</p>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <div className="h-16 flex items-end gap-1">
            {[40, 65, 45, 80, 55, 70, 60].map((height, i) => (
              <div 
                key={i}
                className="flex-1 bg-primary/30 rounded-t transition-all hover:bg-primary/50"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <span key={i} className="text-[10px] text-muted-foreground flex-1 text-center">
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
