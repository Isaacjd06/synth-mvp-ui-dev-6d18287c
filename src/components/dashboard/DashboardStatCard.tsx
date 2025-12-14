import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatCardProps {
  label: string;
  value: string | number;
}

const DashboardStatCard = ({ label, value }: DashboardStatCardProps) => {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border-border/30 bg-card hover:border-border/40 hover:bg-card/80 transition-all duration-200">
      <CardContent className="p-5 relative">
        <p className="text-[11px] text-muted-foreground/60 font-medium uppercase tracking-wider mb-3">
          {label}
        </p>
        <p className="text-2xl font-semibold text-foreground/95">
          {value}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
