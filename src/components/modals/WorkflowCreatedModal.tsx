import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Zap, Play, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface WorkflowCreatedModalProps {
  open: boolean;
  onClose: () => void;
  workflow: {
    id: string;
    name: string;
    description: string;
    trigger: string;
    actions: string[];
  } | null;
}

const WorkflowCreatedModal = ({ open, onClose, workflow }: WorkflowCreatedModalProps) => {
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  if (!workflow) return null;

  const handleViewWorkflow = () => {
    onClose();
    navigate(`/app/workflows/${workflow.id}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
          <DialogContent className="max-w-md glass-strong border-border/50">
            <DialogHeader>
              <motion.div 
                className="flex items-center gap-3 mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-10 h-10 rounded-xl bg-status-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-status-success" />
                </div>
                <DialogTitle className="text-xl font-display text-gradient">
                  Automation Created
                </DialogTitle>
              </motion.div>
            </DialogHeader>

            <motion.div 
              className="space-y-5 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* Workflow Name */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Name</p>
                <p className="text-lg font-medium text-foreground">{workflow.name}</p>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Description</p>
                <p className="text-sm text-muted-foreground">{workflow.description}</p>
              </div>

              {/* Trigger Preview */}
              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Trigger</span>
                </div>
                <p className="text-sm text-foreground">{workflow.trigger}</p>
              </div>

              {/* Actions Preview */}
              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Actions</span>
                  <Badge variant="secondary" className="ml-auto">{workflow.actions.length}</Badge>
                </div>
                <ul className="space-y-1">
                  {workflow.actions.map((action, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-secondary flex items-center justify-center text-xs">{idx + 1}</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activate Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                <div>
                  <p className="text-sm font-medium text-foreground">Activate Workflow</p>
                  <p className="text-xs text-muted-foreground">Start processing triggers immediately</p>
                </div>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
              </div>

              {/* Action Button */}
              <Button onClick={handleViewWorkflow} className="w-full btn-synth gap-2">
                <Eye className="w-4 h-4" />
                View Workflow
              </Button>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default WorkflowCreatedModal;
