import Container from "../components/common/Container";
import PageHeader from "../components/ui/PageHeader";

import AttendanceSummary from "../components/attendance/AttendanceSummary";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import AttendanceTable from "../components/attendance/AttendanceTable";

const Attendance = () => {
  return (
    <Container>
      <PageHeader
        title="Attendance"
        subtitle="Track your attendance history"
      />

      <AttendanceSummary />

      <div className="mt-8">
        <AttendanceChart />
      </div>

      <div className="mt-8">
        <AttendanceTable />
      </div>
    </Container>
  );
};

export default Attendance;