import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AppShell from "@/components/app/AppShell";
import { PageTransition, PageItem } from "@/components/app/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import QuickActionsBar from "@/components/chat/QuickActionsBar";
import AutomationCreatedModal from "@/components/workflows/AutomationCreatedModal";
import SubscriptionBanner from "@/components/subscription/SubscriptionBanner";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { synthToast } from "@/lib/synth-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isWorkflowCreation?: boolean;
}

interface FixInChatContext {
  prefill?: string;
  workflowId?: string;
  executionId?: string;
  errorMessage?: string;
}

// Processing states for better UX feedback
type ProcessingState = "thinking" | "analyzing" | "generating" | "finalizing" | null;

const processingMessages: Record<string, string> = {
  thinking: "Synth is thinking...",
  analyzing: "Analyzing your request...",
  generating: "Generating workflow logic...",
  finalizing: "Finalizing automation...",
};

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSubscribed: contextSubscribed, requireSubscription } = useSubscription();
  
  // UI-ONLY: Temporary preview toggle (will be replaced by backend logic)
  const [isSubscribedPreview, setIsSubscribedPreview] = useState(true);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [processingState, setProcessingState] = useState<ProcessingState>(null);
  const [showAutomationModal, setShowAutomationModal] = useState(false);
  const [fixContext, setFixContext] = useState<FixInChatContext | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock workflow for modal
  const [createdWorkflow, setCreatedWorkflow] = useState({
    id: "new-1",
    name: "Lead Capture Automation",
    description: "Captures leads from forms and syncs them to your CRM with enrichment.",
    trigger: "New form submission received",
    actions: ["Enrich lead data", "Add to CRM", "Send notification"],
  });

  // Handle "Fix in Chat" entry from other pages
  useEffect(() => {
    const state = location.state as FixInChatContext | null;
    if (state?.prefill || state?.errorMessage) {
      setFixContext(state);
      if (state.prefill) {
        setInput(state.prefill);
      }
      // Clear the state from location
      navigate(location.pathname, { replace: true, state: null });
      // Focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    // Only scroll when there are messages to avoid initial scroll issues
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const simulateProcessingStates = async () => {
    const states: ProcessingState[] = ["thinking", "analyzing", "generating", "finalizing"];
    for (const state of states) {
      setProcessingState(state);
      await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));
    }
    setProcessingState(null);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    // Check if this is a workflow creation request
    const isWorkflowRequest = input.toLowerCase().includes("create") || 
                              input.toLowerCase().includes("workflow") ||
                              input.toLowerCase().includes("automation") ||
                              input.toLowerCase().includes("build");

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setFixContext(null); // Clear fix context after sending

    // Simulate AI processing with states
    await simulateProcessingStates();

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: isWorkflowRequest
        ? "I've analyzed your request and designed an automation that will handle this efficiently. The workflow includes data validation, enrichment, and notification steps. Would you like me to create this automation for you?"
        : "I understand your request. Let me help you with that. Based on what you've described, I can provide recommendations or set up an automation to handle this. What would you prefer?",
      timestamp: new Date(),
      isWorkflowCreation: isWorkflowRequest,
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
        inputRef.current?.focus();
        break;
      case "workflows":
        navigate("/app/workflows");
        break;
      case "followup":
        setInput("Set up automated follow-up reminders for ");
        inputRef.current?.focus();
        break;
      case "summary":
        setInput("Build a daily summary report that ");
        inputRef.current?.focus();
        break;
      case "reset":
        setMessages([]);
        setFixContext(null);
        synthToast.success("Conversation Cleared", "Start fresh with a new chat.");
        break;
    }
  };

  const handleCreateWorkflow = () => {
    // Check subscription before creating workflow
    if (!requireSubscription("create automations")) return;
    
    // Generate a dynamic workflow based on conversation
    const latestUserMessage = [...messages].reverse().find(m => m.role === "user");
    setCreatedWorkflow({
      id: `wf-${Date.now()}`,
      name: latestUserMessage?.content.slice(0, 30) + "..." || "New Automation",
      description: "AI-generated workflow based on your conversation with Synth.",
      trigger: "Custom trigger configured",
      actions: ["Process input", "Execute logic", "Send notification"],
    });
    setShowAutomationModal(true);
  };

  const dismissFixContext = () => {
    setFixContext(null);
    setInput("");
  };

  return (
    <AppShell>
      <div className="h-[calc(100vh-4rem)] flex flex-col relative">
        {/* DEV-ONLY Toggle */}
        <div className="px-4 pt-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between rounded-lg border border-dashed border-amber-500/40 bg-amber-500/5 px-4 py-2.5">
            <span className="text-xs font-medium text-amber-400/80 uppercase tracking-wide">
              DEV: isSubscribedPreview
            </span>
            <div className="flex items-center gap-3">
              <span className={cn("text-xs", isSubscribedPreview ? "text-muted-foreground/50" : "text-foreground/80")}>
                False
              </span>
              <Switch 
                checked={isSubscribedPreview} 
                onCheckedChange={setIsSubscribedPreview}
                className="data-[state=checked]:bg-primary"
              />
              <span className={cn("text-xs", isSubscribedPreview ? "text-foreground/80" : "text-muted-foreground/50")}>
                True
              </span>
            </div>
          </div>
        </div>

        {/* GATED OVERLAY - When not subscribed */}
        {!isSubscribedPreview && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-[1px]">
            <Card className="max-w-md w-full mx-4 border-border/50 bg-card shadow-xl">
              <CardContent className="p-8 text-center space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-foreground tracking-tight mb-2">
                    Unlock Synth Chat
                  </h2>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">
                    Chat is available on an active subscription. Upgrade to start creating automations with Synth.
                  </p>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11"
                  onClick={() => navigate("/app/billing")}
                >
                  Upgrade to Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SUBSCRIBED STATE - Full Chat Experience */}
            {/* Fix in Chat Context Banner */}
            <AnimatePresence>
              {fixContext && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 border-b border-amber-500/30 bg-amber-500/10"
                >
                  <div className="py-3 flex items-center justify-between max-w-2xl mx-auto">
                    <div>
                      <p className="text-sm font-medium text-amber-200">Fix Requested</p>
                      <p className="text-xs text-amber-300/70">
                        {fixContext.executionId
                          ? `Execution #${fixContext.executionId}`
                          : fixContext.workflowId
                          ? `Workflow #${fixContext.workflowId}`
                          : "Error analysis loaded"}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={dismissFixContext}
                      className="text-amber-300 hover:text-amber-100 hover:bg-amber-500/20"
                    >
                      Dismiss
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Page Header */}
            <div className="px-4 pt-6 pb-4">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-lg font-semibold text-foreground tracking-tight">Synth Chat</h1>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Describe what you want to automate. Synth will handle the rest.
                </p>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-4 border-b border-border/30">
              <QuickActionsBar onAction={handleQuickAction} />
            </div>

            {/* Chat Messages Area */}
            <ScrollArea className="flex-1 px-4">
              <div className="max-w-2xl mx-auto py-8 space-y-6">
                <AnimatePresence mode="popLayout">
                  {messages.length === 0 ? (
                    <motion.div 
                      className="flex flex-col items-center justify-center h-72 text-center px-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="text-xl font-medium text-foreground mb-3 tracking-tight">
                        Start a conversation
                      </p>
                      <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                        Describe the automation you need, and Synth will design and build it for you.
                      </p>
                      
                      {/* Example prompts */}
                      <div className="mt-8 space-y-3 text-left max-w-md w-full">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground/50 font-medium">Try something like</p>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed">
                          "Create a workflow to capture leads and send them to my CRM"
                        </p>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed">
                          "Automate daily reports and send them to Slack"
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    messages.map((message) => (
                      <motion.div 
                        key={message.id} 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Message Bubble */}
                        <div
                          className={cn(
                            "p-4 rounded-2xl max-w-[85%] transition-all duration-300",
                            message.role === "user"
                              ? "ml-auto bg-primary text-primary-foreground shadow-[0_4px_20px_-5px_hsl(217_100%_60%/0.4)]"
                              : "bg-card/90 text-foreground border border-border/60 shadow-sm"
                          )}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          {/* Timestamp */}
                          <div className={cn(
                            "mt-2 text-[10px]",
                            message.role === "user" 
                              ? "text-primary-foreground/60 text-right" 
                              : "text-muted-foreground/60"
                          )}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>

                        {/* Workflow action buttons - only for assistant workflow messages */}
                        {message.role === "assistant" && (
                          <motion.div 
                            className="flex gap-2 flex-wrap pl-1"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.3 }}
                          >
                            {message.isWorkflowCreation && (
                              <Button 
                                size="sm" 
                                onClick={handleCreateWorkflow}
                                className="btn-synth"
                              >
                                Create This Workflow
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="text-xs">
                              Modify Request
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs">
                              Explain More
                            </Button>
                          </motion.div>
                        )}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>

                {/* Processing/Thinking Indicator */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div 
                      className="bg-card/90 p-4 rounded-2xl max-w-[85%] border border-border/60 shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium">
                          {processingState ? processingMessages[processingState] : "Processing..."}
                        </p>
                        {/* Progress Steps */}
                        <div className="flex items-center gap-1.5 mt-2">
                          {["thinking", "analyzing", "generating", "finalizing"].map((step, index) => (
                            <motion.div
                              key={step}
                              className={cn(
                                "h-1 rounded-full transition-all duration-300",
                                step === processingState
                                  ? "w-6 bg-primary"
                                  : processingState && 
                                    ["thinking", "analyzing", "generating", "finalizing"].indexOf(processingState) > index
                                  ? "w-4 bg-primary/50"
                                  : "w-4 bg-muted"
                              )}
                              animate={step === processingState ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 0.5, repeat: Infinity }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input Area */}
            <div className="px-4 py-5 border-t border-border/40 bg-background/95">
              <div className="max-w-2xl mx-auto flex gap-3">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={fixContext ? "Describe how to fix this issue..." : "Describe the automation you want Synth to build…"}
                  disabled={isLoading}
                  className="flex-1 bg-muted/20 border-border/40 focus:border-primary/40 focus:ring-0 transition-colors h-12 text-sm"
                />
                <Button 
                  onClick={handleSend} 
                  disabled={isLoading || !input.trim()}
                  className="h-12 px-6 bg-primary/90 hover:bg-primary text-primary-foreground font-medium"
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