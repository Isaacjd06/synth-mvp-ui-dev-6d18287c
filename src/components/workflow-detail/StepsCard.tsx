import { cn } from "@/lib/utils";
import { Mail, Database, MessageSquare, Bell, Pencil, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Step {
  id: string;
  name: string;
  description: string;
  icon: "mail" | "database" | "message" | "bell";
  status: "completed" | "pending" | "error";
}

interface StepsCardProps {
  steps: Step[];
  activeStepId: string | null;
}

const iconMap = {
  mail: Mail,
  database: Database,
  message: MessageSquare,
  bell: Bell,
};

const statusStyles = {
  completed: "text-green-400",
  pending: "text-muted-foreground",
  error: "text-red-400",
};

const StepsCard = ({ steps, activeStepId }: StepsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Steps Overview</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {steps.length} {steps.length === 1 ? "step" : "steps"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            const isActive = activeStepId === step.id;

            return (
              <div
                key={step.id}
                id={`step-${step.id}`}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                  "bg-muted/20 border border-border/30",
                  "hover:bg-muted/30 hover:border-border/50",
                  isActive && "bg-primary/10 border-primary/30 shadow-[0_0_20px_-5px_hsl(217_100%_60%/0.2)]"
                )}
              >
                {/* Step Number & Icon */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="w-6 h-6 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-xs font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    "bg-muted/50 border border-border/50",
                    isActive && "bg-primary/20 border-primary/40"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                </div>

                {/* Step Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {step.name}
                    </h4>
                    <CheckCircle2 className={cn("w-4 h-4 shrink-0", statusStyles[step.status])} />
                  </div>
                  <p className="text-xs text-muted-foreground font-light truncate">
                    {step.description}
                  </p>
                </div>

                {/* Edit Button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="shrink-0 h-8 w-8 opacity-50 hover:opacity-100"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StepsCard;
