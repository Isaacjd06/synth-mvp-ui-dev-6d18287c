import { Button } from "@/components/ui/button";

interface QuickActionsBarProps {
  onAction: (action: string) => void;
}

const quickActions = [
  { id: "create", label: "Create Automation" },
  { id: "workflows", label: "My Workflows" },
  { id: "followup", label: "Follow-Ups" },
  { id: "summary", label: "Daily Summary" },
  { id: "reset", label: "Start Over" },
];

const QuickActionsBar = ({ onAction }: QuickActionsBarProps) => {
  return (
    <div className="flex flex-wrap gap-2 py-3 max-w-2xl mx-auto">
      {quickActions.map((action) => (
        <Button
          key={action.id}
          variant="ghost"
          size="sm"
          onClick={() => onAction(action.id)}
          className="text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors px-3 h-8 font-normal"
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickActionsBar;
