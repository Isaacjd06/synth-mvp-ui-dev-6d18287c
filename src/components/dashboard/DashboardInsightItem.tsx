import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardInsightItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isNew?: boolean;
}

const DashboardInsightItem = ({ icon: Icon, title, description, isNew }: DashboardInsightItemProps) => {
  return (
    <div className="p-3.5 rounded-lg bg-muted/20 border border-border/20 hover:border-border/40 transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-md bg-muted/50 flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-sm text-foreground line-clamp-1">
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
      </div>
    </div>
  );
};

export default DashboardInsightItem;
