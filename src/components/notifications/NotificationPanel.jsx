import { X } from "lucide-react";

import notifications from "../../data/notifications.json";

const NotificationPanel = ({ onClose }) => {
  return (
    <div
      className="
        fixed inset-0 z-50
        bg-white

        sm:absolute
        sm:inset-auto
        sm:top-14
        sm:right-0
        sm:h-auto
        sm:w-[380px]
        sm:overflow-hidden
        sm:rounded-2xl
        sm:border
        sm:border-slate-200
        sm:bg-white
        sm:shadow-2xl

        dark:bg-slate-900
        dark:sm:border-slate-700
      "
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-900">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Notifications
          </h2>

          <p className="text-sm text-slate-500">
            {notifications.length} notifications
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800 sm:hidden"
        >
          <X size={22} />
        </button>
      </div>

      {/* List */}
      <div className="h-[calc(100vh-76px)] overflow-y-auto sm:h-auto sm:max-h-[480px]">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="border-b border-slate-100 px-5 py-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <div className="flex items-start gap-3">
              {!item.read && (
                <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-600" />
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="truncate font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <span className="shrink-0 text-xs text-slate-400">
                    {item.time}
                  </span>
                </div>

                <p className="mt-2 break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <div>
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200">
                You're all caught up 🎉
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                You don't have any new notifications.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;