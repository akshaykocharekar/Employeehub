import {
  CalendarCheck2,
  CalendarClock,
  Users,
  Megaphone,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Attendance",
    value: "91%",
    subtitle: "21 of 23 days",
    Icon: CalendarCheck2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Leave Balance",
    value: "27",
    subtitle: "Days Remaining",
    Icon: CalendarClock,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Team Members",
    value: "10",
    subtitle: "Across 5 Departments",
    Icon: Users,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Announcements",
    value: "3",
    subtitle: "Latest Updates",
    Icon: Megaphone,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
];