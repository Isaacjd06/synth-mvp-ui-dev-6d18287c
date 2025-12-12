import { useState } from "react";
import { Lock, MessageSquare, PlaySquare, ChevronRight, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface PrebuiltSkill {
  id: string;
  name: string;
  description: string;
  preview: string;
  icon: React.ElementType;
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
}: SkillCardProps) => {
  const requiredPlanLevel = PLAN_LEVELS[skill.requiredPlan || "starter"] || 1;
  const userPlanLevel = PLAN_LEVELS[userPlan] || 0;
  const isLocked = !isSubscribed || userPlanLevel < requiredPlanLevel;
  const needsUpgrade = isSubscribed && userPlanLevel < requiredPlanLevel;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        skill.isEnabled && !isLocked
          ? "bg-card border-primary/30 shadow-md shadow-primary/10"
          : "bg-card/50 border-border/50",
        isLocked && "opacity-75"
      )}
    >
      {/* Active glow effect */}
      {skill.isEnabled && !isLocked && (
        <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-primary/15 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="text-center p-4">
            <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">
              {needsUpgrade
                ? `Upgrade to ${skill.requiredPlan?.charAt(0).toUpperCase()}${skill.requiredPlan?.slice(1)} to unlock`
                : "Subscribe to unlock this skill"}
            </p>
          </div>
        </div>
      )}

      <CardContent className="p-5 space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300",
              skill.isEnabled && !isLocked
                ? "bg-primary/15 border border-primary/30 shadow-sm shadow-primary/20"
                : "bg-muted/50 border border-border/50"
            )}
          >
            <skill.icon
              className={cn(
                "w-5 h-5 transition-colors",
                skill.isEnabled && !isLocked ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>

          {/* Switch with subscription check */}
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
                <div className="relative cursor-not-allowed">
                  <Switch checked={false} disabled className="opacity-40" />
                  <Lock className="absolute -top-1 -right-1 w-3 h-3 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">
                  {needsUpgrade
                    ? `Requires ${skill.requiredPlan} plan`
                    : "Subscribe to activate automations"}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Category & Status badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs bg-secondary/50 text-secondary-foreground/80">
            {skill.category}
          </Badge>
          {skill.requiredPlan && skill.requiredPlan !== "starter" && (
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                skill.requiredPlan === "pro"
                  ? "border-blue-500/30 text-blue-400 bg-blue-500/10"
                  : "border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
              )}
            >
              {skill.requiredPlan.charAt(0).toUpperCase() + skill.requiredPlan.slice(1)}
            </Badge>
          )}
          {skill.isEnabled && !isLocked && (
            <Badge className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              Active
            </Badge>
          )}
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
            {skill.name}
          </h3>
          <p className="text-sm text-muted-foreground font-light line-clamp-2">{skill.description}</p>
        </div>

        {/* Preview */}
        <div className="px-3 py-2.5 rounded-lg bg-muted/40 border border-border/60 group-hover:border-primary/20 transition-colors">
          <p className="text-xs text-muted-foreground font-mono">{skill.preview}</p>
        </div>

        {/* Stats */}
        {skill.runsCount > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>{skill.runsCount.toLocaleString()} executions</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCustomize(skill)}
            disabled={isLocked}
            className={cn(
              "flex-1 border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all",
              isLocked && "opacity-60 cursor-not-allowed"
            )}
          >
            {isLocked && <Lock className="w-3 h-3 mr-1" />}
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            Customize
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewRuns(skill)}
            className="flex-1 hover:bg-muted/50"
          >
            <PlaySquare className="w-3.5 h-3.5 mr-1.5" />
            View Runs
            <ChevronRight className="w-3 h-3 ml-1 opacity-50" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
