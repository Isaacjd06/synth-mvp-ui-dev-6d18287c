import { AlertTriangle, MessageSquare, Bug, FileWarning } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ErrorPanelProps {
  errorMessage: string;
  errorCode?: string;
  possibleCause: string;
  stackTrace?: string;
  onFixInChat?: () => void;
}

const ErrorPanel = ({
  errorMessage,
  errorCode,
  possibleCause,
  stackTrace,
  onFixInChat,
}: ErrorPanelProps) => {
  return (
    <Card className="border-red-500/30 bg-red-500/5 overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2 text-red-400">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          Error Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Error Message */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Error Message
            </p>
            {errorCode && (
              <Badge variant="outline" className="text-[10px] border-red-500/30 text-red-400 bg-red-500/10">
                {errorCode}
              </Badge>
            )}
          </div>
          <p className="text-sm text-red-400 font-medium leading-relaxed">
            {errorMessage}
          </p>
        </div>

        {/* Possible Cause */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Bug className="w-3 h-3" />
            Possible Cause
          </p>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            {possibleCause}
          </p>
        </div>

        {/* Stack Trace */}
        {stackTrace && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <FileWarning className="w-3 h-3" />
              Stack Trace
            </p>
            <pre className="p-4 rounded-lg bg-[#0a0a0a] border border-red-500/20 text-xs font-mono text-muted-foreground overflow-x-auto max-h-[180px] overflow-y-auto">
              {stackTrace}
            </pre>
          </div>
        )}

        {/* Fix in Chat Button */}
        {onFixInChat && (
          <Button onClick={onFixInChat} className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Fix in Chat
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorPanel;
