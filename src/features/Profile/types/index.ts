import type { ProfileFormData } from "../schema";

export type Profile = {
  name: string;
  role?: string;
  email?: string;
  bio?: string;
};
export type ProfileFormType = {
  initialData: Profile;
  onSubmit: (profile: ProfileFormData) => void;
};
