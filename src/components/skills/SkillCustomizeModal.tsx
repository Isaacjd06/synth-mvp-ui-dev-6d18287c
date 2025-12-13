import { useState, useEffect } from "react";
import {
  Settings2,
  Save,
  X,
  Plus,
  Trash2,
  Link2,
  Target,
  FileText,
  Layers,
  Check,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { synthToast } from "@/lib/synth-toast";
import { cn } from "@/lib/utils";

export interface SkillInput {
  id: string;
  name: string;
  type: "text" | "number" | "select" | "date" | "email" | "url";
  required: boolean;
}

export interface SkillData {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "configured" | "draft";
  intents: string[];
  inputs: SkillInput[];
  connectedApps: string[];
  outputDescription: string;
  icon?: LucideIcon;
}

interface SkillCustomizeModalProps {
  skill: SkillData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (skill: SkillData, asDraft?: boolean) => void;
}

const INPUT_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "select", label: "Select" },
  { value: "date", label: "Date" },
  { value: "email", label: "Email" },
  { value: "url", label: "URL" },
];

const CATEGORIES = ["Sales", "Productivity", "Communication", "Operations", "Support", "Finance"];

export const SkillCustomizeModal = ({
  skill,
  open,
  onOpenChange,
  onSave,
}: SkillCustomizeModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [intents, setIntents] = useState<string[]>([]);
  const [newIntent, setNewIntent] = useState("");
  const [inputs, setInputs] = useState<SkillInput[]>([]);
  const [connectedApps] = useState<string[]>([]);
  const [outputDescription, setOutputDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Reset form when skill changes
  useEffect(() => {
    if (skill) {
      setName(skill.name);
      setDescription(skill.description);
      setCategory(skill.category);
      setIntents(skill.intents || []);
      setInputs(skill.inputs || []);
      setOutputDescription(skill.outputDescription || "");
    } else {
      // Reset for new skill
      setName("");
      setDescription("");
      setCategory("");
      setIntents([]);
      setInputs([]);
      setOutputDescription("");
    }
  }, [skill, open]);

  const handleAddIntent = () => {
    if (newIntent.trim()) {
      setIntents((prev) => [...prev, newIntent.trim()]);
      setNewIntent("");
    }
  };

  const handleRemoveIntent = (index: number) => {
    setIntents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddInput = () => {
    const newInput: SkillInput = {
      id: `input-${Date.now()}`,
      name: "",
      type: "text",
      required: false,
    };
    setInputs((prev) => [...prev, newInput]);
  };

  const handleUpdateInput = (id: string, field: keyof SkillInput, value: string | boolean) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, [field]: value } : input
      )
    );
  };

  const handleRemoveInput = (id: string) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
  };

  const handleSave = async (asDraft: boolean = false) => {
    if (!name.trim()) return;

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedSkill: SkillData = {
      id: skill?.id || `skill-${Date.now()}`,
      name,
      description,
      category,
      status: asDraft ? "draft" : "configured",
      intents,
      inputs: inputs.filter((i) => i.name.trim()),
      connectedApps,
      outputDescription,
      icon: skill?.icon,
    };

    onSave(updatedSkill, asDraft);
    synthToast.success(
      asDraft ? "Draft Saved" : "Skill Saved",
      `"${name}" has been ${asDraft ? "saved as draft" : "saved successfully"}.`
    );
    setIsSaving(false);
    onOpenChange(false);
  };

  const isValid = name.trim() && description.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[680px] max-w-[95vw] bg-card border-border/60 shadow-2xl shadow-primary/5 flex flex-col max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Settings2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold">
                {skill ? "Edit Skill" : "Create New Skill"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Define how Synth should behave with this capability
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Section A: Skill Identity */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Skill Identity</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skill-name" className="text-sm font-medium">
                  Skill Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="skill-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Qualify Incoming Leads"
                  className="bg-muted/30 border-border/60 focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skill-category" className="text-sm font-medium">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-muted/30 border-border/60 focus:border-primary/50">
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

            <div className="space-y-2">
              <Label htmlFor="skill-description" className="text-sm font-medium">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="skill-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Plain-language explanation of what this skill does"
                rows={2}
                className="bg-muted/30 border-border/60 focus:border-primary/50 resize-none"
              />
            </div>
          </section>

          <Separator className="bg-border/40" />

          {/* Section B: Skill Intent */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Skill Intent</h3>
            </div>
            <p className="text-xs text-muted-foreground -mt-2">
              When should Synth use this skill? Add example intents or triggers.
            </p>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newIntent}
                  onChange={(e) => setNewIntent(e.target.value)}
                  placeholder="e.g., When a new lead comes in from the website"
                  className="flex-1 bg-muted/30 border-border/60 focus:border-primary/50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddIntent();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddIntent}
                  disabled={!newIntent.trim()}
                  className="shrink-0 border-border/60 hover:border-primary/40 hover:bg-primary/5"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {intents.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {intents.map((intent, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-muted/50 text-foreground/80 pr-1.5 text-xs"
                    >
                      {intent}
                      <button
                        type="button"
                        onClick={() => handleRemoveIntent(index)}
                        className="ml-1.5 p-0.5 rounded hover:bg-destructive/20 hover:text-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-[11px] text-muted-foreground/70">
                These are signals Synth looks for in conversation.
              </p>
            </div>
          </section>

          <Separator className="bg-border/40" />

          {/* Section C: Inputs & Parameters */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Inputs & Parameters</h3>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAddInput}
                className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/10"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Input
              </Button>
            </div>

            {inputs.length === 0 ? (
              <div className="py-4 text-center border border-dashed border-border/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  No inputs defined yet. Add inputs this skill needs to function.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {inputs.map((input) => (
                  <div
                    key={input.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/40"
                  >
                    <Input
                      value={input.name}
                      onChange={(e) => handleUpdateInput(input.id, "name", e.target.value)}
                      placeholder="Input name"
                      className="flex-1 h-8 bg-background/50 border-border/50 text-sm"
                    />
                    <Select
                      value={input.type}
                      onValueChange={(value) => handleUpdateInput(input.id, "type", value)}
                    >
                      <SelectTrigger className="w-28 h-8 bg-background/50 border-border/50 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border/60">
                        {INPUT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={input.required}
                        onCheckedChange={(checked) =>
                          handleUpdateInput(input.id, "required", checked)
                        }
                        className="data-[state=checked]:bg-primary"
                      />
                      <span className="text-xs text-muted-foreground w-12">
                        {input.required ? "Required" : "Optional"}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveInput(input.id)}
                      className="h-8 w-8 shrink-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <Separator className="bg-border/40" />

          {/* Section D: Connected Capabilities */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Connected Capabilities</h3>
            </div>

            {connectedApps.length === 0 ? (
              <div className="py-4 px-4 border border-dashed border-border/50 rounded-lg bg-muted/10">
                <p className="text-sm text-muted-foreground text-center">
                  No connected apps. Connections can be added later in Settings.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {connectedApps.map((app) => (
                  <Badge
                    key={app}
                    variant="outline"
                    className="border-primary/30 bg-primary/5 text-foreground"
                  >
                    <Check className="w-3 h-3 mr-1.5 text-primary" />
                    {app}
                  </Badge>
                ))}
              </div>
            )}
          </section>

          <Separator className="bg-border/40" />

          {/* Section E: Output / Result */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Output / Result</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="output-description" className="text-sm font-medium">
                What should this skill produce or accomplish?
              </Label>
              <Textarea
                id="output-description"
                value={outputDescription}
                onChange={(e) => setOutputDescription(e.target.value)}
                placeholder="e.g., A qualified lead record in the CRM with a priority score and assigned sales rep"
                rows={2}
                className="bg-muted/30 border-border/60 focus:border-primary/50 resize-none"
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border/40 bg-muted/5">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1.5" />
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => handleSave(true)}
              disabled={isSaving || !name.trim()}
              className="border-border/60 hover:border-primary/40"
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSave(false)}
              disabled={isSaving || !isValid}
              className="bg-primary hover:bg-primary/90"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-1.5" />
                  Save Skill
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
