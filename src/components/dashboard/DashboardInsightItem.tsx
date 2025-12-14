import { Badge } from "@/components/ui/badge";

interface DashboardInsightItemProps {
  title: string;
  description: string;
  isNew?: boolean;
}

const DashboardInsightItem = ({ title, description, isNew }: DashboardInsightItemProps) => {
  return (
    <div className="p-4 rounded-lg bg-muted/15 border border-border/15 hover:border-border/30 hover:bg-muted/25 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <h4 className="text-sm font-medium text-foreground/95 leading-snug">
          {title}
        </h4>
        {isNew && (
          <Badge className="bg-primary/10 text-primary/70 border-primary/15 text-[10px] px-1.5 py-0 font-normal shrink-0">
            New
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground/60 font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default DashboardInsightItem;
