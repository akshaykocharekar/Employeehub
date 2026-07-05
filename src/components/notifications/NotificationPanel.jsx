import notifications from "../../data/notifications.json";

const NotificationPanel = () => {
  return (
    <div
      className="
        absolute
        right-2
        top-14
        z-50
        w-[calc(100vw-1rem)]
        max-w-sm
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-2xl

        sm:right-0
        sm:w-96

        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Notifications
        </h2>
      </div>

      {/* Notification List */}
      <div className="max-h-[70vh] overflow-y-auto">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`
              border-b
              border-slate-100
              p-4
              transition-all
              duration-200

              hover:bg-slate-50
              dark:border-slate-700
              dark:hover:bg-slate-800

              ${
                !item.read
                  ? "bg-indigo-50 dark:bg-indigo-500/10"
                  : "bg-white dark:bg-slate-900"
              }
            `}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>

                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                  {item.time}
                </p>
              </div>

              {!item.read && (
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-600" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;