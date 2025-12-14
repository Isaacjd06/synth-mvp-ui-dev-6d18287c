import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import InsightFilterSidebar, { InsightFilter } from "@/components/insights/InsightFilterSidebar";
import InsightsList from "@/components/insights/InsightsList";
import InsightsEmptyState from "@/components/insights/InsightsEmptyState";
import InsightsLoadingState from "@/components/insights/InsightsLoadingState";
import { InsightData } from "@/components/insights/InsightCard";
import { cn } from "@/lib/utils";

// Mock data for UI display
const mockInsights: InsightData[] = [
  {
    id: "1",
    title: "Your lead workflow failed 3 times today",
    summary: "The Lead Capture workflow encountered repeated failures during execution.",
    description: "The Lead Capture workflow has failed 3 times in the last 24 hours due to API timeout errors. The external CRM endpoint is responding slowly, causing the workflow to exceed its maximum execution time. Consider increasing the timeout threshold or implementing retry logic.",
    timestamp: "5 min ago",
    severity: "error",
    isNew: true,
    category: "Workflow",
  },
  {
    id: "2",
    title: "Optimize response time for Customer Onboarding",
    summary: "Synth detected an opportunity to reduce workflow execution time by 40%.",
    description: "By parallelizing the email verification and CRM update steps in your Customer Onboarding workflow, you could reduce total execution time from 8 seconds to approximately 4.8 seconds. This would improve user experience and reduce API costs.",
    timestamp: "1 hour ago",
    severity: "info",
    isNew: true,
    category: "Suggestion",
  },
  {
    id: "3",
    title: "Webhook endpoint experiencing high latency",
    summary: "Average response time has increased by 150% over the past week.",
    description: "Your Payment Processing webhook endpoint is showing increased latency. Current average response time is 2.3 seconds, up from 0.9 seconds last week. This may be affecting downstream workflow performance and customer experience.",
    timestamp: "2 hours ago",
    severity: "warning",
    isNew: false,
    category: "Performance",
  },
  {
    id: "4",
    title: "Slack integration needs reauthorization",
    summary: "The Slack OAuth token will expire in 3 days.",
    description: "Your Slack integration token is set to expire on December 15th. Reauthorize the connection to prevent workflow disruptions. Affected workflows: Team Notifications, Daily Standup Reminders, and Alert Escalations.",
    timestamp: "3 hours ago",
    severity: "warning",
    isNew: false,
    category: "Integration",
  },
  {
    id: "5",
    title: "Execution success rate improved to 98.5%",
    summary: "Your overall workflow reliability has increased by 2.1% this week.",
    description: "Great progress! Your workflow execution success rate has improved from 96.4% to 98.5% over the past week. The improvements are primarily due to the error handling updates you made to the Order Processing and Inventory Sync workflows.",
    timestamp: "5 hours ago",
    severity: "info",
    isNew: false,
    category: "Reliability",
  },
  {
    id: "6",
    title: "Database connection pool exhausted",
    summary: "Multiple workflows failed due to connection limits being reached.",
    description: "At 14:32 UTC, the database connection pool reached its maximum limit of 20 connections, causing 7 workflow executions to fail. Consider increasing the pool size or optimizing queries to release connections faster.",
    timestamp: "Yesterday",
    severity: "error",
    isNew: false,
    category: "Performance",
  },
];

// Filter labels for empty state messages
const filterLabels: Record<InsightFilter, string> = {
  all: "All",
  errors: "Error",
  suggestions: "Suggestion",
  performance: "Performance",
  reliability: "Reliability",
  recent: "Recent",
};

const Insights = () => {
  const navigate = useNavigate();
  
  // UI-ONLY: Temporary preview toggle (will be replaced by backend logic)
  const [isSubscribedPreview, setIsSubscribedPreview] = useState(true);
  
  const [activeFilter, setActiveFilter] = useState<InsightFilter>("all");
  const [isLoading] = useState(false); // UI only - set to true to see loading state
  const [showEmpty] = useState(false); // UI only - set to true to see empty state

  // Simple filter display logic (no real filtering - backend will handle this)
  const displayedInsights = showEmpty ? [] : mockInsights;
  
  // For gated state, show first 2 insights as readable, rest as locked
  const visibleInsights = displayedInsights.slice(0, 2);
  const lockedInsights = displayedInsights.slice(2);

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-synth-navy-light/20">
        {/* DEV-ONLY Toggle */}
        <div className="px-4 lg:px-6 py-4 relative z-[60]">
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

        {/* Main Content - Sidebar + List */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={cn(!isSubscribedPreview && "opacity-50 pointer-events-none")}
          >
            <InsightFilterSidebar 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter} 
            />
          </motion.div>

          {/* Insights List */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-md overflow-hidden">
              {/* List Header */}
              <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
                <h2 className="text-sm font-medium text-foreground">
                  {filterLabels[activeFilter]} Insights
                </h2>
                <span className="text-xs text-muted-foreground">
                  {displayedInsights.length} {displayedInsights.length === 1 ? "insight" : "insights"}
                </span>
              </div>

              {/* Content Area */}
              <div className="p-4">
                {isLoading ? (
                  <InsightsLoadingState />
                ) : displayedInsights.length === 0 ? (
                  <InsightsEmptyState 
                    type={activeFilter === "all" ? "general" : "filtered"} 
                    filterName={filterLabels[activeFilter]}
                  />
                ) : isSubscribedPreview ? (
                  /* SUBSCRIBED STATE - Full insights */
                  <InsightsList insights={displayedInsights} />
                ) : (
                  /* GATED STATE - Partial access */
                  <div className="space-y-3">
                    {/* Visible insights (first 2) */}
                    <InsightsList insights={visibleInsights} />
                    
                    {/* Locked insights preview */}
                    <div className="space-y-2 pt-2">
                      {lockedInsights.map((insight) => (
                        <div 
                          key={insight.id}
                          className="p-4 rounded-lg border border-border/20 bg-muted/10"
                        >
                          <p className="text-sm font-medium text-foreground/60 mb-1">
                            {insight.title}
                          </p>
                          <p className="text-xs text-muted-foreground/40 line-clamp-1">
                            {insight.summary}
                          </p>
                          <p className="text-[10px] text-primary/70 mt-2 uppercase tracking-wide">
                            Available on Pro
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Upgrade CTA */}
                    <div className="pt-4 pb-2 text-center border-t border-border/20 mt-4">
                      <p className="text-sm text-muted-foreground/80 mb-3">
                        Upgrade to unlock full insights and recommendations
                      </p>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/app/billing")}
                        className="border-primary/30 text-primary hover:bg-primary/10"
                      >
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
};

export default Insights;
