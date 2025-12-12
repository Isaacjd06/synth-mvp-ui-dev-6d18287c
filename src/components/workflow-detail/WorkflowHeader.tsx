import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface WorkflowHeaderProps {
  name: string;
  isActive: boolean;
  onToggleActive: (active: boolean) => void;
}

const WorkflowHeader = ({ name, isActive, onToggleActive }: WorkflowHeaderProps) => {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="group -ml-2">
        <Link to="/app/workflows" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Workflows
        </Link>
      </Button>

      {/* Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl lg:text-3xl font-display text-foreground">
              {name}
            </h1>
            <Badge 
              variant={isActive ? "success" : "inactive"} 
              className="hidden sm:inline-flex"
            >
              {isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <p className="text-muted-foreground font-light">
            Manage and observe your automation.
          </p>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-card/60 border border-border/50 backdrop-blur-sm">
          <span className="text-sm text-muted-foreground">
            {isActive ? "Active" : "Inactive"}
          </span>
          <Switch
            checked={isActive}
            onCheckedChange={onToggleActive}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowHeader;
