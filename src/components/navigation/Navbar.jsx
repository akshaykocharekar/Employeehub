import { useState, useEffect, useRef } from "react";
import { Search, Bell, Moon, Sun, Menu } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

import profile from "../../data/profile.json";
import notifications from "../../data/notifications.json";

import NotificationPanel from "../notifications/NotificationPanel";

const Navbar = ({ setSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef(null);

  const { dark, toggleTheme } = useTheme();

  const unread = notifications.filter((n) => !n.read).length;
  const unreadLabel = unread > 9 ? "9+" : unread;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("");

  // Close notification panel on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close notification panel with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 md:px-6 lg:px-8">
      {/* Left Section */}
      <div className="flex flex-1 items-center gap-3">
        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu size={24} className="dark:text-slate-200" />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />

          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-800"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="ml-4 flex items-center gap-2 md:gap-4 lg:gap-6">
        {/* Date */}
        <p className="hidden text-sm text-slate-500 dark:text-slate-400 lg:block">
          {today}
        </p>

        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowNotifications((prev) => !prev);
            }}
            aria-label={`Notifications${unread > 0 ? ` (${unread} unread)` : ""}`}
            className="relative rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Bell size={22} className="dark:text-slate-200" />

            {unread > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                {unreadLabel}
              </span>
            )}
          </button>

          {showNotifications && (
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {dark ? (
            <Sun size={22} className="text-amber-400" />
          ) : (
            <Moon size={22} className="text-slate-700" />
          )}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white dark:bg-indigo-500">
            {initials}
          </div>

          <div className="hidden md:block">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {profile.name}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {profile.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;