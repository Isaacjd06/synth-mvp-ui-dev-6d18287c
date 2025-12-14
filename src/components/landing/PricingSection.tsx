import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 470,
    description: "For individuals getting started with automation",
    audience: "Best for solo operators and small projects",
    features: [
      "Up to 5 workflows",
      "Up to 2,000 executions per month",
      "Core automation monitoring",
      "Basic execution history",
      "Community support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 149,
    yearlyPrice: 1430,
    description: "For growing teams that need visibility and reliability",
    audience: "Best for growing businesses",
    features: [
      "Up to 25 workflows",
      "Up to 10,000 executions per month",
      "Full execution history & diagnostics",
      "Workflow insights & reliability tracking",
      "Priority execution queue",
    ],
    popular: true,
  },
  {
    name: "Agency",
    monthlyPrice: 399,
    yearlyPrice: 3830,
    description: "For agencies and enterprises at scale",
    audience: "Best for agencies and enterprises",
    features: [
      "Up to 100 workflows",
      "Up to 50,000 executions per month",
      "Advanced execution analytics",
      "Higher concurrency limits",
      "Agency-grade reliability & priority",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808] to-[#0a0a0a]" />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20">
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(217 100% 50% / 0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-foreground/50 max-w-xl mx-auto mb-2">
            Plans differ by usage limits and capabilities — not by available connections.
          </p>
          <p className="text-sm text-primary/70">
            All integrations available on all plans.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <span className={`text-sm ${!isYearly ? "text-foreground" : "text-foreground/50"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-7 rounded-full bg-[#1a1a1a] border border-white/10 transition-colors"
          >
            <motion.div
              className="absolute top-1 w-5 h-5 rounded-full bg-primary"
              animate={{ left: isYearly ? "calc(100% - 24px)" : "4px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm ${isYearly ? "text-foreground" : "text-foreground/50"}`}>
            Yearly
          </span>
          {isYearly && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
              Save 20%
            </span>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const monthlyEquivalent = isYearly 
              ? Math.round(plan.yearlyPrice / 12) 
              : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular 
                    ? "bg-gradient-to-b from-[#141414] to-[#0f0f0f] border-2 border-primary/30" 
                    : "bg-[#111]/60 border border-white/5"
                }`}
                style={{
                  boxShadow: plan.popular 
                    ? "0 0 60px -20px hsl(217 100% 60% / 0.3)" 
                    : "none",
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-display text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-foreground/50">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display-bold text-foreground">
                      ${monthlyEquivalent}
                    </span>
                    <span className="text-foreground/50">/mo</span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-foreground/40 mt-1">
                      Billed yearly — ${plan.yearlyPrice}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-foreground/70">
                      <span className="text-primary/70 mt-0.5">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-foreground/40 text-center">
                  {plan.audience}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
