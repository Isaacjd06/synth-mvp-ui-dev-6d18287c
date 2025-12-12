import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import WorkflowSidebar, { WorkflowStep } from "@/components/workflow-detail/WorkflowSidebar";
import WorkflowHeader from "@/components/workflow-detail/WorkflowHeader";
import TriggerCard from "@/components/workflow-detail/TriggerCard";
import StepsCard from "@/components/workflow-detail/StepsCard";
import AnalyticsCard from "@/components/workflow-detail/AnalyticsCard";
import RunHistoryCard from "@/components/workflow-detail/RunHistoryCard";
import { synthToast } from "@/lib/synth-toast";

// Mock data
const mockWorkflow = {
  id: "1",
  name: "Lead Intake → CRM",
  isActive: true,
  trigger: {
    type: "Webhook",
    label: "New form submission",
    description: "This workflow triggers when a new lead form is submitted on your website. The webhook receives the form data and initiates the automation sequence.",
    lastTriggered: "2 hours ago",
  },
  steps: [
    {
      id: "step-1",
      name: "Enrich lead data with Clearbit",
      description: "Fetches company and contact information to enrich the lead profile.",
      icon: "database" as const,
      status: "completed" as const,
    },
    {
      id: "step-2",
      name: "Add contact to HubSpot CRM",
      description: "Creates or updates the contact record in your CRM system.",
      icon: "mail" as const,
      status: "completed" as const,
    },
    {
      id: "step-3",
      name: "Send Slack notification",
      description: "Notifies the sales team about the new lead in your designated channel.",
      icon: "message" as const,
      status: "completed" as const,
    },
  ],
  analytics: {
    totalRuns: 1247,
    avgExecutionTime: "1.2s",
    successRate: "98.2%",
    lastRun: "2 hours ago",
  },
};

const mockExecutions = [
  { id: "e1", name: "Lead Intake → CRM", status: "success" as const, duration: "1.2s", timestamp: "2 hours ago" },
  { id: "e2", name: "Lead Intake → CRM", status: "success" as const, duration: "0.9s", timestamp: "4 hours ago" },
  { id: "e3", name: "Lead Intake → CRM", status: "error" as const, duration: "2.1s", timestamp: "6 hours ago" },
  { id: "e4", name: "Lead Intake → CRM", status: "success" as const, duration: "1.0s", timestamp: "Yesterday" },
  { id: "e5", name: "Lead Intake → CRM", status: "success" as const, duration: "0.8s", timestamp: "Yesterday" },
];

const WorkflowDetail = () => {
  const { id } = useParams();
  const [isActive, setIsActive] = useState(mockWorkflow.isActive);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  // Build sidebar steps from trigger + actions
  const sidebarSteps: WorkflowStep[] = [
    { id: "trigger", name: mockWorkflow.trigger.label, icon: "trigger", type: "trigger" },
    ...mockWorkflow.steps.map((step) => ({
      id: step.id,
      name: step.name,
      icon: step.icon,
      type: "action" as const,
    })),
  ];

  const handleToggleActive = (active: boolean) => {
    setIsActive(active);
    if (active) {
      synthToast.success("Workflow Activated", `"${mockWorkflow.name}" is now running.`);
    } else {
      synthToast.warning("Workflow Paused", `"${mockWorkflow.name}" has been deactivated.`);
    }
  };

  const handleStepClick = (stepId: string) => {
    setActiveStepId(stepId);
    // Scroll to the step if it's not the trigger
    if (stepId !== "trigger") {
      const element = document.getElementById(`step-${stepId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-synth-navy-light/20">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Workflow Structure */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <WorkflowSidebar
              workflowName={mockWorkflow.name}
              isActive={isActive}
              steps={sidebarSteps}
              activeStepId={activeStepId}
              onStepClick={handleStepClick}
            />
          </motion.div>

          {/* Right Main Panel */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <WorkflowHeader
                name={mockWorkflow.name}
                isActive={isActive}
                onToggleActive={handleToggleActive}
              />
            </motion.div>

            {/* Trigger Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <TriggerCard
                triggerType={mockWorkflow.trigger.type}
                triggerLabel={mockWorkflow.trigger.label}
                description={mockWorkflow.trigger.description}
                lastTriggered={mockWorkflow.trigger.lastTriggered}
              />
            </motion.div>

            {/* Steps Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <StepsCard
                steps={mockWorkflow.steps}
                activeStepId={activeStepId}
              />
            </motion.div>

            {/* Analytics Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <AnalyticsCard
                totalRuns={mockWorkflow.analytics.totalRuns}
                avgExecutionTime={mockWorkflow.analytics.avgExecutionTime}
                successRate={mockWorkflow.analytics.successRate}
                lastRun={mockWorkflow.analytics.lastRun}
              />
            </motion.div>

            {/* Run History Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <RunHistoryCard
                executions={mockExecutions}
                workflowId={id || "1"}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default WorkflowDetail;
