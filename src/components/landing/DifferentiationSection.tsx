import { motion } from "framer-motion";

const differentiators = [
  {
    title: "Intent → Automation",
    description: "Describe what you want in plain English. Synth interprets your request and builds a complete automation plan — no manual wiring required.",
  },
  {
    title: "Runs + Reliability",
    description: "Every execution is tracked. See what happened, when, how long it took, and whether it succeeded or failed. No more mystery workflows.",
  },
  {
    title: "Guided Fixes",
    description: "When something breaks, Synth shows you exactly what went wrong and where. Jump to Chat to get help fixing the issue.",
  },
  {
    title: "Skills = Reusable Capabilities",
    description: "Package automations as Skills — configurable, repeatable capabilities that maintain consistency across your business operations.",
  },
];

const DifferentiationSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0a0a0a] to-[#080808]" />
      
      {/* Subtle glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] -translate-y-1/2 rounded-full opacity-20">
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 100% 50% / 0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display-bold text-foreground mb-4">
            What makes Synth different
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
            Not just an automation tool. Not just a chatbot. Synth is both — 
            an AI interface that builds automations and helps you manage them over time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl bg-[#111]/60 border border-white/5 p-8 hover:border-primary/20 transition-colors duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-display text-foreground mb-3 group-hover:text-primary/90 transition-colors">
                  {item.title}
                </h3>
                <p className="text-foreground/50 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;
