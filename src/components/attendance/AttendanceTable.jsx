import { useMemo, useState } from "react";

import Card from "../common/Card";
import Input from "../common/Input";

import attendance from "../../data/attendance.json";

import AttendanceRow from "./AttendanceRow";

const AttendanceTable = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return attendance.filter((item) =>
      item.date.includes(search)
    );
  }, [search]);

  return (
    <Card>
      <div className="mb-6">
        <Input
          placeholder="Search by date..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="px-6 py-4">
              Date
            </th>

            <th className="px-6 py-4">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item) => (
            <AttendanceRow
              key={item.date}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default AttendanceTable;