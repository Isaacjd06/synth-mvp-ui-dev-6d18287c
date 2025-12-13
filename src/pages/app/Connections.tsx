import { useState } from "react";
import { motion } from "framer-motion";
import { Plug, MessageSquare, FileText, Users, CreditCard, ShoppingCart, Megaphone, CheckSquare, Database, Brain, Code } from "lucide-react";
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

const categoryConfig: Record<string, { label: string; icon: React.ReactNode }> = {
  "Communication": { label: "Core Communication", icon: <MessageSquare className="w-5 h-5" /> },
  "Documents & Knowledge": { label: "Documents & Knowledge", icon: <FileText className="w-5 h-5" /> },
  "CRM & Sales": { label: "CRM & Sales Pipelines", icon: <Users className="w-5 h-5" /> },
  "Payments & Billing": { label: "Payments & Billing", icon: <CreditCard className="w-5 h-5" /> },
  "E-Commerce": { label: "E-Commerce & Orders", icon: <ShoppingCart className="w-5 h-5" /> },
  "Marketing & Outreach": { label: "Marketing & Outreach", icon: <Megaphone className="w-5 h-5" /> },
  "Task Management": { label: "Internal Ops & Task Management", icon: <CheckSquare className="w-5 h-5" /> },
  "Forms & Data": { label: "Data, Forms & Input Sources", icon: <Database className="w-5 h-5" /> },
  "AI & Intelligence": { label: "AI / System-Level", icon: <Brain className="w-5 h-5" /> },
  "Developer": { label: "Dev / System Integration", icon: <Code className="w-5 h-5" /> },
};

const categoryOrder = [
  "Communication",
  "Documents & Knowledge",
  "CRM & Sales",
  "Payments & Billing",
  "E-Commerce",
  "Marketing & Outreach",
  "Task Management",
  "Forms & Data",
  "AI & Intelligence",
  "Developer",
];

