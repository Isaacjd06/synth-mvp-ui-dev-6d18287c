import { motion } from "framer-motion";
import { Lightbulb, Sparkles, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface NextSuggestionCardProps {
  suggestion?: {
    title: string;
    description: string;
    action: string;
  };
}

const defaultSuggestion = {
  title: "Optimize Lead Response Time",
  description: "Your lead intake workflow could respond 40% faster by adding a priority routing step. Would you like Synth to implement this?",
  action: "Add priority routing to lead intake workflow",
};

const NextSuggestionCard = ({ suggestion = defaultSuggestion }: NextSuggestionCardProps) => {
  const navigate = useNavigate();

  const handleApply = () => {
    toast.success("Applying optimization...");
    // In a real app, this would trigger the optimization
  };

  const handleAskSynth = () => {
    navigate(`/app/chat?suggestion=${encodeURIComponent(suggestion.action)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden relative">
        {/* Subtle glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <span className="text-gradient">Synth Suggestion</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-1">{suggestion.title}</h4>
            <p className="text-sm text-muted-foreground font-light">
              {suggestion.description}
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleApply} className="btn-synth gap-2">
              <Sparkles className="w-4 h-4" />
              Apply
            </Button>
            <Button variant="outline" onClick={handleAskSynth} className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Ask Synth
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NextSuggestionCard;
