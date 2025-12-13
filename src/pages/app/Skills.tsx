import { useState, useMemo } from "react";
import {
  Sparkles,
  Mail,
  FileText,
  Bell,
  Users,
  Plus,
} from "lucide-react";
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
    icon: Users,
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
    icon: Mail,
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
    icon: FileText,
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
    icon: Bell,
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
    icon: FileText,
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
    icon: Users,
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

  // Filter and group skills
  const { filteredSkills, groupedSkills } = useMemo(() => {
    const filtered =
      selectedCategory === "All"
        ? skills
        : skills.filter((s) => s.category === selectedCategory);

    // Group by category
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
      // Update existing
      setSkills((prev) =>
        prev.map((s) =>
          s.id === skillData.id
            ? { ...s, ...skillData, status: asDraft ? "draft" : "configured" }
            : s
        )
      );
    } else {
      // Create new
      const newSkill: PrebuiltSkill = {
        ...skillData,
        id: `skill-${Date.now()}`,
        icon: Sparkles,
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
      <PageTransition className="px-4 lg:px-6 py-6 space-y-6">
        {/* Action Bar */}
        <PageItem className="flex items-center justify-end gap-3">
          <Badge
            variant="outline"
            className="px-3 py-1.5 border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-sm"
          >
            {configuredCount} Configured
          </Badge>
          <Button
            onClick={handleCreateNew}
            className="bg-primary hover:bg-primary/90"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create Skill
          </Button>
        </PageItem>

        {/* Category Filter Bar */}
        <PageItem>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {CATEGORIES.map((category) => {
              const count =
                category === "All"
                  ? skills.length
                  : skills.filter((s) => s.category === category).length;
              const isActive = selectedCategory === category;

              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "shrink-0 snap-start flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-muted/40 text-muted-foreground border border-border/50 hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                  )}
                >
                  {category}
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-background/50 text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </PageItem>

        {/* Loading State */}
        {isLoading ? (
          <PageItem>
            <SkillsLoadingState />
          </PageItem>
        ) : skills.length === 0 ? (
          /* Empty State */
          <PageItem>
            <SkillsEmptyState onCreateSkill={handleCreateNew} />
          </PageItem>
        ) : filteredSkills.length === 0 ? (
          /* No results for filter */
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
          /* Skills by Category */
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
                    {/* Category Header */}
                    {selectedCategory === "All" && (
                      <div className="flex items-center justify-between gap-4 mb-4 mt-6 first:mt-0">
                        <h4 className="text-base font-semibold text-foreground">
                          {category}
                        </h4>
                        <div className="flex items-center gap-3">
                          <div className="h-px flex-1 min-w-[40px] bg-gradient-to-r from-border/60 to-transparent" />
                          <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md shrink-0">
                            {categorySkills.length} skill
                            {categorySkills.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Skills Grid */}
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

      {/* Customize Modal */}
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
