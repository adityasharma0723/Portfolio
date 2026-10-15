"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`
          : "Toggle color theme"
      }
      className="relative flex items-center justify-center w-9 h-9 rounded-[10px] border border-line bg-card text-ink hover:text-accent transition-transform duration-150 ease-out hover:-translate-y-[2px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      title={
        mounted
          ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`
          : "Toggle theme"
      }
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun className="w-4 h-4 transition-transform duration-200" aria-hidden="true" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-200" aria-hidden="true" />
        )
      ) : (
        <span className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
}
