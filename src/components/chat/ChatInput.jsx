import { useState } from "react";
import { SendHorizonal } from "lucide-react";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;

    await onSend(text);

    setText("");
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
    }
  };

  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask EmployeeHub AI..."
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
        />

        <button
          onClick={sendMessage}
          disabled={!text.trim()}
          className="rounded-xl bg-indigo-600 p-3 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;