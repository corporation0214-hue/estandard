export function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-sm font-bold text-white">ESTANDARD.MN</div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Монголын байгууллагуудад зориулсан ISO нэгдсэн удирдлагын тогтолцооны цахим
              платформ.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Стандартууд</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>ISO 9001:2015 - Чанар</li>
              <li>ISO 14001:2015 - Байгаль орчин</li>
              <li>ISO 45001:2018 - ХАБ</li>
              <li>ISO 27001:2022 - Мэдээлэл</li>
              <li>ISO 31000:2018 - Эрсдэл</li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Платформ</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>GAP шинжилгээ</li>
              <li>Баримт бичгийн удирдлага</li>
              <li>Эрсдэлийн бүртгэл</li>
              <li>Дотоод аудит</li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Холбоо</div>
            <p className="mt-3 text-sm text-slate-400">
              info@estandard.mn
              <br />
              Улаанбаатар, Монгол
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-500">
          © 2026 estandard.mn — Бүх эрх хуулиар хамгаалагдсан. Supabase • Vercel • Next.js
        </div>
      </div>
    </footer>
  );
}
