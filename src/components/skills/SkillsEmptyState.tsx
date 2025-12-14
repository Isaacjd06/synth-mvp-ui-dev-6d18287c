import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SkillsEmptyStateProps {
  onCreateSkill: () => void;
}

export const SkillsEmptyState = ({ onCreateSkill }: SkillsEmptyStateProps) => {
  return (
    <Card className="border-dashed border-2 border-border/50 bg-card/50">
      <CardContent className="py-16 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-3">
          Define Your First Skill
        </h3>
        
        <p className="text-muted-foreground mb-8 font-light max-w-md mx-auto text-sm leading-relaxed">
          Skills are reusable capabilities that teach Synth how to handle specific tasks. 
          Create a skill to unlock powerful, repeatable automations.
        </p>
        
        <Button
          onClick={onCreateSkill}
          size="lg"
          className="bg-primary hover:bg-primary/90"
        >
          Create Your First Skill
        </Button>
      </CardContent>
    </Card>
  );
};