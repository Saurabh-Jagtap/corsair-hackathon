import { useDashboardData } from '@/hooks/useDashboardData';
import { Calendar, Mail, MailOpen, Plug } from 'lucide-react'

function StatCard({
    label,
    value,
    icon,
}: {
    label: string;
    value: number;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-[#D1D9E0] bg-white p-4 transition-shadow hover:shadow-sm">
            <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-[#7A8B96]">{label}</span>
                <span className="text-[#4A7FA0]">{icon}</span>
            </div>
            <p className="text-2xl font-medium text-[#1A2B35]">{value}</p>
        </div>
    );
}

export const StatsGrid = () => {
    const { emails, events, totalEmails, unreadEmails, recentEmails, upcomingEvents, upcomingMeetings } = useDashboardData()
    return (
        <div>
            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Total Emails"
                    value={totalEmails}
                    icon={<Mail className="h-4 w-4" />}
                />
                <StatCard
                    label="Unread Emails"
                    value={unreadEmails}
                    icon={<MailOpen className="h-4 w-4" />}
                />
                <StatCard
                    label="Meetings"
                    value={upcomingMeetings}
                    icon={<Calendar className="h-4 w-4" />}
                />
                <StatCard
                    label="Connected Apps"
                    value={2}
                    icon={<Plug className="h-4 w-4" />}
                />
            </div>
        </div>
    )
}

