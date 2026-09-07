"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("estandard-theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("estandard-theme", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-card text-sm transition hover:bg-muted"
      title={theme === "dark" ? "Гэрэл горим" : "Харанхуй горим"}
    >
      <span className="text-[14px]">{theme === "dark" ? "☀" : "◐"}</span>
    </button>
  );
}
