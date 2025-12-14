import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ExecutionStatus = "success" | "running" | "error";

interface DashboardActivityRowProps {
  workflow: string;
  status: ExecutionStatus;
  duration: string;
  timestamp: string;
}

const statusStyles: Record<ExecutionStatus, string> = {
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  running: "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse",
  error: "bg-red-500/10 text-red-400 border-red-500/20",
};

const DashboardActivityRow = ({ workflow, status, duration, timestamp }: DashboardActivityRowProps) => {
  return (
    <div className="flex items-center justify-between py-3.5 px-5 hover:bg-muted/20 transition-colors">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <span className="text-sm text-foreground truncate max-w-[200px] sm:max-w-none">
          {workflow}
        </span>
        <Badge className={`${statusStyles[status]} text-[10px] px-2 py-0 capitalize font-normal`}>
          {status}
        </Badge>
      </div>
      
      <div className="flex items-center gap-5 shrink-0">
        <span className="text-xs text-muted-foreground/70 font-mono hidden md:block w-12 text-right">
          {duration}
        </span>
        <span className="text-xs text-muted-foreground/60 font-light w-24 text-right hidden sm:block">
          {timestamp}
        </span>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground/60 hover:text-foreground text-xs">
          View Details
          <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardActivityRow;
