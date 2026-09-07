import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { STANDARDS, IMS_BENEFITS } from "@/lib/standards";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-200 ring-1 ring-white/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                AI эрин • Цахим шилжилт • Тогтвортой хөгжил
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                Байгууллагын
                <br />
                <span className="text-blue-300">нэгдсэн удирдлагын</span>
                <br />
                тогтолцоог цахимаар
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-7 text-slate-300">
                <strong className="text-white">estandard.mn</strong> нь ISO 9001, 14001,
                45001, 27001, 31000 стандартуудыг нэвтрүүлэхэд дэмжлэг үзүүлэх
                нэгдсэн платформ. GAP шинжилгээ, баримт бичиг, эрсдэл, аудитыг нэг дор
                удирдаарай.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  Үнэгүй эхлэх →
                </Link>
                <a
                  href="#standards"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
                >
                  Стандартууд танилцах
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-xs text-slate-400">
                <span>✓ Supabase</span>
                <span>✓ Vercel</span>
                <span>✓ Next.js 15</span>
                <span>✓ ISO IMS</span>
              </div>
            </div>
            {/* Stats card */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">IMS Хяналтын самбар</h3>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    ● Амьд
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { k: "Нийцэл", v: "72%", c: "text-blue-600" },
                    { k: "Эрсдэл", v: "14", c: "text-amber-600" },
                    { k: "Аудит", v: "3/5", c: "text-emerald-600" },
                  ].map((s) => (
                    <div key={s.k} className="rounded-xl bg-slate-50 p-3 text-center">
                      <div className={`text-lg font-bold ${s.c}`}>{s.v}</div>
                      <div className="text-xs text-slate-500">{s.k}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    { label: "ISO 9001 — Чанар", pct: 78 },
                    { label: "ISO 45001 — ХАБ", pct: 65 },
                    { label: "ISO 14001 — Байгаль", pct: 58 },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">{r.label}</span>
                        <span className="font-medium">{r.pct}%</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                        <div
                          className="h-1.5 rounded-full bg-blue-600"
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section id="standards" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Олон улсын стандартууд — нэг платформд
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Тогтвортой хөгжлийн суурь болох нэгдсэн удирдлагын тогтолцоо (IMS). Тус бүрд нь
            GAP шинжилгээ, баримт бичиг, сургалт, аудитын хэрэгсэлтэй.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STANDARDS.map((s) => (
            <Link
              key={s.id}
              href={`/standards/${s.id}`}
              className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-white ${s.color} text-sm`}>
                {s.icon}
              </div>
              <div className="mt-4 text-xs font-medium text-slate-500">{s.code}</div>
              <div className="text-sm font-semibold text-slate-900">{s.nameMn}</div>
              <div className="text-xs text-slate-500">{s.name}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.description}</p>
              <div className="mt-4 text-xs font-medium text-blue-600 group-hover:underline">
                Дэлгэрэнгүй → {s.clauses} бүлэг
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* IMS benefits */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Яагаад estandard.mn?</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                AI эрин үед цахим үйлчилгээ, инноваци хурдацтай хөгжиж байна. Байгууллага бүрд
                нэгдсэн удирдлагын тогтолцоо нэвтрүүлэх шаардлага нэн яаралтай — estandard.mn
                нь тэр хэрэгцээг хангана.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {IMS_BENEFITS.map((b) => (
                  <div key={b.title} className="rounded-xl border bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">{b.title}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-600">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border bg-slate-900 p-8 text-white">
              <h3 className="text-lg font-semibold">Платформын боломжууд</h3>
              <ul className="mt-6 space-y-4 text-sm">
                {[
                  "GAP шинжилгээ — 5 шатлалт үнэлгээ, автомат тайлан",
                  "Баримт бичгийн удирдлага — хувилбар, баталгаажуулалт, хандалт",
                  "Эрсдэлийн бүртгэл — 5×5 матриц, арга хэмжээ, хяналт",
                  "Дотоод аудит — чеклист, ололт, CAPA холбоос",
                  "Сургалт & ур чадвар — ажилтны матриц, гэрчилгээ",
                  "KPI самбар — зорилт, хэмжүүр, PDCA",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Самбар үзэх
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-blue-700 px-8 py-10 text-white md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold">Байгууллагадаа ISO нэвтрүүлэхэд бэлэн үү?</h3>
            <p className="mt-2 max-w-xl text-sm text-blue-100">
              Supabase + Vercel дэд бүтцэд суурилсан найдвартай, хурдан, аюулгүй платформ.
              Өнөөдөр бүртгүүлээд GAP шинжилгээгээ эхлүүлээрэй.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 md:mt-0"
          >
            Бүртгүүлэх — үнэгүй
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
