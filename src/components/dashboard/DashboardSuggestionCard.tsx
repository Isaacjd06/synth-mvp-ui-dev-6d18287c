import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DashboardSuggestionCardProps {
  isEmpty?: boolean;
}

const DashboardSuggestionCard = ({ isEmpty = false }: DashboardSuggestionCardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // Hidden empty state - will be shown when isEmpty is true (wired by backend later)
  if (isEmpty) {
    return (
      <Card className="hidden relative overflow-hidden rounded-2xl border-border/40 bg-gradient-to-br from-card via-card to-primary/5">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground font-light">Synth has no suggestions right now.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden rounded-2xl border-primary/15 bg-gradient-to-br from-card via-card to-primary/3">
      {/* Decorative glow - reduced intensity */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="relative pb-4 pt-6 px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium text-foreground">
              Synth Suggestion
            </CardTitle>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/60 hover:text-foreground">
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <CardContent className="pt-0 pb-6 px-6 relative space-y-5">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Based on your recent activity, Synth has identified a workflow improvement opportunity.
            </p>
            
            <div className="p-5 rounded-xl bg-muted/30 border border-border/30">
              <h4 className="text-sm font-medium text-foreground mb-1.5">
                Optimize Lead Response Time
              </h4>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Automating lead responses could reduce your average reply time by 73%.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Apply
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground/70 hover:text-foreground">
                Ask Synth
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default DashboardSuggestionCard;
