import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { navigation } from "../../data/navigation";
import { Building2, X } from "lucide-react";

import {
  SIDEBAR_WIDTH,
  APP_NAME,
  APP_SUBTITLE,
} from "../../utils/constants";

const Sidebar = ({ open, setOpen }) => {
  // Close mobile sidebar with Escape, matching Navbar's notification panel behavior
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [setOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        style={{ width: SIDEBAR_WIDTH }}
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          h-screen
          flex-col
          border-r
          border-slate-200
          bg-white
          shadow-lg
          transition-transform
          duration-300
          dark:border-slate-800
          dark:bg-slate-900
          dark:shadow-black/40

          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2 text-white dark:bg-indigo-500">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {APP_NAME}
              </h1>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {APP_SUBTITLE}
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-2 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 overflow-y-auto px-3 pb-6">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Desktop Spacer */}
      <div
        style={{ width: SIDEBAR_WIDTH }}
        className="hidden shrink-0 lg:block"
      />
    </>
  );
};

export default Sidebar;