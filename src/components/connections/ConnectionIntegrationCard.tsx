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
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.015, duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-200 h-full",
          integration.connected 
            ? [
                "bg-card/40 border-green-500/20",
                "hover:border-green-500/30 hover:bg-card/50"
              ]
            : [
                "bg-card/20 border-border/20",
                "hover:bg-card/30 hover:border-border/30",
                "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
              ]
        )}
      >
        {/* Subtle top accent for connected cards */}
        {integration.connected && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
        )}

        <CardContent className="p-5 flex flex-col h-full min-h-[150px]">
          {/* Header */}
          <div className="space-y-1.5 mb-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className={cn(
                "font-medium text-sm leading-tight transition-colors",
                integration.connected ? "text-foreground" : "text-foreground/90"
              )}>
                {integration.name}
              </h3>
              {integration.connected && (
                <span className="text-[10px] text-green-500/60 font-normal shrink-0 tracking-wide">
                  Connected
                </span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
              {integration.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground/50 line-clamp-2 flex-grow leading-relaxed">
            {integration.description}
          </p>

          {/* Action */}
          <div className="mt-4 pt-3 border-t border-border/10">
            {integration.connected ? (
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "w-full text-xs h-8 transition-all duration-200",
                  isHovered 
                    ? "text-red-400/70 hover:text-red-400 hover:bg-red-500/5" 
                    : "text-muted-foreground/30 hover:text-muted-foreground/50"
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
                variant="ghost"
                size="sm"
                className="w-full text-xs h-8 text-muted-foreground/50 hover:text-foreground/70 hover:bg-muted/20"
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