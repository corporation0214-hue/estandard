"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = {
  label: string;
  href?: string;
  icon: string;
  children?: { label: string; href: string; badge?: string }[];
};

const NAV: NavItem[] = [
  { label: "Нүүр", href: "/", icon: "⌂" },
  {
    label: "Стандартууд",
    icon: "◈",
    children: [
      { label: "Бүгд", href: "/standards" },
      { label: "ISO 9001 — Чанар", href: "/standards/iso9001" },
      { label: "ISO 14001 — Байгаль", href: "/standards/iso14001" },
      { label: "ISO 45001 — ХАБ", href: "/standards/iso45001" },
      { label: "ISO 27001 — Мэдээлэл", href: "/standards/iso27001" },
      { label: "ISO 31000 — Эрсдэл", href: "/standards/iso31000" },
    ],
  },
  {
    label: "Удирдлага",
    icon: "⬢",
    children: [
      { label: "Хяналтын самбар", href: "/dashboard", badge: "●" },
      { label: "GAP Шинжилгээ", href: "/dashboard#gap" },
      { label: "Баримт бичиг", href: "/dashboard#docs" },
      { label: "Эрсдэлийн бүртгэл", href: "/dashboard#risks" },
      { label: "Аудит & CAPA", href: "/dashboard#audits" },
    ],
  },
];

function NavSection({
  item,
  expanded,
  onToggle,
  collapsed,
}: {
  item: NavItem;
  expanded: boolean;
  onToggle: () => void;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const isActive = item.href ? pathname === item.href : false;
  const hasActiveChild = item.children?.some((c) => pathname === c.href || pathname.startsWith(c.href));

  if (item.children) {
    return (
      <div className="py-1">
        <button
          onClick={onToggle}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
            hasActiveChild
              ? "bg-[var(--royal)] text-white dark:bg-[var(--accent)] dark:text-[var(--royal)]"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
          title={collapsed ? item.label : undefined}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs">
            {item.icon}
          </span>
          {!collapsed && (
            <>
              <span className="flex-1 text-left text-[13px] font-medium">{item.label}</span>
              <span className={`text-xs transition ${expanded ? "rotate-90" : ""}`}>›</span>
            </>
          )}
        </button>
        {!collapsed && expanded && (
          <div className="ml-4 mt-1 space-y-0.5 border-l border-border pl-3">
            {item.children.map((c) => {
              const active = pathname === c.href;
              return (
                <Link
                  key={c.href + c.label}
                  href={c.href}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition ${
                    active
                      ? "bg-[var(--royal-gold-light)] text-[var(--royal)] font-medium dark:bg-white/10 dark:text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span>{c.label}</span>
                  {c.badge && <span className="text-[10px] text-emerald-600">{c.badge}</span>}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
        isActive
          ? "bg-[var(--royal)] text-white dark:bg-[var(--accent)] dark:text-[var(--royal)]"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
      title={collapsed ? item.label : undefined}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs">
        {item.icon}
      </span>
      {!collapsed && <span className="text-[13px] font-medium">{item.label}</span>}
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Стандартууд: true,
    Удирдлага: true,
  });

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside
        className={`hidden shrink-0 flex-col border-r bg-card transition-all duration-300 md:flex ${
          collapsed ? "w-[68px]" : "w-[264px]"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-2 border-b px-3">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg royal-gradient text-xs font-bold text-white">
                E
              </div>
              <div className="leading-none">
                <div className="text-xs font-bold tracking-tight">ESTANDARD.MN</div>
                <div className="text-[10px] text-muted-foreground">Royal IMS</div>
              </div>
            </Link>
          )}
          {collapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg royal-gradient text-xs font-bold text-white">
              E
            </div>
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg border bg-card text-xs hover:bg-muted"
            aria-label={collapsed ? "Expand" : "Collapse"}
            title={collapsed ? "Дэлгэх" : "Хураах"}
          >
            {collapsed ? "››" : "‹‹"}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {NAV.map((item) => (
            <NavSection
              key={item.label}
              item={item}
              collapsed={collapsed}
              expanded={openSections[item.label] ?? false}
              onToggle={() => setOpenSections((m) => ({ ...m, [item.label]: !m[item.label] }))}
            />
          ))}
        </nav>

        <div className="border-t p-3">
          <div
            className={`rounded-xl border bg-muted p-3 ${collapsed ? "hidden" : "block"}`}
          >
            <div className="text-xs font-semibold">Тогтвортой хөгжил</div>
            <div className="mt-1 text-[11px] leading-4 text-muted-foreground">
              ISO IMS — итгэл, чанар, аюулгүй байдал
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white dark:bg-slate-700">
              <div className="h-1.5 w-[72%] rounded-full gold-gradient" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className={`text-xs text-muted-foreground ${collapsed ? "hidden" : ""}`}>
              v1.0 • Supabase
            </span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile */}
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-card/80 px-4 backdrop-blur md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg royal-gradient text-xs font-bold text-white">
              E
            </div>
            <span className="text-xs font-bold">ESTANDARD.MN</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-card"
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </header>

        {mobileOpen && (
          <div className="border-b bg-card p-3 md:hidden">
            <nav className="space-y-1">
              {NAV.map((item) => (
                <NavSection
                  key={item.label + "-m"}
                  item={item}
                  collapsed={false}
                  expanded={openSections[item.label] ?? false}
                  onToggle={() => setOpenSections((m) => ({ ...m, [item.label]: !m[item.label] }))}
                />
              ))}
            </nav>
          </div>
        )}

        <div className="flex-1 bg-background">{children}</div>
      </div>
    </div>
  );
}
