import { motion } from "framer-motion";
import { Zap, FileText, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsBarProps {
  onAction: (action: string) => void;
}

const quickActions = [
  { id: "create", label: "Create Workflow", icon: Zap },
  { id: "summarize", label: "Summarize", icon: FileText },
  { id: "optimize", label: "Optimize", icon: Sparkles },
  { id: "reset", label: "Start Over", icon: RotateCcw },
];

const QuickActionsBar = ({ onAction }: QuickActionsBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 py-2"
    >
      {quickActions.map((action, index) => (
        <motion.div
          key={action.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAction(action.id)}
            className="gap-1.5 text-xs hover:border-primary/50 hover:bg-primary/5"
          >
            <action.icon className="w-3.5 h-3.5" />
            {action.label}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuickActionsBar;
