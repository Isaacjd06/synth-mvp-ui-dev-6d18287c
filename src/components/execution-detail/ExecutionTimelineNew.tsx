import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, XCircle, MinusCircle, Clock, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TimelineStep {
  id: string;
  name: string;
  status: "completed" | "error" | "skipped";
  timestamp: string;
  duration: string;
  description: string;
  details: Record<string, string>;
  logs?: string;
}

interface ExecutionTimelineNewProps {
  steps: TimelineStep[];
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: "Success",
    color: "text-green-400",
    bg: "bg-green-500/15",
    border: "border-green-500/30",
    lineColor: "bg-green-500/50",
  },
  error: {
    icon: XCircle,
    label: "Error",
    color: "text-red-400",
    bg: "bg-red-500/15",
    border: "border-red-500/30",
    lineColor: "bg-red-500/50",
  },
  skipped: {
    icon: MinusCircle,
    label: "Skipped",
    color: "text-muted-foreground",
    bg: "bg-muted/30",
    border: "border-border/50",
    lineColor: "bg-border/50",
  },
};

const ExecutionTimelineNew = ({ steps }: ExecutionTimelineNewProps) => {
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);

  const toggleStep = (stepId: string) => {
    setExpandedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          Execution Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-border/30 rounded-full" />

          <div className="space-y-3">
            {steps.map((step, index) => {
              const config = statusConfig[step.status];
              const Icon = config.icon;
              const isExpanded = expandedSteps.includes(step.id);

              return (
                <div key={step.id} className="relative">
                  {/* Step Card */}
                  <div
                    className={cn(
                      "ml-10 rounded-xl border transition-all duration-300",
                      "bg-muted/20 hover:bg-muted/30",
                      isExpanded ? config.border : "border-border/30 hover:border-border/50"
                    )}
                  >
                    {/* Header Row */}
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-full p-4 text-left flex items-center gap-4"
                    >
                      {/* Step Icon (positioned on the timeline) */}
                      <div
                        className={cn(
                          "absolute left-0 w-10 h-10 rounded-lg flex items-center justify-center",
                          "border-2 z-10",
                          config.bg,
                          config.border
                        )}
                      >
                        <Icon className={cn("w-5 h-5", config.color)} />
                      </div>

                      {/* Step Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-medium text-muted-foreground">
                            Step {index + 1}
                          </span>
                          <Badge
                            variant="outline"
                            className={cn("text-[10px]", config.bg, config.color, config.border)}
                          >
                            {config.label}
                          </Badge>
                        </div>
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {step.name}
                        </h4>
                      </div>

                      {/* Meta Info */}
                      <div className="hidden sm:flex items-center gap-4 shrink-0">
                        <span className="text-xs text-muted-foreground">{step.timestamp}</span>
                        <span className="text-xs font-mono text-foreground">{step.duration}</span>
                      </div>

                      {/* Expand Icon */}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-muted-foreground transition-transform duration-300 shrink-0",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-0 border-t border-border/30 space-y-4">
                            <div className="pt-4">
                              {/* Description */}
                              <div className="mb-4">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                  Description
                                </p>
                                <p className="text-sm text-muted-foreground font-light">
                                  {step.description}
                                </p>
                              </div>

                              {/* Key-Value Summary */}
                              <div className="mb-4">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                                  Step Details
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                  {Object.entries(step.details).map(([key, value]) => (
                                    <div
                                      key={key}
                                      className="p-2 rounded-md bg-background/50 border border-border/30"
                                    >
                                      <p className="text-[10px] text-muted-foreground uppercase">
                                        {key}
                                      </p>
                                      <p className="text-xs font-mono text-foreground truncate">
                                        {value}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Logs */}
                              {step.logs && (
                                <div>
                                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Code className="w-3 h-3" />
                                    Logs
                                  </p>
                                  <pre className="p-3 rounded-lg bg-background/80 border border-border/30 text-xs font-mono text-muted-foreground overflow-x-auto max-h-[120px]">
                                    {step.logs}
                                  </pre>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutionTimelineNew;
