// src/components/ui/ProgressBar.tsx

import type { ProgressBarProps } from "../../types";

export function ProgressBar({ label, value, total, color }: ProgressBarProps) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-[var(--color-text-primary)]">
          {label}
        </span>
        <span className="text-xs text-[var(--color-text-secondary)]">
          {value} · {percent}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
