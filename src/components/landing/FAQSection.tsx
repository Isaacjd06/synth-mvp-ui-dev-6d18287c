import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Is Synth an automation tool or an AI assistant?",
    answer: "Both. Synth combines an AI chat interface for creating and understanding automations with a full workflow management system. You describe what you want, Synth builds it, and you monitor executions, errors, and insights over time."
  },
  {
    question: "Do I need to know how to build workflows?",
    answer: "No. Synth is designed to be guided. Describe your intent in plain English — Synth interprets it and creates the automation for you. You can view and adjust the workflow, but you don't need to build from scratch."
  },
  {
    question: "What happens when something fails?",
    answer: "Execution details show exactly what happened: which step failed, what the error was, and timing information. Insights surface reliability issues. You can take action to fix the problem, including getting help in Chat."
  },
  {
    question: "Are integrations limited by plan?",
    answer: "No. All plans can connect to all available integrations. Plans differ by usage limits (number of workflows, executions per month) and capabilities (execution history depth, priority queue access, analytics)."
  },
  {
    question: "Can Synth run fully autonomously?",
    answer: "Synth creates and monitors automations for you, but it's designed to keep you informed and in control. You'll see what's running, what's failing, and what could be improved. It's smart and guided — not a black box."
  },
  {
    question: "How is Synth different from Zapier or Make?",
    answer: "Traditional automation tools require you to manually wire triggers and actions. Synth lets you describe what you want, builds the workflow, and then helps you monitor and improve it over time. It's the difference between building and managing."
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(135deg, hsl(217 100% 50% / 0.03) 0%, transparent 50%, hsl(217 100% 50% / 0.02) 100%)",
        }}
      />

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-foreground/50">
            Honest answers about what Synth is and isn't.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-[#111]/60 border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
              >
                <span className="font-medium text-foreground group-hover:text-primary/90 transition-colors pr-4">
                  {faq.question}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <span className="text-foreground/50 text-lg">
                    {openIndex === i ? "−" : "+"}
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <p className="text-foreground/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
