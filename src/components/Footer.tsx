export function Footer() {
  return (
    <footer className="border-t bg-[var(--royal)] text-slate-300 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="text-sm font-bold text-white">ESTANDARD.MN</div>
            <div className="mt-1 text-xs text-[var(--royal-gold)]">Royal IMS • Since 2026</div>
            <p className="mt-3 text-xs leading-5 text-slate-400">ISO 9001 • 14001 • 45001 • 27001 • 31000 — нэгдсэн платформ</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Стандартууд</div>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
              <li>ISO 9001:2015 — Чанар</li>
              <li>ISO 14001:2015 — Байгаль</li>
              <li>ISO 45001:2018 — ХАБ</li>
              <li>ISO 27001:2022 — Мэдээлэл</li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Платформ</div>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
              <li>GAP • Баримт • Эрсдэл</li>
              <li>Аудит • CAPA • KPI</li>
              <li>Supabase • Vercel • Next.js</li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Холбоо</div>
            <p className="mt-3 text-xs text-slate-400">info@estandard.mn<br/>Улаанбаатар, Монгол</p>
            <div className="mt-3 h-1 w-12 rounded-full gold-gradient" />
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-4 text-[11px] text-slate-500 md:flex-row md:justify-between">
          <span>© 2026 estandard.mn — Итгэл • Чанар • Тогтвортой хөгжил</span>
          <span>Dark/Light • Responsive • Royal Classic</span>
        </div>
      </div>
    </footer>
  );
}
