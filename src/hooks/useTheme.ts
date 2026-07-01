import { useContext } from "react";
import type { ThemeContextType } from "../types";
import { ThemeContext } from "../context/ThemeContext";

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be inside ThemeProvider");
  return context;
}
