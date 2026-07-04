import notifications from "../../data/notifications.json";

const NotificationPanel = () => {
  return (
    <div className="absolute right-0 top-14 z-50 w-96 overflow-hidden rounded-2xl border bg-white shadow-xl">
      <div className="border-b p-4">
        <h2 className="font-semibold">Notifications</h2>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`border-b p-4 transition hover:bg-slate-50 ${
              !item.read ? "bg-indigo-50" : ""
            }`}
          >
            <div className="flex justify-between">
              <h3 className="font-medium">{item.title}</h3>

              {!item.read && (
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500">
              {item.description}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;