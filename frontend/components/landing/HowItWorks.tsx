"use client"
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

export function HowItWorks() {
    const steps = [
        {
            n: "1",
            title: "Connect Gmail & Calendar",
            desc: "One-click OAuth. Triagent reads your data — it never stores your password.",
        },
        {
            n: "2",
            title: "Triagent reads what matters",
            desc: "Your inbox and schedule are scanned and ranked, so the important things surface first.",
        },
        {
            n: "3",
            title: "Get your daily brief",
            desc: "One clear summary of what needs attention today — emails, meetings, and what to do next.",
        },
    ];

    return (
        <section id="how-it-works" className="px-6 md:px-10 py-16 max-w-3xl mx-auto">
            <div className="text-[12px] uppercase tracking-wide text-[#4A7FA0] mb-3.5">
                How it works
            </div>
            <h2 className="font-serif text-[28px] md:text-[32px] leading-tight mb-4">
                From connected to in control,
                <br />
                in under two minutes.
            </h2>
            <p className="text-[15px] text-[#4A5568] max-w-md mb-10 leading-relaxed">
                No setup, no configuration. Just your inbox and calendar, made clear.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.n}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="bg-white border border-[#D1D9E0] rounded-xl p-5"
                    >
                        <div className="font-serif text-[28px] text-[#D1D9E0] mb-3">{step.n}</div>
                        <div className="text-[14px] font-medium mb-1.5">{step.title}</div>
                        <div className="text-[13px] text-[#4A5568] leading-relaxed">{step.desc}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}