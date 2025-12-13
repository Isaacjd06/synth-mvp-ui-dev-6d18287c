import { useState } from "react";
import { Plus, X, Sparkles, Zap, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export interface CreateSkillFormValues {
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  triggerType: string;
  actions: string;
}

interface CreateSkillModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateSkill: (values: CreateSkillFormValues) => void;
}

const CATEGORIES = ["Sales", "Productivity", "Communication", "Operations", "Support"];
const TRIGGER_TYPES = ["Manual"];

export const CreateSkillModal = ({
  open,
  onOpenChange,
  onCreateSkill,
}: CreateSkillModalProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [formValues, setFormValues] = useState<CreateSkillFormValues>({
    name: "",
    category: "",
    shortDescription: "",
    longDescription: "",
    triggerType: "Manual",
    actions: "",
  });

  const handleChange = (field: keyof CreateSkillFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    onCreateSkill(formValues);
    setIsCreating(false);
    setFormValues({
      name: "",
      category: "",
      shortDescription: "",
      longDescription: "",
      triggerType: "Manual",
      actions: "",
    });
    setAdvancedOpen(false);
    onOpenChange(false);
  };

  const isFormValid =
    formValues.name.trim() &&
    formValues.category &&
    formValues.shortDescription.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[540px] max-w-[95vw] bg-card border-border/60 shadow-2xl shadow-primary/5 flex flex-col max-h-[85vh]">
        <DialogHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-base font-semibold">Create New Skill</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Define a new automation skill for Synth
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-3 py-1 pr-1">
          {/* Core Fields */}
          <div className="grid grid-cols-2 gap-3">
            {/* Skill Name */}
            <div className="space-y-1.5">
              <Label htmlFor="skill-name" className="text-xs font-medium">
                Skill Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="skill-name"
                value={formValues.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., Lead Qualifier"
                className="h-9 bg-muted/30 border-border/60 focus:border-primary/50 text-sm"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <Label htmlFor="skill-category" className="text-xs font-medium">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formValues.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className="h-9 bg-muted/30 border-border/60 focus:border-primary/50 text-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/60">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <Label htmlFor="short-description" className="text-xs font-medium">
              Short Description <span className="text-destructive">*</span>
            </Label>
            <Input
              id="short-description"
              value={formValues.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
              placeholder="Brief summary of what this skill does"
              className="h-9 bg-muted/30 border-border/60 focus:border-primary/50 text-sm"
            />
          </div>

          {/* Trigger Type */}
          <div className="space-y-1.5">
            <Label htmlFor="trigger-type" className="text-xs font-medium">
              Trigger Type
            </Label>
            <Select
              value={formValues.triggerType}
              onValueChange={(value) => handleChange("triggerType", value)}
            >
              <SelectTrigger className="h-9 bg-muted/30 border-border/60 focus:border-primary/50 text-sm">
                <SelectValue placeholder="Select trigger" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border/60">
                {TRIGGER_TYPES.map((trigger) => (
                  <SelectItem key={trigger} value={trigger}>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-primary" />
                      {trigger}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground/70">
              More trigger types coming soon
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/40 my-1" />

          {/* Advanced Options - Collapsible */}
          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <CollapsibleTrigger asChild>
              <button className="flex items-center justify-between w-full py-1.5 px-2 -mx-2 rounded-md hover:bg-muted/30 transition-colors group">
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Advanced Options
                </span>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
                  advancedOpen && "rotate-180"
                )} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-2">
              {/* Long Description */}
              <div className="space-y-1.5">
                <Label htmlFor="long-description" className="text-xs font-medium">
                  Long Description
                </Label>
                <Textarea
                  id="long-description"
                  value={formValues.longDescription}
                  onChange={(e) => handleChange("longDescription", e.target.value)}
                  placeholder="Detailed explanation of the skill's behavior..."
                  rows={2}
                  className="bg-muted/30 border-border/60 focus:border-primary/50 resize-none text-sm min-h-[60px]"
                />
              </div>

              {/* Actions */}
              <div className="space-y-1.5">
                <Label htmlFor="actions" className="text-xs font-medium">
                  Actions
                </Label>
                <Textarea
                  id="actions"
                  value={formValues.actions}
                  onChange={(e) => handleChange("actions", e.target.value)}
                  placeholder="e.g., Send email → Update CRM → Notify Slack"
                  rows={2}
                  className="bg-muted/30 border-border/60 focus:border-primary/50 resize-none font-mono text-xs min-h-[60px]"
                />
                <p className="text-[10px] text-muted-foreground/70">
                  Visual action builder coming soon
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <DialogFooter className="flex-row justify-end gap-2 pt-3 border-t border-border/40 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isCreating}
            className="h-8"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={isCreating || !isFormValid}
            className="h-8 bg-primary hover:bg-primary/90"
          >
            {isCreating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-1.5" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 mr-1" />
                Create Skill
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
