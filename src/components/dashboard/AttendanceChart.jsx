import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import Card from "../common/Card";
import { getWeeklyAttendance } from "../../utils/chartUtils";

const COLORS = [
  "#6366F1",
  "#7C3AED",
  "#8B5CF6",
  "#A855F7",
  "#C084FC",
];

const AttendanceChart = () => {
  const data = getWeeklyAttendance();

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Weekly attendance for the current month
          </p>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={340}
      >
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -15,
            bottom: 0,
          }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{
              fill: "#EEF2FF",
            }}
            contentStyle={{
              borderRadius: 12,
              border: "none",
              boxShadow:
                "0 10px 25px rgba(0,0,0,.08)",
            }}
          />

          <Bar
            dataKey="present"
            radius={[10, 10, 0, 0]}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[index % COLORS.length]
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AttendanceChart;