import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Copy, Check, FileJson } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataViewerCardProps {
  title: string;
  data: Record<string, unknown>;
  defaultExpanded?: boolean;
}

const DataViewerCard = ({ title, data, defaultExpanded = false }: DataViewerCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-border/50 bg-card/60 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <FileJson className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-300",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <CardContent className="pt-0 px-4 pb-4">
              <div className="rounded-lg bg-[#0a0a0a] border border-border/30 overflow-hidden">
                <pre className="p-4 text-xs font-mono overflow-x-auto max-h-[300px] overflow-y-auto">
                  <code className="text-muted-foreground">
                    {jsonString.split('\n').map((line, i) => (
                      <div key={i} className="hover:bg-muted/10 px-1 -mx-1">
                        <span className="text-muted-foreground/50 select-none mr-4 inline-block w-6 text-right">
                          {i + 1}
                        </span>
                        <span dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/"([^"]+)":/g, '<span class="text-cyan-400">"$1"</span>:')
                            .replace(/: "([^"]+)"/g, ': <span class="text-green-400">"$1"</span>')
                            .replace(/: (\d+)/g, ': <span class="text-yellow-400">$1</span>')
                            .replace(/: (true|false)/g, ': <span class="text-purple-400">$1</span>')
                            .replace(/: (null)/g, ': <span class="text-red-400">$1</span>')
                        }} />
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default DataViewerCard;
