import { Link2, Workflow, Play, Power, Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="rounded-xl border-border/50 bg-gradient-to-br from-card via-card to-primary/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </div>
          <CardTitle className="text-sm font-medium text-foreground">
            System setup
          </CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Complete these steps to activate your first automation.
        </p>
      </CardHeader>
      
      <CardContent className="px-5 pb-5 pt-0 space-y-4">
        <div className="space-y-0.5">
          {checklistItems.map((item, index) => (
            <button
              key={item.id}
              className="w-full flex items-center justify-between py-2.5 px-3 -mx-1 rounded-lg hover:bg-primary/8 transition-all duration-200 group border border-transparent hover:border-primary/10"
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  item.completed 
                    ? "bg-gradient-to-br from-status-success/30 to-status-success/20 shadow-sm shadow-status-success/20" 
                    : "bg-gradient-to-br from-primary/15 to-primary/10 group-hover:from-primary/25 group-hover:to-primary/15"
                }`}>
                  {item.completed ? (
                    <Check className="w-3.5 h-3.5 text-status-success" />
                  ) : (
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                  )}
                </div>
                <span className={`text-sm transition-colors ${
                  item.completed 
                    ? "text-muted-foreground line-through" 
                    : "text-foreground group-hover:text-primary"
                }`}>
                  {item.label}
                </span>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full transition-all ${
                item.completed 
                  ? "text-status-success bg-status-success/10" 
                  : "text-muted-foreground/60 group-hover:text-muted-foreground"
              }`}>
                {item.completed ? "Complete" : `Step ${index + 1}`}
              </span>
            </button>
          ))}
        </div>

        {/* Progress bar with gradient */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary font-medium">{completedCount}/{checklistItems.length}</span>
          </div>
          <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground/70 pt-1">
          Completing setup helps Synth learn your preferences and deliver better recommendations.
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardSetupChecklist;
