import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  helper: string;
  accent?: boolean;
}

const DashboardStatCard = ({ label, value, icon: Icon, helper, accent = false }: DashboardStatCardProps) => {
  const displayValue = value === 0 || value === "0" || value === "" ? "—" : value;
  const hasValue = displayValue !== "—";

  return (
    <Card className={`rounded-lg border-border/40 bg-card/60 hover:bg-card/80 transition-all duration-200 cursor-pointer group ${
      accent ? "border-status-warning/30 hover:border-status-warning/50" : ""
    }`}>
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            accent ? "bg-status-warning/10" : "bg-muted/50"
          }`}>
            <Icon className={`w-4 h-4 ${accent ? "text-status-warning" : "text-muted-foreground"}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">
              {label}
            </p>
            <p className={`text-lg font-semibold leading-tight ${
              hasValue 
                ? accent ? "text-status-warning" : "text-foreground" 
                : "text-muted-foreground/50"
            }`}>
              {displayValue}
            </p>
            <p className="text-[10px] text-muted-foreground/70 mt-1 leading-tight">
              {helper}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;