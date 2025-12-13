import { useState } from "react";
import { Plus, X, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));
    onCreateSkill(formValues);
    setIsCreating(false);
    // Reset form
    setFormValues({
      name: "",
      category: "",
      shortDescription: "",
      longDescription: "",
      triggerType: "Manual",
      actions: "",
    });
    onOpenChange(false);
  };

  const isFormValid =
    formValues.name.trim() &&
    formValues.category &&
    formValues.shortDescription.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border/60 shadow-2xl shadow-primary/5">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold">Create New Skill</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Define a new automation skill for Synth
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
          {/* Skill Name */}
          <div className="space-y-2">
            <Label htmlFor="skill-name" className="text-sm font-medium">
              Skill Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="skill-name"
              value={formValues.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Lead Qualification Bot"
              className="bg-muted/30 border-border/60 focus:border-primary/50"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="skill-category" className="text-sm font-medium">
              Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formValues.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger className="bg-muted/30 border-border/60 focus:border-primary/50">
                <SelectValue placeholder="Select a category" />
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

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="short-description" className="text-sm font-medium">
              Short Description <span className="text-destructive">*</span>
            </Label>
            <Input
              id="short-description"
              value={formValues.shortDescription}
              onChange={(e) => handleChange("shortDescription", e.target.value)}
              placeholder="Brief summary of what this skill does"
              className="bg-muted/30 border-border/60 focus:border-primary/50"
            />
          </div>

          {/* Long Description */}
          <div className="space-y-2">
            <Label htmlFor="long-description" className="text-sm font-medium">
              Long Description
            </Label>
            <Textarea
              id="long-description"
              value={formValues.longDescription}
              onChange={(e) => handleChange("longDescription", e.target.value)}
              placeholder="Detailed explanation of the skill's behavior and use cases..."
              rows={3}
              className="bg-muted/30 border-border/60 focus:border-primary/50 resize-none"
            />
          </div>

          {/* Trigger Type */}
          <div className="space-y-2">
            <Label htmlFor="trigger-type" className="text-sm font-medium">
              Trigger Type
            </Label>
            <Select
              value={formValues.triggerType}
              onValueChange={(value) => handleChange("triggerType", value)}
            >
              <SelectTrigger className="bg-muted/30 border-border/60 focus:border-primary/50">
                <SelectValue placeholder="Select trigger type" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border/60">
                {TRIGGER_TYPES.map((trigger) => (
                  <SelectItem key={trigger} value={trigger}>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-primary" />
                      {trigger}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              More trigger types coming soon
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Label htmlFor="actions" className="text-sm font-medium">
              Actions
            </Label>
            <Textarea
              id="actions"
              value={formValues.actions}
              onChange={(e) => handleChange("actions", e.target.value)}
              placeholder="Describe the actions this skill performs (e.g., 'Send email → Update CRM → Notify Slack')..."
              rows={3}
              className="bg-muted/30 border-border/60 focus:border-primary/50 resize-none font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Visual action builder coming in a future update
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-border/40">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isCreating}
          >
            <X className="w-4 h-4 mr-1.5" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isCreating || !isFormValid}
            className="bg-primary hover:bg-primary/90"
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1.5" />
                Create Skill
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
