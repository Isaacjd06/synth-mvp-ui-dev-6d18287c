import { motion } from "framer-motion";
import { Check, Plug, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Integration } from "@/pages/app/Connections";
import IntegrationIcon from "./IntegrationIcon";

interface ConnectionIntegrationCardProps {
  integration: Integration;
  onConnect: () => void;
  onDisconnect: () => void;
  index: number;
  isLocked?: boolean;
  requiredPlan?: string;
}

const categoryColors: Record<string, string> = {
  Communication: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Productivity: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Finance: "bg-green-500/20 text-green-400 border-green-500/30",
  Developer: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Storage: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  Design: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "Social Media": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  CRM: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  AI: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  Marketing: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "E-commerce": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Enterprise: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

const tierColors: Record<string, string> = {
  Starter: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  Pro: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Agency: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const ConnectionIntegrationCard = ({ 
  integration, 
  onConnect, 
  onDisconnect, 
  index,
  isLocked = false,
  requiredPlan = "Starter"
}: ConnectionIntegrationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-300 group h-full",
          "border-border/60 bg-card/50 backdrop-blur-sm",
          "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]",
          isLocked ? (
            "opacity-60 hover:opacity-80"
          ) : (
            "hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4)]"
          ),
          integration.connected && !isLocked && "border-green-500/50 shadow-[0_0_25px_-5px_rgba(34,197,94,0.3)]"
        )}
      >
        {/* Locked Badge */}
        {isLocked && (
          <div className="absolute top-3 right-3 z-20">
            <Badge className={cn("text-xs gap-1 px-2 py-0.5 border", tierColors[requiredPlan])}>
              <Lock className="w-3 h-3" />
              {requiredPlan}
            </Badge>
          </div>
        )}

        {/* Connected Badge */}
        {integration.connected && !isLocked && (
          <div className="absolute top-3 right-3 z-20">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-xs gap-1 px-2 py-0.5">
              <Check className="w-3 h-3" />
              Connected
            </Badge>
          </div>
        )}

        {/* Connected Glow Line */}
        {integration.connected && !isLocked && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-500/30 via-green-400 to-green-500/30" />
        )}

        <CardContent className="p-5 flex flex-col h-full min-h-[200px]">
          <div className="flex items-start gap-3 mb-3">
            <IntegrationIcon 
              app={integration.name} 
              size="md"
              className={cn(
                "transition-all duration-300 flex-shrink-0",
                isLocked ? "opacity-50" : "group-hover:border-primary/30 group-hover:shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)]"
              )}
            />
            <div className="min-w-0 flex-1">
              <h3 className={cn(
                "font-semibold truncate text-base transition-colors",
                isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-primary"
              )}>
                {integration.name}
              </h3>
              <Badge 
                variant="outline" 
                className={cn(
                  "text-[10px] px-1.5 py-0 mt-1 border",
                  categoryColors[integration.category] || "bg-muted/20 text-muted-foreground border-muted/30"
                )}
              >
                {integration.category}
              </Badge>
            </div>
          </div>

          <p className={cn(
            "text-sm line-clamp-2 flex-grow leading-relaxed",
            isLocked ? "text-muted-foreground/70" : "text-muted-foreground"
          )}>
            {integration.description}
          </p>

          {/* Action Button */}
          <div className="mt-4 pt-3 border-t border-border/30">
            {isLocked ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="w-full border-border/50 text-muted-foreground hover:bg-muted/20 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        onConnect();
                      }}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Upgrade to {requiredPlan}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upgrade to {requiredPlan} plan to connect {integration.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : integration.connected ? (
              <Button 
                variant="outline" 
                size="sm"
                className="w-full border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/60 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onDisconnect();
                }}
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                size="sm"
                className={cn(
                  "w-full bg-primary hover:bg-primary/90 transition-all duration-300",
                  "hover:shadow-[0_0_20px_-5px_hsl(var(--primary))]"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onConnect();
                }}
              >
                <Plug className="w-4 h-4 mr-2" />
                Connect
              </Button>
            )}
          </div>
        </CardContent>

        {/* Hover Glow Effect */}
        {!isLocked && (
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
            "bg-gradient-to-t from-primary/5 via-transparent to-transparent"
          )} />
        )}
      </Card>
    </motion.div>
  );
};

export default ConnectionIntegrationCard;