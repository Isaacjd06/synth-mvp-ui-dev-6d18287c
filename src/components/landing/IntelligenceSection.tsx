import { motion } from "framer-motion";

const observes = [
  "Execution success and failure patterns",
  "Performance changes over time",
  "Bottlenecks, delays, and reliability issues",
  "Usage trends across workflows",
];

const actions = [
  "Alerts you when something breaks or degrades",
  "Suggests improvements and optimizations",
  "Highlights what's working unusually well",
  "Helps you make smarter decisions, faster",
];

const IntelligenceSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-[#0a0a10] to-[#060608]" />
      
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px]">
        <div 
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(ellipse, hsl(230 100% 50% / 0.04) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary/50 mb-5">
            Continuous Intelligence
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display-bold text-foreground mb-6 tracking-tight leading-tight">
            Synth watches how your systems behave —{" "}
            <span className="text-primary/80">and helps you improve them.</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/40 leading-relaxed max-w-2xl mx-auto">
            More than automation. Synth is an intelligence layer that observes, analyzes, and recommends — so your operations get smarter over time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Observes Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-xl bg-gradient-to-br from-[#0a0b0f] to-[#08090c] border border-white/[0.05] p-8 md:p-10 h-full">
              {/* Left accent line */}
              <div className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
              
              <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-6">
                Synth continuously observes
              </h3>
              <ul className="space-y-4">
                {observes.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex items-start gap-4"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2.5 flex-shrink-0" />
                    <span className="text-foreground/50 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Actions Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-xl bg-gradient-to-br from-[#0b0c12] to-[#08090c] border border-primary/10 p-8 md:p-10 h-full">
              {/* Left accent line */}
              <div className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
              
              <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-6">
                Then it
              </h3>
              <ul className="space-y-4">
                {actions.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-start gap-4"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mt-2.5 flex-shrink-0" />
                    <span className="text-foreground/55 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-foreground/30 text-base md:text-lg mt-12 max-w-xl mx-auto"
        >
          This isn't analytics. It's an intelligence layer for your operations.
        </motion.p>
      </div>
    </section>
  );
};

export default IntelligenceSection;