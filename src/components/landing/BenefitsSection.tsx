import { motion } from "framer-motion";

const benefits = [
  {
    title: "Build workflows automatically",
    description: "Tell Synth what needs to happen — it creates the entire workflow for you. No drag-and-drop, no manual configuration.",
    size: "large",
  },
  {
    title: "Understands your business context",
    description: "Synth remembers your tasks, patterns, and preferences. Automations get smarter over time.",
    size: "medium",
  },
  {
    title: "Monitor everything in one place",
    description: "See executions, errors, and performance across all your automations from a single dashboard.",
    size: "medium",
  },
  {
    title: "No setup. Ever.",
    description: "Unlike traditional tools, Synth does the thinking and building for you.",
    size: "small",
  },
  {
    title: "Fast, reliable execution",
    description: "Your automations run in milliseconds with enterprise-grade reliability.",
    size: "small",
  },
  {
    title: "Insights that matter",
    description: "Synth surfaces issues and opportunities — so you improve, not just automate.",
    size: "small",
  },
];

const BenefitsSection = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Layered background with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0a0a10] to-[#050508]" />
      
      {/* Radial glow - primary */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]">
        <div 
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(ellipse, hsl(217 100% 50% / 0.06) 0%, transparent 70%)",
          }}
        />
      </div>
      
      {/* Secondary accent glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px]">
        <div 
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, hsl(217 100% 60% / 0.04) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
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
          <p className="text-lg md:text-xl text-foreground/45 max-w-2xl mx-auto leading-relaxed">
            The automation platform that thinks, builds, monitors, and improves — so you can focus on what matters.
          </p>
        </motion.div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, i) => {
            const isLarge = benefit.size === "large";
            const isMedium = benefit.size === "medium";
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className={`group relative ${
                  isLarge ? "md:col-span-2 lg:row-span-2" : ""
                } ${i === 1 ? "lg:mt-8" : ""} ${i === 4 ? "lg:-mt-4" : ""}`}
              >
                {/* Card */}
                <div
                  className={`relative h-full rounded-2xl overflow-hidden transition-all duration-200 ease-out
                    ${isLarge 
                      ? "bg-gradient-to-br from-[#0f1015] via-[#12131a] to-[#0d0e12] border border-primary/15 shadow-[0_0_60px_-15px_hsl(217_100%_50%_/_0.12)]" 
                      : isMedium
                        ? "bg-gradient-to-b from-[#0e0f13] to-[#0a0b0e] border border-white/[0.06]"
                        : "bg-[#0c0d10]/90 border border-white/[0.04]"
                    }
                    group-hover:border-primary/25 group-hover:shadow-[0_4px_40px_-10px_hsl(217_100%_50%_/_0.15)] group-hover:-translate-y-1
                  `}
                >
                  {/* Inner glow for large card */}
                  {isLarge && (
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  )}
                  
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />
                  </div>

                  {/* Corner accent for large card */}
                  {isLarge && (
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-40">
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: "radial-gradient(circle at top right, hsl(217 100% 50% / 0.08) 0%, transparent 70%)",
                        }}
                      />
                    </div>
                  )}

                  <div className={`relative z-10 ${isLarge ? "p-10 md:p-12" : isMedium ? "p-8" : "p-7"}`}>
                    <h3 className={`font-display text-foreground mb-4 transition-colors duration-200 group-hover:text-primary/95 ${
                      isLarge 
                        ? "text-2xl md:text-3xl lg:text-[2rem] font-semibold tracking-tight" 
                        : isMedium 
                          ? "text-xl font-medium" 
                          : "text-lg font-medium"
                    }`}>
                      {benefit.title}
                    </h3>

                    <p className={`text-foreground/45 leading-[1.7] ${
                      isLarge ? "text-lg md:text-xl max-w-lg" : isMedium ? "text-base" : "text-[15px]"
                    }`}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
