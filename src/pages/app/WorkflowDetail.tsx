import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Play, 
  Trash2, 
  Zap, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Copy,
  Power,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Check,
  X
} from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock data
const mockWorkflow = {
  id: "1",
  name: "Lead Intake → CRM",
  description: "Automatically captures leads from web forms and syncs them to your CRM with enrichment data.",
  status: "active" as "active" | "inactive",
  triggerType: "Webhook",
  triggerLabel: "New form submission",
  lastRun: "2 hours ago",
  createdAt: "December 1, 2024",
  lastModified: "2 days ago",
  reliability: "98.2%",
  actions: [
    "Enrich lead data with Clearbit",
    "Add contact to HubSpot CRM",
    "Send Slack notification",
  ],
};

const mockExecutions = [
  { id: "e1", status: "success", timestamp: "2 hours ago", duration: "1.2s", input: { email: "john@example.com" }, output: { crmId: "CRM-123" } },
  { id: "e2", status: "success", timestamp: "4 hours ago", duration: "0.9s", input: { email: "jane@company.com" }, output: { crmId: "CRM-124" } },
  { id: "e3", status: "error", timestamp: "6 hours ago", duration: "2.1s", input: { email: "test@test.com" }, output: null },
  { id: "e4", status: "success", timestamp: "Yesterday", duration: "1.0s", input: { email: "user@domain.com" }, output: { crmId: "CRM-125" } },
  { id: "e5", status: "success", timestamp: "Yesterday", duration: "0.8s", input: { email: "lead@business.com" }, output: { crmId: "CRM-126" } },
  { id: "e6", status: "success", timestamp: "2 days ago", duration: "1.1s", input: { email: "contact@firm.com" }, output: { crmId: "CRM-127" } },
  { id: "e7", status: "error", timestamp: "2 days ago", duration: "1.5s", input: { email: "bad@email" }, output: null },
  { id: "e8", status: "success", timestamp: "3 days ago", duration: "0.7s", input: { email: "sales@corp.com" }, output: { crmId: "CRM-128" } },
];

const ITEMS_PER_PAGE = 5;

const getStatusVariant = (status: string) => {
  switch (status) {
    case "success":
      return "success";
    case "error":
    case "failure":
      return "error";
    case "running":
      return "running";
    default:
      return "secondary";
  }
};

const WorkflowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Workflow state
  const [workflow, setWorkflow] = useState(mockWorkflow);
  const [isActive, setIsActive] = useState(workflow.status === "active");

  // Inline editing state
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedName, setEditedName] = useState(workflow.name);
  const [editedDescription, setEditedDescription] = useState(workflow.description);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockExecutions.length / ITEMS_PER_PAGE);
  const paginatedExecutions = mockExecutions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Focus input when editing starts
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  useEffect(() => {
    if (isEditingDescription && descriptionInputRef.current) {
      descriptionInputRef.current.focus();
      descriptionInputRef.current.select();
    }
  }, [isEditingDescription]);

  const handleSaveName = () => {
    if (editedName.trim()) {
      setWorkflow((prev) => ({ ...prev, name: editedName.trim() }));
      toast.success("Workflow name updated");
    } else {
      setEditedName(workflow.name);
    }
    setIsEditingName(false);
  };

  const handleSaveDescription = () => {
    setWorkflow((prev) => ({ ...prev, description: editedDescription.trim() }));
    toast.success("Description updated");
    setIsEditingDescription(false);
  };

  const handleCancelNameEdit = () => {
    setEditedName(workflow.name);
    setIsEditingName(false);
  };

  const handleCancelDescriptionEdit = () => {
    setEditedDescription(workflow.description);
    setIsEditingDescription(false);
  };

  const handleToggleActive = (checked: boolean) => {
    setIsActive(checked);
    setWorkflow((prev) => ({ ...prev, status: checked ? "active" : "inactive" }));
    toast.success(checked ? "Workflow activated" : "Workflow deactivated");
  };

  const handleRun = () => {
    toast.success("Workflow execution initiated");
  };

  const handleDelete = () => {
    toast.success("Workflow deleted successfully");
    navigate("/app/workflows");
  };

  const handleRegenerate = () => {
    toast.success("Regenerating workflow logic...");
  };

  const handleDuplicate = () => {
    toast.success("Workflow duplicated");
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

        {/* Workflow Overview Section */}
        <PageItem>
          <Card className="border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Workflow Overview
                </CardTitle>
                <Badge variant={isActive ? "success" : "inactive"}>
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Editable Name */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Workflow Name
                </label>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <Input
                      ref={nameInputRef}
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveName();
                        if (e.key === "Escape") handleCancelNameEdit();
                      }}
                      className="text-xl font-bold bg-muted/30"
                    />
                    <Button size="icon" variant="ghost" onClick={handleSaveName}>
                      <Check className="w-4 h-4 text-primary" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleCancelNameEdit}>
                      <X className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-2 group cursor-pointer"
                    onClick={() => setIsEditingName(true)}
                  >
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {workflow.name}
                    </h2>
                    <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>

              {/* Editable Description */}
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">
                  Description
                </label>
                {isEditingDescription ? (
                  <div className="space-y-2">
                    <Textarea
                      ref={descriptionInputRef}
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") handleCancelDescriptionEdit();
                      }}
                      className="bg-muted/30 min-h-[80px]"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveDescription}>
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancelDescriptionEdit}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="group cursor-pointer"
                    onClick={() => setIsEditingDescription(true)}
                  >
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {workflow.description || "Click to add a description..."}
                      <Pencil className="w-3 h-3 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </div>
                )}
              </div>

              <Separator className="bg-border/50" />

              {/* Overview Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Trigger</p>
                  <p className="text-foreground font-medium">{workflow.triggerType}</p>
                  <p className="text-sm text-muted-foreground">{workflow.triggerLabel}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Actions</p>
                  <p className="text-foreground font-medium">{workflow.actions.length} steps</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Last Run</p>
                  <p className="text-foreground font-medium">{workflow.lastRun}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Created</p>
                  <p className="text-foreground font-medium">{workflow.createdAt}</p>
                </div>
              </div>

              {/* Actions Preview */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Actions Preview</p>
                <div className="flex flex-wrap gap-2">
                  {workflow.actions.map((action, index) => (
                    <Badge key={index} variant="secondary" className="font-normal">
                      {index + 1}. {action}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </PageItem>

        {/* Settings Panel */}
        <PageItem>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Activate/Deactivate Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <Power className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <div>
                    <p className="font-medium text-foreground">Workflow Status</p>
                    <p className="text-sm text-muted-foreground">
                      {isActive ? "Workflow is active and running" : "Workflow is paused"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isActive}
                  onCheckedChange={handleToggleActive}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Button onClick={handleRun} className="gap-2">
                  <Play className="w-4 h-4" />
                  Run Now
                </Button>
                <Button variant="outline" onClick={handleRegenerate} className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </Button>
                <Button variant="outline" onClick={handleDuplicate} className="gap-2">
                  <Copy className="w-4 h-4" />
                  Duplicate
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-2 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50 hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-strong border-border/50">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Workflow</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{workflow.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </PageItem>

        {/* Execution History with Pagination */}
        <PageItem>
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  Execution History
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {mockExecutions.length} total executions
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {mockExecutions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    This workflow has not run yet. Execute it to generate history.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Execution List */}
                  <div className="space-y-2">
                    {paginatedExecutions.map((exec) => (
                      <div
                        key={exec.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-primary/20 hover:bg-muted/30 transition-all duration-200"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <Badge variant={getStatusVariant(exec.status) as any} className="shrink-0">
                            {exec.status === "success" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {exec.status === "error" && <AlertCircle className="w-3 h-3 mr-1" />}
                            {exec.status}
                          </Badge>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 text-sm">
                              <span className="text-muted-foreground">{exec.timestamp}</span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground font-mono">{exec.duration}</span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate mt-1">
                              Input: {JSON.stringify(exec.input).slice(0, 50)}...
                            </p>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          asChild
                          className="shrink-0"
                        >
                          <Link to="/app/executions">View Details</Link>
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <p className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
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
