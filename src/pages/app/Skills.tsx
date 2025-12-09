import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, MessageSquare, PlaySquare, Zap, Mail, FileText, Bell, Users, ToggleLeft, ChevronRight } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface PrebuiltSkill {
  id: string;
  name: string;
  description: string;
  preview: string;
  icon: React.ElementType;
  category: string;
  isEnabled: boolean;
  runsCount: number;
}

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
  },
];

const Skills = () => {
  const [skills, setSkills] = useState(initialSkills);
  const navigate = useNavigate();

  const handleToggle = (id: string) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, isEnabled: !skill.isEnabled } : skill
      )
    );
  };

  const handleCustomizeInChat = (skill: PrebuiltSkill) => {
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

        {/* Empty State */}
        {skills.length === 0 ? (
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
          /* Skills Grid */
          <PageItem>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <Card 
                  key={skill.id}
                  className={`group relative overflow-hidden transition-all duration-300 hover:border-primary/30 ${
                    skill.isEnabled 
                      ? "bg-card border-primary/20" 
                      : "bg-card/50 border-border/50"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Status indicator */}
                  {skill.isEnabled && (
                    <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-primary/10 rounded-full blur-2xl" />
                  )}
                  
                  <CardContent className="p-5 space-y-4">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        skill.isEnabled 
                          ? "bg-primary/15 border border-primary/30" 
                          : "bg-muted/50 border border-border/50"
                      }`}>
                        <skill.icon className={`w-5 h-5 ${
                          skill.isEnabled ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                      <Switch
                        checked={skill.isEnabled}
                        onCheckedChange={() => handleToggle(skill.id)}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>

                    {/* Category & Status badges */}
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-secondary/50 text-secondary-foreground/80"
                      >
                        {skill.category}
                      </Badge>
                      {skill.isEnabled && (
                        <Badge 
                          className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        >
                          Active
                        </Badge>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-1.5">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light line-clamp-2">
                        {skill.description}
                      </p>
                    </div>

                    {/* Preview */}
                    <div className="px-3 py-2.5 rounded-lg bg-muted/30 border border-border/50">
                      <p className="text-xs text-muted-foreground font-mono">
                        {skill.preview}
                      </p>
                    </div>

                    {/* Stats */}
                    {skill.runsCount > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        <span>{skill.runsCount} executions</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCustomizeInChat(skill)}
                        className="flex-1 border-border/50 hover:border-primary/30 hover:bg-primary/5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                        Customize
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewRuns(skill)}
                        className="flex-1 hover:bg-muted/50"
                      >
                        <PlaySquare className="w-3.5 h-3.5 mr-1.5" />
                        View Runs
                        <ChevronRight className="w-3 h-3 ml-1 opacity-50" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </PageItem>
        )}
      </PageTransition>
    </AppShell>
  );
};

export default Skills;
