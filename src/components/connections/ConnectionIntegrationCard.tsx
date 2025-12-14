import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Integration } from "@/pages/app/Connections";

interface ConnectionIntegrationCardProps {
  integration: Integration;
  onConnect: () => void;
  onDisconnect: () => void;
  index: number;
  compact?: boolean;
}

const ConnectionIntegrationCard = ({ 
  integration, 
  onConnect, 
  onDisconnect, 
  index,
  compact = false
}: ConnectionIntegrationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.015, duration: 0.25 }}
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-200 group h-full",
          "border-border/40 bg-card/30",
          "hover:border-border/60 hover:bg-card/50",
          integration.connected && "border-border/50 bg-card/40"
        )}
      >
        <CardContent className={cn(
          "flex flex-col h-full",
          compact ? "p-4 min-h-[120px]" : "p-5 min-h-[160px]"
        )}>
          {/* Header */}
          <div className="mb-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className={cn(
                "font-medium text-foreground leading-tight",
                compact ? "text-sm" : "text-base"
              )}>
                {integration.name}
              </h3>
              {integration.connected && (
                <span className="text-xs text-muted-foreground/80 shrink-0">
                  Connected
                </span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wide">
              {integration.category}
            </span>
          </div>

          {/* Description - hide in compact mode */}
          {!compact && (
            <p className="text-xs text-muted-foreground/70 line-clamp-2 flex-grow leading-relaxed">
              {integration.description}
            </p>
          )}

          {/* Action Button */}
          <div className={cn("mt-auto", compact ? "pt-2" : "pt-3")}>
            {integration.connected ? (
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full text-xs text-muted-foreground hover:text-red-400 hover:bg-transparent h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onDisconnect();
                }}
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                variant="outline"
                size="sm"
                className="w-full text-xs border-border/50 bg-transparent hover:bg-muted/30 hover:border-border/70 h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onConnect();
                }}
              >
                Connect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConnectionIntegrationCard;