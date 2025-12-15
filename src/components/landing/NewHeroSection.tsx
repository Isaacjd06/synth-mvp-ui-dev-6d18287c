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
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative lg:pl-4 xl:pl-8"
          >
            {/* Preview Container with strong perspective */}
            <div 
              className="relative"
              style={{
                perspective: "1200px",
                perspectiveOrigin: "20% 50%",
              }}
            >
              {/* Backplate shadow layer - sits behind the screen */}
              <div 
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{
                  transform: "rotateY(-18deg) rotateX(6deg) rotateZ(-1deg) translateZ(-40px) scale(1.05)",
                  background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)",
                  filter: "blur(30px)",
                }}
              />

              {/* Wide ambient glow behind preview */}
              <motion.div 
                className="absolute -inset-16 rounded-[40px] pointer-events-none"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: "radial-gradient(ellipse at 50% 40%, hsl(217 100% 50% / 0.2) 0%, hsl(217 100% 60% / 0.1) 30%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />

              {/* Secondary glow - adds depth */}
              <div 
                className="absolute -inset-12 rounded-3xl pointer-events-none opacity-30"
                style={{
                  background: "radial-gradient(ellipse at 70% 30%, hsl(217 100% 70% / 0.3) 0%, transparent 50%)",
                  filter: "blur(60px)",
                }}
              />

              {/* Animated Screen - Much larger and strongly angled */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ 
                    opacity: 0, 
                    rotateY: -14,
                    rotateX: 5,
                    rotateZ: -0.5,
                    scale: 0.94,
                    x: -30,
                    y: 10,
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: -18,
                    rotateX: 6,
                    rotateZ: -1,
                    scale: 1,
                    x: 0,
                    y: 0,
                  }}
                  exit={{ 
                    opacity: 0, 
                    rotateY: -22,
                    rotateX: 7,
                    rotateZ: -1.5,
                    scale: 0.94,
                    x: 30,
                    y: -10,
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.7 },
                  }}
                  className="relative rounded-2xl bg-[#0a0a0a] border border-white/[0.1] overflow-hidden w-full max-w-[680px]"
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: `
                      0 80px 150px -30px rgba(0, 0, 0, 0.9),
                      0 50px 80px -20px rgba(0, 0, 0, 0.7),
                      0 25px 40px -10px rgba(0, 0, 0, 0.5),
                      0 0 120px -30px hsl(217 100% 50% / 0.25),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.08)
                    `,
                  }}
                >
                  {/* Top edge highlight - reinforces angle */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 15%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.15) 70%, transparent 100%)",
                    }}
                  />

                  {/* Left edge highlight - shows the angle */}
                  <div 
                    className="absolute top-0 left-0 bottom-0 w-px pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                    }}
                  />

                  {/* Screen Header Bar */}
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.06] bg-[#111]/60">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                      <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                      <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                    </div>
                    <span className="text-xs text-foreground/30 ml-4 tracking-wide font-medium">{activeView}</span>
                  </div>

                  {/* Preview Content - Fixed Height, Much Larger */}
                  <div className="p-7 h-[520px] overflow-hidden">
                    {activeView === "Dashboard" && <DashboardPreview />}
                    {activeView === "Chat" && <ChatPreview />}
                    {activeView === "Workflows" && <WorkflowsPreview />}
                  </div>

                  {/* Internal ambient glows */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Realistic drop shadow beneath - perspective-aware */}
              <motion.div 
                className="absolute -bottom-12 left-[5%] w-[90%] h-20 rounded-[100%] pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)",
                  filter: "blur(25px)",
                  transform: "rotateX(60deg) translateZ(-30px)",
                }}
              />
              
              {/* Blue accent shadow - gives color to the depth */}
              <div 
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-16 rounded-[100%] opacity-60 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, hsl(217 100% 50% / 0.5) 0%, hsl(217 100% 60% / 0.2) 40%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
            </div>

            {/* Navigation Dots - closer to preview */}
            <div className="flex items-center justify-center gap-5 mt-8">
              {views.map((view, index) => (
                <button
                  key={view}
                  onClick={() => goTo(index)}
                  className="group relative p-2"
                  aria-label={`View ${view}`}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full transition-all duration-400 ${
                      activeIndex === index 
                        ? "bg-primary shadow-[0_0_16px_hsl(217_100%_50%/0.7)]" 
                        : "bg-white/20 group-hover:bg-white/40"
                    }`}
                    animate={{
                      scale: activeIndex === index ? 1.4 : 1,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
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
