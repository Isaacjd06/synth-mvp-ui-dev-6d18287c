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

// Category color mapping - subtle, classification-focused
const categoryColors: Record<string, { text: string; border: string; bg: string }> = {
  Communication: { 
    text: "text-blue-400/70", 
    border: "border-blue-500/15", 
    bg: "bg-blue-500/[0.03]" 
  },
  Productivity: { 
    text: "text-violet-400/70", 
    border: "border-violet-500/15", 
    bg: "bg-violet-500/[0.03]" 
  },
  Finance: { 
    text: "text-emerald-400/70", 
    border: "border-emerald-500/15", 
    bg: "bg-emerald-500/[0.03]" 
  },
  Developer: { 
    text: "text-orange-400/70", 
    border: "border-orange-500/15", 
    bg: "bg-orange-500/[0.03]" 
  },
  Storage: { 
    text: "text-cyan-400/70", 
    border: "border-cyan-500/15", 
    bg: "bg-cyan-500/[0.03]" 
  },
  Design: { 
    text: "text-pink-400/70", 
    border: "border-pink-500/15", 
    bg: "bg-pink-500/[0.03]" 
  },
  "Social Media": { 
    text: "text-rose-400/70", 
    border: "border-rose-500/15", 
    bg: "bg-rose-500/[0.03]" 
  },
  CRM: { 
    text: "text-amber-400/70", 
    border: "border-amber-500/15", 
    bg: "bg-amber-500/[0.03]" 
  },
  AI: { 
    text: "text-purple-400/70", 
    border: "border-purple-500/15", 
    bg: "bg-purple-500/[0.03]" 
  },
  Marketing: { 
    text: "text-teal-400/70", 
    border: "border-teal-500/15", 
    bg: "bg-teal-500/[0.03]" 
  },
  "E-commerce": { 
    text: "text-green-400/70", 
    border: "border-green-500/15", 
    bg: "bg-green-500/[0.03]" 
  },
  Enterprise: { 
    text: "text-slate-400/70", 
    border: "border-slate-500/15", 
    bg: "bg-slate-500/[0.03]" 
  },
};

const defaultColors = { 
  text: "text-muted-foreground/60", 
  border: "border-border/20", 
  bg: "bg-muted/[0.02]" 
};

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
          colors.border,
          integration.connected 
            ? [
                "bg-card/50",
                "hover:bg-card/60"
              ]
            : [
                colors.bg,
                "hover:bg-card/30",
                "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10"
              ]
        )}
      >
        <CardContent className="p-5 flex flex-col h-full min-h-[150px]">
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