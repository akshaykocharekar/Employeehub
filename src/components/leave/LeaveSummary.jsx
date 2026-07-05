
import {
  Briefcase,
  Plane,
  HeartPulse,
} from "lucide-react";

import Card from "../common/Card";
import leave from "../../data/leave.json";

const iconMap = {
  Annual: {
    icon: Plane,
    color:
      "bg-indigo-100 text-indigo-600",
    progress: "bg-indigo-600",
  },

  Sick: {
    icon: HeartPulse,
    color:
      "bg-red-100 text-red-600",
    progress: "bg-red-500",
  },

  Casual: {
    icon: Briefcase,
    color:
      "bg-emerald-100 text-emerald-600",
    progress: "bg-emerald-500",
  },
};

const LeaveSummary = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {leave.leaveBalance.map((item) => {
        const remaining =
          item.total - item.used;

        const percentage =
          (item.used / item.total) * 100;

        const config =
          iconMap[item.type] || {
            icon: Briefcase,
            color:
              "bg-slate-100 text-slate-600",
            progress: "bg-slate-600",
          };

        const Icon = config.icon;

        return (
          <Card
            key={item.type}
            className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.type} Leave
                </p>

                <h2 className="mt-2 text-4xl font-bold text-slate-900">
                  {remaining}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Remaining Days
                </p>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${config.color}`}
              >
                <Icon size={24} />
              </div>
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Used
                </span>

                <span className="font-medium text-slate-700">
                  {item.used} / {item.total}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${config.progress}`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default LeaveSummary;

