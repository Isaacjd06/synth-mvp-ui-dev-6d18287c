import { useState } from "react";
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
}

const ConnectionIntegrationCard = ({ 
  integration, 
  onConnect, 
  onDisconnect, 
  index
}: ConnectionIntegrationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-200 h-full",
          "bg-muted/20 border-border/30",
          "hover:bg-muted/35 hover:border-border/50",
          integration.connected && [
            "bg-muted/30 border-border/40",
            "ring-1 ring-green-500/10"
          ]
        )}
      >
        <CardContent className="p-5 flex flex-col h-full min-h-[150px]">
          {/* Header */}
          <div className="space-y-1 mb-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground text-sm leading-tight">
                {integration.name}
              </h3>
              {integration.connected && (
                <span className="text-[10px] text-green-500/80 font-medium shrink-0 uppercase tracking-wide">
                  Connected
                </span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">
              {integration.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground/60 line-clamp-2 flex-grow leading-relaxed">
            {integration.description}
          </p>

          {/* Action */}
          <div className="mt-4 pt-3 border-t border-border/20">
            {integration.connected ? (
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "w-full text-xs h-8 transition-all duration-200",
                  isHovered 
                    ? "text-red-400/80 hover:text-red-400 hover:bg-red-500/10" 
                    : "text-muted-foreground/40 hover:text-muted-foreground"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onDisconnect();
                }}
              >
                {isHovered ? "Disconnect" : "Manage"}
              </Button>
            ) : (
              <Button 
                variant="outline"
                size="sm"
                className="w-full text-xs h-8 border-border/40 bg-muted/30 text-foreground/80 hover:bg-muted/50 hover:border-border/60 hover:text-foreground"
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