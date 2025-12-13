import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

const DashboardStatCard = ({ label, value, icon: Icon }: DashboardStatCardProps) => {
  const displayValue = value === 0 || value === "0" ? "—" : value;
  const hasValue = displayValue !== "—";

  return (
    <Card className="rounded-lg border-border/40 bg-card/60 hover:bg-card/80 transition-all duration-200">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
              {label}
            </p>
            <p className={`text-lg font-semibold ${hasValue ? "text-foreground" : "text-muted-foreground/50"}`}>
              {displayValue}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;