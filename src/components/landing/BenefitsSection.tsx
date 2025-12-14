import { motion } from "framer-motion";

const BenefitsSection = () => {
  return (
    <section id="features" className="py-28 md:py-36 relative overflow-hidden">
      {/* Layered background with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040406] via-[#08080c] to-[#050508]" />
      
      {/* Radial glow - primary */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px]">
        <div 
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(ellipse, hsl(217 100% 50% / 0.05) 0%, transparent 65%)",
          }}
        />
      </div>
      
      {/* Secondary accent glow */}
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px]">
        <div 
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, hsl(230 100% 60% / 0.03) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display-bold text-foreground mb-6 tracking-tight">
            Why businesses choose <span className="text-primary/90">Synth</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/40 max-w-2xl mx-auto leading-relaxed">
            A thinking system that builds, monitors, and improves your operations — automatically.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Primary Card - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative mb-8"
          >
            <div className="relative rounded-2xl overflow-hidden transition-all duration-300 ease-out bg-gradient-to-br from-[#0c0d14] via-[#10111a] to-[#0a0b10] border-l-2 border-l-primary/40 border border-primary/10 shadow-[0_0_80px_-20px_hsl(217_100%_50%_/_0.1)] group-hover:shadow-[0_8px_60px_-15px_hsl(217_100%_50%_/_0.18)] group-hover:-translate-y-1">
              {/* Top edge glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-48 h-48 opacity-50">
                <div 
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle at top right, hsl(217 100% 50% / 0.06) 0%, transparent 70%)",
                  }}
                />
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />
              </div>

              <div className="relative z-10 p-10 md:p-14 lg:p-16">
                <h3 className="text-2xl md:text-3xl lg:text-[2.25rem] font-display font-semibold text-foreground mb-5 tracking-tight transition-colors duration-200 group-hover:text-primary/95">
                  Build workflows automatically — from intent
                </h3>
                <p className="text-lg md:text-xl text-foreground/50 leading-relaxed max-w-3xl mb-6">
                  Tell Synth what needs to happen in plain language. It designs the workflow, configures logic, connects services, and deploys execution — without drag-and-drop or manual setup.
                </p>
                <p className="text-base md:text-lg text-primary/60 font-medium">
                  Synth doesn't just build automations. It understands why they exist.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Secondary Cards Row */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Understands your business context",
                description: "Synth learns from your workflows, usage patterns, and decisions. Over time, it adapts automations to better match how your business actually operates."
              },
              {
                title: "Monitors everything in real time",
                description: "Every execution, error, delay, and performance shift is tracked automatically. No digging through logs. No blind spots."
              },
              {
                title: "Insights that drive improvement",
                description: "Synth surfaces issues, inefficiencies, and opportunities proactively — so you improve systems instead of just maintaining them."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                className="group relative"
              >
                <div className="relative h-full rounded-xl overflow-hidden transition-all duration-200 ease-out bg-gradient-to-b from-[#0b0c10] to-[#08090c] border-l border-l-primary/20 border border-white/[0.05] group-hover:border-primary/20 group-hover:shadow-[0_4px_40px_-12px_hsl(217_100%_50%_/_0.12)] group-hover:-translate-y-0.5">
                  {/* Subtle inner gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10 p-7 md:p-8">
                    <h3 className="text-lg md:text-xl font-display font-medium text-foreground mb-3 transition-colors duration-200 group-hover:text-primary/90">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-foreground/40 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tertiary Cards Row */}
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "No setup. Ever.",
                description: "Synth does the thinking and building for you."
              },
              {
                title: "Fast, reliable execution",
                description: "Automations run with enterprise-grade reliability and priority execution."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                className="group relative"
              >
                <div className="relative h-full rounded-lg overflow-hidden transition-all duration-200 ease-out bg-[#090a0d]/80 border border-white/[0.04] group-hover:border-white/[0.08] group-hover:-translate-y-0.5">
                  <div className="relative z-10 p-6">
                    <h3 className="text-base font-display font-medium text-foreground/90 mb-2 transition-colors duration-200 group-hover:text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/35 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
