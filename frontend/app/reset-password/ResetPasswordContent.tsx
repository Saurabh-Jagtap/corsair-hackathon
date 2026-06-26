"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { resetPassword } from "@/utils/auth-client";

const passwordChecks = (password: string) => ({
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
});

const ResetPasswordContent = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const checks = passwordChecks(password);
    const isPasswordValid = Object.values(checks).every(Boolean);

    const handleResetPassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!token) {
            toast.error("Invalid or expired reset link.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setIsSubmitting(true);

            const { error } = await resetPassword({
                newPassword: password,
                token,
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Password updated successfully.");

            router.push("/signin");

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
                        Reset your password
                    </h1>

                    <p className="text-center text-[#6B7B88] mt-3 leading-relaxed">
                        Choose a new password for your
                        Triagent account.
                    </p>

                    <form className="mt-8" onSubmit={handleResetPassword}>

                        <div className="mb-5">

                            <label className="text-[12px] font-medium text-[#4A5568] mb-1.5 block">
                                New Password
                            </label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="
                                    w-full
                                    border
                                    border-[#D1D9E0]
                                    rounded-lg
                                    py-3
                                    px-4
                                    outline-none
                                    focus:border-[#4A7FA0]
                                "
                            />

                            <div className="mt-4 space-y-2">

                                <PasswordRule
                                    valid={checks.minLength}
                                    text="At least 8 characters"
                                />

                                <PasswordRule
                                    valid={checks.uppercase}
                                    text="One uppercase letter"
                                />

                                <PasswordRule
                                    valid={checks.number}
                                    text="One number"
                                />

                                <PasswordRule
                                    valid={checks.special}
                                    text="One special character"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="text-[12px] font-medium text-[#4A5568] mb-1.5 block">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="
                                    w-full
                                    border
                                    border-[#D1D9E0]
                                    rounded-lg
                                    py-3
                                    px-4
                                    outline-none
                                    focus:border-[#4A7FA0]
                                "
                            />

                        </div>
                        <PasswordRule
                            valid={
                                password.length > 0 &&
                                password === confirmPassword
                            }
                            text="Passwords match"
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting || !isPasswordValid}
                            className="
                                mt-8
                                w-full
                                rounded-xl
                                bg-[#1A2B35]
                                py-3
                                text-white
                                hover:bg-[#243A47]
                                transition-colors
                                disabled:opacity-50
                            "
                        >
                            {isSubmitting
                                ? "Updating..."
                                : "Reset Password"}
                        </button>

                    </form>

                    <div className="mt-8 text-center">

                        <Link
                            href="/signin"
                            className="
                                text-sm
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

export default ResetPasswordContent;

type PasswordRuleProps = {
    valid: boolean;
    text: string;
};

function PasswordRule({
    valid,
    text,
}: PasswordRuleProps) {
    return (
        <div
            className={`flex items-center gap-2 text-sm transition-colors ${valid
                ? "text-green-600"
                : "text-[#6B7B88]"
                }`}
        >
            {valid ? (
                <CheckCircle2 size={16} />
            ) : (
                <Circle size={16} />
            )}

            <span>{text}</span>
        </div>
    );
}