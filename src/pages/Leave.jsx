import { useMemo, useState } from "react";
import { CalendarClock } from "lucide-react";

import leaveData from "../data/leave.json";

import Container from "../components/common/Container";
import PageHeader from "../components/ui/PageHeader";

import LeaveSummary from "../components/leave/LeaveSummary";
import LeaveForm from "../components/leave/LeaveForm";
import PendingRequests from "../components/leave/PendingRequests";

const Leave = () => {
  const [requests, setRequests] = useState(
    leaveData.pendingRequests
  );

  const pendingCount = useMemo(
    () =>
      requests.filter(
        (request) => request.status === "Pending"
      ).length,
    [requests]
  );

  return (
    <Container>
      <PageHeader
        title="Leave Management"
        subtitle="Manage leave requests and balances"
      />

      <LeaveSummary />

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <LeaveForm
            setRequests={setRequests}
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-600 p-3 text-white">
                <CalendarClock size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Pending Requests
                </p>

                <h2 className="text-3xl font-bold text-indigo-700">
                  {pendingCount}
                </h2>
              </div>
            </div>
          </div>

          <PendingRequests
            requests={requests}
          />
        </div>
      </div>
    </Container>
  );
};

export default Leave;