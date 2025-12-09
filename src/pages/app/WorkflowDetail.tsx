import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Play, Pencil, Trash2, Zap, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data
const mockWorkflow = {
  id: "1",
  name: "Lead Intake → CRM",
  description: "Automatically captures leads from web forms and syncs them to your CRM with enrichment data.",
  status: "active",
  triggerType: "Webhook",
  triggerLabel: "New form submission",
  lastModified: "2 days ago",
  reliability: "98.2%",
  steps: [
    { type: "trigger", label: "New Form Submission Received" },
    { type: "action", label: "Enrich lead data with Clearbit" },
    { type: "action", label: "Add contact to HubSpot CRM" },
    { type: "action", label: "Send Slack notification" },
  ],
};

const mockExecutions = [
  { id: "e1", status: "success", timestamp: "2 hours ago", duration: "1.2s" },
  { id: "e2", status: "success", timestamp: "4 hours ago", duration: "0.9s" },
  { id: "e3", status: "error", timestamp: "6 hours ago", duration: "2.1s" },
  { id: "e4", status: "success", timestamp: "Yesterday", duration: "1.0s" },
  { id: "e5", status: "success", timestamp: "Yesterday", duration: "0.8s" },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "success":
      return "success";
    case "error":
    case "failure":
      return "destructive";
    case "running":
      return "warning";
    default:
      return "secondary";
  }
};

const WorkflowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleRun = () => {
    toast.success("Workflow execution initiated");
  };

  const handleEdit = () => {
    navigate("/app/chat");
  };

  const handleDelete = () => {
    toast.success("Workflow removed successfully");
    navigate("/app/workflows");
  };

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-6 space-y-6 max-w-4xl">
        {/* Back Button */}
        <PageItem>
          <Button variant="ghost" size="sm" asChild className="group">
            <Link to="/app/workflows" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Workflows
            </Link>
          </Button>
        </PageItem>

        {/* Header with Actions */}
        <PageItem>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <motion.h1 
                  className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  {mockWorkflow.name}
                </motion.h1>
                <Badge variant={mockWorkflow.status === "active" ? "success" : "secondary"}>
                  {mockWorkflow.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-xl">
                {mockWorkflow.description || "No description provided."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleRun} className="gap-2">
                <Play className="w-4 h-4" />
                Run Workflow
              </Button>
              <Button variant="outline" onClick={handleEdit} className="gap-2">
                <Pencil className="w-4 h-4" />
                Edit Workflow
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50 hover:bg-destructive/10"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        </PageItem>

        {/* Workflow Intelligence Overview */}
        <PageItem>
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Workflow Intelligence Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Trigger Type</p>
                  <p className="text-foreground font-medium">{mockWorkflow.triggerType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Actions Count</p>
                  <p className="text-foreground font-medium">{mockWorkflow.steps.length - 1} steps</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Last Modified</p>
                  <p className="text-foreground font-medium">{mockWorkflow.lastModified}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Execution Reliability</p>
                  <p className="text-foreground font-medium text-green-400">{mockWorkflow.reliability}</p>
                </div>
              </div>
              
              {/* Synth Insight */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary font-medium">Synth Insight:</span>{" "}
                  This automation runs reliably. Consider adding conditions if your inputs vary.
                </p>
              </div>
            </CardContent>
          </Card>
        </PageItem>

        {/* Workflow Structure */}
        <PageItem>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Workflow Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8">
                {mockWorkflow.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative pb-6 last:pb-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Connecting Line */}
                    {index < mockWorkflow.steps.length - 1 && (
                      <div className="absolute left-[-20px] top-8 w-px h-[calc(100%-16px)] bg-gradient-to-b from-primary/50 to-primary/20" />
                    )}
                    
                    {/* Step Node */}
                    <div className="absolute left-[-28px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      {step.type === "trigger" ? (
                        <Zap className="w-2 h-2 text-primary" />
                      ) : (
                        <span className="text-[10px] text-primary font-bold">{index}</span>
                      )}
                    </div>
                    
                    {/* Step Card */}
                    <motion.div 
                      className="p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
                      whileHover={{ x: 4, boxShadow: "0 0 20px rgba(26, 106, 255, 0.1)" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {step.type === "trigger" ? "Trigger" : `Step ${index}`}
                        </span>
                      </div>
                      <p className="text-foreground mt-1">{step.label}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </PageItem>

        {/* Recent Executions */}
        <PageItem>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                Recent Executions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockExecutions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    This automation has not run yet. Execute it to generate insights.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {mockExecutions.map((exec) => (
                    <motion.div
                      key={exec.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-border/30 hover:border-primary/20 hover:bg-card/50 transition-all duration-300 group"
                      whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" }}
                    >
                      <div className="flex items-center gap-4">
                        <Badge variant={getStatusVariant(exec.status) as any}>
                          {exec.status === "success" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {exec.status === "error" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {exec.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{exec.timestamp}</span>
                        <span className="text-sm text-muted-foreground">{exec.duration}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild
                        className="opacity-70 group-hover:opacity-100 transition-opacity"
                      >
                        <Link to="/app/executions">View Details</Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </PageItem>
      </PageTransition>
    </AppShell>
  );
};

export default WorkflowDetail;
