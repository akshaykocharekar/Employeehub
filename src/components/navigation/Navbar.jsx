
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
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
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
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 lg:px-8">
      {/* Left Section */}
      <div className="flex flex-1 items-center gap-3">
        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl p-2 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="ml-4 flex items-center gap-2 md:gap-4 lg:gap-6">
        {/* Date */}
        <p className="hidden text-sm text-slate-500 lg:block">
          {today}
        </p>

        {/* Notifications */}
        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowNotifications((prev) => !prev);
            }}
            className="relative rounded-xl p-2 transition hover:bg-slate-100"
          >
            <Bell size={22} />

            {unread > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unread}
              </span>
            )}
          </button>

          {showNotifications && (
  <NotificationPanel
    onClose={() => setShowNotifications(false)}
  />
)}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-xl p-2 transition hover:bg-slate-100"
        >
          {dark ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
            {initials}
          </div>

          <div className="hidden md:block">
            <h3 className="font-semibold">
              {profile.name}
            </h3>

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

