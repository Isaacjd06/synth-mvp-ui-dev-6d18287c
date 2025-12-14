import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ExecutionHeaderProps {
  workflowName: string;
  workflowId: string;
  executionId: string;
  status: "success" | "error" | "running";
  timestamp: string;
  duration: string;
  onFixInChat?: () => void;
}

const statusStyles = {
  success: "text-green-500/80",
  error: "text-red-500/80",
  running: "text-amber-500/80",
};

const statusLabels = {
  success: "Success",
  error: "Error",
  running: "Running",
};

const ExecutionHeader = ({
  workflowName,
  workflowId,
  executionId,
  status,
  timestamp,
  duration,
  onFixInChat,
}: ExecutionHeaderProps) => {
  return (
    <div className="space-y-6 px-4 lg:px-6 pt-6">
      {/* Back Link */}
      <div>
        <Link 
          to="/app/executions" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Executions
        </Link>
      </div>

      {/* Main Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="space-y-2">
          <Link
            to={`/app/workflows/${workflowId}`}
            className="text-xl font-medium text-foreground hover:text-primary transition-colors"
          >
            {workflowName}
          </Link>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-mono text-xs">{executionId}</span>
            <span className="text-border">•</span>
            <span>{timestamp}</span>
            <span className="text-border">•</span>
            <span className="font-mono">{duration}</span>
            <span className="text-border">•</span>
            <span className={statusStyles[status]}>{statusLabels[status]}</span>
          </div>
        </div>

        {/* Primary Action - Only show Fix in Chat for errors */}
        {status === "error" && onFixInChat && (
          <Button onClick={onFixInChat} size="sm">
            Fix in Chat
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExecutionHeader;
