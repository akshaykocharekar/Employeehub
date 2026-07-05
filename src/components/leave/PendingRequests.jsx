import Card from "../common/Card";

const statusClasses = {
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
  Approved:
    "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

// Guards against an unrecognized status silently rendering with no styling
const defaultStatusClass =
  "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const PendingRequests = ({ requests }) => {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
        Pending Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">
          No leave requests found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 text-left text-slate-600 dark:text-slate-300">
                  Leave Type
                </th>

                <th className="text-left text-slate-600 dark:text-slate-300">
                  Duration
                </th>

                <th className="text-left text-slate-600 dark:text-slate-300">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-slate-200 dark:border-slate-700"
                >
                  <td className="py-4 text-slate-800 dark:text-slate-100">
                    {request.type}
                  </td>

                  <td className="text-slate-800 dark:text-slate-100">
                    {formatDate(request.startDate)}
                    <br />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      to {formatDate(request.endDate)}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        statusClasses[request.status] ?? defaultStatusClass
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default PendingRequests;