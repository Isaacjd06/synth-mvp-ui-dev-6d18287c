import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type ViewType = "Dashboard" | "Chat" | "Workflows";

const DashboardPreview = () => (
  <div className="space-y-4 h-full">
    {/* Stats Row */}
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: "Active Automations", value: "12" },
        { label: "Executions Today", value: "847" },
        { label: "Success Rate", value: "99.2%" },
      ].map((stat) => (
        <div key={stat.label} className="bg-[#111] rounded-lg p-3 border border-white/5">
          <p className="text-[10px] text-foreground/40 mb-1">{stat.label}</p>
          <p className="text-lg font-display-bold text-foreground">{stat.value}</p>
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
  <div className="flex flex-col h-full">
    {/* Chat Messages */}
    <div className="space-y-3 flex-1">
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
  <div className="h-full">
    <div className="bg-[#111] rounded-lg p-4 border border-white/5 h-full">
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

const views: ViewType[] = ["Dashboard", "Chat", "Workflows"];

const NewHeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    if (index >= 0 && index < views.length) {
      setActiveIndex(index);
    }
  };

  const activeView = views[activeIndex];

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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content (unchanged) */}
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

          {/* Right Side - Animated System Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:pl-12"
          >
            {/* Preview Container with perspective */}
            <div 
              className="relative"
              style={{
                perspective: "1200px",
              }}
            >
              {/* Animated Screen */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ 
                    opacity: 0, 
                    rotateY: -2,
                    rotateX: 1,
                    x: -10,
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: -4,
                    rotateX: 2,
                    x: 0,
                  }}
                  exit={{ 
                    opacity: 0, 
                    rotateY: -6,
                    rotateX: 3,
                    x: 10,
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden"
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 60px -15px hsl(217 100% 50% / 0.15)",
                  }}
                >
                  {/* Screen Header Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#111]/50">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    </div>
                    <span className="text-xs text-foreground/30 ml-2">{activeView}</span>
                  </div>

                  {/* Preview Content - Fixed Height */}
                  <div className="p-5 h-[380px] overflow-hidden">
                    {activeView === "Dashboard" && <DashboardPreview />}
                    {activeView === "Chat" && <ChatPreview />}
                    {activeView === "Workflows" && <WorkflowsPreview />}
                  </div>

                  {/* Subtle internal glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/8 rounded-full blur-[80px] pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Soft shadow beneath */}
              <div 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 rounded-full blur-xl opacity-40"
                style={{
                  background: "radial-gradient(ellipse, hsl(217 100% 50% / 0.3) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {views.map((view, index) => (
                <button
                  key={view}
                  onClick={() => goTo(index)}
                  className="group relative p-2"
                  aria-label={`View ${view}`}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      activeIndex === index 
                        ? "bg-primary" 
                        : "bg-white/20 group-hover:bg-white/40"
                    }`}
                    animate={{
                      scale: activeIndex === index ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
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
