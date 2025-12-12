import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Plug, Lock } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition } from "@/components/app/PageTransition";
import { Input } from "@/components/ui/input";
import ConnectionIntegrationCard from "@/components/connections/ConnectionIntegrationCard";
import ConnectIntegrationModal from "@/components/connections/ConnectIntegrationModal";
import SubscriptionBanner from "@/components/subscription/SubscriptionBanner";
import { useSubscription, PlanTier } from "@/contexts/SubscriptionContext";
import { cn } from "@/lib/utils";

export type IntegrationTier = "starter" | "pro" | "agency";

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: IntegrationTier;
  category: string;
  connected: boolean;
  comingSoon?: boolean;
}

const initialIntegrations: Integration[] = [
  // Starter tier (1-18)
  { id: "gmail", name: "Gmail", description: "Send and receive emails, manage drafts and labels", icon: "Gmail", tier: "starter", category: "Communication", connected: false },
  { id: "google-calendar", name: "Google Calendar", description: "Create events, manage schedules and reminders", icon: "Google Calendar", tier: "starter", category: "Productivity", connected: true },
  { id: "google-sheets", name: "Google Sheets", description: "Read and write spreadsheet data", icon: "Google Sheets", tier: "starter", category: "Productivity", connected: false },
  { id: "slack", name: "Slack", description: "Send messages, manage channels and workflows", icon: "Slack", tier: "starter", category: "Communication", connected: true },
  { id: "notion", name: "Notion", description: "Create pages, update databases and manage content", icon: "Notion", tier: "starter", category: "Productivity", connected: false },
  { id: "webhooks", name: "Webhooks", description: "Send and receive HTTP webhooks for custom integrations", icon: "Webhooks", tier: "starter", category: "Developer", connected: false },
  { id: "email-smtp", name: "Email (SMTP)", description: "Send emails via custom SMTP server", icon: "Email (SMTP)", tier: "starter", category: "Communication", connected: false },
  { id: "discord", name: "Discord", description: "Send messages, manage servers and bots", icon: "Discord", tier: "starter", category: "Communication", connected: false },
  { id: "stripe", name: "Stripe", description: "Manage payments, subscriptions and invoices", icon: "Stripe", tier: "starter", category: "Finance", connected: false },
  { id: "clickup", name: "ClickUp", description: "Manage tasks, projects and team workspaces", icon: "ClickUp", tier: "starter", category: "Productivity", connected: false },
  { id: "trello", name: "Trello", description: "Manage boards, cards and team collaboration", icon: "Trello", tier: "starter", category: "Productivity", connected: false },
  { id: "airtable", name: "Airtable", description: "Manage databases, records and automations", icon: "Airtable", tier: "starter", category: "Productivity", connected: false },
  { id: "google-drive", name: "Google Drive", description: "Upload, download and organize files and folders", icon: "Google Drive", tier: "starter", category: "Storage", connected: false },
  { id: "canva", name: "Canva", description: "Create and export designs and graphics", icon: "Canva", tier: "starter", category: "Design", connected: false },
  { id: "dropbox-paper", name: "Dropbox Paper", description: "Create and collaborate on documents", icon: "Dropbox Paper", tier: "starter", category: "Productivity", connected: false },
  { id: "google-forms", name: "Google Forms", description: "Create forms and collect responses", icon: "Google Forms", tier: "starter", category: "Productivity", connected: false },
  { id: "instagram-api", name: "Instagram Basic API", description: "Post content and manage basic account features", icon: "Instagram Basic API", tier: "starter", category: "Social Media", connected: false },
  { id: "youtube-api", name: "YouTube API", description: "Upload videos and manage channel content", icon: "YouTube API", tier: "starter", category: "Social Media", connected: false },
  
  // Pro tier (19-29)
  { id: "dropbox", name: "Dropbox", description: "Upload, download and manage cloud files", icon: "Dropbox", tier: "pro", category: "Storage", connected: false },
  { id: "hubspot", name: "HubSpot CRM", description: "Manage contacts, deals and marketing campaigns", icon: "HubSpot CRM", tier: "pro", category: "CRM", connected: false },
  { id: "monday", name: "Monday.com", description: "Manage projects, boards and team workflows", icon: "Monday.com", tier: "pro", category: "Productivity", connected: false },
  { id: "quickbooks", name: "QuickBooks", description: "Manage invoices, expenses and financial reports", icon: "QuickBooks", tier: "pro", category: "Finance", connected: false },
  { id: "twitter", name: "Twitter (X)", description: "Post tweets and manage social interactions", icon: "Twitter (X)", tier: "pro", category: "Social Media", connected: false },
  { id: "openai", name: "OpenAI API", description: "Access GPT models for AI-powered automation", icon: "OpenAI API", tier: "pro", category: "AI", connected: false },
  { id: "calendly", name: "Calendly", description: "Schedule meetings and manage appointments", icon: "Calendly", tier: "pro", category: "Productivity", connected: false },
  { id: "make-bridge", name: "Make.com Bridge", description: "Connect with Make.com scenarios and workflows", icon: "Make.com Bridge", tier: "pro", category: "Developer", connected: false },
  { id: "facebook-pages", name: "Facebook Pages API", description: "Manage page content and engagement", icon: "Facebook Pages API", tier: "pro", category: "Social Media", connected: false },
  { id: "google-ads", name: "Google Ads", description: "Manage ad campaigns and track performance", icon: "Google Ads", tier: "pro", category: "Marketing", connected: false },
  { id: "meta-ads", name: "Meta Ads Manager", description: "Run and optimize Facebook and Instagram ads", icon: "Meta Ads Manager", tier: "pro", category: "Marketing", connected: false },
  
  // Agency tier (30-40)
  { id: "salesforce", name: "Salesforce", description: "Manage leads, contacts and sales pipelines", icon: "Salesforce", tier: "agency", category: "CRM", connected: false },
  { id: "zoho", name: "Zoho CRM", description: "Manage sales, marketing and customer support", icon: "Zoho CRM", tier: "agency", category: "CRM", connected: false },
  { id: "zapier", name: "Zapier Handoff", description: "Connect with 5000+ apps through Zapier", icon: "Zapier Handoff", tier: "agency", category: "Developer", connected: false },
  { id: "shopify", name: "Shopify Admin API", description: "Manage products, orders and store settings", icon: "Shopify Admin API", tier: "agency", category: "E-commerce", connected: false },
  { id: "aws-s3", name: "AWS S3", description: "Store and retrieve files from Amazon S3 buckets", icon: "AWS S3", tier: "agency", category: "Storage", connected: false },
  { id: "azure-blob", name: "Azure Blob Storage", description: "Manage files in Microsoft Azure storage", icon: "Azure Blob Storage", tier: "agency", category: "Storage", connected: false },
  { id: "gcs", name: "Google Cloud Storage", description: "Store and manage files in Google Cloud", icon: "Google Cloud Storage", tier: "agency", category: "Storage", connected: false },
  { id: "ms-teams", name: "Microsoft Teams", description: "Send messages and manage team channels", icon: "Microsoft Teams", tier: "agency", category: "Communication", connected: false },
  { id: "jira", name: "Jira", description: "Manage issues, sprints and project tracking", icon: "Jira", tier: "agency", category: "Productivity", connected: false },
  { id: "servicenow", name: "ServiceNow", description: "Manage IT service requests and incidents", icon: "ServiceNow", tier: "agency", category: "Enterprise", connected: false },
  { id: "oracle-cloud", name: "Oracle Cloud Storage", description: "Enterprise cloud storage and data management", icon: "Oracle Cloud Storage", tier: "agency", category: "Storage", connected: false },
];

