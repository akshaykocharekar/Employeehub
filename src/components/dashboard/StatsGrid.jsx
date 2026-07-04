import {
  CalendarCheck2,
  CalendarClock,
  Megaphone,
  TrendingUp,
  Users,
} from "lucide-react";

import StatsCard from "./StatsCard";
import { getDashboardStats } from "../../utils/dashboardUtils";

const StatsGrid = () => {
  const stats = getDashboardStats();

  const cards = [
    {
      title: "Attendance",
      value: `${stats.attendancePercentage}%`,
      subtitle: `${stats.presentDays}/${stats.totalDays} Present`,
      Icon: CalendarCheck2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Leave Balance",
      value: stats.leaveRemaining,
      subtitle: "Days Remaining",
      Icon: CalendarClock,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Employees",
      value: stats.employeeCount,
      subtitle: "Active Employees",
      Icon: Users,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Announcements",
      value: stats.announcementCount,
      subtitle: "Latest Updates",
      Icon: Megaphone,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatsCard
          key={card.title}
          {...card}
          trend={
            card.title === "Attendance" ? (
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp size={14} />
                Healthy attendance
              </div>
            ) : null
          }
        />
      ))}
    </div>
  );
};

export default StatsGrid;