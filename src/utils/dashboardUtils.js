import attendance from "../data/attendance.json";
import leave from "../data/leave.json";
import team from "../data/team.json";
import announcements from "../data/announcements.json";

export const getDashboardStats = () => {
  const totalDays = attendance.length;

  const presentDays = attendance.filter(
    (day) => day.status === "Present"
  ).length;

  const attendancePercentage = Math.round(
    (presentDays / totalDays) * 100
  );

  const leaveRemaining = leave.leaveBalance.reduce(
    (total, item) => total + (item.total - item.used),
    0
  );

  return {
    attendancePercentage,
    presentDays,
    totalDays,
    leaveRemaining,
    employeeCount: team.length,
    announcementCount: announcements.length,
  };
};