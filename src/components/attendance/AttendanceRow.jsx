import { CalendarDays } from "lucide-react";

const statusStyles = {
  Present:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",

  Absent:
    "bg-red-50 text-red-700 border border-red-200",

  Leave:
    "bg-amber-50 text-amber-700 border border-amber-200",

  Late:
    "bg-orange-50 text-orange-700 border border-orange-200",
};

const AttendanceRow = ({ item }) => {
  return (
    <tr className="transition-colors duration-200 hover:bg-slate-50">
      {/* Date */}
      <td className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 sm:h-10 sm:w-10">
            <CalendarDays
              size={16}
              className="sm:h-[18px] sm:w-[18px]"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800 sm:text-base">
              {item.date}
            </p>

            <p className="text-xs text-slate-500">
              Attendance Record
            </p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-4 sm:px-6 sm:py-5">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm ${
            statusStyles[item.status]
          }`}
        >
          <span
            className={`mr-2 h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5 ${
              item.status === "Present"
                ? "bg-emerald-500"
                : item.status === "Absent"
                ? "bg-red-500"
                : item.status === "Leave"
                ? "bg-amber-500"
                : "bg-orange-500"
            }`}
          />

          {item.status}
        </span>
      </td>
    </tr>
  );
};

export default AttendanceRow;