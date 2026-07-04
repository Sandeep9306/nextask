import { useForm } from "react-hook-form";
import { profileSchema, type ProfileFormData } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Profile } from "../types";

export type ProfileFormType = {
  initialData: Profile;
  onSubmit: (profile: ProfileFormData) => void;
};

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="
        block text-xs font-medium
        text-[var(--color-text-secondary)]
        mb-1
      "
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[var(--color-danger)] mt-1">{error}</p>
      )}
    </div>
  );
}

// Shared input className
const inputClass = `
  w-full h-9 px-3
  bg-[var(--color-background)]
  border border-[var(--color-border)]
  rounded text-sm
  text-[var(--color-text-primary)]
  placeholder:text-[var(--color-text-disabled)]
  outline-none
  focus:border-[var(--color-border-focused)]
  focus:ring-2 focus:ring-[var(--color-primary-light)]
  transition-all
`;

export function ProfileForm({ initialData, onSubmit }: ProfileFormType) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData.name,
      role: initialData.role ?? "",
      email: initialData.email ?? "",
      bio: initialData.bio ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="text" {...register("name")} />

      {/* Name */}
      <FormField label="Full Name *" error={errors.name?.message}>
        <input
          {...register("name")}
          placeholder="Enter your name"
          className={inputClass}
        />
      </FormField>

      {/* Role */}
      <FormField label="Role" error={errors.role?.message}>
        <input
          {...register("role")}
          placeholder="e.g. Frontend Developer"
          className={inputClass}
        />
      </FormField>

      {/* Email */}
      <FormField label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className={inputClass}
        />
      </FormField>

      {/* Bio */}
      <FormField label="Bio" error={errors.bio?.message}>
        <textarea
          {...register("bio")}
          placeholder="Tell us a little about yourself..."
          rows={3}
          className={`
            ${inputClass}
            h-auto py-2
            resize-none
          `}
        />
        <p className="text-xs text-[var(--color-text-disabled)] mt-1">
          Max 150 characters
        </p>
      </FormField>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="
            px-6 h-9
            text-sm font-medium
            text-white
            bg-[var(--color-primary)]
            rounded
            hover:bg-[var(--color-primary-hover)]
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition-colors
          "
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
