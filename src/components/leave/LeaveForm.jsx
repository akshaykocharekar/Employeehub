import { useState } from "react";
import { CalendarDays, FileText, Send } from "lucide-react";
import toast from "react-hot-toast";

import Card from "../common/Card";
import Button from "../common/Button";

const today = new Date().toISOString().split("T")[0];

const LeaveForm = ({ setRequests }) => {
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    type: "Casual Leave",
    reason: "",
  });

  const handleChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.startDate || !form.endDate)
      return toast.error("Please select both dates.");

    if (form.startDate < today)
      return toast.error("Start date can't be in the past.");

    if (new Date(form.endDate) < new Date(form.startDate))
      return toast.error("End date must be after start date.");

    if (!form.reason.trim()) return toast.error("Reason is required.");

    setRequests((prev) => [
      {
        id: Date.now(),
        ...form,
        status: "Pending",
      },
      ...prev,
    ]);

    toast.success("Leave request submitted!");

    setForm({
      startDate: "",
      endDate: "",
      type: "Casual Leave",
      reason: "",
    });
  };

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Request Leave
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Submit your leave request for manager approval.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dates */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Start Date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              />

              <input
                id="startDate"
                type="date"
                name="startDate"
                min={today}
                value={form.startDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              End Date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              />

              <input
                id="endDate"
                type="date"
                name="endDate"
                min={form.startDate || today}
                value={form.endDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:bg-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Leave Type */}
        <div>
          <label
            htmlFor="type"
            className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            Leave Type
          </label>

          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:bg-slate-800"
          >
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Earned Leave</option>
          </select>
        </div>

        {/* Reason */}
        <div>
          <label
            htmlFor="reason"
            className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            Reason
          </label>

          <div className="relative">
            <FileText
              size={18}
              className="absolute left-4 top-4 text-slate-400 dark:text-slate-500"
            />

            <textarea
              id="reason"
              rows={5}
              name="reason"
              value={form.reason}
              onChange={handleChange}
              maxLength={250}
              placeholder="Briefly explain your reason..."
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-800"
            />
          </div>

          <div className="mt-2 text-right text-xs text-slate-400 dark:text-slate-500">
            {form.reason.length}/250
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="flex items-center gap-2 rounded-xl px-8 py-3"
          >
            <Send size={18} />
            Submit Request
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LeaveForm;