"use client"
import { signOut, useSession } from '@/utils/auth-client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  Mail,
  MailOpen,
  Calendar,
  Plug,
  Sparkles,
  Inbox as InboxIcon,
  CheckCircle2,
} from 'lucide-react'

const Page = () => {
  const router = useRouter()
  const { data: sessionData, isPending } = useSession()

  const { data: threadsData, isLoading: threadsLoading } = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const res = await fetch("/api/gmail/threads");
      return res.json();
    },
  });
  console.log("THREADS =", threadsData);

  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("api/calendar/events");
      return res.json();
    }
  })
  console.log("Events =", eventsData);

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

  const connectedApps = [
    {
      name: "Gmail",
      connected: true,
    },
    {
      name: "Google Calendar",
      connected: true,
    },
  ];

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

  const handleSignOut = async (e: any) => {
    e.preventDefault()

    const res = await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin"); // redirect to login page
        },
      },
    })
  }

  useEffect(() => {
    if (!isPending && !sessionData?.session) {
      router.push('/signin')
    }
  }, [sessionData, isPending, router])

  if (isPending) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#F4F6F7]">
        <p className="text-sm text-[#7A8B96]">Loading...</p>
      </div>
    )
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-full bg-[#F4F6F7]">
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">

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

        {/* AI Assistant shortcuts */}
        <div className="rounded-xl border border-[#D1D9E0] bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-[#1A2B35]">
            <Sparkles className="h-4 w-4 text-[#4A7FA0]" />
            AI Assistant
          </h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <ShortcutButton
              label="Daily Brief"
              onClick={() =>
                router.push(
                  "/assistant?prompt=Generate%20my%20daily%20brief"
                )
              }
            />
            <ShortcutButton
              label="Priority Emails"
              onClick={() =>
                router.push(
                  "/assistant?prompt=Review%20my%20inbox%20and%20identify%20priority%20emails"
                )
              }
            />
            <ShortcutButton
              label="Meetings"
              onClick={() =>
                router.push(
                  "/assistant?prompt=Summarize%20upcoming%20meetings"
                )
              }
            />
            <ShortcutButton
              label="Focus Today"
              onClick={() =>
                router.push(
                  "/assistant?prompt=What%20should%20I%20focus%20on%20today"
                )
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Upcoming Meetings */}
          <div className="rounded-xl border border-[#D1D9E0] bg-white p-6">
            <h2 className="mb-4 text-sm font-medium text-[#1A2B35]">
              Upcoming Meetings
            </h2>

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

          {/* Recent Emails */}
          <div className="rounded-xl border border-[#D1D9E0] bg-white p-6">
            <h2 className="mb-4 text-sm font-medium text-[#1A2B35]">
              Recent Emails
            </h2>

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
                    className={`flex items-start gap-2.5 rounded-lg border p-3.5 transition-colors hover:border-[#BDD0DA] hover:bg-[#F4F6F7] ${
                      email.unread
                        ? "border-[#D1D9E0] bg-white"
                        : "border-[#E8ECF0] bg-white/60"
                    }`}
                  >
                    {email.unread && (
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4A7FA0]" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-sm ${
                          email.unread
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

        {/* Connected Accounts */}
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
    </div>
  )
}

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

function ShortcutButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-[#D1D9E0] bg-[#F4F6F7] p-3 text-sm font-medium text-[#2D4A5E] transition-colors hover:border-[#BDD0DA] hover:bg-[#EAF2F8]"
    >
      {label}
    </button>
  );
}

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

export default Page