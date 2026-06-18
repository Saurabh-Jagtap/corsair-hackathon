"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AIWorkflow() {
  const steps = [
    { role: "user", text: "What should I focus on today?" },
    {
      role: "ai",
      text: "Two emails need a reply, and your 3pm meeting has no agenda yet. Want me to draft one?",
    },
    { role: "user", text: "Yes, draft it." },
    { role: "ai", text: "Draft ready — a short agenda based on your last email thread." },
  ];

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setVisibleCount((c) => (c >= steps.length ? 1 : c + 1));
    }, 1700);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <section className="bg-[#1A2B35] px-6 md:px-10 py-16">
      <div className="max-w-xl mx-auto">
        <div className="text-[12px] uppercase tracking-wide text-[#4A7FA0] mb-3.5">
          Ask anything
        </div>
        <h2 className="font-serif text-[26px] md:text-[28px] text-[#E8ECF0] leading-snug mb-9">
          Your inbox and calendar, answered
          <br />
          in plain language.
        </h2>

        <div className="flex flex-col gap-3 min-h-[220px]">
          {steps.slice(0, visibleCount).map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`text-[13px] leading-relaxed px-4 py-2.5 rounded-xl max-w-[80%] ${
                step.role === "user"
                  ? "bg-[#2D4A5E] text-[#C8D8E5] self-end rounded-br-sm"
                  : "bg-[#243442] border border-[#3A5265] text-[#BDD0DA] self-start rounded-bl-sm"
              }`}
            >
              {step.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}