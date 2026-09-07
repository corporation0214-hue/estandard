import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { STANDARDS } from "@/lib/standards";

export default function StandardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg royal-gradient text-xs font-bold text-white">E</div>
              <span className="hidden text-xs font-bold md:inline">ESTANDARD<span className="text-[var(--royal-gold)]">.MN</span></span>
            </Link>
            <span className="hidden text-xs text-muted-foreground md:inline">/ Стандартууд</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden rounded-full border px-3 py-1.5 text-xs hover:bg-muted md:inline-flex">← Нүүр</Link>
            <Link href="/dashboard" className="hidden rounded-full royal-gradient px-4 py-1.5 text-xs font-medium text-white md:inline-flex">Самбар →</Link>
            <ThemeToggle />
          </div>
        </div>
        <div className="flex gap-3 border-t bg-card px-4 py-2 text-xs md:hidden">
          <Link href="/" className="text-muted-foreground">← Нүүр</Link>
          <Link href="/dashboard" className="text-[var(--royal)] dark:text-[var(--royal-gold)]">Самбар →</Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <h1 className="text-xl font-bold md:text-2xl">Стандартууд</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          ISO Annex SL бүтэц — бүлэг тус бүрийн шаардлага, GAP үнэлгээ. Dark/Light бүх хуудсанд идэвхтэй.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map((s) => (
            <Link key={s.id} href={`/standards/${s.id}`} className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md">
              <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${s.color} text-white text-xs`}>{s.icon}</div>
              <div className="mt-3 text-xs text-muted-foreground">{s.code}</div>
              <div className="text-sm font-semibold">{s.nameMn}</div>
              <div className="text-xs text-muted-foreground">{s.name}</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
