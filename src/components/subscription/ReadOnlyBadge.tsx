import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ReadOnlyBadgeProps {
  className?: string;
  size?: "sm" | "default";
}

const ReadOnlyBadge = ({ className, size = "default" }: ReadOnlyBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-muted-foreground/30 text-muted-foreground bg-muted/30",
        size === "sm" && "text-[10px] px-1.5 py-0",
        className
      )}
    >
      <Eye className={cn("mr-1", size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3")} />
      Read Only
    </Badge>
  );
};

export default ReadOnlyBadge;
