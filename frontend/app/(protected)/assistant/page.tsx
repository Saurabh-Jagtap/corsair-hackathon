"use client"
import { QUICK_ACTIONS } from '@/app/constants/assistant';
import { useSession } from '@/utils/auth-client';
import { useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const hasAutoRun = useRef(false);
  const searchParams = useSearchParams();
  const router = useRouter()

  const sendMessage = async (prompt: string) => {
    try {
      setLoading(true);
      if (!session) {
        throw new Error(
          "Unauthorized"
        );
      }

      const res = await fetch(
        "http://localhost:8000/api/assistant/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",

            "x-user-id": session.user.id,
          },

          body: JSON.stringify({
            message: prompt,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error("Request failed")
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: data.answer,
        },
      ]);

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const prompt =
      searchParams.get("prompt");

    if (!prompt) return;

    if (hasAutoRun.current) return;

    hasAutoRun.current = true;

    sendMessage(prompt);

    router.replace("/assistant");
  }, [searchParams, router]);

  return (
    <div className="flex h-screen bg-[#E8ECF0] font-sans text-[#1A2B35]">

      {/* Assistant Chat Area */}
      <main className="flex-1 flex flex-col bg-[#F4F6F7] min-w-0">
        {/* Assistant Header */}
        <header className="px-6 py-3.5 border-b border-[#D1D9E0] bg-[#F4F6F7]">
          <h1 className="text-[13px] font-medium text-[#1A2B35]">Assistant</h1>
        </header>

        {/* Quick Action Chips */}
        <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2 border-b border-[#D1D9E0]">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => sendMessage(action.prompt)}
              disabled={loading}
              className="text-[12px] text-[#2D4A5E] bg-[#EAF2F8] border border-[#C5DCE9] px-3 py-1.5 rounded-full hover:bg-[#DCEAF3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-4">
          {messages.length === 0 && !loading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="mb-2 text-lg font-medium text-[#1A2B35]">
                  Your AI Executive Assistant
                </h2>

                <p className="max-w-md text-sm text-[#7A8B96]">
                  Manage emails, schedule meetings, summarize your inbox,
                  and coordinate your calendar from a single conversation.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "user" ? (
                <div className="max-w-[78%] bg-[#2D4A5E] text-[#DCE7EE] text-[13px] leading-relaxed px-4 py-2.5 rounded-2xl rounded-br-sm whitespace-pre-wrap">
                  {msg.content}
                </div>
              ) : (
                <div className="max-w-[70%] text-[13px] leading-relaxed text-[#1A2B35] whitespace-pre-wrap">
                  {msg.content}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 text-[12px] text-[#7A8B96] bg-[#E8ECF0] px-3 py-2 rounded-lg">
                <span className="w-1 h-1 rounded-full bg-[#9AA8B2] animate-pulse" />
                <span className="w-1 h-1 rounded-full bg-[#9AA8B2] animate-pulse [animation-delay:150ms]" />
                <span className="w-1 h-1 rounded-full bg-[#9AA8B2] animate-pulse [animation-delay:300ms]" />
                <span className="ml-1">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
            setInput("");
          }}
          className="sticky bottom-0 px-6 py-4 border-t border-[#D1D9E0] bg-[#F4F6F7] backdrop-blur"
        >
          <div className="flex items-center gap-3 rounded-2xl border-2 border-[#BDD0DA] bg-white px-5 py-3 shadow-sm">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Triagent to manage email, schedule meetings, or plan your day..."
              className="flex-1 bg-transparent text-sm text-[#1A2B35] outline-none placeholder:text-[#7A8B96]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-10 w-10 rounded-xl bg-[#2D4A5E] flex items-center justify-center shrink-0 transition-all hover:bg-[#26404F] hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F4F6F7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Page