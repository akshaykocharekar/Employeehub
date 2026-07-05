import { useEffect, useRef, useState } from "react";
import {
  Bot,
  LoaderCircle,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";

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
      {/* Floating Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`
          fixed bottom-5 right-5 z-50
          rounded-full bg-indigo-600 p-4
          text-white shadow-2xl
          transition duration-300 hover:scale-105
          ${open ? "hidden sm:flex" : "flex"}
        `}
      >
        <MessageCircle size={24} />
      </button>

      {open && (
        <div
          className="
            fixed z-50 flex flex-col overflow-hidden
            bg-white shadow-2xl

            inset-0

            sm:inset-auto
            sm:bottom-24
            sm:right-6
            sm:h-[600px]
            sm:w-[380px]
            sm:rounded-2xl
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-indigo-100 p-2">
                <Bot
                  size={20}
                  className="text-indigo-600"
                />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  EmployeeHub AI
                </h2>

                <p className="text-xs text-slate-500">
                  Gemini 2.5 Flash
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 transition hover:bg-slate-100 sm:hidden"
            >
              <X size={22} />
            </button>

            <Sparkles
              size={18}
              className="hidden text-indigo-600 sm:block"
            />
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
              />
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
                Thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="bg-white">
            <ChatInput onSend={send} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;