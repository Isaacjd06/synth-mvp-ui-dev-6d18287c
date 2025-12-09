import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ActivityItem {
  id: string;
  workflowName: string;
  status: "success" | "running" | "error";
  duration: string;
  timestamp: string;
}

interface RecentActivityFeedProps {
  activities?: ActivityItem[];
}

const defaultActivities: ActivityItem[] = [
  { id: "1", workflowName: "Lead Intake → CRM", status: "success", duration: "1.2s", timestamp: "2 min ago" },
  { id: "2", workflowName: "Stripe Payment Notifier", status: "success", duration: "0.5s", timestamp: "5 min ago" },
  { id: "3", workflowName: "Slack Support Router", status: "error", duration: "0.3s", timestamp: "12 min ago" },
  { id: "4", workflowName: "Daily Report Generator", status: "running", duration: "—", timestamp: "15 min ago" },
  { id: "5", workflowName: "Customer Onboarding", status: "success", duration: "2.1s", timestamp: "1 hour ago" },
];

const statusVariants: Record<string, "success" | "running" | "error"> = {
  success: "success",
  running: "running",
  error: "error",
};

const RecentActivityFeed = ({ activities = defaultActivities }: RecentActivityFeedProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5 text-muted-foreground" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between px-6 py-3 synth-row"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-sm font-medium text-foreground truncate">
                    {activity.workflowName}
                  </span>
                  <Badge variant={statusVariants[activity.status]}>
                    {activity.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-muted-foreground font-mono">
                    {activity.duration}
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {activity.timestamp}
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/app/executions`}>View</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentActivityFeed;
