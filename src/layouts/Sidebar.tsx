// src/layouts/Sidebar.tsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  User,
  Zap, // logo icon
} from "lucide-react";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import type { SideBarOption } from "../types";

const sideBarOptions: SideBarOption[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "My Tasks",
    path: "/tasks",
    icon: <CheckSquare className="w-5 h-5" />,
  },
  { name: "Profile", path: "/profile", icon: <User className="w-5 h-5" /> },
  // { name: "Team", path: "/team", icon: <Users className="w-5 h-5" /> },
  // {
  //   name: "Settings",
  //   path: "/settings",
  //   icon: <Settings className="w-5 h-5" />,
  // },
];

export const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className="
      fixed top-0 left-0
      w-[240px] h-screen
      bg-[var(--color-navy)]
      flex flex-col
      z-20
    "
    >
      {/* Logo / Brand */}
      <div
        className="
        h-[56px]
        flex items-center gap-2
        px-5
        border-b border-white/10
      "
      >
        <div
          className="
          w-8 h-8
          bg-[var(--color-primary)]
          rounded
          flex items-center justify-center
        "
        >
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span
          className="
          text-white font-bold text-lg
          tracking-tight
        "
        >
          NexTask
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {sideBarOptions.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"} // ← exact match for home only
            className={({ isActive }) => `
              flex items-center gap-3
              px-3 py-2.5
              rounded
              text-sm font-medium
              transition-all
              ${
                isActive
                  ? "bg-[var(--color-primary)] text-white" // active
                  : "text-white/70 hover:bg-white/10 hover:text-white" // inactive
              }
            `}
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? "text-white" : "text-white/60"}>
                  {link.icon}
                </span>
                {link.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom — Theme Toggle */}
      <div
        className="
        px-3 py-4
        border-t border-white/10
      "
      >
        <button
          onClick={toggleTheme}
          className="
            w-full
            flex items-center gap-3
            px-3 py-2.5
            rounded
            text-white/70
            hover:bg-white/10 hover:text-white
            transition-all
            text-sm font-medium
          "
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </aside>
  );
};
