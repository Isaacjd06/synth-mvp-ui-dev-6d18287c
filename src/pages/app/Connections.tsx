import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Plug } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition } from "@/components/app/PageTransition";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/contexts/SubscriptionContext";
import SubscriptionPill from "@/components/subscription/SubscriptionPill";
import ConnectionIntegrationCard from "@/components/connections/ConnectionIntegrationCard";
import IntegrationDetailsDrawer from "@/components/connections/IntegrationDetailsDrawer";
import { cn } from "@/lib/utils";

export type IntegrationTier = "basic" | "pro" | "agency";

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: IntegrationTier;
  category: string;
  connected: boolean;
  comingSoon?: boolean;
  permissions?: string[];
  version?: string;
}

const integrations: Integration[] = [
  // Basic tier (1-7)
  { id: "gmail", name: "Gmail", description: "Send and receive emails, manage drafts and labels", icon: "📧", tier: "basic", category: "Communication", connected: false, permissions: ["Read emails", "Send emails", "Manage labels"], version: "v2.1" },
  { id: "google-calendar", name: "Google Calendar", description: "Create events, manage schedules and reminders", icon: "📅", tier: "basic", category: "Productivity", connected: true, permissions: ["Read events", "Create events", "Modify events"], version: "v3.0" },
  { id: "google-sheets", name: "Google Sheets", description: "Read and write spreadsheet data", icon: "📊", tier: "basic", category: "Productivity", connected: false, permissions: ["Read spreadsheets", "Edit spreadsheets"], version: "v4.0" },
  { id: "slack", name: "Slack", description: "Send messages, manage channels and workflows", icon: "💬", tier: "basic", category: "Communication", connected: true, permissions: ["Send messages", "Read channels", "Manage workflows"], version: "v2.0" },
  { id: "notion", name: "Notion", description: "Create pages, update databases and manage content", icon: "📝", tier: "basic", category: "Productivity", connected: false, permissions: ["Read pages", "Create pages", "Update databases"], version: "v1.0" },
  { id: "webhooks", name: "Webhooks", description: "Send and receive HTTP webhooks for custom integrations", icon: "🔗", tier: "basic", category: "Developer", connected: false, permissions: ["Send webhooks", "Receive webhooks"], version: "v1.0" },
  { id: "email-smtp", name: "Email (SMTP)", description: "Send emails via custom SMTP server", icon: "✉️", tier: "basic", category: "Communication", connected: false, permissions: ["Send emails"], version: "v1.0" },
  
  // Pro tier (8-13)
  { id: "discord", name: "Discord", description: "Send messages, manage servers and bots", icon: "🎮", tier: "pro", category: "Communication", connected: false, permissions: ["Send messages", "Manage channels", "Bot commands"], version: "v1.0" },
  { id: "stripe", name: "Stripe", description: "Manage payments, subscriptions and invoices", icon: "💳", tier: "pro", category: "Finance", connected: false, permissions: ["Read transactions", "Create charges", "Manage subscriptions"], version: "v2.0" },
  { id: "clickup", name: "ClickUp", description: "Manage tasks, projects and team workspaces", icon: "✅", tier: "pro", category: "Productivity", connected: false, permissions: ["Read tasks", "Create tasks", "Update projects"], version: "v2.0" },
  { id: "trello", name: "Trello", description: "Manage boards, cards and team collaboration", icon: "📋", tier: "pro", category: "Productivity", connected: false, permissions: ["Read boards", "Create cards", "Move cards"], version: "v1.0" },
  { id: "airtable", name: "Airtable", description: "Manage databases, records and automations", icon: "🗃️", tier: "pro", category: "Productivity", connected: false, permissions: ["Read records", "Create records", "Update records"], version: "v1.0" },
  { id: "dropbox", name: "Dropbox", description: "Upload, download and manage files", icon: "📦", tier: "pro", category: "Storage", connected: false, permissions: ["Read files", "Upload files", "Share files"], version: "v2.0" },
  
  // Agency tier (14-20)
  { id: "salesforce", name: "Salesforce", description: "Manage leads, contacts and sales pipelines", icon: "☁️", tier: "agency", category: "CRM", connected: false, permissions: ["Read contacts", "Create leads", "Update opportunities"], version: "v1.0" },
  { id: "hubspot", name: "HubSpot CRM", description: "Manage contacts, deals and marketing campaigns", icon: "🧲", tier: "agency", category: "CRM", connected: false, permissions: ["Read contacts", "Create deals", "Track campaigns"], version: "v3.0" },
  { id: "monday", name: "Monday.com", description: "Manage projects, boards and team workflows", icon: "📌", tier: "agency", category: "Productivity", connected: false, permissions: ["Read boards", "Create items", "Update columns"], version: "v2.0" },
  { id: "zoho", name: "Zoho CRM", description: "Manage sales, marketing and customer support", icon: "🔶", tier: "agency", category: "CRM", connected: false, permissions: ["Read records", "Create leads", "Update deals"], version: "v2.0" },
  { id: "quickbooks", name: "QuickBooks", description: "Manage invoices, expenses and financial reports", icon: "💰", tier: "agency", category: "Finance", connected: false, permissions: ["Read transactions", "Create invoices", "Generate reports"], version: "v1.0" },
  { id: "zapier", name: "Zapier Handoff", description: "Connect with 5000+ apps through Zapier", icon: "⚡", tier: "agency", category: "Developer", connected: false, comingSoon: true, permissions: ["Trigger zaps", "Receive data"], version: "v1.0" },
  { id: "custom-api", name: "Custom API Integration", description: "Build custom integrations with full request builder", icon: "🛠️", tier: "agency", category: "Developer", connected: false, permissions: ["Full API access", "Custom headers", "Authentication"], version: "v1.0" },
];

