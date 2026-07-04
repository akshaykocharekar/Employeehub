import Card from "../common/Card";
import leave from "../../data/leave.json";

const LeaveSummary = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {leave.leaveBalance.map((item) => (
        <Card key={item.type}>
          <p className="text-sm text-slate-500">
            {item.type}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {item.total - item.used}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {item.used} used of {item.total}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default LeaveSummary;