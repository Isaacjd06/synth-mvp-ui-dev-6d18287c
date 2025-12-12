import { useState } from "react";
import { Lightbulb, ChevronDown, ChevronUp, ArrowRight, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const DashboardSuggestionCard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="relative overflow-hidden rounded-2xl border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="relative pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Synth Suggestion
                </CardTitle>
                <p className="text-sm text-muted-foreground font-light mt-0.5">
                  Based on your recent activity, Synth has identified a workflow improvement opportunity.
                </p>
              </div>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="pt-6 pb-6 relative space-y-5">
            <div className="p-5 rounded-xl bg-synth-surface-light/50 border border-border/40">
              <h4 className="text-base font-semibold text-foreground mb-2">
                Optimize Lead Response Time
              </h4>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Automating lead responses could reduce your average reply time by 73%.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button className="bg-primary hover:bg-primary/90 btn-synth">
                Apply
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                <MessageSquare className="w-4 h-4 mr-1.5" />
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
