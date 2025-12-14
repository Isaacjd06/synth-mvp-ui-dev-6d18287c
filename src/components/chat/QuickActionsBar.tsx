import { Button } from "@/components/ui/button";

interface QuickActionsBarProps {
  onAction: (action: string) => void;
}

const quickActions = [
  { id: "create", label: "Create Automation" },
  { id: "workflows", label: "My Workflows" },
  { id: "followup", label: "Optimize Follow-Ups" },
  { id: "summary", label: "Build Daily Summary" },
  { id: "reset", label: "Start Over" },
];

const QuickActionsBar = ({ onAction }: QuickActionsBarProps) => {
  return (
    <div className="flex flex-wrap gap-2 py-3">
      {quickActions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          onClick={() => onAction(action.id)}
          className="text-xs border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickActionsBar;
