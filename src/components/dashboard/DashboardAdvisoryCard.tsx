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

interface DashboardAdvisoryCardProps {
  isEmpty?: boolean;
}

const DashboardAdvisoryCard = ({ isEmpty = false }: DashboardAdvisoryCardProps) => {
  // Hidden empty state - will be shown when isEmpty is true (wired by backend later)
  if (isEmpty) {
    return (
      <Card className="hidden relative overflow-hidden rounded-2xl border-border/40 bg-gradient-to-b from-card to-synth-navy-light">
        <CardContent className="py-12 text-center">
          <Sparkles className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground font-light">No insights available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden rounded-2xl border-border/30 bg-card">
      <CardHeader className="relative pb-3 pt-5 px-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-medium text-foreground">
              Synth Advisory
            </CardTitle>
            <p className="text-xs text-muted-foreground/70 font-light mt-0.5">
              Insights from your workflows
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2 pb-5 px-5 relative space-y-2.5">
        {insights.map((insight, index) => (
          <DashboardInsightItem
            key={index}
            icon={insight.icon}
            title={insight.title}
            description={insight.description}
            isNew={insight.isNew}
          />
        ))}
        
        <div className="pt-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground/60 hover:text-foreground px-0 text-xs">
            View All Insights
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAdvisoryCard;
