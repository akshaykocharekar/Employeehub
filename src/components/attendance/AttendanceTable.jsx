
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import Card from "../common/Card";

import attendance from "../../data/attendance.json";

import AttendanceRow from "./AttendanceRow";

const AttendanceTable = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return attendance.filter((item) =>
      item.date.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Card>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Attendance Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and search employee attendance history.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
            {filtered.length} Records
          </span>

          <div className="relative w-full md:w-72">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <AttendanceRow
                    key={item.date}
                    item={item}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="py-16 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <Search
                        size={36}
                        className="mb-3 text-slate-300"
                      />

                      <h3 className="font-medium text-slate-700">
                        No attendance found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Try searching with another date.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default AttendanceTable;

