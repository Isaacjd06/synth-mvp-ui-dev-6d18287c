import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type TabType = "Dashboard" | "Chat" | "Workflows";

const DashboardPreview = () => (
  <div className="space-y-4">
    {/* Stats Row */}
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: "Active Automations", value: "12" },
        { label: "Executions Today", value: "847" },
        { label: "Success Rate", value: "99.2%" },
      ].map((stat) => (
        <div key={stat.label} className="bg-[#111] rounded-lg p-4 border border-white/5">
          <p className="text-xs text-foreground/40 mb-1">{stat.label}</p>
          <p className="text-xl font-display-bold text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>

    {/* Activity Preview */}
    <div className="bg-[#111] rounded-lg p-4 border border-white/5">
      <p className="text-xs text-foreground/40 mb-3">Recent Activity</p>
      <div className="space-y-2">
        {[
          { name: "Lead capture workflow", status: "success", time: "2m ago" },
          { name: "Daily summary email", status: "success", time: "1h ago" },
          { name: "CRM sync automation", status: "running", time: "now" },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <span className="text-sm text-foreground/70">{item.name}</span>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-0.5 rounded ${
                item.status === "success" 
                  ? "bg-green-500/10 text-green-400" 
                  : "bg-yellow-500/10 text-yellow-400"
              }`}>
                {item.status}
              </span>
              <span className="text-xs text-foreground/40">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Advisory Preview */}
    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
      <p className="text-xs text-primary/70 mb-2">Synth Advisory</p>
      <p className="text-sm text-foreground/70">
        "Your email workflow has a 15% higher open rate on Tuesdays."
      </p>
    </div>
  </div>
);

const ChatPreview = () => (
  <div className="space-y-4">
    {/* Chat Messages */}
    <div className="space-y-3">
      {/* User Message */}
      <div className="flex justify-end">
        <div className="bg-primary/20 rounded-xl rounded-br-sm px-4 py-3 max-w-[85%]">
          <p className="text-sm text-foreground/90">
            Create a workflow that captures leads and sends them to HubSpot
          </p>
        </div>
      </div>

      {/* Synth Response */}
      <div className="flex justify-start">
        <div className="bg-[#111] border border-white/5 rounded-xl rounded-bl-sm px-4 py-3 max-w-[85%]">
          <p className="text-xs text-primary/70 mb-1.5">Synth</p>
          <p className="text-sm text-foreground/80">
            Got it. I'll capture the lead, enrich the data, sync it to HubSpot, and notify your team.
          </p>
        </div>
      </div>

      {/* Confirmation */}
      <div className="flex justify-start">
        <div className="bg-[#111] border border-green-500/20 rounded-xl rounded-bl-sm px-4 py-3 max-w-[85%]">
          <p className="text-xs text-green-400/80 mb-1.5">Workflow Created</p>
          <p className="text-sm text-foreground/70">
            Lead Intake → HubSpot is now active and ready to run.
          </p>
        </div>
      </div>
    </div>

    {/* Input Bar (non-functional) */}
    <div className="bg-[#111] rounded-lg border border-white/10 px-4 py-3 mt-4">
      <p className="text-sm text-foreground/30">Describe what you want to automate...</p>
    </div>
  </div>
);

const WorkflowsPreview = () => (
  <div className="space-y-2">
    <div className="bg-[#111] rounded-lg p-4 border border-white/5">
      <p className="text-xs text-foreground/40 mb-3">Your Workflows</p>
      <div className="space-y-1">
        {[
          { name: "Lead Intake → CRM", status: "Active", lastRun: "2 hours ago" },
          { name: "Daily Report Generator", status: "Active", lastRun: "6 hours ago" },
          { name: "Stripe Payment Notifier", status: "Active", lastRun: "1 day ago" },
          { name: "Slack Support Router", status: "Inactive", lastRun: "3 days ago" },
        ].map((workflow) => (
          <div 
            key={workflow.name} 
            className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground/80 truncate">{workflow.name}</p>
              <p className="text-xs text-foreground/40 mt-0.5">Last run: {workflow.lastRun}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ml-3 ${
              workflow.status === "Active" 
                ? "bg-green-500/10 text-green-400" 
                : "bg-foreground/5 text-foreground/40"
            }`}>
              {workflow.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const NewHeroSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Dashboard");

  const tabs: TabType[] = ["Dashboard", "Chat", "Workflows"];

  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Soft blue radial glow */}
      <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full opacity-30">
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 100% 50% / 0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="container relative z-10 px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:pr-8"
          >
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display-bold tracking-tight leading-[1.1] mb-6">
              <span className="block text-foreground">Your automations,</span>
              <span className="block text-foreground">managed like a system</span>
              <motion.span 
                className="block text-primary/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                — not a pile of zaps.
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-foreground/60 max-w-xl mb-6 leading-relaxed"
            >
              Synth turns your intent into automations, then monitors performance, 
              catches errors, and surfaces improvements — so your business runs smarter over time.
            </motion.p>

            {/* Micro-copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-foreground/40 mb-8 border-l-2 border-primary/30 pl-4"
            >
              <span className="font-medium text-foreground/60">What you get in 2 minutes:</span><br />
              Connect apps → describe automation → Synth builds → you monitor & improve
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-5"
            >
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-primary text-primary-foreground font-accent text-lg rounded-xl"
                  style={{
                    boxShadow: "0 0 40px hsl(217 100% 60% / 0.3), 0 8px 32px -8px hsl(217 100% 50% / 0.4)",
                  }}
                >
                  Start Free Trial
                </motion.button>
              </Link>
              <button
                  onClick={() => {
                    document.getElementById('product-tour')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 border border-white/10 text-foreground/80 font-accent text-lg rounded-xl hover:bg-white/5 transition-colors"
                >
                  See How It Works
                </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-foreground/40"
            >
              No credit card required.
            </motion.p>
          </motion.div>

          {/* Right Side - Product Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:pl-8"
          >
            <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
              {/* Tab Bar */}
              <div className="flex border-b border-white/10 bg-[#111]/50">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                      activeTab === tab 
                        ? "text-foreground" 
                        : "text-foreground/50 hover:text-foreground/70"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Preview Content */}
              <div className="p-6 min-h-[340px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "Dashboard" && <DashboardPreview />}
                    {activeTab === "Chat" && <ChatPreview />}
                    {activeTab === "Workflows" && <WorkflowsPreview />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Curved gradient transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path
            d="M0,80 L0,40 Q720,0 1440,40 L1440,80 Z"
            fill="url(#curveGradient)"
          />
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#080808" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default NewHeroSection;
