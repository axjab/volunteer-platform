import { NavLink } from "react-router-dom";
import { Award, BarChart3, Compass, LayoutDashboard, Trophy, User } from "lucide-react";
import { cn } from "../../lib/cn";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/rewards", label: "Rewards", icon: Award },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/catalogue", label: "Catalogue", icon: Compass },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export default function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col border-r border-gray-700 bg-gray-900">
      <div className="px-6 py-6">
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">VolunteerOS</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">STEM Impact Hub</h1>
          <p className="mt-2 text-sm text-gray-300">
            Track volunteering, unlock rewards, and inspire future innovators.
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-4 py-3 transition",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                )
              }
            >
              <Icon size={18} />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}