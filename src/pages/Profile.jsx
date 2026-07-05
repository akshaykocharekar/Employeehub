import {
  Mail,
  Building2,
  CalendarDays,
  BadgeCheck,
  User,
} from "lucide-react";

import profile from "../data/profile.json";

import Container from "../components/common/Container";
import Card from "../components/common/Card";
import PageHeader from "../components/ui/PageHeader";

const info = [
  {
    title: "Email",
    value: profile.email,
    icon: Mail,
  },
  {
    title: "Department",
    value: profile.department,
    icon: Building2,
  },
  {
    title: "Joined",
    value: profile.joinDate,
    icon: CalendarDays,
  },
  {
    title: "Employment",
    value: "Full Time",
    icon: BadgeCheck,
  },
];

const Profile = () => {
  const initials = profile.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <Container>
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information and employment details."
      />

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* Profile Card */}
        <Card className="overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600" />

          <div className="-mt-14 flex flex-col items-center px-6 pb-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-4xl font-bold text-white shadow-lg">
              {initials}
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              {profile.name}
            </h2>

            <p className="mt-1 text-slate-500">
              {profile.role}
            </p>

            <div className="mt-6 w-full rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Employee Status
                </span>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Information */}
        <Card>
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <User size={22} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Personal Information
              </h2>

              <p className="text-sm text-slate-500">
                Basic employment details.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {info.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <Icon size={22} />
                  </div>

                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h3 className="mt-2 break-words text-lg font-semibold text-slate-900">
                    {item.value}
                  </h3>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Profile;