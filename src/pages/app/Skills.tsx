import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { synthToast } from "@/lib/synth-toast";
import { SkillCard, type PrebuiltSkill } from "@/components/skills/SkillCard";
import { SkillCustomizeModal, type SkillData } from "@/components/skills/SkillCustomizeModal";
import { SkillsEmptyState } from "@/components/skills/SkillsEmptyState";
import { SkillsLoadingState } from "@/components/skills/SkillsLoadingState";

const initialSkills: PrebuiltSkill[] = [
  {
    id: "1",
    name: "Lead Capture & CRM Sync",
    description: "Automatically capture leads from forms and sync to your CRM with enriched data.",
    preview: "When form submitted → Enrich data → Add to CRM → Notify sales",
    category: "Sales",
    status: "configured",
    intents: ["When a new lead comes in", "Process form submissions"],
    inputs: [
      { id: "i1", name: "Lead Email", type: "email", required: true },
      { id: "i2", name: "Company Name", type: "text", required: false },
    ],
    connectedApps: ["Salesforce", "Gmail"],
    outputDescription: "Qualified lead record in CRM with priority score",
  },
  {
    id: "2",
    name: "Email Summary Digest",
    description: "Summarize important emails and send daily/weekly digest notifications.",
    preview: "Daily at 8am → Scan inbox → Summarize key emails → Send digest",
    category: "Productivity",
    status: "draft",
    intents: ["Summarize my emails", "Send me an email digest"],
    inputs: [
      { id: "i1", name: "Frequency", type: "select", required: true },
    ],
    connectedApps: ["Gmail"],
    outputDescription: "Daily email digest sent to inbox",
  },
  {
    id: "3",
    name: "Document Processing",
    description: "Extract data from uploaded documents and organize in spreadsheets.",
    preview: "When file uploaded → Extract text → Parse fields → Update sheet",
    category: "Operations",
    status: "configured",
    intents: ["Process uploaded documents", "Extract data from files"],
    inputs: [
      { id: "i1", name: "Document Type", type: "select", required: true },
      { id: "i2", name: "Output Sheet", type: "text", required: true },
    ],
    connectedApps: ["Google Drive", "Google Sheets"],
    outputDescription: "Parsed data rows in target spreadsheet",
  },
  {
    id: "4",
    name: "Slack Alert Router",
    description: "Route alerts and notifications to appropriate Slack channels based on content.",
    preview: "When alert received → Classify urgency → Route to channel → Tag team",
    category: "Communication",
    status: "draft",
    intents: ["Route alerts to Slack", "Notify the team"],
    inputs: [
      { id: "i1", name: "Alert Source", type: "text", required: true },
      { id: "i2", name: "Default Channel", type: "text", required: false },
    ],
    connectedApps: ["Slack"],
    outputDescription: "Alert posted to appropriate Slack channel",
  },
  {
    id: "5",
    name: "Meeting Notes Generator",
    description: "Automatically generate and distribute meeting notes from recordings.",
    preview: "When meeting ends → Transcribe → Summarize → Send to attendees",
    category: "Productivity",
    status: "configured",
    intents: ["Generate meeting notes", "Summarize the meeting"],
    inputs: [
      { id: "i1", name: "Meeting Recording URL", type: "url", required: true },
    ],
    connectedApps: ["Google Meet", "Notion"],
    outputDescription: "Meeting summary sent to all attendees",
  },
  {
    id: "6",
    name: "Support Ticket Classifier",
    description: "Classify and route support tickets based on urgency and category.",
    preview: "When ticket created → Analyze content → Set priority → Assign agent",
    category: "Support",
    status: "configured",
    intents: ["Classify support tickets", "Prioritize incoming tickets"],
    inputs: [
      { id: "i1", name: "Ticket ID", type: "text", required: true },
    ],
    connectedApps: ["Zendesk"],
    outputDescription: "Ticket classified with priority and assigned agent",
  },
];

const CATEGORIES = ["All", "Sales", "Productivity", "Operations", "Communication", "Support"];

