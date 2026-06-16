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

export const EmailCard = ({
  email
}: EmailCardProps) => {
  return (
    <div className="border rounded-xl p-4">
  <div className="flex justify-between">
    <h3 className="font-semibold">
      {email.subject}
    </h3>

    {email.unread && (
      <span className="text-xs px-2 py-1 rounded bg-blue-100">
        Unread
      </span>
    )}
  </div>

  <p className="text-sm text-gray-500 mt-1">
    {email.from}
  </p>

  <p className="text-sm mt-3">
    {email.snippet}
  </p>

  <p className="text-xs text-gray-400 mt-3">
    {new Date(email.date).toLocaleString()}
  </p>
</div>
  );
};