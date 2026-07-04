import profile from "../../data/profile.json";

const DashboardHeader = () => {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-800">
        {greeting}, {profile.name.split(" ")[0]} 👋
      </h1>

      <p className="mt-2 text-slate-500">
        Welcome back! Here's what's happening today.
      </p>
    </div>
  );
};

export default DashboardHeader;