const filterOptions = ["All", "Starter", "Pro", "Agency"] as const;
type FilterOption = typeof filterOptions[number];

const tierLevel: Record<IntegrationTier, number> = {
  starter: 1,
  pro: 2,
  agency: 3,
};

const planTierLevel: Record<PlanTier & string, number> = {
  starter: 1,
  pro: 2,
  agency: 3,
};

const Connections = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  
  const { isSubscribed, planTier, openSubscriptionModal } = useSubscription();
  
  const userTierLevel = planTier ? planTierLevel[planTier] : 0;

  const isIntegrationLocked = (integration: Integration): boolean => {
    if (!isSubscribed) return true;
    return tierLevel[integration.tier] > userTierLevel;
  };

  const getRequiredPlan = (integration: Integration): string => {
    return integration.tier.charAt(0).toUpperCase() + integration.tier.slice(1);
  };

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((integration) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        integration.name.toLowerCase().includes(searchLower) ||
        integration.description.toLowerCase().includes(searchLower) ||
        integration.category.toLowerCase().includes(searchLower);
      
      let matchesFilter = true;
      if (activeFilter === "Starter") matchesFilter = integration.tier === "starter";
      else if (activeFilter === "Pro") matchesFilter = integration.tier === "pro";
      else if (activeFilter === "Agency") matchesFilter = integration.tier === "agency";
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, integrations]);

  const handleConnect = (integration: Integration) => {
    if (isIntegrationLocked(integration)) {
      openSubscriptionModal(`${integration.name} integration`);
      return;
    }
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
  const availableCount = integrations.filter(i => !isIntegrationLocked(i)).length;

  return (
    <AppShell>
      <PageTransition>
        <div className="space-y-6">
          {/* Subscription Banner */}
          {!isSubscribed && (
            <SubscriptionBanner 
              feature="connect integrations and unlock automation capabilities"
            />
          )}

          {/* Header */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-display font-bold text-foreground tracking-tight flex items-center gap-3"
            >
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <Plug className="w-6 h-6 text-primary" />
              </div>
              Connections
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mt-2"
            >
              Connect the apps Synth can use inside your automations.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card/50 border-border/60 focus:border-primary/50 focus:ring-primary/20 shadow-sm"
              />
            </div>
          </motion.div>

          {/* Filter Pills & Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary))]"
                      : "bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50 hover:border-border"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {isSubscribed ? (
                <>
                  <span className="text-foreground font-semibold">{availableCount}</span>
                  <span>available</span>
                  <span className="mx-2 text-border">·</span>
                  <span className="text-green-400 font-semibold">{connectedCount}</span>
                  <span>connected</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span className="text-foreground font-semibold">{totalCount}</span>
                  <span>integrations locked</span>
                </>
              )}
            </div>
          </motion.div>

          {/* Integrations Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredIntegrations.map((integration, index) => (
              <ConnectionIntegrationCard
                key={integration.id}
                integration={integration}
                onConnect={() => handleConnect(integration)}
                onDisconnect={() => handleDisconnect(integration.id)}
                index={index}
                isLocked={isIntegrationLocked(integration)}
                requiredPlan={getRequiredPlan(integration)}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredIntegrations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No integrations found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter</p>
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
