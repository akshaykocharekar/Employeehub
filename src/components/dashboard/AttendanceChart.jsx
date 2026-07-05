import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import Card from "../common/Card";
import { useTheme } from "../../context/ThemeContext";
import { getWeeklyAttendance } from "../../utils/chartUtils";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-800">
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-indigo-600 dark:bg-indigo-400" />
        <span className="text-sm text-slate-600 dark:text-slate-300">
          Days Present
        </span>
      </div>

      <p className="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        {payload[0].value}
      </p>
    </div>
  );
};

const AttendanceChart = () => {
  const { dark } = useTheme();
  const data = getWeeklyAttendance();

  const hasData = data.length > 0;

  const average = hasData
    ? Math.round(
        data.reduce((sum, item) => sum + item.present, 0) / data.length
      )
    : 0;

  // Real trend: compare the most recent week against the one before it,
  // instead of a hardcoded percentage.
  const trend = (() => {
    if (data.length < 2) return null;
    const last = data[data.length - 1].present;
    const prev = data[data.length - 2].present;
    if (prev === 0) return null;
    const change = ((last - prev) / prev) * 100;
    return Math.round(change * 10) / 10;
  })();

  // Recharts needs actual color values, not Tailwind classes,
  // so we branch on theme here rather than hardcoding light-mode hex.
  const gridColor = dark ? "#27272A" : "#E2E8F0";
  const axisTickColor = dark ? "#71717A" : "#64748B";
  const barColor = dark ? "#818CF8" : "#6366F1";
  const cursorFill = dark ? "#312E81" : "#EEF2FF";

  return (
    <Card>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Attendance Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Weekly attendance trend for the current month
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Average Attendance
          </p>

          <div className="mt-1 flex items-end gap-2">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              {average}
            </h3>

            {trend !== null && (
              <span
                className={`mb-1 text-sm font-medium ${
                  trend >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      {hasData ? (
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid
              stroke={gridColor}
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="week"
              tick={{ fill: axisTickColor, fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fill: axisTickColor, fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{ fill: cursorFill }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="present"
              fill={barColor}
              radius={[10, 10, 0, 0]}
              barSize={38}
              animationDuration={700}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-[340px] items-center justify-center text-sm text-slate-400 dark:text-slate-500">
          No attendance data available yet
        </div>
      )}
    </Card>
  );
};

export default AttendanceChart;