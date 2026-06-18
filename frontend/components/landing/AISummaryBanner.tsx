"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AISummaryBanner() {
  const messages = [
    "2 emails need a reply today. Your 3pm has no agenda yet.",
    "Sarah's roadmap email is your top priority this morning.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <div className="px-4 py-2.5 border-t border-[#D1D9E0] bg-[#EAF2F8] flex items-center gap-2">
      <span className="text-[#4A7FA0] text-[13px]">✦</span>
      <motion.span
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-[12px] text-[#2D4A5E]"
      >
        {messages[index]}
      </motion.span>
    </div>
  );
}