import { Link2, Workflow, Play, Power, Check, Settings, ChevronRight } from "lucide-react";
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
  const pendingItems = checklistItems.filter(item => !item.completed);

  return (
    <Card className="rounded-lg border-border/40 bg-card/80 hover:border-border/60 transition-all duration-200">
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-muted/50 flex items-center justify-center">
              <Settings className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <CardTitle className="text-sm font-medium text-foreground">
              System setup
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  className={`w-2 h-2 rounded-full transition-all ${
                    item.completed 
                      ? 'bg-status-success shadow-[0_0_4px_hsl(var(--status-success)/0.5)]' 
                      : 'bg-muted/60'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {completedCount}/{checklistItems.length}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pb-3 pt-1">
        {pendingItems.length > 0 ? (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-muted-foreground">Next steps:</span>
            {pendingItems.slice(0, 2).map((item) => (
              <button
                key={item.id}
                className="group flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-muted/30 hover:bg-muted/50 text-xs text-foreground transition-all border border-transparent hover:border-border/50"
              >
                <item.icon className="w-3 h-3 text-muted-foreground" />
                {item.label}
                <ChevronRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-status-success flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            Setup complete
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardSetupChecklist;