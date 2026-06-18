"use client"
import { AISummaryBanner } from "./AISummaryBanner";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

export function ProductPreview() {
  const emails = [
    {
      from: "Sarah Park",
      subject: "Q3 roadmap — needs your input",
      tag: "Reply needed",
      tagColor: "#A0522D",
      tagBg: "#FEECD8",
    },
    {
      from: "Marcus Kim",
      subject: "Re: Contract — minor edits",
      tag: "Review",
      tagColor: "#2D4A5E",
      tagBg: "#EAF2F8",
    },
    {
      from: "Team Notion",
      subject: "Your monthly workspace digest",
      tag: null,
      tagColor: "",
      tagBg: "",
    },
  ];

  return (
    <section className="bg-[#E8ECF0] px-6 md:px-10 py-14">
      <div className="text-center text-[12px] uppercase tracking-wide text-[#4A7FA0] mb-8">
        What you&apos;ll see inside
      </div>

      <div className="max-w-xl mx-auto bg-[#F4F6F7] border border-[#D1D9E0] rounded-xl overflow-hidden">
        <div className="bg-[#1A2B35] px-4 py-2.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E05C30]" />
          <span className="w-2 h-2 rounded-full bg-[#E8B84B]" />
          <span className="w-2 h-2 rounded-full bg-[#4CAF78]" />
          <span className="text-[12px] text-[#8EABB8] ml-2">Triagent — Inbox</span>
        </div>

        <AISummaryBanner />

        <div>
          {emails.map((email, i) => (
            <motion.div
              key={email.subject}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="px-4 py-3 border-t border-[#D1D9E0] flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-full bg-[#EAF2F8] text-[#2D4A5E] text-[11px] font-medium flex items-center justify-center shrink-0">
                {email.from.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium">{email.from}</div>
                <div className="text-[12px] text-[#2D4A5E]">{email.subject}</div>
              </div>
              {email.tag && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full shrink-0"
                  style={{ color: email.tagColor, backgroundColor: email.tagBg }}
                >
                  {email.tag}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}