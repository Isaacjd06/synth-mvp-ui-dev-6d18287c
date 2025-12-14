import { useState, useEffect } from "react";
import { type LucideIcon } from "lucide-react";
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
import { synthToast } from "@/lib/synth-toast";

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

  useEffect(() => {
    if (skill) {
      setName(skill.name);
      setDescription(skill.description);
      setCategory(skill.category);
      setIntents(skill.intents || []);
      setInputs(skill.inputs || []);
      setOutputDescription(skill.outputDescription || "");
    } else {
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
      <DialogContent className="w-[620px] max-w-[95vw] bg-card border-border/50 flex flex-col max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border/30">
          <DialogTitle className="text-base font-semibold">
            {skill ? "Edit Skill" : "Create New Skill"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground/70">
            Define how Synth should behave with this capability
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Section A: Skill Identity */}
          <section className="space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Skill Identity
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skill-name" className="text-sm text-foreground/80">
                  Skill Name <span className="text-destructive/70">*</span>
                </Label>
                <Input
                  id="skill-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Qualify Incoming Leads"
                  className="bg-muted/20 border-border/40 focus:border-border/60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skill-category" className="text-sm text-foreground/80">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-muted/20 border-border/40 focus:border-border/60">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50">
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
              <Label htmlFor="skill-description" className="text-sm text-foreground/80">
                Description <span className="text-destructive/70">*</span>
              </Label>
              <Textarea
                id="skill-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Plain-language explanation of what this skill does"
                rows={2}
                className="bg-muted/20 border-border/40 focus:border-border/60 resize-none"
              />
            </div>
          </section>

          {/* Section B: Skill Intent */}
          <section className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Skill Intent
              </h3>
              <p className="text-xs text-muted-foreground/60 mt-1">
                When should Synth use this skill?
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newIntent}
                  onChange={(e) => setNewIntent(e.target.value)}
                  placeholder="e.g., When a new lead comes in from the website"
                  className="flex-1 bg-muted/20 border-border/40 focus:border-border/60"
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
                  size="sm"
                  onClick={handleAddIntent}
                  disabled={!newIntent.trim()}
                  className="shrink-0 border-border/40 hover:border-border/60 px-3"
                >
                  Add
                </Button>
              </div>

              {intents.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {intents.map((intent, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-muted/30 text-foreground/70 pr-1.5 text-xs font-normal"
                    >
                      {intent}
                      <button
                        type="button"
                        onClick={() => handleRemoveIntent(index)}
                        className="ml-1.5 p-0.5 rounded hover:bg-destructive/20 hover:text-destructive transition-colors text-muted-foreground"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-[11px] text-muted-foreground/50">
                These are signals Synth looks for in conversation.
              </p>
            </div>
          </section>

          {/* Section C: Inputs & Parameters */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Inputs & Parameters
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAddInput}
                className="h-6 text-xs text-muted-foreground hover:text-foreground"
              >
                Add Input
              </Button>
            </div>

            {inputs.length === 0 ? (
              <div className="py-4 text-center border border-dashed border-border/30 rounded-md">
                <p className="text-sm text-muted-foreground/60">
                  No inputs defined yet
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {inputs.map((input) => (
                  <div
                    key={input.id}
                    className="flex items-center gap-3 p-3 rounded-md bg-muted/10 border border-border/30"
                  >
                    <Input
                      value={input.name}
                      onChange={(e) => handleUpdateInput(input.id, "name", e.target.value)}
                      placeholder="Input name"
                      className="flex-1 h-8 bg-background/30 border-border/30 text-sm"
                    />
                    <Select
                      value={input.type}
                      onValueChange={(value) => handleUpdateInput(input.id, "type", value)}
                    >
                      <SelectTrigger className="w-24 h-8 bg-background/30 border-border/30 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border/50">
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
                        className="scale-90"
                      />
                      <span className="text-xs text-muted-foreground/60 w-12">
                        {input.required ? "Required" : "Optional"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveInput(input.id)}
                      className="text-muted-foreground/50 hover:text-destructive text-sm px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section D: Connected Capabilities */}
          <section className="space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Connected Capabilities
            </h3>

            {connectedApps.length === 0 ? (
              <p className="text-sm text-muted-foreground/50 py-2">
                No connected apps. Connections can be added later.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {connectedApps.map((app) => (
                  <span
                    key={app}
                    className="text-sm text-foreground/70 bg-muted/20 px-2 py-1 rounded"
                  >
                    {app}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Section E: Output / Result */}
          <section className="space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Output / Result
            </h3>

            <div className="space-y-2">
              <Label htmlFor="output-description" className="text-sm text-foreground/80">
                What should this skill produce or accomplish?
              </Label>
              <Textarea
                id="output-description"
                value={outputDescription}
                onChange={(e) => setOutputDescription(e.target.value)}
                placeholder="e.g., A qualified lead record in the CRM with a priority score"
                rows={2}
                className="bg-muted/20 border-border/40 focus:border-border/60 resize-none"
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
            className="text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave(true)}
            disabled={isSaving || !name.trim()}
            className="border-border/40 text-muted-foreground"
          >
            Save as Draft
          </Button>
          <Button
            size="sm"
            onClick={() => handleSave(false)}
            disabled={isSaving || !isValid}
            className="bg-primary/90 hover:bg-primary"
          >
            {isSaving ? "Saving..." : "Save Skill"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};