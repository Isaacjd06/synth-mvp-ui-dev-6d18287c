import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

const statusText = {
  completed: "Completed",
  pending: "Pending",
  error: "Failed",
};

const statusStyles = {
  completed: "text-green-400",
  pending: "text-muted-foreground",
  error: "text-red-400",
};

const StepsCard = ({ steps, activeStepId }: StepsCardProps) => {
  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            What Synth Does
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {steps.length} {steps.length === 1 ? "step" : "steps"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {steps.map((step, index) => {
            const isActive = activeStepId === step.id;

            return (
              <div
                key={step.id}
                id={`step-${step.id}`}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-md transition-colors",
                  "bg-muted/20 border border-border/30",
                  "hover:bg-muted/30",
                  isActive && "bg-muted/40 border-border/50"
                )}
              >
                {/* Step Number */}
                <span className="w-5 h-5 rounded bg-muted/50 flex items-center justify-center text-xs text-muted-foreground shrink-0 mt-0.5">
                  {index + 1}
                </span>

                {/* Step Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {step.name}
                    </h4>
                    <span className={cn("text-xs", statusStyles[step.status])}>
                      {statusText[step.status]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-light">
                    {step.description}
                  </p>
                </div>

                {/* Edit Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="shrink-0 text-xs text-muted-foreground hover:text-foreground h-6 px-2"
                >
                  Edit
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
