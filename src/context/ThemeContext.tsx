// src/context/ThemeContext.tsx
import { createContext, useState, useEffect, useMemo } from "react";
import { type Theme, type ThemeContextType } from "../types";
import { STORAGE_KEYS } from "../constants";

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Read from localStorage on first render
    return (localStorage.getItem(STORAGE_KEYS.THEME) as Theme) || "light";
  });

  // Apply dark class to body
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Task

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