const filterOptions = ["All", "Basic", "Pro", "Agency", "Coming Soon"] as const;
type FilterOption = typeof filterOptions[number];

const tierColors = {
  basic: "bg-muted text-muted-foreground",
  pro: "bg-primary/20 text-primary",
  agency: "bg-cyan-500/20 text-cyan-400",
};

const Connections = () => {
  const { isSubscribed, planTier } = useSubscription();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isIntegrationLocked = (tier: IntegrationTier): boolean => {
    if (!isSubscribed) return true;
    
    const tierLevel = { basic: 1, pro: 2, agency: 3 };
    const userLevel = tierLevel[planTier] || 0;
    const requiredLevel = tierLevel[tier];
    
    return userLevel < requiredLevel;
  };

  const getUpgradeMessage = (tier: IntegrationTier): string => {
    if (!isSubscribed) return "Subscribe to unlock integrations";
    if (tier === "pro") return "Upgrade to Pro";
    if (tier === "agency") return "Upgrade to Agency";
    return "Upgrade Plan";
  };

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((integration) => {
      // Search filter
      const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      let matchesFilter = true;
      if (activeFilter === "Basic") matchesFilter = integration.tier === "basic";
      else if (activeFilter === "Pro") matchesFilter = integration.tier === "pro";
      else if (activeFilter === "Agency") matchesFilter = integration.tier === "agency";
      else if (activeFilter === "Coming Soon") matchesFilter = !!integration.comingSoon;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const handleIntegrationClick = (integration: Integration) => {
    if (integration.comingSoon) return;
    setSelectedIntegration(integration);
    setDrawerOpen(true);
  };

  return (
    <AppShell>
      <PageTransition>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-display font-bold text-foreground tracking-tight flex items-center gap-3"
              >
                <Plug className="w-8 h-8 text-primary" />
                Connections
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground mt-2"
              >
                Manage the apps Synth can use inside your automations
              </motion.p>
            </div>
            <SubscriptionPill />
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
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card/50 border-border/60 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </motion.div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_-5px_hsl(var(--primary))]"
                    : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50"
                )}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex gap-6 text-sm"
          >
            <span className="text-muted-foreground">
              <span className="text-foreground font-medium">{filteredIntegrations.length}</span> integrations
            </span>
            <span className="text-muted-foreground">
              <span className="text-green-400 font-medium">{integrations.filter(i => i.connected).length}</span> connected
            </span>
          </motion.div>

          {/* Integrations Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredIntegrations.map((integration, index) => (
              <ConnectionIntegrationCard
                key={integration.id}
                integration={integration}
                isLocked={isIntegrationLocked(integration.tier)}
                upgradeMessage={getUpgradeMessage(integration.tier)}
                onClick={() => handleIntegrationClick(integration)}
                index={index}
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

        {/* Integration Details Drawer */}
        <IntegrationDetailsDrawer
          integration={selectedIntegration}
          isLocked={selectedIntegration ? isIntegrationLocked(selectedIntegration.tier) : false}
          upgradeMessage={selectedIntegration ? getUpgradeMessage(selectedIntegration.tier) : ""}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </PageTransition>
    </AppShell>
  );
};

export default Connections;
