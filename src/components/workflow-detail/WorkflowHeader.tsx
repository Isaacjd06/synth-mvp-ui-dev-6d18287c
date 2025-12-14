import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface WorkflowHeaderProps {
  name: string;
  isActive: boolean;
  onToggleActive: (active: boolean) => void;
}

const WorkflowHeader = ({ name, isActive, onToggleActive }: WorkflowHeaderProps) => {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="-ml-2 text-xs text-muted-foreground hover:text-foreground">
        <Link to="/app/workflows">
          ← Back to Workflows
        </Link>
      </Button>

      {/* Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium text-foreground mb-1">
            {name}
          </h1>
          <p className="text-sm text-muted-foreground font-light">
            Synth manages this automation. Review its structure and performance below.
          </p>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-card/40 border border-border/40">
          <span className="text-xs text-muted-foreground">
            {isActive ? "Active" : "Paused"}
          </span>
          <Switch
            checked={isActive}
            onCheckedChange={onToggleActive}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowHeader;
