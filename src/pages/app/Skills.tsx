import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, PlaySquare, Zap, Mail, FileText, Bell, Users } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface PrebuiltSkill {
  id: string;
  name: string;
  description: string;
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
    icon: Users,
    category: "Sales",
    isEnabled: true,
    runsCount: 142,
  },
  {
    id: "2",
    name: "Email Summary Digest",
    description: "Summarize important emails and send daily/weekly digest notifications.",
    icon: Mail,
    category: "Productivity",
    isEnabled: false,
    runsCount: 0,
  },
  {
    id: "3",
    name: "Document Processing",
    description: "Extract data from uploaded documents and organize in spreadsheets.",
    icon: FileText,
    category: "Operations",
    isEnabled: true,
    runsCount: 89,
  },
  {
    id: "4",
    name: "Slack Alert Router",
    description: "Route alerts and notifications to appropriate Slack channels based on content.",
    icon: Bell,
    category: "Communication",
    isEnabled: false,
    runsCount: 0,
  },
  {
    id: "5",
    name: "Meeting Notes Generator",
    description: "Automatically generate and distribute meeting notes from recordings.",
    icon: FileText,
    category: "Productivity",
    isEnabled: true,
    runsCount: 34,
  },
  {
    id: "6",
    name: "Support Ticket Classifier",
    description: "Classify and route support tickets based on urgency and category.",
    icon: Users,
    category: "Support",
    isEnabled: false,
    runsCount: 0,
  },
];

const Skills = () => {
  const [skills, setSkills] = useState(initialSkills);

  const handleToggle = (id: string) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, isEnabled: !skill.isEnabled } : skill
      )
    );
  };

  const enabledCount = skills.filter((s) => s.isEnabled).length;

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 space-y-8">
        {/* Header */}
        <PageItem className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gradient synth-header flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              Prebuilt Skills
            </h1>
            <p className="text-muted-foreground mt-2 font-light">
              Ready-to-use automations. Enable, customize, and let Synth handle the rest.
            </p>
          </div>
          <Badge variant="outline" className="self-start px-3 py-1.5">
            {enabledCount} Active
          </Badge>
        </PageItem>

        {/* Empty State */}
        {skills.length === 0 ? (
          <PageItem>
            <Card className="border-dashed border-2">
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground mb-6 font-light">
                  No prebuilt skills available yet. Check back soon or create custom workflows.
                </p>
                <Button asChild className="btn-synth">
                  <Link to="/app/chat">Create Custom Workflow</Link>
                </Button>
              </CardContent>
            </Card>
          </PageItem>
        ) : (
          /* Skills Grid */
          <PageItem>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full group hover:border-primary/30 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <skill.icon className="w-5 h-5 text-primary" />
                        </div>
                        <Switch
                          checked={skill.isEnabled}
                          onCheckedChange={() => handleToggle(skill.id)}
                          className="data-[state=checked]:bg-primary"
                        />
                      </div>
                      <div className="pt-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {skill.category}
                          </Badge>
                          {skill.isEnabled && (
                            <Badge variant="success" className="text-xs">
                              Active
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-base">{skill.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground font-light line-clamp-2">
                        {skill.description}
                      </p>

                      {skill.runsCount > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Zap className="w-3 h-3" />
                          {skill.runsCount} runs
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <Link to="/app/chat" className="flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5" />
                            Customize
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild className="flex-1">
                          <Link to="/app/executions" className="flex items-center gap-1.5">
                            <PlaySquare className="w-3.5 h-3.5" />
                            View Runs
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </PageItem>
        )}
      </PageTransition>
    </AppShell>
  );
};

export default Skills;
