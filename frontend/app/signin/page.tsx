"use client"
import { signIn } from '@/utils/auth-client'
import { useState } from 'react'

const SignInPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSignIn = async (e: any) => {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            alert("All fields are required!")
            return
        }

        console.log({
            email,
            password
        });

        setIsSubmitting(true)

        const res = await signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
        })

        setIsSubmitting(false)

        if (res.error) {
            console.error(res.error)
            alert(res.error.message)
            return
        }

        setEmail('')
        setPassword('')

        console.log(res)
    }

    const handleGoogleSignin = async (e: any) => {
        e.preventDefault()

        setIsSubmitting(true)

        const res = await signIn.social({
            provider: "google",
            callbackURL: "/dashboard"
        });

        setIsSubmitting(false)

        if (res.error) {
            alert(res.error.message)
        }
    }

    return (
        <div className="min-h-screen bg-[#F4F6F7] flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-xl overflow-hidden border border-[#D1D9E0]">

                {/* Left info panel */}
                <div className="hidden md:flex bg-[#1A2B35] p-12 flex-col justify-between">
                    <span className="font-serif text-[20px] text-[#E8ECF0]">Triagent</span>

                    <div className="mt-12">
                        <p className="font-serif text-[20px] leading-relaxed text-[#BDD0DA] italic">
                            "I used to spend an hour every morning just figuring out what needed my attention."
                        </p>
                        <p className="text-[12px] text-[#4A7FA0] mt-4">— Founder, Series A startup</p>
                    </div>

                    <div className="flex gap-8 mt-auto pt-12">
                        <div>
                            <div className="font-serif text-[28px] text-[#E8ECF0]">2.4h</div>
                            <div className="text-[12px] text-[#4A7FA0] mt-0.5">saved per week</div>
                        </div>
                        <div>
                            <div className="font-serif text-[28px] text-[#E8ECF0]">94%</div>
                            <div className="text-[12px] text-[#4A7FA0] mt-0.5">triage accuracy</div>
                        </div>
                    </div>
                </div>

                {/* Right form panel */}
                <div className="bg-white p-8 md:p-12 flex flex-col justify-center animate-[fadein_0.3s_ease-out]">
                    <h1 className="font-serif text-[26px] text-[#1A2B35] mb-1.5">Welcome back.</h1>
                    <p className="text-[14px] text-[#4A5568] mb-9">Sign in to your Triagent workspace</p>

                    <button
                        onClick={handleGoogleSignin}
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2.5 bg-white border border-[#D1D9E0] rounded-lg py-3 px-5 text-[14px] font-medium text-[#1A2B35] mb-6 hover:bg-[#F8FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-[#D1D9E0]" />
                        <span className="text-[12px] text-[#7A8B96]">or</span>
                        <div className="flex-1 h-px bg-[#D1D9E0]" />
                    </div>

                    <form onSubmit={handleSignIn}>
                        <div className="mb-4">
                            <label className="text-[12px] font-medium text-[#4A5568] mb-1.5 block">Email</label>
                            <input
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-[#D1D9E0] rounded-md py-2.5 px-3.5 text-[14px] text-[#1A2B35] outline-none focus:border-[#4A7FA0] transition-colors"
                            />
                        </div>

                        <div className="mb-1.5">
                            <label className="text-[12px] font-medium text-[#4A5568] mb-1.5 block">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white border border-[#D1D9E0] rounded-md py-2.5 px-3.5 text-[14px] text-[#1A2B35] outline-none focus:border-[#4A7FA0] transition-colors"
                            />
                        </div>

                        <div className="text-right mb-6">
                            <span className="text-[12px] text-[#4A7FA0] cursor-default">Forgot password?</span>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#2D4A5E] text-[#F4F6F7] rounded-lg py-3 text-[14px] font-medium mb-5 hover:bg-[#26404F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <p className="text-[13px] text-[#4A5568] text-center mb-6">
                        No account yet?{" "}
                        <a href="/signup" className="text-[#2D4A5E] font-medium">Create one</a>
                    </p>

                    <div className="flex justify-center gap-5">
                        <span className="flex items-center gap-1.5 text-[11px] text-[#7A8B96]">
                            🔒 Encrypted
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] text-[#7A8B96]">
                            🛡️ OAuth only
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] text-[#7A8B96]">
                            👁️ Private
                        </span>
                    </div>
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

export default SignInPage