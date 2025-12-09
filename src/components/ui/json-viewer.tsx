import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface JsonViewerProps {
  data: Record<string, unknown> | null;
  title?: string;
  className?: string;
  defaultExpanded?: boolean;
}

const JsonViewer = ({ data, title, className, defaultExpanded = false }: JsonViewerProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-lg border border-border/50 overflow-hidden", className)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title || "Data"}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className="h-6 px-2"
          >
            {copied ? (
              <Check className="w-3 h-3 text-status-success" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <pre className="p-4 bg-muted/10 text-xs font-mono text-foreground/80 overflow-x-auto max-h-64 overflow-y-auto">
              {jsonString}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JsonViewer;
