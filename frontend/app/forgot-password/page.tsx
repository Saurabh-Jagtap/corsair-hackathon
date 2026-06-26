"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { requestPasswordReset } from "@/utils/auth-client";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    const handleForgotPassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!email.trim()) return;

        try {
            setIsSubmitting(true);

            const { error } = await requestPasswordReset({
                email,
                redirectTo: "/reset-password",
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Password reset email sent.");
            router.push(`/verify-email?type=reset&email=${encodeURIComponent(email)}`);
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center px-6">
            <div className="w-full max-w-md">

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="bg-white rounded-3xl border border-[#E8ECF0] shadow-sm p-10"
                >

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="w-20 h-20 rounded-full bg-[#EAF2F8] mx-auto flex items-center justify-center mb-6"
                    >
                        <KeyRound
                            size={34}
                            className="text-[#4A7FA0]"
                        />
                    </motion.div>

                    <h1 className="text-center text-3xl font-bold text-[#1A2B35]">
                        Forgot your password?
                    </h1>

                    <p className="text-center text-[#6B7B88] mt-3 leading-relaxed">
                        Enter the email associated with your account and we'll send you a password reset link.
                    </p>

                    <form className="mt-8" onSubmit={handleForgotPassword} >

                        <label className="text-[12px] font-medium text-[#4A5568] mb-1.5 block">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="
                                w-full
                                bg-white
                                border
                                border-[#D1D9E0]
                                rounded-lg
                                py-3
                                px-4
                                outline-none
                                transition-colors
                                focus:border-[#4A7FA0]
                            "
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="
                                mt-6
                                w-full
                                rounded-xl
                                bg-[#1A2B35]
                                py-3
                                text-white
                                transition-colors
                                hover:bg-[#243A47]
                                disabled:opacity-50
                            "
                        >
                            {isSubmitting
                                ? "Sending..."
                                : "Send Reset Link"}
                        </button>

                    </form>

                    <div className="mt-8 text-center">

                        <p className="text-sm text-[#6B7B88]">
                            Remembered your password?
                        </p>

                        <Link
                            href="/signin"
                            className="
                                mt-2
                                inline-block
                                text-sm
                                font-medium
                                text-[#4A7FA0]
                                hover:text-[#2D4A5E]
                            "
                        >
                            ← Back to Sign In
                        </Link>

                    </div>

                </motion.div>

            </div>
        </div>
    );
};

export default ForgotPasswordPage;