import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TriggerCardProps {
  triggerType: string;
  triggerLabel: string;
  description: string;
  lastTriggered: string;
}

const TriggerCard = ({ triggerType, triggerLabel, description, lastTriggered }: TriggerCardProps) => {
  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trigger
          </CardTitle>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
            {triggerType}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trigger Info */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Event</p>
            <p className="text-sm text-foreground font-medium">{triggerLabel}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">What happens</p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Configuration */}
        <div className="p-3 rounded-md bg-muted/20 border border-border/30 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Configuration
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-background/30 border border-border/20">
              <p className="text-xs text-muted-foreground mb-0.5">Webhook URL</p>
              <p className="text-xs font-mono text-foreground truncate">
                https://api.synth.io/hooks/...
              </p>
            </div>
            <div className="p-2 rounded bg-background/30 border border-border/20">
              <p className="text-xs text-muted-foreground mb-0.5">Method</p>
              <p className="text-xs font-mono text-foreground">POST</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <span className="text-xs text-muted-foreground">
            Last triggered: <span className="text-foreground">{lastTriggered}</span>
          </span>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground h-7">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TriggerCard;
