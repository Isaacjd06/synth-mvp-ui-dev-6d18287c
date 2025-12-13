import { Link2, Workflow, Play, Power, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ChecklistItem {
  id: string;
  label: string;
  icon: React.ElementType;
  completed: boolean;
}

const checklistItems: ChecklistItem[] = [
  { id: "connect", label: "Connect an app", icon: Link2, completed: false },
  { id: "create", label: "Create your first workflow", icon: Workflow, completed: false },
  { id: "test", label: "Run a test execution", icon: Play, completed: false },
  { id: "activate", label: "Turn on automation", icon: Power, completed: false },
];

const DashboardSetupChecklist = () => {
  const completedCount = checklistItems.filter(item => item.completed).length;
  const progress = (completedCount / checklistItems.length) * 100;

  return (
    <Card className="rounded-xl border-border/40 bg-card">
      <CardHeader className="pb-3 pt-4 px-5">
        <CardTitle className="text-sm font-medium text-foreground">
          Setup progress
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Complete these steps to activate your first automation.
        </p>
      </CardHeader>
      
      <CardContent className="px-5 pb-4 pt-0 space-y-4">
        <div className="space-y-1">
          {checklistItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center justify-between py-2 px-2 -mx-2 rounded-lg hover:bg-muted/30 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                  item.completed 
                    ? "bg-muted-foreground/20" 
                    : "bg-muted/40"
                }`}>
                  {item.completed ? (
                    <Check className="w-3.5 h-3.5 text-muted-foreground" />
                  ) : (
                    <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
                <span className={`text-sm ${
                  item.completed 
                    ? "text-muted-foreground line-through" 
                    : "text-foreground"
                }`}>
                  {item.label}
                </span>
              </div>
              <span className={`text-xs ${
                item.completed 
                  ? "text-muted-foreground" 
                  : "text-muted-foreground/60"
              }`}>
                {item.completed ? "Complete" : "Not started"}
              </span>
            </button>
          ))}
        </div>

        <div className="pt-2">
          <Progress value={progress} className="h-1.5 bg-muted/30" />
        </div>

        <p className="text-xs text-muted-foreground/70">
          Completing setup helps Synth learn your preferences and deliver better recommendations.
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardSetupChecklist;
