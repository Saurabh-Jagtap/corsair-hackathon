import { useSession } from "@/utils/auth-client";
import { useState } from "react";


type Props = {
  open: boolean;
  onClose: () => void;
};

export const ComposeEmailModal = ({ open, onClose }: Props) => {
  const [to, setTo] = useState("");

  const [subject, setSubject] = useState("");

  const [body, setBody] = useState("");

  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = useSession()

  const sendEmail = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:8000/api/gmail/send",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",

            "x-user-id":
              session?.user.id ?? "",
          },

          body: JSON.stringify({
            to,
            subject,
            body,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.message ??
          "Failed"
        );

        return;
      }

      alert(
        "Email sent successfully"
      );

      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A2B35]/40 backdrop-blur-[2px] p-4">

      <div className="w-full max-w-xl rounded-xl bg-white border border-[#D1D9E0] shadow-xl shadow-[#1A2B35]/10 p-7 animate-[fadein_0.18s_ease-out]">

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-[19px] text-[#1A2B35]">
            Compose email
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#9AA8B2] hover:text-[#4A5568] transition-colors text-[18px] leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-5">
          <div>
            <label className="text-[12px] font-medium text-[#4A5568] mb-1.5 block">To</label>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@company.com"
              className="w-full rounded-md border border-[#D1D9E0] px-3.5 py-2.5 text-[14px] text-[#1A2B35] outline-none focus:border-[#4A7FA0] transition-colors placeholder:text-[#9AA8B2]"
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-[#4A5568] mb-1.5 block">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full rounded-md border border-[#D1D9E0] px-3.5 py-2.5 text-[14px] text-[#1A2B35] outline-none focus:border-[#4A7FA0] transition-colors placeholder:text-[#9AA8B2]"
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-[#4A5568] mb-1.5 block">Message</label>
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your email..."
              className="w-full rounded-md border border-[#D1D9E0] px-3.5 py-2.5 text-[14px] text-[#1A2B35] outline-none focus:border-[#4A7FA0] transition-colors placeholder:text-[#9AA8B2] resize-none leading-relaxed"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-4 border-t border-[#E8ECF0]">

          <button
            onClick={onClose}
            className="rounded-md border border-[#D1D9E0] px-4 py-2.5 text-[13px] font-medium text-[#4A5568] transition-colors hover:bg-[#e8e6e6]"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={sendEmail}
            className="rounded-md bg-[#2D4A5E] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#26404F] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send email"}
          </button>

        </div>

      </div>

      <style jsx global>{`
                @keyframes fadein {
                    from { opacity: 0; transform: translateY(4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

    </div>
  );
}