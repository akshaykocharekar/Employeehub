import { NavLink } from "react-router-dom";
import { navigation } from "../../data/navigation";
import { Building2 } from "lucide-react";
import { SIDEBAR_WIDTH, APP_NAME, APP_SUBTITLE } from "../../utils/constants";
const Sidebar = () => {
  return (
   <aside
  style={{ width: SIDEBAR_WIDTH }}
  className="border-r border-slate-200 bg-white"
>
      {/* Logo */}
      <div className="border-b p-6">
  <div className="flex items-center gap-3">
    <div className="rounded-xl bg-indigo-600 p-2 text-white">
      <Building2 size={22} />
    </div>

    <div>
      <h1 className="text-xl font-bold">
       {APP_NAME}
      </h1>

      <p className="text-sm text-slate-500">
       {APP_SUBTITLE}
      </p>
    </div>
  </div>
</div>
      {/* Navigation */}
      <nav className="mt-6 px-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;