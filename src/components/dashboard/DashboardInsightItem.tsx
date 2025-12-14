import { Badge } from "@/components/ui/badge";

interface DashboardInsightItemProps {
  title: string;
  description: string;
  isNew?: boolean;
}

const DashboardInsightItem = ({ title, description, isNew }: DashboardInsightItemProps) => {
  return (
    <div className="p-3.5 rounded-lg bg-muted/20 border border-border/20 hover:border-border/40 transition-colors">
      <div className="flex items-center gap-2 mb-1">
        <h4 className="text-sm font-medium text-foreground line-clamp-1">
          {title}
        </h4>
        {isNew && (
          <Badge className="bg-primary/15 text-primary/80 border-primary/20 text-[10px] px-1.5 py-0 font-normal">
            New
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground/70 font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default DashboardInsightItem;
