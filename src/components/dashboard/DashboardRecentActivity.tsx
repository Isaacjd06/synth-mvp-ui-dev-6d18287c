import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, Clock, ChevronRight, PlayCircle, TrendingUp, AlertTriangle, Zap, PauseCircle, MessageSquare } from "lucide-react";

type ActivityType = "opportunity" | "warning" | "info" | "error";

interface ActivityItem {
  event: string;
  context: string;
  timestamp: string;
  type: ActivityType;
}

interface DashboardRecentActivityProps {
  activities?: ActivityItem[];
  isLoading?: boolean;
  isEmpty?: boolean;
}

const typeConfig: Record<ActivityType, { 
  icon: React.ElementType;
  iconClass: string;
  bgClass: string;
}> = {
  opportunity: {
    icon: TrendingUp,
    iconClass: "text-status-success",
    bgClass: "bg-status-success/10",
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-status-warning",
    bgClass: "bg-status-warning/10",
  },
  info: {
    icon: MessageSquare,
    iconClass: "text-primary",
    bgClass: "bg-primary/10",
  },
  error: {
    icon: PauseCircle,
    iconClass: "text-status-error",
    bgClass: "bg-status-error/10",
  },
};

const placeholderActivities: ActivityItem[] = [
  { event: "New lead detected", context: "HubSpot CRM", timestamp: "5 min ago", type: "opportunity" },
  { event: "Payment issue identified", context: "Stripe", timestamp: "12 min ago", type: "warning" },
  { event: "Spike in communication activity", context: "Slack", timestamp: "45 min ago", type: "info" },
  { event: "Automation paused", context: "Daily Report Generator", timestamp: "2 hours ago", type: "error" },
  { event: "No activity in key workflows today", context: "Lead Sync", timestamp: "3 hours ago", type: "warning" },
];

const DashboardRecentActivity = ({ 
  activities = placeholderActivities, 
  isLoading = false,
  isEmpty = false 
}: DashboardRecentActivityProps) => {
  
  if (isLoading) {
    return (
      <Card className="rounded-xl border-border/50 bg-gradient-to-br from-card to-card/80 h-full min-h-[380px]">
        <CardHeader className="pb-3 pt-4 px-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold text-foreground">
              Recent activity
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Notable changes and events across your business.
          </p>
        </CardHeader>
        <CardContent className="px-5 pb-4 pt-0 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between py-2.5 animate-pulse">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-lg bg-primary/20" />
                <Skeleton className="h-4 w-36 bg-muted/20" />
              </div>
              <Skeleton className="h-3 w-16 bg-muted/20" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-border/50 bg-gradient-to-br from-card to-card/80 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full min-h-[380px]">
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Activity className="w-4.5 h-4.5 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold text-foreground">
              Recent activity
            </CardTitle>
          </div>
          {activities.length > 0 && (
            <button className="text-xs text-primary hover:text-primary/80 font-medium transition-colors hover:underline underline-offset-2">
              View all
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Notable changes and events across your business.
        </p>
      </CardHeader>
      
      <CardContent className="px-5 pb-5 pt-0">
        {isEmpty || activities.length === 0 ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="flex items-center justify-between py-3 px-3 -mx-1 rounded-lg border border-dashed border-border/30 opacity-40"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-muted/40" />
                  <div className="h-3.5 w-28 bg-muted/30 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-muted/40" />
                  <div className="h-3 w-12 bg-muted/30 rounded" />
                </div>
              </div>
            ))}
            
            <div className="pt-4 text-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-primary/10 flex items-center justify-center mx-auto mb-3">
                <PlayCircle className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-foreground font-medium">
                No significant activity yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Activity will appear as Synth begins monitoring your systems.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {activities.map((activity, index) => {
              const config = typeConfig[activity.type];
              const IconComponent = config.icon;
              
              return (
                <button 
                  key={index} 
                  className="w-full flex items-start justify-between py-2.5 px-3 -mx-1 rounded-lg hover:bg-muted/10 transition-all duration-200 group border border-transparent hover:border-border/50 text-left"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${config.bgClass}`}>
                      <IconComponent className={`w-3.5 h-3.5 ${config.iconClass}`} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm text-foreground block truncate group-hover:text-primary transition-colors">
                        {activity.event}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {activity.context}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 mt-0.5">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.timestamp}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardRecentActivity;