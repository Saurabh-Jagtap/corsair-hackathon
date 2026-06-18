import { useQuery } from '@tanstack/react-query'
export const useDashboardData = () => {
    const { data: threadsData } = useQuery({
        queryKey: ["threads"],
        queryFn: async () => {
            const res = await fetch("/api/gmail/threads");
            return res.json();
        },
    });

    const { data: eventsData } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const res = await fetch("api/calendar/events");
            return res.json();
        }
    })

    const emails = threadsData?.data ?? [];

    const events = eventsData?.data?.items ?? [];

    const totalEmails = emails.length;

    const unreadEmails =
        emails.filter(
            (email: any) => email.unread
        ).length;

    const upcomingMeetings = events.length;

    const recentEmails = emails.slice(0, 5);

    const upcomingEvents = events
        .filter(
            (event: any) =>
                event.start?.dateTime &&
                new Date(event.start.dateTime) >
                new Date()
        )
        .sort(
            (a: any, b: any) =>
                new Date(a.start.dateTime).getTime() -
                new Date(b.start.dateTime).getTime()
        )
        .slice(0, 3);

    return {
        emails,
        events,
        totalEmails,
        unreadEmails,
        upcomingMeetings,
        recentEmails,
        upcomingEvents,
    };
}