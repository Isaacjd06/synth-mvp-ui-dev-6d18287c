import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardInsightItem from "./DashboardInsightItem";

const insights = [
  {
    title: "Your lead workflow failed 3 times today",
    description: "Check the Slack notification step — the webhook URL may have expired.",
    isNew: true,
  },
  {
    title: "Execution volume increased 24% this week",
    description: "Consider upgrading to Pro for higher rate limits and faster processing.",
    isNew: true,
  },
  {
    title: "Invoice Processor could be 40% faster",
    description: "Combine the PDF parse and data validation steps into a single action.",
    isNew: false,
  },
  {
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
          <p className="text-muted-foreground font-light">No insights available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden rounded-2xl border-border/30 bg-card">
      <CardHeader className="relative pb-4 pt-5 px-5 border-b border-border/20">
        <div>
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-foreground/90">
            Synth Advisory
          </CardTitle>
          <p className="text-xs text-muted-foreground/60 font-light mt-1">
            Insights from your workflows
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2 pb-5 px-5 relative space-y-2.5">
        {insights.map((insight, index) => (
          <DashboardInsightItem
            key={index}
            title={insight.title}
            description={insight.description}
            isNew={insight.isNew}
          />
        ))}
        
        <div className="pt-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground/60 hover:text-foreground px-0 text-xs">
            View All Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAdvisoryCard;
