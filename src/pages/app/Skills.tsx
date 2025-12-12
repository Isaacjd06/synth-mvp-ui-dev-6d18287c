import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  MessageSquare,
  Zap,
  Mail,
  FileText,
  Bell,
  Users,
  ToggleLeft,
  Filter,
} from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider } from "@/components/ui/tooltip";
import SubscriptionBanner from "@/components/subscription/SubscriptionBanner";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { synthToast } from "@/lib/synth-toast";
import { SkillCard, type PrebuiltSkill } from "@/components/skills/SkillCard";
import { SkillCustomizeModal } from "@/components/skills/SkillCustomizeModal";
import { SkillsLoadingState } from "@/components/skills/SkillsLoadingState";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const initialSkills: PrebuiltSkill[] = [
  {
    id: "1",
    name: "Lead Capture & CRM Sync",
    description: "Automatically capture leads from forms and sync to your CRM with enriched data.",
    preview: "When form submitted → Enrich data → Add to CRM → Notify sales",
    icon: Users,
    category: "Sales",
    isEnabled: true,
    runsCount: 142,
    requiredPlan: "starter",
  },
  {
    id: "2",
    name: "Email Summary Digest",
    description: "Summarize important emails and send daily/weekly digest notifications.",
    preview: "Daily at 8am → Scan inbox → Summarize key emails → Send digest",
    icon: Mail,
    category: "Productivity",
    isEnabled: false,
    runsCount: 0,
    requiredPlan: "starter",
  },
  {
    id: "3",
    name: "Document Processing",
    description: "Extract data from uploaded documents and organize in spreadsheets.",
    preview: "When file uploaded → Extract text → Parse fields → Update sheet",
    icon: FileText,
    category: "Operations",
    isEnabled: true,
    runsCount: 89,
    requiredPlan: "pro",
  },
  {
    id: "4",
    name: "Slack Alert Router",
    description: "Route alerts and notifications to appropriate Slack channels based on content.",
    preview: "When alert received → Classify urgency → Route to channel → Tag team",
    icon: Bell,
    category: "Communication",
    isEnabled: false,
    runsCount: 0,
    requiredPlan: "starter",
  },
  {
    id: "5",
    name: "Meeting Notes Generator",
    description: "Automatically generate and distribute meeting notes from recordings.",
    preview: "When meeting ends → Transcribe → Summarize → Send to attendees",
    icon: FileText,
    category: "Productivity",
    isEnabled: true,
    runsCount: 34,
    requiredPlan: "pro",
  },
  {
    id: "6",
    name: "Support Ticket Classifier",
    description: "Classify and route support tickets based on urgency and category.",
    preview: "When ticket created → Analyze content → Set priority → Assign agent",
    icon: Users,
    category: "Support",
    isEnabled: false,
    runsCount: 0,
    requiredPlan: "agency",
  },
];

const CATEGORIES = ["All", "Sales", "Productivity", "Operations", "Communication", "Support"];

const Skills = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [customizeSkill, setCustomizeSkill] = useState<PrebuiltSkill | null>(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const navigate = useNavigate();
  const { isSubscribed, planTier, requireSubscription } = useSubscription();

  // Group skills by category
  const groupedSkills = useMemo(() => {
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

    return groups;
  }, [skills, selectedCategory]);

  const handleToggle = async (id: string) => {
    if (!requireSubscription("activate automations")) return;

    const skill = skills.find((s) => s.id === id);
    if (!skill) return;

    setTogglingId(id);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 400));

    const willBeEnabled = !skill.isEnabled;

    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isEnabled: willBeEnabled } : s))
    );

    if (willBeEnabled) {
      synthToast.skillEnabled(skill.name);
    } else {
      synthToast.skillDisabled(skill.name);
    }

    setTogglingId(null);
  };

  const handleCustomize = (skill: PrebuiltSkill) => {
    if (!requireSubscription("customize skills")) return;
    setCustomizeSkill(skill);
    setIsCustomizeOpen(true);
  };

  const handleSaveCustomization = (skill: PrebuiltSkill, updates: Partial<PrebuiltSkill>) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skill.id ? { ...s, ...updates } : s))
    );
  };

  const handleOpenChatForSkill = (skill: PrebuiltSkill) => {
    navigate("/app/chat", {
      state: {
        preloadedMessage: `I want to customize the "${skill.name}" skill. ${skill.description}`,
        fromSkills: true,
        skillName: skill.name,
      },
    });
  };

  const handleViewRuns = (skill: PrebuiltSkill) => {
    navigate("/app/executions", {
      state: {
        filterWorkflow: skill.name,
      },
    });
  };

  const enabledCount = skills.filter((s) => s.isEnabled).length;

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 space-y-8">
        {/* Subscription Banner */}
        {!isSubscribed && (
          <PageItem>
            <SubscriptionBanner feature="enable skills and automations" />
          </PageItem>
        )}

        {/* Header */}
        <PageItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              Prebuilt Skills
            </h1>
            <p className="text-muted-foreground mt-2 font-light">
              Turn on ready-made automations for your business.
            </p>
          </div>
          <Badge
            variant="outline"
            className="self-start px-4 py-2 border-primary/30 bg-primary/5 text-primary"
          >
            <ToggleLeft className="w-3.5 h-3.5 mr-1.5" />
            {enabledCount} Active
          </Badge>
        </PageItem>

        {/* Category Filters */}
        <PageItem>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "shrink-0 transition-all",
                  selectedCategory === category
                    ? "bg-primary hover:bg-primary/90"
                    : "border-border/50 hover:border-primary/30 hover:bg-primary/5"
                )}
              >
                {category}
              </Button>
            ))}
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
            <Card className="border-dashed border-2 border-border/50 bg-card/50">
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No Prebuilt Skills Available
                </h3>
                <p className="text-muted-foreground mb-6 font-light max-w-md mx-auto">
                  Your Synth account has no prebuilt skills yet. Create custom workflows in Chat.
                </p>
                <Button
                  onClick={() => navigate("/app/chat")}
                  className="bg-primary hover:bg-primary/90"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Create Custom Workflow
                </Button>
              </CardContent>
            </Card>
          </PageItem>
        ) : (
          /* Skills by Category */
          <TooltipProvider>
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <PageItem key={category} className="space-y-4">
                {/* Category Header */}
                {selectedCategory === "All" && (
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-foreground">{category}</h2>
                    <div className="h-px flex-1 bg-border/40" />
                    <Badge variant="secondary" className="text-xs">
                      {categorySkills.length} skill{categorySkills.length !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                )}

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {categorySkills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      isSubscribed={isSubscribed}
                      userPlan={planTier}
                      onToggle={handleToggle}
                      onCustomize={handleCustomize}
                      onViewRuns={handleViewRuns}
                      isToggling={togglingId === skill.id}
                    />
                  ))}
                </div>
              </PageItem>
            ))}
          </TooltipProvider>
        )}
      </PageTransition>

      {/* Customize Modal */}
      <SkillCustomizeModal
        skill={customizeSkill}
        open={isCustomizeOpen}
        onOpenChange={setIsCustomizeOpen}
        onSave={handleSaveCustomization}
        onOpenChat={handleOpenChatForSkill}
      />
    </AppShell>
  );
};

export default Skills;
