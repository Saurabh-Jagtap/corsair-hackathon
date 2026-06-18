type Email = {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  unread: boolean;
};

type EmailCardProps = {
  email: Email;
};

function formatEmailDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.toDateString() === yesterday.toDateString();

  if (isYesterday) {
    return "Yesterday";
  }

  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays < 7) {
    return date.toLocaleDateString([], {
      weekday: "short",
    });
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

function getInitials(from: string): string {
  const namePart = from.split("<")[0].trim();
  const source = namePart.length > 0 ? namePart : from;
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getDisplayName(from: string): string {
  const namePart = from.split("<")[0].trim();
  return namePart.length > 0 ? namePart : from;
}

export function EmailCard({ email }: EmailCardProps) {
  const initials = getInitials(email.from);
  const displayName = getDisplayName(email.from);

  return (
    <div
      className={`
        group flex items-start gap-3 rounded-lg border p-4 transition-colors
        ${
          email.unread
            ? "border-[#D1D9E0] bg-white"
            : "border-[#E8ECF0] bg-white/60"
        }
        hover:border-[#BDD0DA] hover:bg-[#EDF0F3]
      `}
    >
      {/* Unread indicator bar */}
      <div
        className={`mt-1 h-[calc(100%-0.5rem)] w-[3px] self-stretch rounded-full ${
          email.unread ? "bg-[#4A7FA0]" : "bg-transparent"
        }`}
      />

      {/* Avatar */}
      <div
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
          email.unread
            ? "bg-[#EAF2F8] text-[#2D4A5E]"
            : "bg-[#E8ECF0] text-[#7A8B96]"
        }`}
      >
        {initials}
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center justify-between gap-2">
          <span
            className={`truncate text-sm ${
              email.unread
                ? "font-medium text-[#1A2B35]"
                : "font-normal text-[#4A5568]"
            }`}
          >
            {displayName}
          </span>
          <div className="flex flex-shrink-0 items-center gap-2">
            {email.unread && (
              <span className="rounded-full bg-[#EAF2F8] px-2 py-0.5 text-[10px] font-medium text-[#2D4A5E]">
                New
              </span>
            )}
            <span className="text-[11px] text-[#7A8B96]">{formatEmailDate(email.date)}</span>
          </div>
        </div>

        <p
          className={`truncate text-sm ${
            email.unread ? "font-medium text-[#1A2B35]" : "text-[#4A5568]"
          }`}
        >
          {email.subject}
        </p>

        <p className="truncate text-xs text-[#7A8B96]">{email.snippet}</p>
      </div>
    </div>
  );
}