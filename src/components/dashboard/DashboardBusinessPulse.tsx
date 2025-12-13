import { TrendingUp, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type PulseStatus = "stable" | "attention" | "review";

interface DashboardBusinessPulseProps {
  summary?: string;
  status?: PulseStatus;
}

const statusConfig: Record<PulseStatus, { label: string; dotClass: string; textClass: string }> = {
  stable: {
    label: "Stable",
    dotClass: "bg-status-success",
    textClass: "text-status-success",
  },
  attention: {
    label: "Attention",
    dotClass: "bg-status-warning",
    textClass: "text-status-warning",
  },
  review: {
    label: "Review suggested",
    dotClass: "bg-primary",
    textClass: "text-primary",
  },
};

const placeholderSummaries = [
  "Your system is partially automated. Key workflows are idle today, and 2 automations require attention.",
  "Sales-related activity has increased, but automation coverage remains low.",
  "No critical issues detected, but several opportunities for automation have been identified.",
];

const DashboardBusinessPulse = ({ 
  summary = placeholderSummaries[0], 
  status = "attention" 
}: DashboardBusinessPulseProps) => {
  const config = statusConfig[status];

  return (
    <Card className="relative overflow-hidden rounded-xl border-border/50 bg-gradient-to-br from-card/90 via-card/70 to-card/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-primary/70" />
              <h3 className="text-sm font-medium text-foreground">
                Business pulse
              </h3>
            </div>
            
            {/* Subtitle */}
            <p className="text-xs text-muted-foreground mb-3">
              A real-time summary of your system's current state.
            </p>
            
            {/* Summary text */}
            <p className="text-sm text-foreground/90 leading-relaxed mb-4">
              {summary}
            </p>
            
            {/* Footer with status and action */}
            <div className="flex items-center justify-between">
              {/* Status indicator */}
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${config.dotClass} shadow-sm`} />
                <span className={`text-xs font-medium ${config.textClass}`}>
                  {config.label}
                </span>
              </div>
              
              {/* View details link */}
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors group/link">
                <span>View details</span>
                <ChevronRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardBusinessPulse;
