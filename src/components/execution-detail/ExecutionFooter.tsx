import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ExecutionFooterProps {
  workflowId: string;
}

const ExecutionFooter = ({ workflowId }: ExecutionFooterProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t border-border/30">
      <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-foreground">
        <Link to="/app/executions">
          Back to Executions
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
      <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground hover:text-foreground">
        <Link to={`/app/workflows/${workflowId}`}>
          Back to Workflow
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
};

export default ExecutionFooter;
