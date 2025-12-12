import { Lock, MessageSquare, PlaySquare, ChevronRight, Zap, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface PrebuiltSkill {
  id: string;
  name: string;
  description: string;
  preview: string;
  icon: LucideIcon;
  category: string;
  isEnabled: boolean;
  runsCount: number;
  requiredPlan?: "starter" | "pro" | "agency";
}

interface SkillCardProps {
  skill: PrebuiltSkill;
  isSubscribed: boolean;
  userPlan?: string;
  onToggle: (id: string) => void;
  onCustomize: (skill: PrebuiltSkill) => void;
  onViewRuns: (skill: PrebuiltSkill) => void;
  isToggling?: boolean;
  index?: number;
}

const PLAN_LEVELS: Record<string, number> = {
  starter: 1,
  pro: 2,
  agency: 3,
};

export const SkillCard = ({
  skill,
  isSubscribed,
  userPlan = "starter",
  onToggle,
  onCustomize,
  onViewRuns,
  isToggling,
  index = 0,
}: SkillCardProps) => {
  const requiredPlanLevel = PLAN_LEVELS[skill.requiredPlan || "starter"] || 1;
  const userPlanLevel = PLAN_LEVELS[userPlan] || 0;
  const isLocked = !isSubscribed || userPlanLevel < requiredPlanLevel;
  const needsUpgrade = isSubscribed && userPlanLevel < requiredPlanLevel;

  const IconComponent = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      layout
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300 h-full",
          "hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1",
          "border-border/60",
          skill.isEnabled && !isLocked
            ? "bg-gradient-to-br from-card to-card/80 border-primary/40 shadow-lg shadow-primary/5"
            : "bg-card/60 hover:border-primary/30",
          isLocked && "hover:border-muted-foreground/30"
        )}
      >
        {/* Active glow effect */}
        {skill.isEnabled && !isLocked && (
          <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-primary/20 rounded-full blur-3xl pointer-events-none transition-opacity" />
        )}

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-2xl" />
        </div>

        <CardContent className="p-5 space-y-4 relative">
          {/* Header row with icon, category, and toggle/lock */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                  skill.isEnabled && !isLocked
                    ? "bg-primary/15 border border-primary/40 shadow-sm shadow-primary/20"
                    : "bg-muted/50 border border-border/60"
                )}
              >
                <IconComponent
                  className={cn(
                    "w-5 h-5 transition-colors",
                    skill.isEnabled && !isLocked ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </div>
              
              {/* Category & Plan badges */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-secondary/60 text-secondary-foreground/90 px-2 py-0.5"
                >
                  {skill.category}
                </Badge>
                {skill.requiredPlan && skill.requiredPlan !== "starter" && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs px-2 py-0.5",
                      skill.requiredPlan === "pro"
                        ? "border-blue-500/40 text-blue-400 bg-blue-500/10"
                        : "border-cyan-500/40 text-cyan-400 bg-cyan-500/10"
                    )}
                  >
                    {skill.requiredPlan.charAt(0).toUpperCase() + skill.requiredPlan.slice(1)}
                  </Badge>
                )}
              </div>
            </div>

            {/* Toggle or Lock */}
            <div className="shrink-0">
              {!isLocked ? (
                <div className="relative">
                  <Switch
                    checked={skill.isEnabled}
                    onCheckedChange={() => onToggle(skill.id)}
                    disabled={isToggling}
                    className={cn(
                      "data-[state=checked]:bg-primary transition-opacity",
                      isToggling && "opacity-50"
                    )}
                  />
                  {isToggling && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-10 h-10 rounded-lg bg-muted/40 border border-border/60 flex items-center justify-center cursor-not-allowed hover:bg-muted/60 transition-colors">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[200px]">
                    <p className="text-xs">
                      {needsUpgrade
                        ? `Upgrade to ${skill.requiredPlan?.charAt(0).toUpperCase()}${skill.requiredPlan?.slice(1)} to unlock`
                        : "Upgrade to use this skill"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          {/* Active badge */}
          {skill.isEnabled && !isLocked && (
            <Badge className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5">
              Active
            </Badge>
          )}

          {/* Title & Description */}
          <div>
            <h3 className={cn(
              "font-semibold text-foreground mb-1.5 transition-colors leading-tight",
              !isLocked && "group-hover:text-primary"
            )}>
              {skill.name}
            </h3>
            <p className="text-sm text-muted-foreground font-light line-clamp-2 leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Preview */}
          <div className={cn(
            "px-3 py-2.5 rounded-lg bg-muted/30 border border-border/50 transition-colors overflow-hidden",
            !isLocked && "group-hover:border-primary/20 group-hover:bg-muted/40"
          )}>
            <p className="text-xs text-muted-foreground font-mono truncate">
              {skill.preview}
            </p>
          </div>

          {/* Stats */}
          {skill.runsCount > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
              <Zap className="w-3.5 h-3.5 text-primary/70" />
              <span>{skill.runsCount.toLocaleString()} executions</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => !isLocked && onCustomize(skill)}
                  disabled={isLocked}
                  className={cn(
                    "flex-1 border-border/60 transition-all",
                    isLocked 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  {isLocked && <Lock className="w-3 h-3 mr-1.5" />}
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                  Customize
                </Button>
              </TooltipTrigger>
              {isLocked && (
                <TooltipContent side="bottom">
                  <p className="text-xs">Upgrade to customize this skill</p>
                </TooltipContent>
              )}
            </Tooltip>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewRuns(skill)}
              className="flex-1 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
            >
              <PlaySquare className="w-3.5 h-3.5 mr-1.5" />
              View Runs
              <ChevronRight className="w-3 h-3 ml-1 opacity-50" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
