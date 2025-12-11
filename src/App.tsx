import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/app/Dashboard";
import Chat from "./pages/app/Chat";
import Workflows from "./pages/app/Workflows";
import WorkflowDetail from "./pages/app/WorkflowDetail";
import Executions from "./pages/app/Executions";
import ExecutionDetail from "./pages/app/ExecutionDetail";
import Connections from "./pages/app/Connections";
import Billing from "./pages/app/Billing";
import Skills from "./pages/app/Skills";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SubscriptionProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="/app/chat" element={<Chat />} />
            <Route path="/app/workflows" element={<Workflows />} />
            <Route path="/app/workflows/:id" element={<WorkflowDetail />} />
            <Route path="/app/executions" element={<Executions />} />
            <Route path="/app/executions/:id" element={<ExecutionDetail />} />
            <Route path="/app/connections" element={<Connections />} />
            <Route path="/app/billing" element={<Billing />} />
            <Route path="/app/skills" element={<Skills />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SubscriptionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
