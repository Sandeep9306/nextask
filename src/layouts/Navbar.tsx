// src/layouts/Navbar.tsx
import { Bell, Search, User } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchChange(value: string) {
    if (location.pathname === "/tasks") {
      value ? setSearchParams({ q: value }) : setSearchParams({});
    } else {
      navigate(value ? `/tasks?q=${encodeURIComponent(value)}` : "/tasks");
    }
  }
  return (
    <nav
      className="
      fixed top-0 right-0
      left-[240px]                          
      h-[56px]                              
      bg-[var(--color-surface)]
      border-b border-[var(--color-border)]
      flex items-center justify-between
      px-6
      z-10
    "
    >
      {/* Left — Search */}
      <div className="relative flex-1 max-w-md">
        <Search
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            text-[var(--color-text-disabled)]
            w-4 h-4
          "
        />
        <input
          value={searchParams.get("q") ?? ""}
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
          type="text"
          placeholder="Search tasks..."
          className="
            w-full
            h-9
            pl-9 pr-4
            bg-[var(--color-background)]
            border border-[var(--color-border)]
            rounded
            text-sm
            text-[var(--color-text-primary)]
            placeholder:text-[var(--color-text-disabled)]
            outline-none
            focus:border-[var(--color-border-focused)]
            focus:ring-2 focus:ring-[var(--color-primary-light)]
            transition-all
          "
        />
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-3 ml-4">
        {/* Notification Bell */}
        <button
          className="
          relative
          w-9 h-9
          flex items-center justify-center
          rounded
          text-[var(--color-text-secondary)]
          hover:bg-[var(--color-background)]
          hover:text-[var(--color-text-primary)]
          transition-colors
        "
        >
          <Bell className="w-5 h-5" />
          {/* Notification dot */}
          <span
            className="
            absolute top-1.5 right-1.5
            w-2 h-2
            bg-[var(--color-danger)]
            rounded-full
          "
          />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[var(--color-border)]" />

        {/* User Profile */}
        <button
          className="
          flex items-center gap-2
          px-2 py-1
          rounded
          hover:bg-[var(--color-background)]
          transition-colors
        "
        >
          <div
            className="
            w-8 h-8
            bg-[var(--color-primary)]
            rounded-full
            flex items-center justify-center
          "
          >
            <User className="w-4 h-4 text-white" />
          </div>
          <span
            className="
            text-sm font-medium
            text-[var(--color-text-primary)]
            hidden md:block
          "
          >
            Sandeep
          </span>
        </button>
      </div>
    </nav>
  );
}
