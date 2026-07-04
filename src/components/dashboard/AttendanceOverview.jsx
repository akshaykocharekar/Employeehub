import attendance from "../../data/attendance.json";

import Card from "../common/Card";
import SectionHeader from "../ui/SectionHeader";

const statusConfig = {
  Present: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
  Absent: {
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700",
  },
  Leave: {
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  Late: {
    dot: "bg-orange-500",
    badge: "bg-orange-100 text-orange-700",
  },
};

const AttendanceOverview = () => {
  const recentAttendance = [...attendance]
    .reverse()
    .slice(0, 6);

  return (
    <Card>
      <SectionHeader title="Recent Attendance" />

      <div className="mt-6 divide-y divide-slate-200 dark:divide-slate-700">
        {recentAttendance.map((item) => (
          <div
            key={item.date}
            className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
          >
            <div>
              <p className="font-medium text-slate-800 dark:text-white">
                {item.date}
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Attendance Record
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${statusConfig[item.status]?.dot}`}
              />

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  statusConfig[item.status]?.badge
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AttendanceOverview;