import { Link } from "react-router-dom";

import {
  CalendarClock,
  Users,
  Megaphone,
} from "lucide-react";

import Card from "../common/Card";

const actions = [
  {
    title: "Request Leave",
    icon: CalendarClock,
    path: "/leave",
  },
  {
    title: "View Team",
    icon: Users,
    path: "/team",
  },
  {
    title: "Announcements",
    icon: Megaphone,
    path: "/announcements",
  },
];

const QuickActions = () => {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="space-y-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.path}
              className="flex items-center gap-4 rounded-xl border p-4 transition hover:bg-slate-50"
            >
              <Icon size={22} />

              <span>{action.title}</span>
            </Link>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActions;