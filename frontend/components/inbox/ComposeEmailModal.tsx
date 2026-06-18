import { useSession } from "@/utils/auth-client";
import { useState } from "react";


type Props = {
    open: boolean;
    onClose: () => void;
};

export const ComposeEmailModal = ({open, onClose}: Props) => {
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">

    <div className="w-full max-w-xl rounded-xl bg-white p-6">

      <h2 className="mb-4 text-lg font-semibold">
        Compose Email
      </h2>

      <input
        value={to}
        onChange={(e) =>
          setTo(e.target.value)
        }
        placeholder="To"
        className="mb-3 w-full rounded-lg border p-3"
      />

      <input
        value={subject}
        onChange={(e) =>
          setSubject(
            e.target.value
          )
        }
        placeholder="Subject"
        className="mb-3 w-full rounded-lg border p-3"
      />

      <textarea
        rows={8}
        value={body}
        onChange={(e) =>
          setBody(
            e.target.value
          )
        }
        placeholder="Write your email..."
        className="mb-4 w-full rounded-lg border p-3"
      />

      <div className="flex justify-end gap-2">

        <button
          onClick={onClose}
          className="cursor-pointer rounded-lg border px-4 py-2 font-medium text-black transition-colors hover:bg-[#eae8e8]"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          onClick={sendEmail}
          className="cursor-pointer rounded-lg bg-[#1A2B35] px-4 py-2 font-medium text-white transition-colors hover:bg-[#243A47]"
        >
          {loading
            ? "Sending..."
            : "Send Email"}
        </button>

      </div>

    </div>

  </div>
);
}


