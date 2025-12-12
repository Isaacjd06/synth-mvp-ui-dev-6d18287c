import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import ExecutionHeader from "@/components/execution-detail/ExecutionHeader";
import SummaryCards from "@/components/execution-detail/SummaryCards";
import ExecutionTimelineNew from "@/components/execution-detail/ExecutionTimelineNew";
import ErrorPanel from "@/components/execution-detail/ErrorPanel";
import { synthToast } from "@/lib/synth-toast";

// Mock subscription state (UI only)
const isSubscribed = true;

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
      inputData: {
        source: "website_form",
        timestamp: "2024-12-09T14:32:15Z",
      },
      outputData: {
        validated: true,
        payload_size: "1.2kb",
      },
    },
    {
      id: "s2",
      name: "Validate Input Data",
      status: "completed" as const,
      timestamp: "14:32:15",
      duration: "0.2s",
      inputData: {
        email: "john.doe@example.com",
        name: "John Doe",
        company: "Acme Inc",
      },
      outputData: {
        valid: true,
        sanitized: true,
        fields_processed: 3,
      },
    },
    {
      id: "s3",
      name: "Enrich with Clearbit",
      status: "completed" as const,
      timestamp: "14:32:16",
      duration: "1.2s",
      inputData: {
        email: "john.doe@example.com",
        domain: "example.com",
      },
      outputData: {
        company_size: "50-100",
        industry: "Technology",
        linkedin: "linkedin.com/in/johndoe",
        enrichment_score: 0.92,
      },
    },
    {
      id: "s4",
      name: "Create CRM Contact",
      status: "completed" as const,
      timestamp: "14:32:17",
      duration: "0.4s",
      inputData: {
        name: "John Doe",
        email: "john.doe@example.com",
        company: "Acme Inc",
        enriched: true,
      },
      outputData: {
        crm_id: "CRM-12345",
        created_at: "2024-12-09T14:32:17Z",
        status: "new",
      },
    },
    {
      id: "s5",
      name: "Send Slack Notification",
      status: "error" as const,
      timestamp: "14:32:17",
      duration: "0.2s",
      inputData: {
        channel: "#sales-leads",
        message: "New lead: John Doe from Acme Inc",
      },
      errorDetails: {
        message: "channel_not_found: The channel #sales-leads does not exist or bot lacks access.",
        cause: "The Slack channel may have been renamed or the Synth bot permissions were revoked.",
      },
    },
  ],
};

const ExecutionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const execution = mockExecutionData;

  const handleRunAgain = () => {
    synthToast.success("Execution Started", "Workflow is now running.");
  };

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
          {/* Header with Sticky Back Buttons */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ExecutionHeader
              workflowName={execution.workflowName}
              workflowId={execution.workflowId}
              executionId={execution.shortId}
              isSubscribed={isSubscribed}
              onRunAgain={handleRunAgain}
            />
          </motion.div>

          {/* Summary Cards with Tooltips */}
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

          {/* Interactive Execution Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <ExecutionTimelineNew 
              steps={execution.steps} 
              isSubscribed={isSubscribed}
            />
          </motion.div>

          {/* Error Panel (only if error) */}
          {execution.status === "error" && execution.error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <ErrorPanel
                errorMessage={execution.error.message}
                errorCode={execution.error.code}
                possibleCause={execution.error.possibleCause}
                stackTrace={execution.error.stack}
                onFixInChat={handleFixInChat}
                isSubscribed={isSubscribed}
              />
            </motion.div>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default ExecutionDetail;
