import attendance from "../data/attendance.json";
import leave from "../data/leave.json";
import team from "../data/team.json";
import announcements from "../data/announcements.json";

export const getBotReply = (message) => {
  const text = message.toLowerCase();

  if (text.includes("attendance")) {
    const present = attendance.filter(
      (a) => a.status === "Present"
    ).length;

    return `You were present ${present} days this month.`;
  }

  if (text.includes("leave")) {
    const remaining = leave.leaveBalance.reduce(
      (sum, item) => sum + (item.total - item.used),
      0
    );

    return `You have ${remaining} leave days remaining.`;
  }

  if (
    text.includes("team") ||
    text.includes("employee")
  ) {
    return `There are ${team.length} employees in your company.`;
  }

  if (
    text.includes("announcement") ||
    text.includes("news")
  ) {
    return announcements[0].title;
  }

  return "I couldn't understand that. Gemini support coming soon.";
};