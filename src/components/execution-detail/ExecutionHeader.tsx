import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Loader2, Clock, Hash, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExecutionHeaderProps {
  workflowName: string;
  workflowId: string;
  executionId: string;
  status: "success" | "error" | "running";
  timestamp: string;
  duration: string;
}

const statusConfig = {
  success: {
    label: "Success",
    icon: CheckCircle2,
    className: "bg-green-500/15 text-green-400 border-green-500/30",
  },
  error: {
    label: "Error",
    icon: XCircle,
    className: "bg-red-500/15 text-red-400 border-red-500/30",
  },
  running: {
    label: "Running",
    icon: Loader2,
    className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  },
};

const ExecutionHeader = ({
  workflowName,
  workflowId,
  executionId,
  status,
  timestamp,
  duration,
}: ExecutionHeaderProps) => {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="group -ml-2">
        <Link to="/app/executions" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Executions
        </Link>
      </Button>

      {/* Main Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left Side - Workflow & ID */}
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <Link
              to={`/app/workflows/${workflowId}`}
              className="text-2xl lg:text-3xl font-display text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              {workflowName}
              <ExternalLink className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Badge
              variant="outline"
              className={cn("text-xs font-medium", config.className)}
            >
              <StatusIcon className={cn("w-3 h-3 mr-1", status === "running" && "animate-spin")} />
              {config.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Hash className="w-4 h-4" />
            <span className="font-mono">{executionId}</span>
          </div>
        </div>

        {/* Right Side - Timestamp & Duration */}
        <div className="flex items-center gap-4 p-3 rounded-lg bg-card/60 border border-border/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{timestamp}</span>
          </div>
          <div className="h-4 w-px bg-border/50" />
          <div className="text-sm">
            <span className="text-muted-foreground">Duration: </span>
            <span className="font-mono text-foreground font-medium">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionHeader;
