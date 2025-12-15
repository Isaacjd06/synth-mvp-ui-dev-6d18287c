import { motion } from "framer-motion";

const features = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Your command center. See active automations, execution counts, activity levels, and reliability at a glance. Recent activity shows what's happening now. Synth Advisory surfaces insights and recommendations.",
    preview: {
      stats: ["12 Active", "847 Runs", "99.2% Success"],
      activity: "Lead captured → CRM updated",
      advisory: "Consider scheduling this workflow for mornings.",
    },
  },
  {
    id: "chat",
    title: "Chat",
    description: "The primary interface. Describe what you want to automate in plain English. Synth understands context and builds workflows from your requests. Quick actions help you create, modify, or get explanations.",
    preview: {
      input: "When I get a new lead email, add them to the CRM...",
      response: "I'll create a workflow that monitors your inbox...",
    },
  },
  {
    id: "workflows",
    title: "Workflows",
    description: "View automations Synth created. Toggle active/inactive. Open details to see triggers, steps, and configurations. This is observation first. Synth builds, you monitor.",
    preview: {
      workflows: [
        { name: "Lead Capture", status: "Active" },
        { name: "Daily Summary", status: "Active" },
        { name: "CRM Sync", status: "Inactive" },
      ],
    },
  },
  {
    id: "executions",
    title: "Executions",
    description: "Timeline of every workflow run. See status, duration, and timestamp. Drill into execution details to understand what happened step by step. Errors show exactly what broke.",
    preview: {
      executions: [
        { time: "2m ago", status: "Success", duration: "1.2s" },
        { time: "1h ago", status: "Success", duration: "0.8s" },
        { time: "3h ago", status: "Error", duration: "2.1s" },
      ],
    },
  },
  {
    id: "skills",
    title: "Skills",
    description: "Reusable capabilities you configure once. Define intent, inputs, and expected outputs. Skills keep your automations consistent and repeatable across your business.",
    preview: {
      skills: [
        { name: "Lead Qualification", category: "Sales" },
        { name: "Meeting Scheduler", category: "Productivity" },
      ],
    },
  },
  {
    id: "insights",
    title: "Insights",
    description: "Synth watches your automations and surfaces issues, performance opportunities, and reliability warnings. Filter by type. Take action directly from each insight.",
    preview: {
      insights: [
        { type: "warning", text: "Workflow hasn't run in 3 days" },
        { type: "suggestion", text: "Optimize email send timing" },
      ],
    },
  },
  {
    id: "connections",
    title: "Connections, handled automatically",
    description: "Synth automatically selects and connects the tools it needs to get work done. You don't browse integrations or manage setups. Synth handles that for you and only asks for access when required. If you ever want a different tool used, just tell Synth. It will adapt.",
    preview: {
      apps: ["Gmail", "Slack", "Notion", "HubSpot", "Stripe", "Google Sheets"],
      helperText: "Examples of tools Synth can work with",
    },
  },
];

const FeatureTourSection = () => {
  return (
    <section id="product-tour" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0a0a0a] to-[#080808]" />

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-primary/70 mb-4">Product Tour</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display-bold text-foreground mb-4">
            Everything you need, nothing you don't
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
            Each page in Synth serves a purpose. Here's what you'll find.
          </p>
        </motion.div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                i % 2 === 1 ? "md:grid-flow-dense" : ""
              }`}
            >
              {/* Content */}
              <div className={i % 2 === 1 ? "md:col-start-2" : ""}>
                <h3 className="text-2xl font-display text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Preview Card */}
              <div className={`rounded-2xl bg-[#111]/60 border border-white/5 p-6 ${
                i % 2 === 1 ? "md:col-start-1" : ""
              }`}>
                {feature.id === "dashboard" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {feature.preview.stats.map((stat) => (
                        <div key={stat} className="bg-[#0a0a0a] rounded-lg p-3 text-center">
                          <p className="text-sm font-medium text-foreground">{stat}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#0a0a0a] rounded-lg p-3">
                      <p className="text-xs text-foreground/40 mb-1">Recent</p>
                      <p className="text-sm text-foreground/70">{feature.preview.activity}</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                      <p className="text-xs text-primary/70 mb-1">Advisory</p>
                      <p className="text-sm text-foreground/70">{feature.preview.advisory}</p>
                    </div>
                  </div>
                )}

                {feature.id === "chat" && (
                  <div className="space-y-3">
                    <div className="bg-[#0a0a0a] rounded-lg p-3">
                      <p className="text-sm text-foreground/60">{feature.preview.input}</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <p className="text-xs text-primary/60 mb-1">Synth</p>
                      <p className="text-sm text-foreground/70">{feature.preview.response}</p>
                    </div>
                  </div>
                )}

                {feature.id === "workflows" && (
                  <div className="space-y-2">
                    {feature.preview.workflows.map((wf) => (
                      <div key={wf.name} className="flex items-center justify-between bg-[#0a0a0a] rounded-lg p-3">
                        <p className="text-sm text-foreground/70">{wf.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          wf.status === "Active" ? "bg-green-500/10 text-green-400" : "bg-white/5 text-foreground/40"
                        }`}>
                          {wf.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {feature.id === "executions" && (
                  <div className="space-y-2">
                    {feature.preview.executions.map((ex, j) => (
                      <div key={j} className="flex items-center justify-between bg-[#0a0a0a] rounded-lg p-3">
                        <span className="text-xs text-foreground/40">{ex.time}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          ex.status === "Success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                        }`}>
                          {ex.status}
                        </span>
                        <span className="text-xs text-foreground/40">{ex.duration}</span>
                      </div>
                    ))}
                  </div>
                )}

                {feature.id === "skills" && (
                  <div className="space-y-2">
                    {feature.preview.skills.map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between bg-[#0a0a0a] rounded-lg p-3">
                        <p className="text-sm text-foreground/70">{skill.name}</p>
                        <span className="text-xs text-foreground/40">{skill.category}</span>
                      </div>
                    ))}
                  </div>
                )}

                {feature.id === "insights" && (
                  <div className="space-y-2">
                    {feature.preview.insights.map((insight, j) => (
                      <div key={j} className={`rounded-lg p-3 ${
                        insight.type === "warning" ? "bg-yellow-500/5 border border-yellow-500/20" : "bg-blue-500/5 border border-blue-500/20"
                      }`}>
                        <p className={`text-xs mb-1 ${insight.type === "warning" ? "text-yellow-400/70" : "text-blue-400/70"}`}>
                          {insight.type}
                        </p>
                        <p className="text-sm text-foreground/70">{insight.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {feature.id === "connections" && (
                  <div className="space-y-3">
                    <p className="text-xs text-foreground/40">{feature.preview.helperText}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.preview.apps.map((app) => (
                        <span key={app} className="text-xs bg-[#0a0a0a] text-foreground/50 px-3 py-1.5 rounded border border-white/5">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureTourSection;
