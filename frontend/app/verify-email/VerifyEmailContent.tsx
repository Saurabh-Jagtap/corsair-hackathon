"use client";

import { MailCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { requestPasswordReset, sendVerificationEmail } from "@/utils/auth-client";
import { toast } from "sonner";

function maskEmail(email: string) {
    const [name, domain] = email.split("@");

    if (!name || !domain) return email;

    const visible = name.slice(0, 3);
    const hidden = "*".repeat(Math.max(name.length - 3, 3));

    return `${visible}${hidden}@${domain}`;
}

const pageContent = {
    verify: {
        title: "Check your inbox",
        description:
            "We've sent a verification link to",
        button: "Resend verification email",
        info: "Click the link in the email to verify your account and continue using Triagent."
    },

    reset: {
        title: "Check your inbox",
        description:
            "We've sent a password reset link to",
        button: "Resend reset link",
        info: "Click the link in the email to choose a new password for your Triagent account."
    },
};

const VerifyEmailPage = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "your registered email";
    const [countdown, setCountdown] = useState(30);
    const [isSending, setIsSending] = useState(false);

    const type = searchParams.get("type") ?? "verify";
    const content = pageContent[type as "verify" | "reset"];

    const handleResend = async () => {
        if (!email) return;

        try {
            setIsSending(true);

            let error;

            if (type === "verify") {
                ({ error } = await sendVerificationEmail({
                    email,
                    callbackURL: "/signin",
                }));
            } else {
                ({ error } = await requestPasswordReset({
                    email,
                    redirectTo: "/reset-password",
                }));
            }

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success(
                type === "verify"
                    ? "Verification email sent."
                    : "Password reset email sent."
            );

            setCountdown(30);
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
        finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        if (countdown === 0) return;

        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);
    return (
        <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="rounded-3xl border border-[#E8ECF0] bg-white shadow-sm p-10 text-center"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF2F8]"
                    >
                        <MailCheck
                            size={36}
                            className="text-[#4A7FA0]"
                        />
                    </motion.div>

                    {/* Heading */}
                    <h1 className="text-3xl font-bold text-[#1A2B35]">
                        {content.title}
                    </h1>

                    <p className="mt-3 text-[#6B7B88] leading-relaxed">
                        {content.description}
                    </p>

                    <p className="mt-2 text-[#1A2B35] font-semibold break-all">
                        {maskEmail(email)}
                    </p>

                    <p className="mt-5 text-sm text-[#6B7B88] leading-relaxed">
                        Click the link in the email to verify your account
                        and continue using Triagent.
                    </p>

                    {/* Divider */}
                    <div className="my-8 h-px bg-[#E8ECF0]" />

                    {/* Gmail */}
                    <a
                        href="https://mail.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center rounded-xl bg-[#1A2B35] py-3 text-white transition-colors hover:bg-[#243A47]"
                    >
                        Open Gmail
                    </a>

                    {/* Resend */}
                    <button
                        disabled={countdown > 0 || isSending}
                        onClick={handleResend}
                        className={`mt-4 w-full rounded-xl border py-3 transition-colors
                        ${countdown > 0
                                ? "cursor-not-allowed border-gray-200 text-gray-400"
                                : "border-[#D8E1E8] text-[#4A7FA0] hover:bg-[#F5F8FA]"
                            }`}
                    >
                        {countdown > 0
                            ? `Resend available in ${countdown}s`
                            : content.button}
                    </button>

                    {/* Login */}
                    <Link
                        href="/signin"
                        className="mt-4 block text-sm text-[#6B7B88] hover:text-[#1A2B35]"
                    >
                        {type === "verify"
                            ? "Already verified? Sign in"
                            : "Remembered your password? Sign in"}
                    </Link>

                    {/* Security */}
                    <div className="mt-8 rounded-xl border border-[#E8ECF0] bg-[#F8FAFB] p-4 text-left">
                        <h3 className="text-sm font-semibold text-[#1A2B35]">
                            Security Tip
                        </h3>

                        <p className="mt-2 text-sm text-[#6B7B88] leading-relaxed">
                            {content.info}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;