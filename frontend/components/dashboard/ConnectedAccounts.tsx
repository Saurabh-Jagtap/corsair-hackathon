import { useDashboardData } from "@/hooks/useDashboardData";
import { CheckCircle2 } from "lucide-react"

export const ConnectedAccounts = () => {
    const { emails, events, totalEmails, unreadEmails, recentEmails, upcomingEvents, upcomingMeetings } = useDashboardData()

    const connectedApps = [
        {
            name: "Gmail",
            connected: emails.length > 0,
        },
        {
            name: "Google Calendar",
            connected: events?.success,
        },
    ];

    return (
        <div>
            <div className="rounded-xl border border-[#D1D9E0] bg-white p-6">
                <h2 className="mb-4 text-sm font-medium text-[#1A2B35]">
                    Connected Accounts
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {connectedApps.map((app) => (
                        <div
                            key={app.name}
                            className="flex items-center justify-between rounded-lg border border-[#E8ECF0] bg-[#F4F6F7] px-4 py-3"
                        >
                            <span className="text-sm font-medium text-[#1A2B35]">
                                {app.name}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs font-medium text-[#2A7A4B]">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Connected
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

