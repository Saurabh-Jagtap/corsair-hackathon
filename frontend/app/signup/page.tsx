"use client"
import { signIn, signUp } from '@/utils/auth-client'
import { useState } from 'react'

const SignUpPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSignup = async (e: any) => {
        e.preventDefault()

        if (!name.trim() || !email.trim() || !password.trim()) {
            alert("All fields are required!")
            return
        }

        try {
            setIsSubmitting(true)

            const res = await signUp.email({
                name,
                email,
                password,
                callbackURL: "/signin",
            })

            setName('')
            setEmail('')
            setPassword('')

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleGoogleSignup = async (
        e: React.MouseEvent
    ) => {
        e.preventDefault();

        setIsSubmitting(true);

        const res = await signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });

        setIsSubmitting(false);

        if (res.error) {
            alert(res.error.message);
        }
    };

    const benefits = [
        "AI inbox triage and priority ranking",
        "Smart reply drafts in your tone",
        "Calendar awareness and meeting prep",
        "Conversational AI assistant, always on",
    ]

    return (
        <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-xl overflow-hidden border border-[#D1D9E0]">

                {/* Left benefits panel */}
                <div className="hidden md:flex bg-[#1A2B35] p-12 flex-col justify-between">
                    <span className="font-serif text-[20px] text-[#E8ECF0]">Triagent</span>

                    <div className="mt-12">
                        <div className="text-[13px] text-[#4A7FA0] uppercase tracking-wide mb-5">
                            What you get
                        </div>
                        <div className="flex flex-col gap-4">
                            {benefits.map((b) => (
                                <div key={b} className="flex gap-3 items-start">
                                    <div className="w-5 h-5 rounded-full bg-[#2D4A5E] flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-[10px] text-[#BDD0DA]">✓</span>
                                    </div>
                                    <span className="text-[13px] text-[#8EABB8] leading-relaxed">{b}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto pt-10 text-[12px] text-[#4A5568]">
                        Free to start · No credit card required
                    </div>
                </div>

                {/* Right form panel */}
                <div className="bg-white p-8 md:p-12 flex flex-col justify-center animate-[fadein_0.3s_ease-out]">
                    <h1 className="font-serif text-[26px] text-[#1A2B35] mb-1.5">Create your account.</h1>
                    <p className="text-[14px] text-[#4A5568] mb-9">
                        Join professionals using Triagent to reclaim their time
                    </p>

                    <button
                        onClick={handleGoogleSignup}
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2.5 bg-white border border-[#D1D9E0] rounded-lg py-3 px-5 text-[14px] font-medium text-[#1A2B35] mb-6 hover:bg-[#F8FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-[#D1D9E0]" />
                        <span className="text-[12px] text-[#7A8B96]">or sign up with email</span>
                        <div className="flex-1 h-px bg-[#D1D9E0]" />
                    </div>

                    <form onSubmit={handleSignup}>
                        <div className="mb-4">
                            <label className="text-[12px] font-medium text-[#4A5568] mb-1.5 block">Full name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white border border-[#D1D9E0] rounded-md py-2.5 px-3.5 text-[14px] text-[#1A2B35] outline-none focus:border-[#4A7FA0] transition-colors"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-[12px] font-medium text-[#4A5568] mb-1.5 block">Work email</label>
                            <input
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-[#D1D9E0] rounded-md py-2.5 px-3.5 text-[14px] text-[#1A2B35] outline-none focus:border-[#4A7FA0] transition-colors"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="text-[12px] font-medium text-[#4A5568] mb-1.5 block">Password</label>
                            <input
                                type="password"
                                placeholder="Min. 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white border border-[#D1D9E0] rounded-md py-2.5 px-3.5 text-[14px] text-[#1A2B35] outline-none focus:border-[#4A7FA0] transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#2D4A5E] text-[#F4F6F7] rounded-lg py-3 text-[14px] font-medium mb-5 hover:bg-[#26404F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    <p className="text-[13px] text-[#4A5568] text-center mb-5">
                        Already have an account?{" "}
                        <a href="/signin" className="text-[#2D4A5E] font-medium">Sign in</a>
                    </p>

                    <p className="text-[11px] text-[#7A8B96] text-center leading-relaxed">
                        By continuing, you agree to our{" "}
                        <a href="#" className="text-[#4A7FA0]">Terms</a> and{" "}
                        <a href="#" className="text-[#4A7FA0]">Privacy Policy</a>.
                    </p>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fadein {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    )
}

export default SignUpPage