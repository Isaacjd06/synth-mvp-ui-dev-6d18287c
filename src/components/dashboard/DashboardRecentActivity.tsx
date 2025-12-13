import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, Clock, ChevronRight, PlayCircle } from "lucide-react";

type ExecutionStatus = "success" | "running" | "error";

interface ActivityItem {
  workflow: string;
  status: ExecutionStatus;
  timestamp: string;
}

interface DashboardRecentActivityProps {
  activities?: ActivityItem[];
  isLoading?: boolean;
  isEmpty?: boolean;
}

const statusStyles: Record<ExecutionStatus, { badge: string; dot: string }> = {
  success: {
    badge: "bg-status-success/15 text-status-success border-status-success/30",
    dot: "bg-status-success shadow-sm shadow-status-success/50"
  },
  running: {
    badge: "bg-primary/15 text-primary border-primary/30",
    dot: "bg-primary shadow-sm shadow-primary/50 animate-pulse"
  },
  error: {
    badge: "bg-status-error/15 text-status-error border-status-error/30",
    dot: "bg-status-error shadow-sm shadow-status-error/50"
  },
};

const statusLabels: Record<ExecutionStatus, string> = {
  success: "Success",
  running: "Running",
  error: "Failed",
};

const DashboardRecentActivity = ({ 
  activities = [], 
  isLoading = false,
  isEmpty = false 
}: DashboardRecentActivityProps) => {
  
  if (isLoading) {
    return (
      <Card className="rounded-xl border-border/50 bg-gradient-to-br from-card to-card/80 hover:border-primary/30 transition-all duration-300">
        <CardHeader className="pb-3 pt-4 px-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium text-foreground">
              Recent activity
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-4 pt-0 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-2.5 animate-pulse">
              <div className="flex items-center gap-3">
                <Skeleton className="h-2 w-2 rounded-full bg-primary/20" />
                <Skeleton className="h-4 w-36 bg-muted/20" />
                <Skeleton className="h-5 w-16 bg-muted/20 rounded-full" />
              </div>
              <Skeleton className="h-3 w-16 bg-muted/20" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-border/50 bg-gradient-to-br from-card to-card/80 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium text-foreground">
              Recent activity
            </CardTitle>
          </div>
          {activities.length > 0 && (
            <button className="text-xs text-primary hover:text-primary/80 font-medium transition-colors hover:underline underline-offset-2">
              View all
            </button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="px-5 pb-5 pt-0">
        {isEmpty || activities.length === 0 ? (
          <div className="space-y-2">
            {/* Stylized skeleton rows */}
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="flex items-center justify-between py-3 px-3 -mx-1 rounded-lg border border-dashed border-border/30 opacity-40"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-muted/60" />
                  <div className="h-3.5 w-28 bg-muted/30 rounded" />
                  <div className="h-5 w-14 bg-muted/30 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-muted/40" />
                  <div className="h-3 w-12 bg-muted/30 rounded" />
                </div>
              </div>
            ))}
            
            {/* Empty state message */}
            <div className="pt-4 text-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-primary/10 flex items-center justify-center mx-auto mb-3">
                <PlayCircle className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">
                Activity will appear here after your first execution.
              </p>
              <button className="text-xs text-primary hover:text-primary/80 font-medium mt-2 transition-colors hover:underline underline-offset-2">
                Run test workflow →
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {activities.map((activity, index) => (
              <button 
                key={index} 
                className="w-full flex items-center justify-between py-3 px-3 -mx-1 rounded-lg hover:bg-muted/10 transition-all duration-200 group border border-transparent hover:border-border/50 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${statusStyles[activity.status].dot}`} />
                  <span className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                    {activity.workflow}
                  </span>
                  <Badge className={`${statusStyles[activity.status].badge} text-[10px] px-2 py-0 font-medium border`}>
                    {statusLabels[activity.status]}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.timestamp}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardRecentActivity;
