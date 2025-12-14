import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type InsightSeverity = "error" | "warning" | "info";

export interface InsightData {
  id: string;
  title: string;
  summary: string;
  description: string;
  timestamp: string;
  severity: InsightSeverity;
  isNew?: boolean;
  category: string;
}

interface InsightCardProps {
  insight: InsightData;
}

const severityStyles: Record<InsightSeverity, { badge: string; border: string; glow: string }> = {
  error: {
    badge: "bg-destructive/10 text-red-400/80 border-destructive/25 text-[9px]",
    border: "border-destructive/20",
    glow: "shadow-[0_0_12px_-6px_hsl(0_70%_50%/0.15)]",
  },
  warning: {
    badge: "bg-yellow-500/10 text-yellow-400/80 border-yellow-500/25 text-[9px]",
    border: "border-yellow-500/20",
    glow: "shadow-[0_0_12px_-6px_hsl(45_90%_50%/0.15)]",
  },
  info: {
    badge: "bg-primary/10 text-primary/80 border-primary/25 text-[9px]",
    border: "border-primary/20",
    glow: "shadow-[0_0_12px_-6px_hsl(217_91%_60%/0.15)]",
  },
};

const InsightCard = ({ insight }: InsightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = severityStyles[insight.severity];

  return (
    <motion.div
      layout
      className={cn(
        "rounded-lg border bg-card/60 backdrop-blur-sm transition-all duration-300 overflow-hidden",
        styles.border,
        isExpanded && styles.glow
      )}
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 text-left hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge 
                variant="outline" 
                className={cn("uppercase tracking-wider font-medium px-1.5 py-0", styles.badge)}
              >
                {insight.severity}
              </Badge>
              <Badge 
                variant="outline" 
                className="text-[9px] uppercase tracking-wider font-medium bg-muted/30 text-muted-foreground/70 border-border/30 px-1.5 py-0"
              >
                {insight.category}
              </Badge>
              {insight.isNew && (
                <Badge className="bg-primary/15 text-primary/70 border-primary/25 text-[9px] px-1.5 py-0">
                  New
                </Badge>
              )}
            </div>
            <h3 className="text-sm font-semibold text-foreground/95 mb-1 line-clamp-1">
              {insight.title}
            </h3>
            <p className="text-xs text-muted-foreground/60 font-light line-clamp-1">
              {insight.summary}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] text-muted-foreground/50">
              {insight.timestamp}
            </span>
            <span className={cn(
              "text-[10px] text-muted-foreground/40 transition-transform duration-300",
              isExpanded && "rotate-180"
            )}>
              ▼
            </span>
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pt-0 border-t border-border/20">
              <div className="pt-4">
                <p className="text-[13px] text-muted-foreground/70 font-light leading-relaxed mb-4">
                  {insight.description}
                </p>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="h-7 text-xs px-3 bg-primary/80 hover:bg-primary/90">
                    Resolve Issue
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-3 text-muted-foreground/60 hover:text-muted-foreground/80">
                    View Workflow
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InsightCard;