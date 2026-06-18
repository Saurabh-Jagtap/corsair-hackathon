import { useSession } from "@/utils/auth-client"

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
};

export const DashboardHeader = () => {
    const { data: sessionData } = useSession()

    return (
        <>
            {/* Hero */}
            <div className="animate-[fadeIn_0.3s_ease-out]">
                <p className="text-xs font-medium uppercase tracking-wide text-[#4A7FA0]">
                    {getGreeting()}
                </p>
                <h1 className="mt-1 text-2xl font-medium text-[#1A2B35]">
                    Welcome back, {sessionData?.user?.name}
                </h1>
                <p className="mt-1 text-sm text-[#7A8B96]">
                    Here's what's happening today.
                </p>
            </div>
        </>
    )
}