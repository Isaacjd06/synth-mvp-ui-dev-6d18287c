import { Zap, Clock, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TriggerCardProps {
  triggerType: string;
  triggerLabel: string;
  description: string;
  lastTriggered: string;
}

const TriggerCard = ({ triggerType, triggerLabel, description, lastTriggered }: TriggerCardProps) => {
  return (
    <Card className="border-primary/20 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            Trigger
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            {triggerType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Trigger Info */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Event
            </p>
            <p className="text-foreground font-medium">{triggerLabel}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Description
            </p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Configuration Placeholder */}
        <div className="p-4 rounded-lg bg-muted/30 border border-border/40 space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Configuration
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-md bg-background/50 border border-border/30">
              <p className="text-xs text-muted-foreground mb-1">Webhook URL</p>
              <p className="text-xs font-mono text-foreground truncate">
                https://api.synth.io/hooks/...
              </p>
            </div>
            <div className="p-3 rounded-md bg-background/50 border border-border/30">
              <p className="text-xs text-muted-foreground mb-1">Method</p>
              <p className="text-xs font-mono text-foreground">POST</p>
            </div>
          </div>
        </div>

        {/* Last Triggered */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Last triggered: <span className="text-foreground">{lastTriggered}</span>
          </div>
          <Button variant="ghost" size="sm" className="gap-2 text-xs">
            <Settings className="w-3 h-3" />
            Edit Trigger
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TriggerCard;
