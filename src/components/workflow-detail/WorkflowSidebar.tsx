import { useState } from "react";
import { cn } from "@/lib/utils";
import { Zap, Mail, Database, MessageSquare, Bell, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

const iconMap = {
  trigger: Zap,
  mail: Mail,
  database: Database,
  message: MessageSquare,
  bell: Bell,
};

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
        className="lg:hidden flex items-center justify-between w-full p-4 mb-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-md"
      >
        <span className="text-sm font-medium text-foreground">Workflow Structure</span>
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Sidebar Content */}
      <aside className={cn(
        "lg:w-64 shrink-0 transition-all duration-300",
        isCollapsed && "hidden lg:block"
      )}>
        <div className="lg:sticky lg:top-6">
          <div className="rounded-xl border border-border/50 bg-card/60 backdrop-blur-md overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-foreground truncate pr-2">
                  {workflowName}
                </h3>
                <Badge 
                  variant={isActive ? "success" : "inactive"} 
                  className="shrink-0 text-[10px]"
                >
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Workflow Structure</p>
            </div>

            {/* Steps */}
            <div className="p-3">
              <div className="relative">
                {/* Vertical line connecting steps */}
                <div className="absolute left-[22px] top-6 bottom-6 w-px bg-border/50" />

                <nav className="relative flex flex-col gap-1">
                  {steps.map((step, index) => {
                    const Icon = iconMap[step.icon];
                    const isActiveStep = activeStepId === step.id;
                    const isTrigger = step.type === "trigger";

                    return (
                      <button
                        key={step.id}
                        onClick={() => onStepClick(step.id)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-300 relative",
                          "hover:bg-muted/50 border border-transparent",
                          isActiveStep && "bg-primary/10 border-primary/30 shadow-[0_0_15px_-5px_hsl(217_100%_60%/0.3)]"
                        )}
                      >
                        {/* Step Icon */}
                        <div className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 z-10",
                          isTrigger 
                            ? "bg-primary/20 border border-primary/40" 
                            : "bg-muted/50 border border-border/50",
                          isActiveStep && "border-primary/50 shadow-[0_0_10px_hsl(217_100%_60%/0.3)]"
                        )}>
                          <Icon className={cn(
                            "w-4 h-4 transition-colors",
                            isTrigger || isActiveStep ? "text-primary" : "text-muted-foreground"
                          )} />
                        </div>

                        {/* Step Info */}
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-xs font-medium transition-colors truncate",
                            isActiveStep ? "text-primary" : "text-foreground"
                          )}>
                            {isTrigger ? "Trigger" : `Step ${index}`}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
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
        </div>
      </aside>
    </>
  );
};

export default WorkflowSidebar;
