import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505]" />
      
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20">
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(217 100% 50% / 0.2) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display-bold text-foreground mb-6">
            Start with one automation.
          </h2>
          <p className="text-lg text-foreground/50 mb-10">
            Connect your tools. Describe what you want. Watch Synth build it. Then monitor, improve, and scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
          </div>

          <p className="text-sm text-foreground/40 mt-6">
            No credit card required. Cancel anytime.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="container px-6 relative z-10 mt-20">
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground/40">
              © {new Date().getFullYear()} Synth. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/pricing" className="text-sm text-foreground/40 hover:text-foreground/60 transition-colors">
                Pricing
              </Link>
              <a href="#faq" className="text-sm text-foreground/40 hover:text-foreground/60 transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
