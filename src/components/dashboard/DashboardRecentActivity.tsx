import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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

const statusStyles: Record<ExecutionStatus, string> = {
  success: "bg-status-success/15 text-status-success border-status-success/30",
  running: "bg-primary/15 text-primary border-primary/30",
  error: "bg-status-error/15 text-status-error border-status-error/30",
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
      <Card className="rounded-xl border-border/40 bg-card">
        <CardHeader className="pb-3 pt-4 px-5">
          <CardTitle className="text-sm font-medium text-foreground">
            Recent activity
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-4 pt-0 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-32 bg-muted/30" />
                <Skeleton className="h-5 w-14 bg-muted/30 rounded-full" />
              </div>
              <Skeleton className="h-3 w-16 bg-muted/30" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-border/40 bg-card">
      <CardHeader className="pb-3 pt-4 px-5">
        <CardTitle className="text-sm font-medium text-foreground">
          Recent activity
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-5 pb-4 pt-0">
        {isEmpty || activities.length === 0 ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 opacity-30">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-32 bg-muted/40 rounded" />
                  <div className="h-5 w-14 bg-muted/40 rounded-full" />
                </div>
                <div className="h-3 w-16 bg-muted/40 rounded" />
              </div>
            ))}
            <div className="pt-3 text-center">
              <p className="text-xs text-muted-foreground">
                Activity will appear here after your first execution.
              </p>
              <button className="text-xs text-primary hover:text-primary/80 mt-2 transition-colors">
                Run test workflow
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {activities.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between py-2 px-2 -mx-2 rounded-lg hover:bg-muted/20 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-sm text-foreground truncate">
                    {activity.workflow}
                  </span>
                  <Badge className={`${statusStyles[activity.status]} text-xs px-2 py-0 font-normal`}>
                    {statusLabels[activity.status]}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                  <button className="text-xs text-primary hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardRecentActivity;
