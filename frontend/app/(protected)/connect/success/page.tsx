"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const plugin = searchParams.get("plugin");
    const [countdown, setCountdown] = useState(3);

    const pluginLabel =
        plugin === "gmail"
            ? "Gmail"
            : plugin === "googlecalendar"
                ? "Google Calendar"
                : plugin;

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            router.push("/dashboard");
        }
    }, [countdown, router]);

    return (
        <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{
                        y: 20,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.4,
                    }}
                    className="bg-white rounded-3xl border border-[#E8ECF0] shadow-sm p-10 text-center"
                >

                    <motion.div
                        initial={{
                            scale: 0,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        className="w-20 h-20 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-6"
                    >
                        <motion.span
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.3,
                            }}
                            className="text-4xl"
                        >
                            ✓
                        </motion.span>
                    </motion.div>

                    <h1 className="text-3xl font-bold text-[#1A2B35] mb-3">
                        {pluginLabel} Connected
                    </h1>

                    <p className="text-[#6B7B88] mb-8">
                        Your account has been connected successfully and is now ready to use inside Triagent.
                    </p>

                    <div className="bg-[#F8FAFB] border border-[#E8ECF0] rounded-xl p-4 mb-8">
                        <p className="text-sm text-[#6B7B88]">
                            Redirecting to dashboard in
                        </p>

                        <div className="mt-3 h-2 bg-[#E8ECF0] rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{
                                    duration: 3,
                                    ease: "linear",
                                }}
                                className="h-full bg-[#4A7FA0]"
                            />
                        </div>

                        <motion.p
                            key={countdown}
                            initial={{
                                opacity: 0,
                                scale: 1.2,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            className="text-2xl font-bold text-[#4A7FA0] mt-1"
                        >
                            {countdown}s
                        </motion.p>
                    </div>

                    <button
                        onClick={() =>
                            router.push("/dashboard")
                        }
                        className="
                    w-full
                    bg-[#1A2B35]
                    text-white
                    py-3
                    rounded-xl
                    hover:bg-[#243A47]
                    transition-colors
                "
                    >
                        Go to Dashboard
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Page;