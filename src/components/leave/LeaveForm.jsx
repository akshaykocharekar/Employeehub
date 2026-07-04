import { useState } from "react";
import toast from "react-hot-toast";

import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const LeaveForm = ({ setRequests }) => {
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    type: "Casual Leave",
    reason: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.startDate || !form.endDate) {
      return toast.error("Please select both dates.");
    }

    if (new Date(form.endDate) < new Date(form.startDate)) {
      return toast.error("End date must be after start date.");
    }

    if (!form.reason.trim()) {
      return toast.error("Reason is required.");
    }

    const newRequest = {
      id: Date.now(),
      startDate: form.startDate,
      endDate: form.endDate,
      type: form.type,
      reason: form.reason,
      status: "Pending",
    };

    setRequests((prev) => [newRequest, ...prev]);

    toast.success("Leave request submitted!");

    setForm({
      startDate: "",
      endDate: "",
      type: "Casual Leave",
      reason: "",
    });
  };

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Request Leave
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
        />

        <Input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 p-3"
        >
          <option>Casual Leave</option>
          <option>Sick Leave</option>
          <option>Earned Leave</option>
        </select>

        <textarea
          name="reason"
          rows="4"
          value={form.reason}
          onChange={handleChange}
          placeholder="Reason"
          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500"
        />

        <Button
          type="submit"
          className="w-full"
        >
          Submit Request
        </Button>
      </form>
    </Card>
  );
};

export default LeaveForm;