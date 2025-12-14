import { useState } from "react";
import { cn } from "@/lib/utils";

export interface WorkflowStep {
  id: string;
  name: string;
  icon: "trigger" | "mail" | "database" | "message" | "bell";
  type: "trigger" | "action";
}

interface WorkflowSidebarProps {
  workflowName: string;
  isActive: boolean;
  steps: WorkflowStep[];
  activeStepId: string | null;
  onStepClick: (stepId: string) => void;
}

const WorkflowSidebar = ({ 
  workflowName, 
  isActive, 
  steps, 
  activeStepId, 
  onStepClick 
}: WorkflowSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden flex items-center justify-between w-full p-4 mb-4 rounded-lg border border-border/40 bg-card/40"
      >
        <span className="text-sm font-medium text-foreground">Workflow Structure</span>
        <span className="text-xs text-muted-foreground">{isCollapsed ? "Show" : "Hide"}</span>
      </button>

      {/* Sidebar Content */}
      <aside className={cn(
        "lg:w-56 shrink-0 transition-all duration-300",
        isCollapsed && "hidden lg:block"
      )}>
        <div className="lg:sticky lg:top-6">
          <div className="rounded-lg border border-border/40 bg-card/40 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border/30">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-foreground truncate pr-2">
                  {workflowName}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded",
                  isActive 
                    ? "text-green-400 bg-green-500/10" 
                    : "text-muted-foreground bg-muted/30"
                )}>
                  {isActive ? "Active" : "Paused"}
                </span>
              </div>
            </div>

            {/* Steps */}
            <div className="p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 px-1">
                Structure
              </p>
              <nav className="flex flex-col gap-1">
                {steps.map((step, index) => {
                  const isActiveStep = activeStepId === step.id;
                  const isTrigger = step.type === "trigger";

                  return (
                    <button
                      key={step.id}
                      onClick={() => onStepClick(step.id)}
                      className={cn(
                        "flex items-center gap-3 p-2.5 rounded-md text-left transition-colors",
                        "hover:bg-muted/30 border border-transparent",
                        isActiveStep && "bg-muted/40 border-border/50"
                      )}
                    >
                      {/* Step Number */}
                      <span className={cn(
                        "w-5 h-5 rounded text-xs flex items-center justify-center shrink-0",
                        isTrigger 
                          ? "bg-primary/20 text-primary" 
                          : "bg-muted/50 text-muted-foreground"
                      )}>
                        {isTrigger ? "T" : index}
                      </span>

                      {/* Step Info */}
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-xs truncate",
                          isActiveStep ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {step.name}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default WorkflowSidebar;
