import { Sparkles, TrendingUp, AlertCircle, Zap, BarChart3, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardInsightItem from "./DashboardInsightItem";

const insights = [
  {
    icon: AlertCircle,
    title: "Your lead workflow failed 3 times today",
    description: "Check the Slack notification step — the webhook URL may have expired.",
    isNew: true,
  },
  {
    icon: TrendingUp,
    title: "Execution volume increased 24% this week",
    description: "Consider upgrading to Pro for higher rate limits and faster processing.",
    isNew: true,
  },
  {
    icon: Zap,
    title: "Invoice Processor could be 40% faster",
    description: "Combine the PDF parse and data validation steps into a single action.",
    isNew: false,
  },
  {
    icon: BarChart3,
    title: "Daily Report Generator has 100% uptime",
    description: "This workflow has been running flawlessly for 14 consecutive days.",
    isNew: false,
  },
];

const DashboardAdvisoryCard = () => {
  return (
    <Card className="relative overflow-hidden rounded-2xl border-border/40 bg-gradient-to-b from-card to-synth-navy-light">
      {/* Decorative glow */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Synth Advisory
            </CardTitle>
            <p className="text-sm text-muted-foreground font-light mt-0.5">
              Synth is observing your workflows and providing insights.
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-6 relative space-y-3">
        {insights.map((insight, index) => (
          <DashboardInsightItem
            key={index}
            icon={insight.icon}
            title={insight.title}
            description={insight.description}
            isNew={insight.isNew}
          />
        ))}
        
        <div className="pt-3">
          <Button variant="ghost" className="text-muted-foreground hover:text-primary px-0">
            View All Insights
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAdvisoryCard;
