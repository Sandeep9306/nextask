// src/components/ui/StatCard.tsx
import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  icon:    LucideIcon
  label:   string
  value:   number
  color:   string         // text + icon color
  bgColor: string         // icon background tint
  onClick?: () => void
}

export function StatCard({ icon: Icon, label, value, color, bgColor, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-[var(--color-surface)]
        border border-[var(--color-border)]
        rounded-lg
        p-4
        shadow-[var(--shadow-level-1)]
        ${onClick ? 'cursor-pointer hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-level-2)]' : ''}
        transition-all duration-200
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <p className="text-2xl font-bold text-[var(--color-text-primary)] leading-none">
            {value}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            {label}
          </p>
        </div>
      </div>
    </div>
  )
}