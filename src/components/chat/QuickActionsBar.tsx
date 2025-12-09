import { motion } from "framer-motion";
import { Plus, Workflow, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsBarProps {
  onAction: (action: string) => void;
}

const quickActions = [
  { id: "create", label: "Create automation", icon: Plus, message: "I want to create a new automation" },
  { id: "show", label: "Show my workflows", icon: Workflow, message: "Show me all my workflows" },
  { id: "suggest", label: "Suggest improvements", icon: Sparkles, message: "What improvements can you suggest for my workflows?" },
  { id: "help", label: "How does Synth work?", icon: HelpCircle, message: "How does Synth work and what can you help me with?" },
];

const QuickActionsBar = ({ onAction }: QuickActionsBarProps) => {
  return (
    <motion.div 
      className="flex flex-wrap gap-2 justify-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {quickActions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          onClick={() => onAction(action.message)}
          className="gap-2 text-xs bg-muted/30 border-border/50 hover:border-primary/30 hover:bg-muted/50"
        >
          <action.icon className="w-3 h-3" />
          {action.label}
        </Button>
      ))}
    </motion.div>
  );
};

export default QuickActionsBar;
