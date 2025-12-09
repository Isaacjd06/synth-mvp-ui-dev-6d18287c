import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Placeholder data
const stats = {
  activeWorkflows: 12,
  totalExecutions: 2847,
  executionsLast24h: 156,
  successRate: 98.4,
};

const recentExecutions = [
  { id: 1, workflow: "Daily Report Generator", status: "success", timestamp: "2 min ago" },
  { id: 2, workflow: "Lead Sync", status: "running", timestamp: "5 min ago" },
  { id: 3, workflow: "Invoice Processor", status: "success", timestamp: "12 min ago" },
  { id: 4, workflow: "Email Campaign", status: "error", timestamp: "1 hour ago" },
  { id: 5, workflow: "Data Backup", status: "success", timestamp: "2 hours ago" },
];

type StatusKey = "success" | "running" | "error" | "failure";

const statusVariants: Record<StatusKey, "success" | "running" | "error"> = {
  success: "success",
  running: "running",
  error: "error",
  failure: "error",
};

const Dashboard = () => {
  return (
    <AppShell>
      <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-display font-bold text-gradient synth-header">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 font-light">
            Synth is monitoring your operations. Here's your system overview.
          </p>
        </motion.div>

        {/* Statistics Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Active Automations", value: stats.activeWorkflows },
            { label: "Total Executions", value: stats.totalExecutions.toLocaleString() },
            { label: "Activity (24h)", value: stats.executionsLast24h },
            { label: "Execution Reliability", value: `${stats.successRate}%` },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground font-light">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-display font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Executions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-gradient">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentExecutions.map((execution, index) => (
                <motion.div
                  key={execution.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                  className="flex items-center justify-between py-3 px-3 -mx-3 rounded-lg synth-row border-b border-border/30 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">
                      {execution.workflow}
                    </span>
                    <Badge variant={statusVariants[execution.status as StatusKey]}>
                      {execution.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground font-light">{execution.timestamp}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/app/executions`}>View</Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Synth Advisory Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
            <CardHeader>
              <CardTitle className="text-gradient">Synth Advisory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground font-light">
                Synth is observing your workflows and ready to provide intelligent recommendations. Start a conversation to optimize your operations.
              </p>
              <Button asChild className="btn-synth">
                <Link to="/app/chat">Open Chat</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <Button asChild className="btn-synth">
            <Link to="/app/workflows/new">Create Automation</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/app/chat">Consult Synth</Link>
          </Button>
        </motion.div>
      </div>
    </AppShell>
  );
};

export default Dashboard;