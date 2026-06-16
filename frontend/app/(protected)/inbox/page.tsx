"use client";

import { EmailCard } from "@/components/inbox/EmailCard";
import { useEmails } from "@/hooks/useEmails";

type Email = {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  unread: boolean;
};

const InboxPage = () => {
  const { data, isLoading, error } = useEmails();

  if (isLoading) {
    return <div>Loading emails...</div>;
  }

  if (error) {
    return <div>Failed to load emails.</div>;
  }

  const emails: Email[] = data?.data ?? [];

  console.log(data)

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Inbox
      </h1>

      <input
        type="text"
        placeholder="Search emails..."
        className="w-full border rounded-lg p-3 mb-6"
      />

      <div className="space-y-4">
        {emails.map((email) => (
          <EmailCard
            key={email.id}
            email={email}
          />
        ))}
      </div>
    </div>
  );
};

export default InboxPage;