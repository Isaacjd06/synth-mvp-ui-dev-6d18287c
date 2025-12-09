import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Play, MessageSquare, Zap, Mail, FileText, Bell, Users, Calendar, Database } from "lucide-react";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const prebuiltSkills = [
  {
    id: "email-to-crm",
    name: "Email Lead Capture",
    description: "Automatically capture leads from emails and add them to your CRM",
    icon: Mail,
    category: "Sales",
    enabled: true,
    runs: 156,
  },
  {
    id: "invoice-processor",
    name: "Invoice Processor",
    description: "Extract data from invoices and create accounting entries",
    icon: FileText,
    category: "Finance",
    enabled: false,
    runs: 0,
  },
  {
    id: "slack-notifications",
    name: "Smart Notifications",
    description: "Route important messages to the right Slack channels",
    icon: Bell,
    category: "Communication",
    enabled: true,
    runs: 423,
  },
  {
    id: "customer-onboarding",
    name: "Customer Onboarding",
    description: "Automate welcome emails and setup tasks for new customers",
    icon: Users,
    category: "Customer Success",
    enabled: false,
    runs: 0,
  },
  {
    id: "meeting-scheduler",
    name: "Meeting Scheduler",
    description: "Coordinate calendars and schedule meetings automatically",
    icon: Calendar,
    category: "Productivity",
    enabled: true,
    runs: 89,
  },
  {
    id: "data-sync",
    name: "Database Sync",
    description: "Keep your databases synchronized across multiple platforms",
    icon: Database,
    category: "Data",
    enabled: false,
    runs: 0,
  },
];

const Skills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(prebuiltSkills);

  const handleToggle = (skillId: string) => {
    setSkills(prev => 
      prev.map(skill => 
        skill.id === skillId 
          ? { ...skill, enabled: !skill.enabled }
          : skill
      )
    );
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      toast.success(skill.enabled ? `${skill.name} deactivated` : `${skill.name} activated`);
    }
  };

  const handleCustomize = (skillId: string) => {
    navigate(`/app/chat?skill=${skillId}`);
  };

  const handleViewRuns = (skillId: string) => {
    navigate(`/app/executions?skill=${skillId}`);
  };

  return (
    <AppShell>
      <PageTransition className="px-4 lg:px-6 py-8 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <PageItem>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-gradient synth-header">
                Prebuilt Skills
              </h1>
              <p className="text-muted-foreground mt-1 font-light">
                Ready-to-use automations. Enable, customize, or view their activity.
              </p>
            </div>
          </div>
        </PageItem>

        {/* Empty State Check */}
        {skills.length === 0 ? (
          <PageItem>
            <Card className="border-dashed border-2">
              <CardContent className="py-16 text-center">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4 font-light">
                  No prebuilt skills available yet. Check back soon for new automations.
                </p>
              </CardContent>
            </Card>
          </PageItem>
        ) : (
          /* Skills Grid */
          <PageItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <skill.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{skill.name}</h3>
                            <Badge variant="secondary" className="mt-1 text-[10px]">
                              {skill.category}
                            </Badge>
                          </div>
                        </div>
                        <Switch 
                          checked={skill.enabled} 
                          onCheckedChange={() => handleToggle(skill.id)}
                        />
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {skill.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Zap className="w-3 h-3" />
                          <span>{skill.runs} runs</span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewRuns(skill.id)}
                            disabled={skill.runs === 0}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            View Runs
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCustomize(skill.id)}
                          >
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Customize
                          </Button>
                        </div>
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
