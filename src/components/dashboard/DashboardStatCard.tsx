import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatCardProps {
  label: string;
  value: string | number;
}

const DashboardStatCard = ({ label, value }: DashboardStatCardProps) => {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border-border/30 bg-card hover:border-border/50 transition-all duration-200">
      <CardContent className="p-5 relative">
        <p className="text-xs text-muted-foreground/70 font-medium uppercase tracking-wide mb-2">
          {label}
        </p>
        <p className="text-2xl font-semibold text-foreground">
          {value}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
