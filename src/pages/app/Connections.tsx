import { useState } from "react";
import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { PageTransition } from "@/components/app/PageTransition";
import ConnectionIntegrationCard from "@/components/connections/ConnectionIntegrationCard";
import ConnectIntegrationModal from "@/components/connections/ConnectIntegrationModal";

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  connected: boolean;
  comingSoon?: boolean;
}

const initialIntegrations: Integration[] = [
  { id: "gmail", name: "Gmail", description: "Send and receive emails, manage drafts and labels", icon: "Gmail", category: "Communication", connected: false },
  { id: "google-calendar", name: "Google Calendar", description: "Create events, manage schedules and reminders", icon: "Google Calendar", category: "Productivity", connected: true },
  { id: "google-sheets", name: "Google Sheets", description: "Read and write spreadsheet data", icon: "Google Sheets", category: "Productivity", connected: false },
  { id: "slack", name: "Slack", description: "Send messages, manage channels and workflows", icon: "Slack", category: "Communication", connected: true },
  { id: "notion", name: "Notion", description: "Create pages, update databases and manage content", icon: "Notion", category: "Productivity", connected: false },
  { id: "webhooks", name: "Webhooks", description: "Send and receive HTTP webhooks for custom integrations", icon: "Webhooks", category: "Developer", connected: false },
  { id: "email-smtp", name: "Email (SMTP)", description: "Send emails via custom SMTP server", icon: "Email (SMTP)", category: "Communication", connected: false },
  { id: "discord", name: "Discord", description: "Send messages, manage servers and bots", icon: "Discord", category: "Communication", connected: false },
  { id: "stripe", name: "Stripe", description: "Manage payments, subscriptions and invoices", icon: "Stripe", category: "Finance", connected: false },
  { id: "clickup", name: "ClickUp", description: "Manage tasks, projects and team workspaces", icon: "ClickUp", category: "Productivity", connected: false },
  { id: "trello", name: "Trello", description: "Manage boards, cards and team collaboration", icon: "Trello", category: "Productivity", connected: false },
  { id: "airtable", name: "Airtable", description: "Manage databases, records and automations", icon: "Airtable", category: "Productivity", connected: false },
  { id: "google-drive", name: "Google Drive", description: "Upload, download and organize files and folders", icon: "Google Drive", category: "Storage", connected: false },
  { id: "canva", name: "Canva", description: "Create and export designs and graphics", icon: "Canva", category: "Design", connected: false },
  { id: "dropbox-paper", name: "Dropbox Paper", description: "Create and collaborate on documents", icon: "Dropbox Paper", category: "Productivity", connected: false },
  { id: "google-forms", name: "Google Forms", description: "Create forms and collect responses", icon: "Google Forms", category: "Productivity", connected: false },
  { id: "instagram-api", name: "Instagram Basic API", description: "Post content and manage basic account features", icon: "Instagram Basic API", category: "Social Media", connected: false },
  { id: "youtube-api", name: "YouTube API", description: "Upload videos and manage channel content", icon: "YouTube API", category: "Social Media", connected: false },
  { id: "dropbox", name: "Dropbox", description: "Upload, download and manage cloud files", icon: "Dropbox", category: "Storage", connected: false },
  { id: "hubspot", name: "HubSpot CRM", description: "Manage contacts, deals and marketing campaigns", icon: "HubSpot CRM", category: "CRM", connected: false },
  { id: "monday", name: "Monday.com", description: "Manage projects, boards and team workflows", icon: "Monday.com", category: "Productivity", connected: false },
  { id: "quickbooks", name: "QuickBooks", description: "Manage invoices, expenses and financial reports", icon: "QuickBooks", category: "Finance", connected: false },
  { id: "twitter", name: "Twitter (X)", description: "Post tweets and manage social interactions", icon: "Twitter (X)", category: "Social Media", connected: false },
  { id: "openai", name: "OpenAI API", description: "Access GPT models for AI-powered automation", icon: "OpenAI API", category: "AI", connected: false },
  { id: "calendly", name: "Calendly", description: "Schedule meetings and manage appointments", icon: "Calendly", category: "Productivity", connected: false },
  { id: "make-bridge", name: "Make.com Bridge", description: "Connect with Make.com scenarios and workflows", icon: "Make.com Bridge", category: "Developer", connected: false },
  { id: "facebook-pages", name: "Facebook Pages API", description: "Manage page content and engagement", icon: "Facebook Pages API", category: "Social Media", connected: false },
  { id: "google-ads", name: "Google Ads", description: "Manage ad campaigns and track performance", icon: "Google Ads", category: "Marketing", connected: false },
  { id: "meta-ads", name: "Meta Ads Manager", description: "Run and optimize Facebook and Instagram ads", icon: "Meta Ads Manager", category: "Marketing", connected: false },
  { id: "salesforce", name: "Salesforce", description: "Manage leads, contacts and sales pipelines", icon: "Salesforce", category: "CRM", connected: false },
  { id: "zoho", name: "Zoho CRM", description: "Manage sales, marketing and customer support", icon: "Zoho CRM", category: "CRM", connected: false },
  { id: "zapier", name: "Zapier Handoff", description: "Connect with 5000+ apps through Zapier", icon: "Zapier Handoff", category: "Developer", connected: false },
  { id: "shopify", name: "Shopify Admin API", description: "Manage products, orders and store settings", icon: "Shopify Admin API", category: "E-commerce", connected: false },
  { id: "aws-s3", name: "AWS S3", description: "Store and retrieve files from Amazon S3 buckets", icon: "AWS S3", category: "Storage", connected: false },
  { id: "azure-blob", name: "Azure Blob Storage", description: "Manage files in Microsoft Azure storage", icon: "Azure Blob Storage", category: "Storage", connected: false },
  { id: "gcs", name: "Google Cloud Storage", description: "Store and manage files in Google Cloud", icon: "Google Cloud Storage", category: "Storage", connected: false },
  { id: "ms-teams", name: "Microsoft Teams", description: "Send messages and manage team channels", icon: "Microsoft Teams", category: "Communication", connected: false },
  { id: "jira", name: "Jira", description: "Manage issues, sprints and project tracking", icon: "Jira", category: "Productivity", connected: false },
  { id: "servicenow", name: "ServiceNow", description: "Manage IT service requests and incidents", icon: "ServiceNow", category: "Enterprise", connected: false },
  { id: "oracle-cloud", name: "Oracle Cloud Storage", description: "Enterprise cloud storage and data management", icon: "Oracle Cloud Storage", category: "Storage", connected: false },
];

