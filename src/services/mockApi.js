import attendance from "../data/attendance.json";
import leave from "../data/leave.json";
import team from "../data/team.json";
import announcements from "../data/announcements.json";
import profile from "../data/profile.json";

const delay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getAttendance = async () => {
  await delay();
  return attendance;
};

export const getLeave = async () => {
  await delay();
  return leave;
};

export const getTeam = async () => {
  await delay();
  return team;
};

export const getAnnouncements = async () => {
  await delay();
  return announcements;
};

export const getProfile = async () => {
  await delay();
  return profile;
};