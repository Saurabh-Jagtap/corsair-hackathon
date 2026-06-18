"use client";

import { Inbox as InboxIcon, Search } from "lucide-react";
import { EmailCard } from "@/components/inbox/EmailCard";
import { useEmails } from "@/hooks/useEmails";
import { useState } from "react";
import { ComposeEmailModal } from "@/components/inbox/ComposeEmailModal";

type Email = {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  unread: boolean;
};

function EmailSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[#E8ECF0] bg-white p-4">
      <div className="mt-1 h-9 w-[3px] rounded-full bg-[#E8ECF0]" />
      <div className="h-9 w-9 flex-shrink-0 animate-pulse rounded-full bg-[#E8ECF0]" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="h-3 w-32 animate-pulse rounded bg-[#E8ECF0]" />
          <div className="h-3 w-12 animate-pulse rounded bg-[#E8ECF0]" />
        </div>
        <div className="h-3 w-3/4 animate-pulse rounded bg-[#E8ECF0]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[#E8ECF0]" />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <EmailSkeleton key={i} />
      ))}
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-[#E8ECF0] bg-white py-16 text-center">
      <p className="text-sm font-medium text-[#1A2B35]">
        Failed to load emails
      </p>
      <p className="mt-1 text-xs text-[#7A8B96]">
        Something went wrong while fetching your inbox.
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-[#E8ECF0] bg-white py-16 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2F8]">
        <InboxIcon className="h-5 w-5 text-[#4A7FA0]" />
      </div>
      <p className="text-sm font-medium text-[#1A2B35]">
        Your inbox is empty
      </p>
      <p className="mt-1 text-xs text-[#7A8B96]">
        New emails from your connected accounts will show up here.
      </p>
    </div>
  );
}

const InboxPage = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useEmails();

  const emails: Email[] = data?.data ?? [];

  const filteredEmails = emails.filter(
    (email) =>
      email.subject
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      email.from
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-full bg-[#F4F6F7]">
      <div className="mx-auto max-w-5xl px-6 py-6">
        {/* Header */}
        <div className="mb-5 rounded-lg border border-[#D1D9E0] bg-white px-5 py-4">
          <h1 className="text-xl font-medium text-[#1A2B35]">Inbox</h1>
          <p className="mt-0.5 text-xs text-[#7A8B96]">
            Recent emails from connected accounts
          </p>
        </div>

        {/* Search bar (UI only) */}
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-[#D1D9E0] bg-white px-3 py-2.5">
          <Search className="h-4 w-4 flex-shrink-0 text-[#7A8B96]" />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search emails..."
            className="w-full bg-transparent text-sm text-[#1A2B35] placeholder:text-[#7A8B96] focus:outline-none"
          />
          <button
            onClick={() => setOpen(true)}
            className="cursor-pointer rounded-lg bg-[#1A2B35] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#243A47]"
          >
            Compose
          </button>
        </div>

        {/* Email list */}
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : emails.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {filteredEmails.map((email) => (
              <EmailCard key={email.id} email={email} />
            ))}
          </div>
        )}
      </div>
      <ComposeEmailModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </div>
  );
};

export default InboxPage;