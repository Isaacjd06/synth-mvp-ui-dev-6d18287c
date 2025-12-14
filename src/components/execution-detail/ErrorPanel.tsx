import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorPanelProps {
  errorMessage: string;
  errorCode?: string;
  possibleCause: string;
  suggestedAction?: string;
  stackTrace?: string;
  onFixInChat?: () => void;
}

const ErrorPanel = ({
  errorMessage,
  errorCode,
  possibleCause,
  suggestedAction,
  stackTrace,
  onFixInChat,
}: ErrorPanelProps) => {
  const [isTechnicalExpanded, setIsTechnicalExpanded] = useState(false);

  return (
    <Card className="border-border/40">
      <CardHeader className="pb-3 px-5">
        <CardTitle className="text-base font-medium">What Went Wrong</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-4">
        {/* Error Message */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            Error {errorCode && <span className="font-mono">({errorCode})</span>}
          </p>
          <p className="text-sm text-foreground">{errorMessage}</p>
        </div>

        {/* Possible Cause */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Possible Cause</p>
          <p className="text-sm text-muted-foreground">{possibleCause}</p>
        </div>

        {/* Suggested Action */}
        {suggestedAction && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Suggested Action</p>
            <p className="text-sm text-muted-foreground">{suggestedAction}</p>
          </div>
        )}

        {/* Technical Details (collapsed by default) */}
        {stackTrace && (
          <div className="pt-2">
            <button
              onClick={() => setIsTechnicalExpanded(!isTechnicalExpanded)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {isTechnicalExpanded ? "Hide" : "Show"} technical details
            </button>
            <AnimatePresence>
              {isTechnicalExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <pre className="mt-3 p-4 rounded-lg bg-muted/30 border border-border/30 text-xs font-mono text-muted-foreground overflow-x-auto max-h-[160px] overflow-y-auto">
                    {stackTrace}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Fix in Chat */}
        {onFixInChat && (
          <div className="pt-2">
            <Button onClick={onFixInChat} size="sm">
              Fix in Chat
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorPanel;
