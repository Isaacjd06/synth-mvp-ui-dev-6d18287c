import { LucideIcon, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

const DashboardStatCard = ({ label, value, icon: Icon }: DashboardStatCardProps) => {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border-border/30 bg-card hover:border-border/50 transition-all duration-200">
      <CardContent className="p-5 relative">
        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                <Info className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label} metric</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-2xl font-semibold text-foreground mb-1">
          {value}
        </p>
        <p className="text-xs text-muted-foreground font-light">
          {label}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
