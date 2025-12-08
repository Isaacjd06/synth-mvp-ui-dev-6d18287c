import { useState, useRef, useEffect } from "react";
import AppShell from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      content: "I understand your request. Let me help you with that workflow. This is a simulated response — in production, Synth will provide intelligent guidance for building automations.",
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

  return (
    <AppShell>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* Page Header */}
        <div className="px-4 py-4 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Synth Chat</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your AI assistant for building workflows
          </p>
        </div>

        {/* Chat Messages Area */}
        <ScrollArea className="flex-1 px-4">
          <div className="max-w-2xl mx-auto py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground text-center">
                  Start chatting with Synth to build and refine workflows.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div
                    className={cn(
                      "p-3 rounded-lg max-w-[85%]",
                      message.role === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>

                  {/* Workflow action buttons - only for assistant messages */}
                  {message.role === "assistant" && (
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" size="sm">
                        Create Workflow From This
                      </Button>
                      <Button variant="outline" size="sm">
                        Modify Existing Workflow
                      </Button>
                      <Button variant="outline" size="sm">
                        Explain Workflow
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Thinking indicator */}
            {isLoading && (
              <div className="bg-muted p-3 rounded-lg max-w-[85%]">
                <p className="text-sm text-muted-foreground">Synth is thinking…</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input Area */}
        <div className="px-4 py-4 border-t border-border">
          <div className="max-w-2xl mx-auto flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Chat;
