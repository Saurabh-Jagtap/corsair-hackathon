import { useDashboardData } from '@/hooks/useDashboardData';
import { Calendar } from 'lucide-react'
import Link from 'next/link';

const formatDate = (date?: string) => {
    if (!date) return "No date";

    return new Date(date).toLocaleString(
        "en-IN",
        {
            dateStyle: "medium",
            timeStyle: "short",
        }
    );
};

function EmptyRow({
    icon,
    text,
}: {
    icon: React.ReactNode;
    text: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-[#E8ECF0] bg-white py-10 text-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2F8]">
                {icon}
            </div>
            <p className="text-sm text-[#7A8B96]">{text}</p>
        </div>
    );
}

export const UpcomingMeetings = () => {
    const { upcomingEvents } = useDashboardData()
    return (
        <div>
            {/* Upcoming Meetings */}
            <div className="rounded-xl border border-[#D1D9E0] bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-medium text-[#1A2B35]">
                        Upcoming Meetings
                    </h2>

                    <Link href={"/calendar"} className="cursor-pointer text-xs text-[#4A7FA0] transition-all hover:border-[#BDD0DA] hover:shadow-sm">
                        Open Calendar →
                    </Link>
                </div>

                <div className="space-y-2.5">
                    {upcomingEvents.length === 0 ? (
                        <EmptyRow
                            icon={<Calendar className="h-5 w-5 text-[#4A7FA0]" />}
                            text="No upcoming meetings scheduled."
                        />
                    ) : (
                        upcomingEvents.map((event: any) => (
                            <div
                                key={event.id}
                                className="rounded-lg border border-[#E8ECF0] bg-white p-3.5 transition-colors hover:border-[#BDD0DA] hover:bg-[#F4F6F7]"
                            >
                                <p className="text-sm font-medium text-[#1A2B35]">
                                    {event.summary}
                                </p>
                                <p className="mt-0.5 text-xs text-[#7A8B96]">
                                    {formatDate(event.start?.dateTime)}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

