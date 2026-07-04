import Card from "../common/Card";

const statusClasses = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const PendingRequests = ({ requests }) => {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Pending Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-slate-500">
          No leave requests found.
        </p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">
                Leave Type
              </th>

              <th className="text-left">
                Duration
              </th>

              <th className="text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr
                key={request.id}
                className="border-b"
              >
                <td className="py-4">
                  {request.type}
                </td>

                <td>
                  {request.startDate}
                  <br />
                  <span className="text-sm text-slate-500">
                    to {request.endDate}
                  </span>
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      statusClasses[
                        request.status
                      ]
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
};

export default PendingRequests;