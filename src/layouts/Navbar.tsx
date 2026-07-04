// src/layouts/Navbar.tsx
import { Search } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { ProfileAvatar } from "../features/Profile/components/ProfileAvatar";

export function Navbar() {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchChange(value: string) {
    if (location.pathname === "/tasks") {
      if (value) {
        setSearchParams({ q: value });
      } else {
        setSearchParams({});
      }
    } else {
      if (value) {
        navigate(`/tasks?q=${encodeURIComponent(value)}`);
      } else {
        navigate("/tasks");
      }
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
        {/* Bell stays same */}

        <div className="w-px h-6 bg-[var(--color-border)]" />

        {/* User Profile — now uses real data! */}
        <button
          className="
          flex items-center gap-2
          px-2 py-1 rounded
          hover:bg-[var(--color-background)]
          transition-colors
        "
        >
          <ProfileAvatar name={profile.name} size="sm" /> {/* ← real avatar! */}
          <span
            className="
            text-sm font-medium
            text-[var(--color-text-primary)]
            hidden md:block
          "
          >
            {profile.name} {/* ← real name! */}
          </span>
        </button>
      </div>
    </nav>
  );
}
