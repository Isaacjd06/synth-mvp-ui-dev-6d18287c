import { useParams, useNavigate } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import ExecutionHeader from "@/components/execution-detail/ExecutionHeader";
import ExecutionTimelineNew from "@/components/execution-detail/ExecutionTimelineNew";
import ErrorPanel from "@/components/execution-detail/ErrorPanel";

// Mock execution data
const mockExecutionData = {
  id: "exec_abc123xyz",
  shortId: "#7fs8db2",
  workflowId: "1",
  workflowName: "Lead Intake → CRM",
  status: "error" as const,
  timestamp: "2 hours ago",
  duration: "2.1s",
  error: {
    message: "Failed to send Slack notification: channel_not_found",
    code: "SLACK_API_ERROR",
    possibleCause: "The configured Slack channel may have been deleted or renamed. Verify the channel exists and the Synth bot has access to post messages.",
    suggestedAction: "Check your Slack workspace for the #sales-leads channel, or update the workflow to use an existing channel.",
    stack: `Error: channel_not_found
    at SlackClient.postMessage (/workflows/slack-integration.js:42:15)
    at ExecutionRunner.runStep (/core/runner.js:128:22)
    at async ExecutionRunner.execute (/core/runner.js:85:12)`,
  },
  steps: [
    {
      id: "s1",
      name: "Form Submission Received",
      status: "completed" as const,
      timestamp: "14:32:15",
      duration: "0.1s",
    },
    {
      id: "s2",
      name: "Validate Input Data",
      status: "completed" as const,
      timestamp: "14:32:15",
      duration: "0.2s",
    },
    {
      id: "s3",
      name: "Enrich with Clearbit",
      status: "completed" as const,
      timestamp: "14:32:16",
      duration: "1.2s",
    },
    {
      id: "s4",
      name: "Create CRM Contact",
      status: "completed" as const,
      timestamp: "14:32:17",
      duration: "0.4s",
    },
    {
      id: "s5",
      name: "Send Slack Notification",
      status: "error" as const,
      timestamp: "14:32:17",
      duration: "0.2s",
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

  const handleFixInChat = () => {
    navigate("/app/chat", {
      state: {
        prefill: `Help me fix this workflow error: ${execution.error?.message}`,
      },
    });
  };

  return (
    <AppShell>
      <div className="min-h-screen">
        <div className="space-y-6 pb-8">
          {/* Header */}
          <ExecutionHeader
            workflowName={execution.workflowName}
            workflowId={execution.workflowId}
            executionId={execution.shortId}
            status={execution.status}
            timestamp={execution.timestamp}
            duration={execution.duration}
            onFixInChat={execution.status === "error" ? handleFixInChat : undefined}
          />

          {/* Timeline */}
          <div className="px-4 lg:px-6">
            <ExecutionTimelineNew steps={execution.steps} />
          </div>

          {/* Error Panel (only if error) */}
          {execution.status === "error" && execution.error && (
            <div className="px-4 lg:px-6">
              <ErrorPanel
                errorMessage={execution.error.message}
                errorCode={execution.error.code}
                possibleCause={execution.error.possibleCause}
                suggestedAction={execution.error.suggestedAction}
                stackTrace={execution.error.stack}
                onFixInChat={handleFixInChat}
              />
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default ExecutionDetail;