const initialIntegrations: Integration[] = [
  // 🧠 CORE COMMUNICATION
  { id: "gmail", name: "Gmail", description: "Send and receive emails, manage drafts and labels", icon: "Gmail", category: "Communication", connected: false },
  { id: "google-calendar", name: "Google Calendar", description: "Create events, manage schedules and reminders", icon: "Google Calendar", category: "Communication", connected: false },
  { id: "slack", name: "Slack", description: "Send messages, manage channels and workflows", icon: "Slack", category: "Communication", connected: false },
  { id: "ms-outlook", name: "Microsoft Outlook", description: "Send emails, manage calendar and contacts", icon: "Microsoft Outlook", category: "Communication", connected: false },
  { id: "ms-teams", name: "Microsoft Teams", description: "Send messages and manage team channels", icon: "Microsoft Teams", category: "Communication", connected: false },
  { id: "discord", name: "Discord", description: "Send messages, manage servers and bots", icon: "Discord", category: "Communication", connected: false },
  
  // 📁 DOCUMENTS & KNOWLEDGE
  { id: "google-drive", name: "Google Drive", description: "Upload, download and organize files and folders", icon: "Google Drive", category: "Documents & Knowledge", connected: false },
  { id: "google-docs", name: "Google Docs", description: "Create and edit documents collaboratively", icon: "Google Docs", category: "Documents & Knowledge", connected: false },
  { id: "google-sheets", name: "Google Sheets", description: "Read and write spreadsheet data", icon: "Google Sheets", category: "Documents & Knowledge", connected: false },
  { id: "notion", name: "Notion", description: "Create pages, update databases and manage content", icon: "Notion", category: "Documents & Knowledge", connected: false },
  { id: "dropbox", name: "Dropbox", description: "Upload, download and manage cloud files", icon: "Dropbox", category: "Documents & Knowledge", connected: false },
  { id: "onedrive", name: "OneDrive", description: "Store and share files with Microsoft OneDrive", icon: "OneDrive", category: "Documents & Knowledge", connected: false },
  
  // 📊 CRM & SALES PIPELINES
  { id: "hubspot", name: "HubSpot", description: "Manage contacts, deals and marketing campaigns", icon: "HubSpot", category: "CRM & Sales", connected: false },
  { id: "salesforce", name: "Salesforce", description: "Manage leads, contacts and sales pipelines", icon: "Salesforce", category: "CRM & Sales", connected: false },
  { id: "pipedrive", name: "Pipedrive", description: "Manage sales pipeline and customer relationships", icon: "Pipedrive", category: "CRM & Sales", connected: false },
  { id: "gohighlevel", name: "GoHighLevel", description: "All-in-one marketing and CRM platform", icon: "GoHighLevel", category: "CRM & Sales", connected: false },
  { id: "close-crm", name: "Close CRM", description: "Inside sales CRM for high-volume outreach", icon: "Close CRM", category: "CRM & Sales", connected: false },
  { id: "airtable", name: "Airtable", description: "Manage databases, records and automations", icon: "Airtable", category: "CRM & Sales", connected: false },
  
  // 💳 PAYMENTS & BILLING
  { id: "stripe", name: "Stripe", description: "Manage payments, subscriptions and invoices", icon: "Stripe", category: "Payments & Billing", connected: false },
  { id: "paypal", name: "PayPal", description: "Process payments and manage transactions", icon: "PayPal", category: "Payments & Billing", connected: false },
  { id: "quickbooks", name: "QuickBooks", description: "Manage invoices, expenses and financial reports", icon: "QuickBooks", category: "Payments & Billing", connected: false },
  { id: "xero", name: "Xero", description: "Cloud accounting and financial management", icon: "Xero", category: "Payments & Billing", connected: false },
  
  // 🛒 E-COMMERCE & ORDERS
  { id: "shopify", name: "Shopify", description: "Manage products, orders and store settings", icon: "Shopify", category: "E-Commerce", connected: false },
  { id: "woocommerce", name: "WooCommerce", description: "Manage WordPress e-commerce store", icon: "WooCommerce", category: "E-Commerce", connected: false },
  
  // 📣 MARKETING & OUTREACH
  { id: "mailchimp", name: "Mailchimp", description: "Email marketing campaigns and audience management", icon: "Mailchimp", category: "Marketing & Outreach", connected: false },
  { id: "activecampaign", name: "ActiveCampaign", description: "Email marketing automation and CRM", icon: "ActiveCampaign", category: "Marketing & Outreach", connected: false },
  { id: "klaviyo", name: "Klaviyo", description: "E-commerce email and SMS marketing", icon: "Klaviyo", category: "Marketing & Outreach", connected: false },
  { id: "sendgrid", name: "SendGrid", description: "Transactional email delivery service", icon: "SendGrid", category: "Marketing & Outreach", connected: false },
  { id: "twilio", name: "Twilio", description: "SMS, voice and messaging APIs", icon: "Twilio", category: "Marketing & Outreach", connected: false },
  
  // 🛠️ INTERNAL OPS & TASK MANAGEMENT
  { id: "trello", name: "Trello", description: "Manage boards, cards and team collaboration", icon: "Trello", category: "Task Management", connected: false },
  { id: "asana", name: "Asana", description: "Project and task management for teams", icon: "Asana", category: "Task Management", connected: false },
  { id: "clickup", name: "ClickUp", description: "Manage tasks, projects and team workspaces", icon: "ClickUp", category: "Task Management", connected: false },
  { id: "monday", name: "Monday.com", description: "Manage projects, boards and team workflows", icon: "Monday.com", category: "Task Management", connected: false },
  
  // 🧪 DATA, FORMS & INPUT SOURCES
  { id: "typeform", name: "Typeform", description: "Create forms and surveys with advanced logic", icon: "Typeform", category: "Forms & Data", connected: false },
  { id: "google-forms", name: "Google Forms", description: "Create forms and collect responses", icon: "Google Forms", category: "Forms & Data", connected: false },
  { id: "webhooks", name: "Webhook (Generic)", description: "Send and receive HTTP webhooks for custom integrations", icon: "Webhooks", category: "Forms & Data", connected: false },
  
  // 🧠 AI / SYSTEM-LEVEL
  { id: "openai", name: "OpenAI", description: "Access GPT models for AI-powered automation", icon: "OpenAI", category: "AI & Intelligence", connected: false },
  { id: "anthropic", name: "Anthropic (Claude)", description: "Access Claude AI for intelligent automation", icon: "Anthropic", category: "AI & Intelligence", connected: false },
  
  // 🧩 DEV / SYSTEM INTEGRATION
  { id: "github", name: "GitHub", description: "Manage repositories, issues and pull requests", icon: "GitHub", category: "Developer", connected: false },
  { id: "http-api", name: "HTTP / API Request", description: "Make custom HTTP requests to any API endpoint", icon: "HTTP API", category: "Developer", connected: false },
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

  // Group integrations by category
  const groupedIntegrations = categoryOrder.reduce((acc, category) => {
    acc[category] = integrations.filter(i => i.category === category);
    return acc;
  }, {} as Record<string, Integration[]>);

  return (
    <AppShell>
      <PageTransition>
        <div className="space-y-8">
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

          {/* Category Sections */}
          {categoryOrder.map((category, categoryIndex) => {
            const categoryIntegrations = groupedIntegrations[category];
            if (!categoryIntegrations || categoryIntegrations.length === 0) return null;
            const config = categoryConfig[category];

            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + categoryIndex * 0.05 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-border/60">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 text-primary border border-primary/30">
                    {config.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{config.label}</h2>
                    <p className="text-xs text-muted-foreground">{categoryIntegrations.length} integration{categoryIntegrations.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryIntegrations.map((integration, index) => (
                    <ConnectionIntegrationCard
                      key={integration.id}
                      integration={integration}
                      onConnect={() => handleConnect(integration)}
                      onDisconnect={() => handleDisconnect(integration.id)}
                      index={index}
                    />
                  ))}
                </div>
              </motion.section>
            );
          })}

          {/* Empty State */}
          {integrations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                <Plug className="w-8 h-8 text-muted-foreground" />
              </div>
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
