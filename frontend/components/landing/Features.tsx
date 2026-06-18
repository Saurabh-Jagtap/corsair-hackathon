"use client"
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

export function Features() {
    const features = [
        {
            title: "Daily Brief",
            desc: "One clear morning summary of what matters across your inbox and calendar.",
        },
        {
            title: "Priority Emails",
            desc: "Emails sorted into high, medium, and low priority — with a reason for each.",
        },
        {
            title: "Meeting Summaries",
            desc: "Upcoming meetings, deadlines, and what needs preparation, all in one view.",
        },
        {
            title: "Focus Today",
            desc: "A straight answer to 'what should I actually do right now.'",
        },
        {
            title: "Gmail integration",
            desc: "Connects securely over OAuth. Read access only, revoke anytime.",
        },
        {
            title: "Calendar integration",
            desc: "Your schedule, pulled in alongside your inbox — no app-switching.",
        },
    ];

    return (
        <section id="features" className="px-6 md:px-10 py-16 max-w-3xl mx-auto">
            <div className="text-[12px] uppercase tracking-wide text-[#4A7FA0] mb-3.5">
                Features
            </div>
            <h2 className="font-serif text-[26px] md:text-[28px] leading-tight mb-10">
                Everything your inbox demands.
                <br />
                Nothing it doesn&apos;t.
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {features.map((f, i) => (
                    <motion.div
                        key={f.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        transition={{ duration: 0.35, delay: (i % 3) * 0.08 }}
                        className="bg-white border border-[#D1D9E0] rounded-xl p-5 hover:-translate-y-0.5 hover:border-[#BDD0DA] transition-all duration-200"
                    >
                        <div className="w-8 h-8 rounded-md bg-[#EAF2F8] mb-3.5" />
                        <div className="text-[14px] font-medium mb-1.5">{f.title}</div>
                        <div className="text-[13px] text-[#4A5568] leading-relaxed">{f.desc}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}