const Skills = () => {
  const [skills, setSkills] = useState<PrebuiltSkill[]>(initialSkills);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading] = useState(false);
  const [editingSkill, setEditingSkill] = useState<PrebuiltSkill | null>(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const { filteredSkills, groupedSkills } = useMemo(() => {
    const filtered =
      selectedCategory === "All"
        ? skills
        : skills.filter((s) => s.category === selectedCategory);

    const groups: Record<string, PrebuiltSkill[]> = {};
    filtered.forEach((skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
    });

    return { filteredSkills: filtered, groupedSkills: groups };
  }, [skills, selectedCategory]);

  const handleEdit = (skill: PrebuiltSkill) => {
    setEditingSkill(skill);
    setIsCustomizeOpen(true);
  };

  const handleCreateNew = () => {
    setEditingSkill(null);
    setIsCustomizeOpen(true);
  };

  const handleSaveSkill = (skillData: SkillData, asDraft?: boolean) => {
    if (editingSkill) {
      setSkills((prev) =>
        prev.map((s) =>
          s.id === skillData.id
            ? { ...s, ...skillData, status: asDraft ? "draft" : "configured" }
            : s
        )
      );
    } else {
      const newSkill: PrebuiltSkill = {
        ...skillData,
        id: `skill-${Date.now()}`,
        preview: `Custom skill: ${skillData.name}`,
        status: asDraft ? "draft" : "configured",
      };
      setSkills((prev) => [...prev, newSkill]);
    }
  };

  const handleDuplicate = (skill: PrebuiltSkill) => {
    const duplicated: PrebuiltSkill = {
      ...skill,
      id: `skill-${Date.now()}`,
      name: `${skill.name} (Copy)`,
      status: "draft",
    };
    setSkills((prev) => [...prev, duplicated]);
    synthToast.success("Skill Duplicated", `"${duplicated.name}" created.`);
  };

  const handleToggle = (skill: PrebuiltSkill) => {
    const newStatus = skill.status === "configured" ? "draft" : "configured";
    setSkills((prev) =>
      prev.map((s) =>
        s.id === skill.id ? { ...s, status: newStatus } : s
      )
    );
    synthToast.success(
      newStatus === "configured" ? "Skill Enabled" : "Skill Disabled",
      `"${skill.name}" is now ${newStatus === "configured" ? "active" : "a draft"}.`
    );
  };

  const handleDelete = (skill: PrebuiltSkill) => {
    setSkills((prev) => prev.filter((s) => s.id !== skill.id));
    synthToast.success("Skill Deleted", `"${skill.name}" has been removed.`);
  };

  const configuredCount = skills.filter((s) => s.status === "configured").length;

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-6 space-y-8">
        {/* Header row */}
        <PageItem className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground/70">
              {configuredCount} of {skills.length} configured
            </span>
          </div>
          <Button
            onClick={handleCreateNew}
            variant="outline"
            size="sm"
            className="border-border/50 hover:border-border/70"
          >
            Create Skill
          </Button>
        </PageItem>

        {/* Category filters */}
        <PageItem>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((category) => {
              const count =
                category === "All"
                  ? skills.length
                  : skills.filter((s) => s.category === category).length;
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-muted/60 text-foreground font-medium"
                      : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  {category}
                  <span className="text-xs text-muted-foreground/50">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </PageItem>

        {isLoading ? (
          <PageItem>
            <SkillsLoadingState />
          </PageItem>
        ) : skills.length === 0 ? (
          <PageItem>
            <SkillsEmptyState onCreateSkill={handleCreateNew} />
          </PageItem>
        ) : filteredSkills.length === 0 ? (
          <PageItem>
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No skills found in the {selectedCategory} category.
              </p>
              <Button
                variant="link"
                onClick={() => setSelectedCategory("All")}
                className="text-primary mt-2"
              >
                View all skills
              </Button>
            </div>
          </PageItem>
        ) : (
          <TooltipProvider delayDuration={200}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="space-y-8 pb-8"
              >
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <PageItem key={category}>
                    {selectedCategory === "All" && (
                      <div className="flex items-baseline gap-3 mb-5 mt-8 first:mt-0">
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                          {category}
                        </h4>
                        <span className="text-xs text-muted-foreground/50">
                          {categorySkills.length}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {categorySkills.map((skill, index) => (
                        <SkillCard
                          key={skill.id}
                          skill={skill}
                          onEdit={handleEdit}
                          onDuplicate={handleDuplicate}
                          onToggle={handleToggle}
                          onDelete={handleDelete}
                          index={index}
                        />
                      ))}
                    </div>
                  </PageItem>
                ))}
              </motion.div>
            </AnimatePresence>
          </TooltipProvider>
        )}
      </PageTransition>

      <SkillCustomizeModal
        skill={editingSkill}
        open={isCustomizeOpen}
        onOpenChange={setIsCustomizeOpen}
        onSave={handleSaveSkill}
      />
    </AppShell>
  );
};

export default Skills;