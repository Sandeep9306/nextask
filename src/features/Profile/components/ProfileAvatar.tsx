import type { ProfileAvatarProps } from "../../../types";

const AVATAR_COLORS = [
  { bg: "#dae2ff", text: "#0040a2" },
  { bg: "#e3fcef", text: "#006644" },
  { bg: "#fffae6", text: "#974f0c" },
  { bg: "#ffebe6", text: "#bf2600" },
  { bg: "#deebff", text: "#0747a6" },
  { bg: "#e8d5f5", text: "#5e2d91" },
];

function getInitials(name: string): string {
  if (!name.trim()) return "?";
  return name
    .trim()
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

const sizeClasses = {
  sm: "w-8  h-8  text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-20 h-20 text-2xl",
};
export function ProfileAvatar({ name, size = "md" }: ProfileAvatarProps) {
  const color = getAvatarColor(name);
  const initials = getInitials(name);

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full
        flex items-center justify-center
        font-bold flex-shrink-0
      `}
      style={{
        backgroundColor: color.bg,
        color: color.text,
      }}
    >
      {initials}
    </div>
  );
}
