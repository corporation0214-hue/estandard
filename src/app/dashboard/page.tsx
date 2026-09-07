import Link from "next/link";
import { STANDARDS } from "@/lib/standards";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-sm font-bold">
            ESTANDARD<span className="text-blue-700">.MN</span>
          </Link>
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
            Demo • Supabase холбоогүй (env тохируулна)
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Хяналтын самбар</h1>
            <p className="mt-1 text-sm text-slate-600">
              Байгууллагын ISO нэгдсэн удирдлагын тогтолцооны төлөв
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full border bg-white px-4 py-2 text-sm">Тайлан татах</button>
            <button className="rounded-full bg-blue-700 px-4 py-2 text-sm font-medium text-white">
              + Шинэ үнэлгээ
            </button>
          </div>
        </div>

        {/* KPI */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            { label: "Ерөнхий нийцэл", value: "68%", sub: "+4% сард", color: "border-blue-200" },
            { label: "Нээлттэй эрсдэл", value: "14", sub: "3 өндөр", color: "border-amber-200" },
            { label: "Баримт бичиг", value: "47", sub: "5 шинэчлэл хүлээгдэж буй", color: "border-emerald-200" },
            { label: "CAPA", value: "9", sub: "4 хугацаа хэтэрсэн", color: "border-red-200" },
          ].map((k) => (
            <div key={k.label} className={`rounded-2xl border-2 bg-white p-5 ${k.color}`}>
              <div className="text-xs text-slate-500">{k.label}</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">{k.value}</div>
              <div className="text-xs text-slate-500">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Standards progress */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border bg-white p-6">
            <h2 className="text-sm font-semibold text-slate-900">Стандарт тус бүрээр ахиц</h2>
            <div className="mt-6 space-y-4">
              {STANDARDS.slice(0, 5).map((s) => {
                const pct = 50 + Math.floor(Math.random() * 35);
                return (
                  <div key={s.id} className="flex items-center gap-4">
                    <div className={`h-8 w-8 shrink-0 rounded-lg ${s.color} flex items-center justify-center text-xs text-white`}>
                      {s.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-700">{s.code}</span>
                        <span className="text-slate-500">{pct}%</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <Link href={`/standards/${s.id}`} className="text-xs text-blue-600 hover:underline">
                      Үнэлэх
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="text-sm font-semibold">Сүүлийн үйл ажиллагаа</h3>
              <ul className="mt-4 space-y-3 text-xs leading-5 text-slate-600">
                <li>• GAP шинжилгээ — ISO 9001 (4-р бүлэг) шинэчлэгдлээ — 2 цагийн өмнө</li>
                <li>• Баримт бичиг — “Эрсдэлийн журам v2.1” батлагдлаа</li>
                <li>• Аудит — Дотоод аудит #03 ололт бүртгэгдлээ</li>
                <li>• CAPA — #CA-09 хугацаа хэтэрлээ</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-slate-900 p-6 text-white">
              <h3 className="text-sm font-semibold">Дараагийн алхам</h3>
              <p className="mt-2 text-xs leading-5 text-slate-300">
                ISO 45001 эрсдэлийн үнэлгээг дуусгаж, менежментийн хяналтын хурлын бэлтгэлийг
                хангана уу.
              </p>
              <button className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900">
                Төлөвлөгөө үүсгэх
              </button>
            </div>
          </div>
        </div>

        {/* Tables preview */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="text-sm font-semibold">Эрсдэлийн бүртгэл (дээд 5)</h3>
            <table className="mt-4 w-full text-xs">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-2 text-left">Эрсдэл</th>
                  <th className="pb-2 text-left">Магадлал×Нөлөө</th>
                  <th className="pb-2 text-left">Түвшин</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-700">
                {[
                  ["Галын аюул — үйлдвэр", "4×5=20", "Өндөр"],
                  ["Мэдээлэл алдагдал", "3×5=15", "Өндөр"],
                  ["Хог хаягдал — хөрс", "3×3=9", "Дунд"],
                  ["Нийлүүлэлтийн тасалдал", "3×4=12", "Дунд"],
                ].map(([a, b, c]) => (
                  <tr key={a}>
                    <td className="py-2">{a}</td>
                    <td className="py-2">{b}</td>
                    <td className="py-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] ${c === "Өндөр" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}
                      >
                        {c}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="text-sm font-semibold">Дотоод аудитын төлөв</h3>
            <div className="mt-4 space-y-3 text-xs">
              {[
                ["Аудит #03 — ЧАНАР", "2026-03-15", "Дууссан", "bg-emerald-50 text-emerald-700"],
                ["Аудит #04 — ХАБ", "2026-04-10", "Төлөвлөсөн", "bg-blue-50 text-blue-700"],
                ["Аудит #05 — Байгаль", "2026-05-20", "Төлөвлөсөн", "bg-slate-100 text-slate-600"],
              ].map(([t, d, s, cls]) => (
                <div key={t} className="flex items-center justify-between rounded-xl border px-3 py-2.5">
                  <div>
                    <div className="font-medium text-slate-900">{t}</div>
                    <div className="text-slate-500">{d}</div>
                  </div>
                  <span className={`rounded-full px-2 py-1 ${cls}`}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
