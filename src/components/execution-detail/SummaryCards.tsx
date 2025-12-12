import { CheckCircle2, Clock, Zap, GitBranch } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SummaryCardsProps {
  status: "success" | "error" | "running";
  executionTime: string;
  triggerType: string;
  workflowVersion: string;
}

const statusStyles = {
  success: { label: "Success", color: "text-green-400", bg: "bg-green-500/10" },
  error: { label: "Failed", color: "text-red-400", bg: "bg-red-500/10" },
  running: { label: "Running", color: "text-yellow-400", bg: "bg-yellow-500/10" },
};

const SummaryCards = ({ status, executionTime, triggerType, workflowVersion }: SummaryCardsProps) => {
  const statusStyle = statusStyles[status];

  const cards = [
    {
      label: "Status",
      value: statusStyle.label,
      icon: CheckCircle2,
      iconColor: statusStyle.color,
      bg: statusStyle.bg,
    },
    {
      label: "Execution Time",
      value: executionTime,
      icon: Clock,
      iconColor: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Trigger Type",
      value: triggerType,
      icon: Zap,
      iconColor: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Workflow Version",
      value: workflowVersion,
      icon: GitBranch,
      iconColor: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} className="border-border/50 bg-card/60 hover:border-border/70 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", card.bg)}>
                  <Icon className={cn("w-5 h-5", card.iconColor)} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {card.label}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {card.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SummaryCards;
