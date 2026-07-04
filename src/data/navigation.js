import {
  LayoutDashboard,
  CalendarDays,
  CalendarClock,
  Users,
  Megaphone,
  User,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: CalendarDays,
  },
  {
    title: "Leave",
    path: "/leave",
    icon: CalendarClock,
  },
  {
    title: "Team",
    path: "/team",
    icon: Users,
  },
  {
    title: "Announcements",
    path: "/announcements",
    icon: Megaphone,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];