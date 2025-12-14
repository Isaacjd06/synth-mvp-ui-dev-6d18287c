import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { PageTransition } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import ConnectionIntegrationCard from "@/components/connections/ConnectionIntegrationCard";
import ConnectIntegrationModal from "@/components/connections/ConnectIntegrationModal";
import { cn } from "@/lib/utils";

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

type FilterType = "all" | "connected" | "available";

const Connections = () => {
  const navigate = useNavigate();
  
  // UI-ONLY: Temporary preview toggle (will be replaced by backend logic)
  const [isSubscribedPreview, setIsSubscribedPreview] = useState(true);
  
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const handleConnect = (integration: Integration) => {
    if (!isSubscribedPreview) return;
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
    if (!isSubscribedPreview) return;
    setIntegrations(prev => 
      prev.map(i => i.id === integrationId ? { ...i, connected: false } : i)
    );
  };

  const connectedIntegrations = integrations.filter(i => i.connected);
  const availableIntegrations = integrations.filter(i => !i.connected);
  const connectedCount = connectedIntegrations.length;
  const totalCount = integrations.length;

  const getFilteredIntegrations = () => {
    if (filter === "connected") return connectedIntegrations;
    if (filter === "available") return availableIntegrations;
    return integrations;
  };

  const filteredIntegrations = getFilteredIntegrations();

  return (
    <AppShell>
      <PageTransition>
        <div className="space-y-10">
          {/* DEV-ONLY Toggle */}
          <div className="relative z-[60]">
            <div className="flex items-center justify-between rounded-lg border border-dashed border-amber-500/40 bg-amber-500/5 px-4 py-2.5">
              <span className="text-xs font-medium text-amber-400/80 uppercase tracking-wide">
                DEV: isSubscribedPreview
              </span>
              <div className="flex items-center gap-3">
                <span className={cn("text-xs", isSubscribedPreview ? "text-muted-foreground/50" : "text-foreground/80")}>
                  False
                </span>
                <Switch 
                  checked={isSubscribedPreview} 
                  onCheckedChange={setIsSubscribedPreview}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={cn("text-xs", isSubscribedPreview ? "text-foreground/80" : "text-muted-foreground/50")}>
                  True
                </span>
              </div>
            </div>
          </div>

          {/* Gated Message Banner */}
          {!isSubscribedPreview && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-primary/20 bg-primary/5 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <p className="text-sm text-foreground/80">
                Connections are available on an active plan
              </p>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate("/pricing")}
                className="border-primary/30 text-primary hover:bg-primary/10 shrink-0"
              >
                View Plans
              </Button>
            </motion.div>
          )}

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-1"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Connections</h1>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Manage the tools Synth can securely connect to on your behalf.
                </p>
              </div>
              {/* Stats - muted, inline */}
              <span className="text-xs text-muted-foreground/50">
                {totalCount} available · {connectedCount} connected
              </span>
            </div>
          </motion.div>

          {/* Filter Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className={cn(
              "flex items-center gap-6 text-sm border-b border-border/30 pb-3",
              !isSubscribedPreview && "opacity-50 pointer-events-none"
            )}
          >
            {(["all", "connected", "available"] as FilterType[]).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                disabled={!isSubscribedPreview}
                className={cn(
                  "transition-all duration-200 capitalize pb-1 -mb-3.5",
                  filter === filterType
                    ? "text-foreground font-medium border-b-2 border-foreground"
                    : "text-muted-foreground/60 hover:text-muted-foreground"
                )}
              >
                {filterType}
              </button>
            ))}
          </motion.div>

          {/* Connected Section */}
          {(filter === "all" || filter === "connected") && connectedIntegrations.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "space-y-5 -mx-4 px-4 py-6 rounded-lg bg-gradient-to-b from-green-500/[0.02] to-transparent",
                !isSubscribedPreview && "opacity-60"
              )}
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-xs font-medium text-green-500/70 uppercase tracking-widest">
                  Connected
                </h2>
                <span className="text-[10px] text-muted-foreground/40">
                  {connectedCount} active
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {connectedIntegrations.map((integration, index) => (
                  <div key={integration.id} className={cn(!isSubscribedPreview && "pointer-events-none")}>
                    <ConnectionIntegrationCard
                      integration={integration}
                      onConnect={() => handleConnect(integration)}
                      onDisconnect={() => handleDisconnect(integration.id)}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Available Section */}
          {(filter === "all" || filter === "available") && availableIntegrations.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className={cn("space-y-5", !isSubscribedPreview && "opacity-60")}
            >
              <div className="flex items-baseline justify-between border-t border-border/20 pt-6">
                <h2 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-widest">
                  Available
                </h2>
                <span className="text-[10px] text-muted-foreground/40">
                  {availableIntegrations.length} apps
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {availableIntegrations.map((integration, index) => (
                  <div key={integration.id} className={cn(!isSubscribedPreview && "pointer-events-none")}>
                    <ConnectionIntegrationCard
                      integration={integration}
                      onConnect={() => handleConnect(integration)}
                      onDisconnect={() => handleDisconnect(integration.id)}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Empty State */}
          {filteredIntegrations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-base font-medium text-foreground mb-2">
                {filter === "connected" ? "No connections yet" : "No integrations available"}
              </h3>
              <p className="text-sm text-muted-foreground/60">
                {filter === "connected" 
                  ? "Connect an app to get started" 
                  : "Check back later for new integrations"}
              </p>
            </motion.div>
          )}
        </div>
      </PageTransition>

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
