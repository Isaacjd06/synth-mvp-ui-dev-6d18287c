import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Waitlist from "./pages/Waitlist";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/app/Dashboard";
import Chat from "./pages/app/Chat";
import Workflows from "./pages/app/Workflows";
import WorkflowDetail from "./pages/app/WorkflowDetail";
import Executions from "./pages/app/Executions";
import Billing from "./pages/app/Billing";
import BillingSettings from "./pages/app/BillingSettings";
import Checkout from "./pages/app/Checkout";
import Skills from "./pages/app/Skills";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SubscriptionProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="/app/chat" element={<Chat />} />
            <Route path="/app/workflows" element={<Workflows />} />
            <Route path="/app/workflows/:id" element={<WorkflowDetail />} />
            <Route path="/app/executions" element={<Executions />} />
            <Route path="/app/billing" element={<Billing />} />
            <Route path="/app/billing/settings" element={<BillingSettings />} />
            <Route path="/app/checkout" element={<Checkout />} />
            <Route path="/app/skills" element={<Skills />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SubscriptionProvider>
  </QueryClientProvider>
);

export default App;
