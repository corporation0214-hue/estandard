import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg royal-gradient text-xs font-bold text-white shadow">
            E
          </div>
          <div className="hidden leading-none sm:block">
            <div className="text-xs font-bold tracking-tight">ESTANDARD<span className="text-[var(--royal-gold)]">.MN</span></div>
            <div className="text-[10px] text-muted-foreground">Нэгдсэн Удирдлагын Тогтолцоо</div>
          </div>
          <span className="text-xs font-bold sm:hidden">ESTANDARD.MN</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          <Link href="/standards" className="text-muted-foreground hover:text-foreground">Стандартууд</Link>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Самбар</Link>
          <a href="#contact" className="text-muted-foreground hover:text-foreground">Холбоо</a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/dashboard" className="hidden rounded-full border px-4 py-1.5 text-xs font-medium hover:bg-muted md:inline-flex">Нэвтрэх</Link>
          <Link href="/dashboard" className="rounded-full royal-gradient px-4 py-1.5 text-xs font-medium text-white shadow hover:opacity-90">Эхлэх →</Link>
        </div>
      </div>
      {/* mobile nav */}
      <div className="flex items-center gap-4 border-t bg-card px-4 py-2 text-xs md:hidden">
        <Link href="/standards" className="text-muted-foreground">Стандартууд</Link>
        <Link href="/dashboard" className="text-muted-foreground">Самбар</Link>
        <a href="#contact" className="text-muted-foreground">Холбоо</a>
      </div>
    </header>
  );
}
