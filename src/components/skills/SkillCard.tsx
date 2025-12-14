import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, delay: index * 0.03 }}
    >
      <Card
        className={cn(
          "relative transition-all duration-150 h-full",
          "border-border/40 bg-card/60 hover:border-border/60"
        )}
      >
        <CardContent className="p-5 space-y-4">
          {/* Header row - status and menu */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              {skill.category && (
                <span className="text-[11px] text-muted-foreground/70 uppercase tracking-wide font-medium">
                  {skill.category}
                </span>
              )}
              <span className="text-muted-foreground/40">·</span>
              <span
                className={cn(
                  "text-[11px] font-medium",
                  isConfigured ? "text-emerald-400/80" : "text-amber-400/70"
                )}
              >
                {isConfigured ? "Configured" : "Draft"}
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-muted-foreground/60 hover:text-foreground text-xs"
                >
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36 bg-card border-border/50">
                <DropdownMenuItem onClick={() => onDuplicate(skill)} className="text-sm">
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggle(skill)} className="text-sm">
                  {isConfigured ? "Disable" : "Enable"}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/30" />
                <DropdownMenuItem
                  onClick={() => onDelete(skill)}
                  className="text-destructive focus:text-destructive text-sm"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5">
            <h3 className="font-medium text-foreground leading-snug text-[15px]">
              {skill.name}
            </h3>
            <p className="text-sm text-muted-foreground/70 line-clamp-2 leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Preview if exists */}
          {skill.preview && (
            <p className="text-[11px] text-muted-foreground/50 font-mono truncate leading-relaxed border-t border-border/30 pt-3">
              {skill.preview}
            </p>
          )}

          {/* Primary Action */}
          <Button
            onClick={() => onEdit(skill)}
            variant="outline"
            size="sm"
            className="w-full border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60 hover:bg-muted/20"
          >
            Edit Skill
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};