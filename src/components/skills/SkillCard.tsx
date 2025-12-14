import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { SkillData } from "./SkillCustomizeModal";

export interface PrebuiltSkill extends SkillData {
  preview?: string;
  runsCount?: number;
}

interface SkillCardProps {
  skill: PrebuiltSkill;
  onEdit: (skill: PrebuiltSkill) => void;
  onDuplicate: (skill: PrebuiltSkill) => void;
  onToggle: (skill: PrebuiltSkill) => void;
  onDelete: (skill: PrebuiltSkill) => void;
  index?: number;
}

export const SkillCard = ({
  skill,
  onEdit,
  onDuplicate,
  onToggle,
  onDelete,
  index = 0,
}: SkillCardProps) => {
  const isConfigured = skill.status === "configured";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="max-w-[600px]"
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-200 h-full",
          "hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-0.5",
          "border-border/50 bg-card/80 hover:border-primary/25"
        )}
      >
        {/* Subtle hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="absolute inset-0 bg-primary/3" />
        </div>

        <CardContent className="p-5 space-y-3 relative">
          {/* Header row - badges and menu */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {skill.category && (
                <Badge
                  variant="secondary"
                  className="text-[11px] bg-secondary/50 text-secondary-foreground/80 px-2 py-0.5 font-medium"
                >
                  {skill.category}
                </Badge>
              )}
              <Badge
                variant="outline"
                className={cn(
                  "text-[11px] px-2 py-0.5 font-medium",
                  isConfigured
                    ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/8"
                    : "border-amber-500/30 text-amber-400 bg-amber-500/8"
                )}
              >
                {isConfigured ? "Configured" : "Draft"}
              </Badge>
            </div>

            {/* Overflow Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 shrink-0 text-muted-foreground hover:text-foreground text-xs"
                >
                  Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 bg-card border-border/60">
                <DropdownMenuItem onClick={() => onDuplicate(skill)}>
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggle(skill)}>
                  {isConfigured ? "Disable" : "Enable"}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/40" />
                <DropdownMenuItem
                  onClick={() => onDelete(skill)}
                  className="text-destructive focus:text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <h3 className="font-semibold text-foreground transition-colors leading-snug text-[15px] group-hover:text-primary">
              {skill.name}
            </h3>
            <p className="text-sm text-muted-foreground font-light line-clamp-2 leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Preview if exists */}
          {skill.preview && (
            <div className="px-3 py-2 rounded-md bg-muted/25 border border-border/40 group-hover:border-primary/15 group-hover:bg-muted/35 transition-colors">
              <p className="text-[11px] text-muted-foreground font-mono truncate leading-relaxed">
                {skill.preview}
              </p>
            </div>
          )}

          {/* Primary Action */}
          <Button
            onClick={() => onEdit(skill)}
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 transition-all"
            variant="ghost"
          >
            Edit Skill
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};