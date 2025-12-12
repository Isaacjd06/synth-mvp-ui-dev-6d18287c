import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import ExecutionHeader from "@/components/execution-detail/ExecutionHeader";
import SummaryCards from "@/components/execution-detail/SummaryCards";
import ExecutionTimelineNew from "@/components/execution-detail/ExecutionTimelineNew";
import DataViewerCard from "@/components/execution-detail/DataViewerCard";
import ErrorPanel from "@/components/execution-detail/ErrorPanel";
import ExecutionFooter from "@/components/execution-detail/ExecutionFooter";

// Mock execution data
const mockExecutionData = {
  id: "exec_abc123xyz",
  shortId: "#7fs8db2",
  workflowId: "1",
  workflowName: "Lead Intake → CRM",
  status: "error" as const,
  timestamp: "2 hours ago",
  duration: "2.1s",
  triggerType: "Webhook",
  workflowVersion: "v1.3.2",
  input: {
    email: "john.doe@example.com",
    name: "John Doe",
    company: "Acme Inc",
    source: "contact_form",
    metadata: {
      utm_source: "google",
      utm_campaign: "winter_promo",
      landing_page: "/pricing",
    },
  },
  output: {
    crmId: "CRM-12345",
    enriched: true,
    enrichmentData: {
      company_size: "50-100",
      industry: "Technology",
      linkedin: "linkedin.com/in/johndoe",
    },
    slackNotified: false,
  },
  error: {
    message: "Failed to send Slack notification: channel_not_found",
    code: "SLACK_API_ERROR",
    possibleCause: "The configured Slack channel may have been deleted or renamed. Verify the channel exists and the Synth bot has access to post messages.",
    stack: `Error: channel_not_found
    at SlackClient.postMessage (/workflows/slack-integration.js:42:15)
    at ExecutionRunner.runStep (/core/runner.js:128:22)
    at async ExecutionRunner.execute (/core/runner.js:85:12)
    at async WorkflowEngine.run (/engine/workflow.js:156:8)`,
  },
  steps: [
    {
      id: "s1",
      name: "Form Submission Received",
      status: "completed" as const,
      timestamp: "14:32:15",
      duration: "0.1s",
      description: "Webhook triggered by incoming form submission from the website contact form.",
      details: {
        "Webhook URL": "https://api.synth.io/hooks/abc123",
        "Method": "POST",
        "Content-Type": "application/json",
      },
      logs: "[14:32:15] Webhook received\n[14:32:15] Payload validated\n[14:32:15] Trigger complete",
    },
    {
      id: "s2",
      name: "Validate Input Data",
      status: "completed" as const,
      timestamp: "14:32:15",
      duration: "0.2s",
      description: "Validates the incoming data against the expected schema and sanitizes inputs.",
      details: {
        "Fields Validated": "4",
        "Schema Version": "2.1",
        "Sanitization": "Enabled",
      },
    },
    {
      id: "s3",
      name: "Enrich with Clearbit",
      status: "completed" as const,
      timestamp: "14:32:16",
      duration: "1.2s",
      description: "Enriches lead data using Clearbit API to gather company and contact information.",
      details: {
        "API Endpoint": "api.clearbit.com/v2",
        "Records Matched": "1",
        "Data Points": "12",
      },
      logs: "[14:32:16] Clearbit lookup started\n[14:32:17] Company data found\n[14:32:17] Enrichment complete",
    },
    {
      id: "s4",
      name: "Create CRM Contact",
      status: "completed" as const,
      timestamp: "14:32:17",
      duration: "0.4s",
      description: "Creates or updates the contact record in HubSpot CRM with enriched data.",
      details: {
        "CRM": "HubSpot",
        "Action": "Create",
        "Contact ID": "CRM-12345",
      },
    },
    {
      id: "s5",
      name: "Send Slack Notification",
      status: "error" as const,
      timestamp: "14:32:17",
      duration: "0.2s",
      description: "Sends notification to the sales team Slack channel about the new lead.",
      details: {
        "Channel": "#sales-leads",
        "Status": "Failed",
        "Error": "channel_not_found",
      },
      logs: "[14:32:17] Attempting to send Slack message\n[14:32:17] ERROR: channel_not_found\n[14:32:17] Step failed",
    },
  ],
};

const ExecutionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const execution = mockExecutionData;

  const handleFixInChat = () => {
    navigate("/app/chat", {
      state: {
        prefill: `Help me fix this workflow error: ${execution.error?.message}`,
      },
    });
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-synth-navy-light/20">
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ExecutionHeader
              workflowName={execution.workflowName}
              workflowId={execution.workflowId}
              executionId={execution.shortId}
              status={execution.status}
              timestamp={execution.timestamp}
              duration={execution.duration}
            />
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <SummaryCards
              status={execution.status}
              executionTime={execution.duration}
              triggerType={execution.triggerType}
              workflowVersion={execution.workflowVersion}
            />
          </motion.div>

          {/* Execution Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <ExecutionTimelineNew steps={execution.steps} />
          </motion.div>

          {/* Input Data */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <DataViewerCard
              title="Input Data"
              data={execution.input}
              defaultExpanded={true}
            />
          </motion.div>

          {/* Output Data */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <DataViewerCard
              title="Output Data"
              data={execution.output}
              defaultExpanded={false}
            />
          </motion.div>

          {/* Error Panel (only if error) */}
          {execution.status === "error" && execution.error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <ErrorPanel
                errorMessage={execution.error.message}
                errorCode={execution.error.code}
                possibleCause={execution.error.possibleCause}
                stackTrace={execution.error.stack}
                onFixInChat={handleFixInChat}
              />
            </motion.div>
          )}

          {/* Footer Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <ExecutionFooter workflowId={execution.workflowId} />
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
};

export default ExecutionDetail;
