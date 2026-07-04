import { Bot, User } from "lucide-react";

const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex items-end gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white">
          <Bot size={18} />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "rounded-br-md bg-indigo-600 text-white"
            : "rounded-bl-md border border-slate-200 bg-slate-100 text-slate-800"
        }`}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-6">
          {message.text}
        </p>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-white">
          <User size={18} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;