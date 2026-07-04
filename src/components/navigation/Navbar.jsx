import { useState } from "react";
import { Search, Bell, Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

import profile from "../../data/profile.json";
import notifications from "../../data/notifications.json";

import NotificationPanel from "../notifications/NotificationPanel";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const { dark, toggleTheme } = useTheme();

  const unread = notifications.filter((n) => !n.read).length;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const initials = profile.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none"
        />
      </div>

      <div className="flex items-center gap-6">
        <p className="text-sm text-slate-500">{today}</p>

        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative rounded-xl p-2 hover:bg-slate-100"
          >
            <Bell size={22} />

            {unread > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unread}
              </span>
            )}
          </button>

          {showNotifications && <NotificationPanel />}
        </div>

        <button
          onClick={toggleTheme}
          className="rounded-xl p-2 hover:bg-slate-100"
        >
          {dark ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
            {initials}
          </div>

          <div>
            <h3 className="font-semibold">{profile.name}</h3>

            <p className="text-sm text-slate-500">
              {profile.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;