import toast from "react-hot-toast";
import { ProfileForm } from "../features/Profile";
import { ProfileAvatar } from "../features/Profile/components/ProfileAvatar";
import type { ProfileFormData } from "../features/Profile/schema";
import { useProfile } from "../hooks/useProfile";

export function ProfilePage() {
  const { profile, setProfile } = useProfile();
  function handleSubmit(data: ProfileFormData) {
    setProfile({
      name: data.name,
      role: data.role ?? "",
      email: data.email ?? "",
      bio: data.bio ?? "",
    });
    toast.success("Profile saved!");
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Profile
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Manage your personal information
        </p>
      </div>
      <div
        className="
        bg-[var(--color-surface)]
        border border-[var(--color-border)]
        rounded-lg
        shadow-[var(--shadow-level-1)]
        overflow-hidden
      "
      >
        {/* Avatar Section */}
        <div
          className="
          flex items-center gap-4
          p-6
          border-b border-[var(--color-border)]
          bg-[var(--color-background)]
        "
        >
          <ProfileAvatar name={profile.name} size="lg" />
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {profile.name || "Your Name"}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {profile.role || "Add your role"}
            </p>
            {profile.email && (
              <p className="text-xs text-[var(--color-text-disabled)] mt-0.5">
                {profile.email}
              </p>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <ProfileForm initialData={profile} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
