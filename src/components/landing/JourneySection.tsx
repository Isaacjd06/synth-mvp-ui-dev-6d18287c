import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Connect your tools",
    description: "Link Slack, Gmail, Google Sheets, CRM, and 40+ other apps. All integrations available on every plan.",
  },
  {
    number: "2",
    title: "Tell Synth what you want",
    description: "\"Capture new leads from email and add them to my CRM with a Slack notification.\" That's all you say.",
  },
  {
    number: "3",
    title: "Synth sets it up",
    description: "Your workflow is created instantly. See the trigger, steps, and logic — all visible and editable.",
  },
  {
    number: "4",
    title: "You monitor results",
    description: "Watch executions in real-time. See successes, failures, and runtime. Know exactly what's happening.",
  },
  {
    number: "5",
    title: "You improve over time",
    description: "Synth surfaces insights and suggestions. Optimize performance, fix issues, and refine your automations.",
  },
];

const JourneySection = () => {
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-primary/70 mb-4">The Experience</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display-bold text-foreground mb-4">
            How it feels to use Synth
          </h2>
          <p className="text-lg text-foreground/50 max-w-xl mx-auto">
            From first connection to ongoing optimization — here's the journey.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div className="absolute left-6 top-14 w-px h-[calc(100%-3.5rem)] bg-gradient-to-b from-primary/30 to-transparent" />
              )}

              {/* Number */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-lg font-display-bold text-primary">{step.number}</span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-xl font-display text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-foreground/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
