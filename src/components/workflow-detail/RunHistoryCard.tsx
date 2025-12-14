import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Execution {
  id: string;
  name: string;
  status: "success" | "error" | "running";
  duration: string;
  timestamp: string;
}

interface RunHistoryCardProps {
  executions: Execution[];
  workflowId: string;
}

const statusStyles = {
  success: "text-green-400 bg-green-500/10",
  error: "text-red-400 bg-red-500/10",
  running: "text-yellow-400 bg-yellow-500/10",
};

const RunHistoryCard = ({ executions, workflowId }: RunHistoryCardProps) => {
  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Run History
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            {executions.length} recent
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {executions.length === 0 ? (
          <div className="text-center py-10">
            <h4 className="text-sm font-medium text-foreground mb-1">No Runs Yet</h4>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              This workflow will run when its trigger fires.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Execution List */}
            <div className="space-y-2">
              {executions.map((exec) => (
                <div
                  key={exec.id}
                  className="flex items-center justify-between p-3 rounded-md bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Status */}
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded capitalize shrink-0",
                      statusStyles[exec.status]
                    )}>
                      {exec.status}
                    </span>

                    {/* Duration */}
                    <span className="text-xs text-muted-foreground font-mono shrink-0">
                      {exec.duration}
                    </span>

                    {/* Timestamp */}
                    <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
                      {exec.timestamp}
                    </span>
                  </div>

                  {/* View Details */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 text-xs text-muted-foreground hover:text-foreground h-7 opacity-50 group-hover:opacity-100"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <Button 
              variant="outline" 
              size="sm"
              className="w-full text-xs border-border/40"
              asChild
            >
              <Link to="/app/executions">
                View All Executions
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RunHistoryCard;
