// src/features/dashboard/components/StatsRow.tsx
import { useNavigate } from "react-router-dom";
import { StatCard } from "../../../components/ui/StatCard";
import { ListTodo, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import type { StatsRowProps } from "../types";



export function StatsRow({ stats }: StatsRowProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={ListTodo}
        label="Total Tasks"
        value={stats.total}
        color="var(--color-primary)"
        bgColor="var(--color-primary-light)"
        onClick={() => navigate("/tasks")}
      />
      <StatCard
        icon={CheckCircle2}
        label="Completed"
        value={stats.completed}
        color="var(--color-success)"
        bgColor="var(--color-success-light)"
        onClick={() => navigate("/tasks")}
      />
      <StatCard
        icon={Clock}
        label="In Progress"
        value={stats.inProgress}
        color="var(--color-info)"
        bgColor="var(--color-info-light)"
        onClick={() => navigate("/tasks")}
      />
      <StatCard
        icon={AlertTriangle}
        label="Overdue"
        value={stats.overdue.length}
        color="var(--color-danger)"
        bgColor="var(--color-danger-light)"
        onClick={() => navigate("/tasks")}
      />
    </div>
  );
}
