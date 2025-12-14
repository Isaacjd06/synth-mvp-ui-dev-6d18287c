import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineStep {
  id: string;
  name: string;
  status: "completed" | "error" | "skipped" | "running";
  timestamp: string;
  duration: string;
  inputData?: Record<string, unknown>;
  outputData?: Record<string, unknown>;
  errorDetails?: {
    message: string;
    cause?: string;
  };
}

interface ExecutionTimelineNewProps {
  steps: TimelineStep[];
}

const statusLabels = {
  completed: "Completed",
  error: "Error",
  skipped: "Skipped",
  running: "Running",
};

const statusStyles = {
  completed: "text-green-500/70",
  error: "text-red-500/70",
  skipped: "text-muted-foreground",
  running: "text-amber-500/70",
};

const ExecutionTimelineNew = ({ steps }: ExecutionTimelineNewProps) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3 px-5">
        <CardTitle className="text-base font-medium">Execution Steps</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-1">
          {steps.map((step, index) => {
            const isError = step.status === "error";
            const isExpanded = expandedStep === step.id;

            return (
              <div key={step.id}>
                {/* Step Row */}
                <button
                  onClick={() => isError ? toggleStep(step.id) : null}
                  disabled={!isError}
                  className={cn(
                    "w-full text-left py-3 px-4 rounded-lg transition-colors",
                    isError ? "hover:bg-muted/30 cursor-pointer" : "cursor-default",
                    isExpanded && "bg-muted/20"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-5">{index + 1}.</span>
                      <span className="text-sm text-foreground">{step.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-muted-foreground">{step.duration}</span>
                      <span className={cn("text-xs", statusStyles[step.status])}>
                        {statusLabels[step.status]}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Error Details (only for error steps, expandable) */}
                <AnimatePresence>
                  {isError && isExpanded && step.errorDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-8 mr-4 mb-3 p-4 rounded-lg bg-muted/20 border border-border/30 space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Error</p>
                          <p className="text-sm text-foreground">{step.errorDetails.message}</p>
                        </div>
                        {step.errorDetails.cause && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Possible Cause</p>
                            <p className="text-sm text-muted-foreground">{step.errorDetails.cause}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutionTimelineNew;
