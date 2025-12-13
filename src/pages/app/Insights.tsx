import { useState } from "react";
import { motion } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import InsightFilterSidebar, { InsightFilter } from "@/components/insights/InsightFilterSidebar";
import InsightsList from "@/components/insights/InsightsList";
import InsightsEmptyState from "@/components/insights/InsightsEmptyState";
import InsightsLoadingState from "@/components/insights/InsightsLoadingState";
import { InsightData } from "@/components/insights/InsightCard";

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
  const [activeFilter, setActiveFilter] = useState<InsightFilter>("all");
  const [isLoading] = useState(false); // UI only - set to true to see loading state
  const [showEmpty] = useState(false); // UI only - set to true to see empty state

  // Simple filter display logic (no real filtering - backend will handle this)
  const displayedInsights = showEmpty ? [] : mockInsights;

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-synth-navy-light/20">

        {/* Main Content - Sidebar + List */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
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
                ) : (
                  <InsightsList insights={displayedInsights} />
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
