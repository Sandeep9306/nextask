import { useEffect, useMemo, useState, type ReactNode } from "react";
import { STORAGE_KEYS } from "../constants";
import type { ProfileContextType } from "../types";
import type { Profile } from "../features/Profile/types";
import { ProfileContext } from "./ProfileContext";

const defaultProfile: Profile = {
  name: "Sandeep",
  role: "Developer",
  email: "",
  bio: "",
};

function getInitialProfile(): Profile {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (stored) return JSON.parse(stored) as Profile;
  } catch {
    console.error("Failed to load Profile");
  }
  return defaultProfile;
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile>(getInitialProfile);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  const value = useMemo(
    () => ({
      profile,
      setProfile: (newProfile: Profile) => setProfileState(newProfile),
    }),
    [profile],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
