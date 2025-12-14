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

// Category color mapping - accent colors for classification
const categoryColors: Record<string, { text: string; accent: string }> = {
  Communication: { text: "text-blue-400/80", accent: "bg-blue-500" },
  Productivity: { text: "text-violet-400/80", accent: "bg-violet-500" },
  Finance: { text: "text-emerald-400/80", accent: "bg-emerald-500" },
  Developer: { text: "text-orange-400/80", accent: "bg-orange-500" },
  Storage: { text: "text-cyan-400/80", accent: "bg-cyan-500" },
  Design: { text: "text-pink-400/80", accent: "bg-pink-500" },
  "Social Media": { text: "text-rose-400/80", accent: "bg-rose-500" },
  CRM: { text: "text-amber-400/80", accent: "bg-amber-500" },
  AI: { text: "text-purple-400/80", accent: "bg-purple-500" },
  Marketing: { text: "text-teal-400/80", accent: "bg-teal-500" },
  "E-commerce": { text: "text-green-400/80", accent: "bg-green-500" },
  Enterprise: { text: "text-slate-400/80", accent: "bg-slate-500" },
};

const defaultColors = { text: "text-muted-foreground/60", accent: "bg-muted-foreground" };

const ConnectionIntegrationCard = ({ 
  integration, 
  onConnect, 
  onDisconnect, 
  index
}: ConnectionIntegrationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = categoryColors[integration.category] || defaultColors;

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
          "border-border/20 bg-card/25",
          "hover:bg-card/40",
          !integration.connected && "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10"
        )}
      >
        {/* Left accent bar for category classification */}
        <div className={cn(
          "absolute left-0 top-0 bottom-0 w-1 transition-opacity",
          colors.accent,
          integration.connected ? "opacity-30" : "opacity-60"
        )} />

        <CardContent className="pl-6 pr-5 py-5 flex flex-col h-full min-h-[150px]">
          {/* Header */}
          <div className="space-y-2 mb-4">
            <h3 className={cn(
              "font-medium text-sm leading-tight",
              integration.connected ? "text-foreground" : "text-foreground/85"
            )}>
              {integration.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className={cn("text-[10px] uppercase tracking-widest", colors.text)}>
                {integration.category}
              </span>
              {integration.connected && (
                <span className="text-[10px] text-foreground/40 tracking-wide">
                  Connected
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground/45 line-clamp-2 flex-grow leading-relaxed">
            {integration.description}
          </p>

          {/* Action */}
          <div className="mt-5">
            {integration.connected ? (
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "w-full text-xs h-8 transition-all duration-200",
                  isHovered 
                    ? "text-red-400/60 hover:text-red-400/80 hover:bg-transparent" 
                    : "text-muted-foreground/25 hover:text-muted-foreground/40 hover:bg-transparent"
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
                className="w-full text-xs h-8 text-muted-foreground/40 hover:text-foreground/60 hover:bg-muted/10"
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