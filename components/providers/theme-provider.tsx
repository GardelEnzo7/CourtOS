"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  resolvedTheme: ResolvedTheme | undefined;
  setTheme: (theme: ResolvedTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const THEME_STORAGE_KEY = "theme";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";
const THEME_CHANGE_EVENT = "courtos-theme-change";

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_MODE_QUERY).matches ? "dark" : "light";
}

function getStoredTheme(): ResolvedTheme | null {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function getResolvedTheme(): ResolvedTheme {
  return getStoredTheme() ?? getSystemTheme();
}

function subscribeToTheme(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DARK_MODE_QUERY);

  function syncTheme() {
    const nextTheme = getResolvedTheme();
    applyTheme(nextTheme);
    onStoreChange();
  }

  mediaQuery.addEventListener("change", syncTheme);
  window.addEventListener("storage", syncTheme);
  window.addEventListener(THEME_CHANGE_EVENT, syncTheme);

  return () => {
    mediaQuery.removeEventListener("change", syncTheme);
    window.removeEventListener("storage", syncTheme);
    window.removeEventListener(THEME_CHANGE_EVENT, syncTheme);
  };
}

function getServerTheme(): undefined {
  return undefined;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const resolvedTheme = useSyncExternalStore(
    subscribeToTheme,
    getResolvedTheme,
    getServerTheme,
  );

  const setTheme = useCallback((theme: ResolvedTheme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}

    applyTheme(theme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const value = useMemo(
    () => ({ resolvedTheme, setTheme }),
    [resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider.");
  }

  return context;
}
