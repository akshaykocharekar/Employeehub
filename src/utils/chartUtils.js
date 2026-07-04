import attendance from "../data/attendance.json";

export const getWeeklyAttendance = () => {
  const weeks = [
    { week: "Week 1", present: 0 },
    { week: "Week 2", present: 0 },
    { week: "Week 3", present: 0 },
    { week: "Week 4", present: 0 },
    { week: "Week 5", present: 0 },
  ];

  attendance.forEach((record) => {
    if (record.status !== "Present") return;

    const day = Number(record.date.split("-")[2]);
    const weekIndex = Math.floor((day - 1) / 7);

    if (weeks[weekIndex]) {
      weeks[weekIndex].present++;
    }
  });

  return weeks.filter((week) => week.present > 0);
};