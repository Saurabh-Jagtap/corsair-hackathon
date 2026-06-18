import { useDashboardData } from '@/hooks/useDashboardData'
import { InboxIcon } from 'lucide-react'
import Link from 'next/link';

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

export const RecentEmails = () => {
    const { recentEmails } = useDashboardData()
    return (
        <div>
            <div className="rounded-xl border border-[#D1D9E0] bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-medium text-[#1A2B35]">
                        Recent Emails
                    </h2>

                    <Link href={"/inbox"} className="cursor-pointer text-xs text-[#4A7FA0] transition-all hover:border-[#BDD0DA] hover:shadow-sm">
                        View All →
                    </Link>
                </div>

                <div className="space-y-2.5">
                    {recentEmails.length === 0 ? (
                        <EmptyRow
                            icon={<InboxIcon className="h-5 w-5 text-[#4A7FA0]" />}
                            text="No emails found."
                        />
                    ) : (
                        recentEmails.map((email: any) => (
                            <div
                                key={email.id}
                                className={`flex items-start gap-2.5 rounded-lg border p-3.5 transition-colors hover:border-[#BDD0DA] hover:bg-[#F4F6F7] ${email.unread
                                    ? "border-[#D1D9E0] bg-white"
                                    : "border-[#E8ECF0] bg-white/60"
                                    }`}
                            >
                                {email.unread && (
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4A7FA0]" />
                                )}
                                <div className="min-w-0 flex-1">
                                    <p
                                        className={`truncate text-sm ${email.unread
                                            ? "font-medium text-[#1A2B35]"
                                            : "text-[#4A5568]"
                                            }`}
                                    >
                                        {email.subject}
                                    </p>
                                    <p className="mt-0.5 truncate text-xs text-[#7A8B96]">
                                        {email.from}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

