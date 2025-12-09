import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import QuickActionsBar from "@/components/chat/QuickActionsBar";
import AutomationCreatedModal from "@/components/workflows/AutomationCreatedModal";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAutomationModal, setShowAutomationModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock workflow for modal
  const [createdWorkflow] = useState({
    id: "new-1",
    name: "Lead Capture Automation",
    description: "Captures leads from forms and syncs them to your CRM with enrichment.",
    trigger: "New form submission received",
    actions: ["Enrich lead data", "Add to CRM", "Send notification"],
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1500));

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "I understand your request. Let me help you design that automation. Based on your description, I can configure a workflow that handles this efficiently. Would you like me to proceed with the implementation?",
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "create":
        setInput("Create a new workflow that ");
        break;
      case "summarize":
        setInput("Summarize my recent workflow activity");
        break;
      case "optimize":
        setInput("Suggest optimizations for my workflows");
        break;
      case "reset":
        setMessages([]);
        toast.info("Conversation cleared");
        break;
    }
  };

  const handleCreateWorkflow = () => {
    setShowAutomationModal(true);
    toast.success("Workflow created successfully!");
  };

  return (
    <AppShell>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* Page Header */}
        <PageTransition className="px-4 py-5 border-b border-border/50">
          <PageItem>
            <h1 className="text-2xl font-display font-bold text-gradient">Synth Chat</h1>
            <p className="text-sm text-muted-foreground mt-1 font-light">
              Your intelligent automation assistant
            </p>
          </PageItem>
        </PageTransition>

        {/* Quick Actions Bar */}
        <div className="px-4 border-b border-border/30">
          <QuickActionsBar onAction={handleQuickAction} />
        </div>

        {/* Chat Messages Area */}
        <ScrollArea className="flex-1 px-4">
          <div className="max-w-2xl mx-auto py-6 space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.length === 0 ? (
                <motion.div 
                  className="flex items-center justify-center h-64"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-muted-foreground text-center font-light">
                    Describe your workflow, and Synth will build it for you.
                  </p>
                </motion.div>
              ) : (
                messages.map((message, index) => (
                  <motion.div 
                    key={message.id} 
                    className="space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <div
                      className={cn(
                        "p-4 rounded-xl max-w-[85%] transition-all duration-300",
                        message.role === "user"
                          ? "ml-auto bg-primary text-primary-foreground shadow-[0_0_20px_-5px_hsl(217_100%_60%/0.3)]"
                          : "bg-muted/50 text-foreground border border-border/30 backdrop-blur-sm"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>

                    {/* Workflow action buttons - only for assistant messages */}
                    {message.role === "assistant" && (
                      <motion.div 
                        className="flex gap-2 flex-wrap"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <Button variant="outline" size="sm" onClick={handleCreateWorkflow}>
                          Create Workflow From This
                        </Button>
                        <Button variant="outline" size="sm">
                          Modify Existing Workflow
                        </Button>
                        <Button variant="outline" size="sm">
                          Explain Workflow
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {/* Thinking indicator */}
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  className="bg-muted/50 p-4 rounded-xl max-w-[85%] border border-border/30 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-light">Synth is thinking</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-thinking-dot" style={{ animationDelay: "0s" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-thinking-dot" style={{ animationDelay: "0.2s" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-thinking-dot" style={{ animationDelay: "0.4s" }} />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input Area */}
        <div className="px-4 py-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your automation..."
              disabled={isLoading}
              className="flex-1 bg-muted/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
            />
            <Button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              className="btn-synth"
            >
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Automation Created Modal */}
      <AutomationCreatedModal
        open={showAutomationModal}
        onOpenChange={setShowAutomationModal}
        workflow={createdWorkflow}
      />
    </AppShell>
  );
};

export default Chat;