import {
  CalendarCheck2,
  CalendarX2,
  CalendarClock,
} from "lucide-react";

import Card from "../common/Card";
import attendance from "../../data/attendance.json";

const AttendanceSummary = () => {
  const present = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absent = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const leave = attendance.filter(
    (item) => item.status === "Leave"
  ).length;

  const cards = [
    {
      title: "Present",
      value: present,
      icon: CalendarCheck2,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Absent",
      value: absent,
      icon: CalendarX2,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      title: "Leave",
      value: leave,
      icon: CalendarClock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-xl p-3 ${card.bg}`}
              >
                <Icon
                  className={card.color}
                  size={26}
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AttendanceSummary;