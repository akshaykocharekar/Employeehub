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
        <div
          className="
            flex h-8 w-8 shrink-0 items-center justify-center
            rounded-full bg-indigo-600 text-white
            sm:h-9 sm:w-9
          "
        >
          <Bot size={16} className="sm:h-[18px] sm:w-[18px]" />
        </div>
      )}

      <div
        className={`
          max-w-[90%] sm:max-w-[80%]
          rounded-2xl
          px-3 py-2.5
          sm:px-4 sm:py-3
          shadow-sm
          ${
            isUser
              ? "rounded-br-md bg-indigo-600 text-white"
              : "rounded-bl-md border border-slate-200 bg-slate-100 text-slate-800"
          }
        `}
      >
        <p
          className="
            whitespace-pre-wrap
            break-words
            break-all
            text-sm
            leading-6
            sm:text-[15px]
          "
        >
          {message.text}
        </p>
      </div>

      {isUser && (
        <div
          className="
            flex h-8 w-8 shrink-0 items-center justify-center
            rounded-full bg-slate-700 text-white
            sm:h-9 sm:w-9
          "
        >
          <User size={16} className="sm:h-[18px] sm:w-[18px]" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;