const colors = {
  Present:
    "bg-green-100 text-green-700",

  Absent:
    "bg-red-100 text-red-700",

  Leave:
    "bg-yellow-100 text-yellow-700",

  Late:
    "bg-orange-100 text-orange-700",
};

const AttendanceRow = ({ item }) => {
  return (
    <tr className="border-b">
      <td className="px-6 py-4">
        {item.date}
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${colors[item.status]}`}
        >
          {item.status}
        </span>
      </td>
    </tr>
  );
};

export default AttendanceRow;