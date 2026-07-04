import Container from "../components/common/Container";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import AttendanceOverview from "../components/dashboard/AttendanceOverview";
import AnnouncementsPanel from "../components/dashboard/AnnouncementsPanel";
import QuickActions from "../components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <Container>
      <DashboardHeader />

      <div className="mt-8">
        <StatsGrid />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-12">
        {/* Left */}
        <div className="space-y-6 xl:col-span-8">
          <AttendanceChart />

          <AttendanceOverview />
        </div>

        {/* Right */}
        <div className="space-y-6 xl:col-span-4">
          <AnnouncementsPanel />

          <QuickActions />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;