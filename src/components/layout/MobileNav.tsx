import { NavLink } from "react-router-dom";
import { Award, BarChart3, Compass, LayoutDashboard, User } from "lucide-react";
import { cn } from "../../lib/cn";

const mobileItems = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/catalogue", label: "Explore", icon: Compass },
  { to: "/rewards", label: "Rewards", icon: Award },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-700 bg-gray-800 px-2 py-2 lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {mobileItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px]",
                isActive ? "bg-blue-500/20 text-white" : "text-gray-400"
              )
            }
          >
            <Icon size={18} />
            <span className="mt-1">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}