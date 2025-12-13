import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Lightbulb, AlertTriangle, Info, ChevronRight, Zap, Unplug, Link2Off, Clock } from "lucide-react";

type AdvisorySeverity = "info" | "warning" | "important";

interface AdvisoryItem {
  id: string;
  title: string;
  description: string;
  severity: AdvisorySeverity;
  action: string;
  icon: React.ElementType;
}

interface DashboardAdvisoryProps {
  items?: AdvisoryItem[];
  isLoading?: boolean;
  isEmpty?: boolean;
}

const severityConfig: Record<AdvisorySeverity, { 
  dot: string; 
  label: string; 
  labelClass: string;
  bg: string;
}> = {
  info: { 
    dot: "bg-primary shadow-sm shadow-primary/50", 
    label: "Info", 
    labelClass: "text-primary bg-primary/10 border-primary/20",
    bg: "hover:bg-primary/5"
  },
  warning: { 
    dot: "bg-status-warning shadow-sm shadow-status-warning/50", 
    label: "Attention", 
    labelClass: "text-status-warning bg-status-warning/10 border-status-warning/20",
    bg: "hover:bg-status-warning/5"
  },
  important: { 
    dot: "bg-status-error shadow-sm shadow-status-error/50", 
    label: "Important", 
    labelClass: "text-status-error bg-status-error/10 border-status-error/20",
    bg: "hover:bg-status-error/5"
  },
};

const placeholderItems: AdvisoryItem[] = [
  {
    id: "1",
    title: "A connected app is not used in any workflows",
    description: "Notion has been connected for 14 days but isn't part of any automation.",
    severity: "warning",
    action: "Review",
    icon: Unplug,
  },
  {
    id: "2",
    title: "Critical workflow depends on paused connection",
    description: "Invoice Processor relies on Stripe which is currently disconnected.",
    severity: "important",
    action: "Investigate",
    icon: Link2Off,
  },
  {
    id: "3",
    title: "Manual activity detected that may be automatable",
    description: "Repeated CRM updates suggest an opportunity for automation.",
    severity: "info",
    action: "Explore",
    icon: Zap,
  },
  {
    id: "4",
    title: "Workflow hasn't run successfully in several days",
    description: "Daily Report Generator last succeeded 5 days ago.",
    severity: "warning",
    action: "Check",
    icon: Clock,
  },
  {
    id: "5",
    title: "Optimization opportunity detected",
    description: "Lead sync workflow could benefit from deduplication logic.",
    severity: "info",
    action: "Review",
    icon: Lightbulb,
  },
];

const DashboardAdvisory = ({ 
  items = placeholderItems, 
  isLoading = false,
  isEmpty = false 
}: DashboardAdvisoryProps) => {
  
  if (isLoading) {
    return (
      <Card className="rounded-xl border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-lg shadow-primary/5 h-full min-h-[380px]">
        <CardHeader className="pb-3 pt-4 px-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold text-foreground">
              Synth advisory
            </CardTitle>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Insights, risks, and opportunities detected across your systems.
          </p>
        </CardHeader>
        <CardContent className="px-5 pb-4 pt-0 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="py-3 space-y-2 animate-pulse">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-lg bg-primary/20" />
                <Skeleton className="h-4 w-48 bg-muted/20" />
              </div>
              <Skeleton className="h-3 w-64 bg-muted/20 ml-10" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full min-h-[380px]">
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center shadow-sm shadow-primary/20">
              <Brain className="w-4.5 h-4.5 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold text-foreground">
              Synth advisory
            </CardTitle>
          </div>
          <span className="text-xs text-primary/70 flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full">
            <Zap className="w-3 h-3" />
            AI-powered
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Insights, risks, and opportunities detected across your systems.
        </p>
      </CardHeader>
      
      <CardContent className="px-5 pb-5 pt-0">
        {isEmpty || items.length === 0 ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-foreground font-medium">
              Synth will surface insights as it observes activity
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[240px] mx-auto">
              Recommendations will appear as Synth monitors your connected systems and workflows.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button className="text-xs text-primary hover:text-primary/80 font-medium transition-colors hover:underline underline-offset-2">
                Connect apps
              </button>
              <span className="text-muted-foreground/30">·</span>
              <button className="text-xs text-primary hover:text-primary/80 font-medium transition-colors hover:underline underline-offset-2">
                Create workflow
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            {items.map((item) => {
              const config = severityConfig[item.severity];
              const IconComponent = item.icon;
              
              return (
                <button 
                  key={item.id} 
                  className={`w-full py-2.5 px-3 -mx-1 rounded-lg ${config.bg} transition-all duration-200 group border border-transparent hover:border-border/50 text-left`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${config.labelClass.split(' ').slice(1).join(' ')}`}>
                      <IconComponent className={`w-3.5 h-3.5 ${config.labelClass.split(' ')[0]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-sm text-foreground font-medium truncate group-hover:text-primary transition-colors">
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border shrink-0 ${config.labelClass}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 mt-0.5">
                      <span className={`text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity ${config.labelClass.split(' ')[0]}`}>
                        {item.action}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
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

export default DashboardAdvisory;