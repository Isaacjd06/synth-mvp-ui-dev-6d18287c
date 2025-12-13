import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type AdvisorySeverity = "info" | "suggested" | "important";

interface AdvisoryItem {
  id: string;
  title: string;
  description: string;
  severity: AdvisorySeverity;
}

interface DashboardAdvisoryProps {
  items?: AdvisoryItem[];
  isLoading?: boolean;
  isEmpty?: boolean;
}

const severityStyles: Record<AdvisorySeverity, string> = {
  info: "bg-primary",
  suggested: "bg-status-warning",
  important: "bg-status-error",
};

const severityLabels: Record<AdvisorySeverity, { text: string; class: string }> = {
  info: { text: "Info", class: "text-primary" },
  suggested: { text: "Suggested", class: "text-status-warning" },
  important: { text: "Important", class: "text-status-error" },
};

const placeholderItems: AdvisoryItem[] = [
  {
    id: "1",
    title: "Lead response workflow could be faster",
    description: "Combine validation steps to reduce execution time by 40%",
    severity: "suggested",
  },
  {
    id: "2",
    title: "Daily backup running consistently",
    description: "No issues detected in the last 14 days",
    severity: "info",
  },
  {
    id: "3",
    title: "Invoice processor needs attention",
    description: "3 failed executions in the past 24 hours",
    severity: "important",
  },
];

const DashboardAdvisory = ({ 
  items = placeholderItems, 
  isLoading = false,
  isEmpty = false 
}: DashboardAdvisoryProps) => {
  
  if (isLoading) {
    return (
      <Card className="rounded-xl border-border/40 bg-card">
        <CardHeader className="pb-3 pt-4 px-5">
          <CardTitle className="text-sm font-medium text-foreground">
            Synth advisory
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Insights and recommendations based on activity.
          </p>
        </CardHeader>
        <CardContent className="px-5 pb-4 pt-0 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="py-2 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full bg-muted/30" />
                <Skeleton className="h-4 w-40 bg-muted/30" />
              </div>
              <Skeleton className="h-3 w-64 bg-muted/30 ml-4" />
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
          Synth advisory
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Insights and recommendations based on activity.
        </p>
      </CardHeader>
      
      <CardContent className="px-5 pb-4 pt-0">
        {isEmpty || items.length === 0 ? (
          <div className="py-4 text-center">
            <p className="text-xs text-muted-foreground">
              No recommendations yet.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Run a workflow to unlock insights.
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                Connect apps
              </button>
              <span className="text-muted-foreground/30">·</span>
              <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                Create workflow
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="py-2.5 px-2 -mx-2 rounded-lg hover:bg-muted/20 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${severityStyles[item.severity]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground truncate">
                        {item.title}
                      </span>
                      <span className={`text-xs shrink-0 ${severityLabels[item.severity].class}`}>
                        {severityLabels[item.severity].text}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {item.description}
                    </p>
                  </div>
                  <button className="text-xs text-primary hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    Review
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

export default DashboardAdvisory;