const Connections = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    setConnectModalOpen(true);
  };

  const handleConfirmConnect = () => {
    if (selectedIntegration) {
      setIntegrations(prev => 
        prev.map(i => i.id === selectedIntegration.id ? { ...i, connected: true } : i)
      );
    }
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(i => i.id === integrationId ? { ...i, connected: false } : i)
    );
  };

  const connectedCount = integrations.filter(i => i.connected).length;
  const totalCount = integrations.length;

  return (
    <AppShell>
      <PageTransition>
        <div className="space-y-6">
          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-1 text-sm text-muted-foreground"
          >
            <span className="text-foreground font-semibold">{totalCount}</span>
            <span>available</span>
            <span className="mx-2 text-border">·</span>
            <span className="text-green-400 font-semibold">{connectedCount}</span>
            <span>connected</span>
          </motion.div>

          {/* Integrations Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {integrations.map((integration, index) => (
              <ConnectionIntegrationCard
                key={integration.id}
                integration={integration}
                onConnect={() => handleConnect(integration)}
                onDisconnect={() => handleDisconnect(integration.id)}
                index={index}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {integrations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-lg font-medium text-foreground mb-2">No integrations available</h3>
              <p className="text-muted-foreground">Check back later for new integrations</p>
            </motion.div>
          )}
        </div>
      </PageTransition>

      {/* Connect Integration Modal */}
      <ConnectIntegrationModal
        open={connectModalOpen}
        onOpenChange={setConnectModalOpen}
        integrationName={selectedIntegration?.name || ""}
        onConfirm={handleConfirmConnect}
      />
    </AppShell>
  );
};

export default Connections;
