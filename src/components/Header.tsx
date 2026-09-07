import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">
            E
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-slate-900">
              ESTANDARD<span className="text-blue-700">.MN</span>
            </div>
            <div className="text-[11px] leading-none text-slate-500">
              Нэгдсэн Удирдлагын Тогтолцоо
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/standards" className="text-slate-600 hover:text-slate-900">
            Стандартууд
          </Link>
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
            Хяналтын самбар
          </Link>
          <a href="#contact" className="text-slate-600 hover:text-slate-900">
            Холбоо барих
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Нэвтрэх
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            Эхлэх
          </Link>
        </div>
      </div>
    </header>
  );
}
