import attendance from "../../data/attendance.json";

import Card from "../common/Card";
import SectionHeader from "../ui/SectionHeader";

const statusConfig = {
  Present: {
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
  Absent: {
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  },
  Leave: {
    dot: "bg-amber-500",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  },
  Late: {
    dot: "bg-orange-500",
    badge:
      "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
  },
};

// Fallback so an unrecognized status never silently renders with no styling
const defaultStatus = {
  dot: "bg-slate-400",
  badge:
    "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400",
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
    full: date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
};

const AttendanceOverview = () => {
  const recentAttendance = [...attendance].reverse().slice(0, 6);

  return (
    <Card>
      <SectionHeader title="Recent Attendance" />

      {recentAttendance.length === 0 ? (
        <div className="mt-6 flex items-center justify-center py-8 text-sm text-slate-400 dark:text-slate-500">
          No attendance records yet
        </div>
      ) : (
        <div className="mt-6 divide-y divide-slate-200 dark:divide-slate-700">
          {recentAttendance.map((item) => {
            const style = statusConfig[item.status] ?? defaultStatus;
            const formatted = formatDate(item.date);

            return (
              <div
                key={item.date}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">
                    {typeof formatted === "string" ? formatted : formatted.full}
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {typeof formatted === "string"
                      ? "Attendance Record"
                      : formatted.weekday}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${style.badge}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default AttendanceOverview;