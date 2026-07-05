
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
import { getWeeklyAttendance } from "../../utils/chartUtils";

const CustomTooltip = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <p className="text-sm font-semibold text-slate-800">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-indigo-600" />

        <span className="text-sm text-slate-600">
          Present Employees
        </span>
      </div>

      <p className="mt-1 text-2xl font-bold text-indigo-600">
        {payload[0].value}
      </p>
    </div>
  );
};

const AttendanceChart = () => {
  const data = getWeeklyAttendance();

  const average =
    Math.round(
      data.reduce(
        (sum, item) => sum + item.present,
        0
      ) / data.length
    );

  return (
    <Card>
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Weekly attendance trend for the
            current month
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Average Attendance
          </p>

          <div className="mt-1 flex items-end gap-2">
            <h3 className="text-3xl font-bold text-slate-900">
              {average}
            </h3>

            <span className="mb-1 text-sm font-medium text-emerald-600">
              ↑ 4.8%
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}

      <ResponsiveContainer
        width="100%"
        height={340}
      >
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            stroke="#E2E8F0"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="week"
            tick={{
              fill: "#64748B",
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{
              fill: "#94A3B8",
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{
              fill: "#EEF2FF",
            }}
            content={<CustomTooltip />}
          />

```jsx id="8s0m4x"
          <Bar
            dataKey="present"
            fill="#6366F1"
            radius={[10, 10, 0, 0]}
            barSize={38}
            animationDuration={700}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AttendanceChart;

