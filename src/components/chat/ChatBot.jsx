import { useEffect, useRef, useState } from "react";
import { Bot, LoaderCircle, MessageCircle, Sparkles, X } from "lucide-react";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

import { askHR } from "../../services/ai";

import attendance from "../../data/attendance.json";
import leave from "../../data/leave.json";
import team from "../../data/team.json";
import announcements from "../../data/announcements.json";
import profile from "../../data/profile.json";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `👋 Hi ${profile.name.split(" ")[0]}!

I'm your EmployeeHub AI Assistant.

Try asking me things like:

• How many leave days do I have?
• Summarize today's announcements
• What's my attendance?
• Tell me about my team`,
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const context = `
Employee:
${JSON.stringify(profile)}

Attendance:
${JSON.stringify(attendance)}

Leave:
${JSON.stringify(leave)}

Team:
${JSON.stringify(team)}

Announcements:
${JSON.stringify(announcements)}
`;

  const send = async (text) => {
    const userMessage = {
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const reply = await askHR(text, context);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Gemini is unavailable right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-indigo-600 p-4 text-white shadow-2xl transition hover:scale-105"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[600px] w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-3">
              <Bot />

              <div>
                <h2 className="font-semibold">
                  EmployeeHub AI
                </h2>

                <p className="text-xs text-slate-500">
                  Gemini 2.5 Flash
                </p>
              </div>
            </div>

            <Sparkles
              size={18}
              className="text-indigo-600"
            />
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
              />
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <LoaderCircle className="animate-spin" size={18} />
                Thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <ChatInput onSend={send} />
        </div>
      )}
    </>
  );
};

export default ChatBot;