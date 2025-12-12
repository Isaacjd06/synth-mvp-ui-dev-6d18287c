import { Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const statusVariants = {
  success: "bg-green-500/15 text-green-400 border-green-500/30",
  error: "bg-red-500/15 text-red-400 border-red-500/30",
  running: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 animate-pulse",
};

const RunHistoryCard = ({ executions, workflowId }: RunHistoryCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            Run History
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {executions.length} recent runs
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {executions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-muted-foreground/60" />
            </div>
            <h4 className="text-foreground font-medium mb-1">No Runs Yet</h4>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Activate this workflow or click "Run Now" to see execution history.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Execution List */}
            <div className="space-y-2">
              {executions.map((exec) => (
                <div
                  key={exec.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl",
                    "bg-muted/20 border border-border/30",
                    "hover:bg-muted/30 hover:border-border/50 transition-all duration-200",
                    "group"
                  )}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Status Badge */}
                    <Badge 
                      variant="outline"
                      className={cn("shrink-0 capitalize text-xs", statusVariants[exec.status])}
                    >
                      {exec.status}
                    </Badge>

                    {/* Execution Name */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {exec.name}
                      </p>
                    </div>

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
                    className="shrink-0 ml-4 opacity-50 group-hover:opacity-100 transition-opacity gap-1.5 text-xs"
                  >
                    View Details
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full gap-2 text-sm"
                asChild
              >
                <Link to="/app/executions">
                  View All Executions
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RunHistoryCard;
