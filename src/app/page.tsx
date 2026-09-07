import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { STANDARDS, IMS_BENEFITS } from "@/lib/standards";
import { Donut, BarChart } from "@/components/Charts";
import { SurpriseSpotlight, HoverPeek } from "@/components/MarketingHover";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero — royal */}
      <section className="relative overflow-hidden royal-gradient">
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(600px 400px at 20% 20%, #c5a46a 0%, transparent 60%), radial-gradient(800px 600px at 90% 80%, #ffffff 0%, transparent 40%)" }} />
        <div className="absolute top-0 left-1/2 h-px w-full max-w-7xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--royal-gold)]/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--royal-gold)]/30 bg-white/10 px-3 py-1 text-xs font-medium text-[var(--royal-gold-light)] backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                AI эрин • Цахим • Тогтвортой хөгжил
              </div>
              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                Байгууллагын<br />
                <span className="bg-gradient-to-r from-[var(--royal-gold)] to-[#e8dcc3] bg-clip-text text-transparent">нэгдсэн удирдлагын</span><br />
                тогтолцоог цахимаар
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 md:text-[15px] md:leading-7">
                <strong className="font-semibold text-white">estandard.mn</strong> — ISO 9001, 14001, 45001, 27001, 31000, 19011-ыг нэг дор нэвтрүүлэх Royal Classic платформ. GAP, баримт бичиг, эрсдэл, аудитыг итгэлтэй удирдаарай.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard" className="inline-flex justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--royal)] shadow hover:bg-slate-100">Үнэгүй эхлэх →</Link>
                <a href="#standards" className="inline-flex justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/10">Стандартууд танилцах</a>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">✓ 6 ISO стандарт</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">✓ GAP шинжилгээ</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">✓ Responsive</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">✓ Аудит & CAPA</span>
              </div>
            </div>

            {/* Royal stats card — responsive */}
            <div className="relative">
              <div className="rounded-2xl border border-[var(--royal-gold)]/20 bg-card p-5 shadow-2xl md:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">IMS Хяналт</h3>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300">● Амьд</span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 md:gap-3">
                  <div className="rounded-xl bg-muted p-3 text-center">
                    <div className="text-base font-bold text-[var(--royal)] dark:text-white">72%</div>
                    <div className="text-[11px] text-muted-foreground">Нийцэл</div>
                  </div>
                  <div className="rounded-xl bg-muted p-3 text-center">
                    <div className="text-base font-bold text-amber-700">14</div>
                    <div className="text-[11px] text-muted-foreground">Эрсдэл</div>
                  </div>
                  <div className="rounded-xl bg-muted p-3 text-center">
                    <div className="text-base font-bold text-emerald-700">3/5</div>
                    <div className="text-[11px] text-muted-foreground">Аудит</div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <Donut value={78} label="9001" sub="Чанар" />
                  <Donut value={65} label="45001" sub="ХАБ" />
                  <Donut value={58} label="14001" sub="Байгаль" />
                  <Donut value={52} label="27001" sub="Мэдээлэл" />
                  <Donut value={60} label="31000" sub="Эрсдэл" />
                  <Donut value={55} label="19011" sub="Аудит" />
                </div>
                <div className="mt-6">
                  <BarChart data={[
                    { label: "ISO 9001 — Чанар", value: 78 },
                    { label: "ISO 45001 — ХАБ", value: 65 },
                    { label: "ISO 14001 — Байгаль", value: 58 },
                    { label: "ISO 27001 — Мэдээлэл", value: 52 },
                    { label: "ISO 31000 — Эрсдэл", value: 60 },
                    { label: "ISO 19011 — Аудит", value: 55 },
                  ]} />
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-4 -right-2 h-24 w-24 rounded-full bg-[var(--royal-gold)]/20 blur-2xl md:-right-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Standards — responsive 1/2/3 cols */}
      <section id="standards" className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto h-1 w-12 rounded-full gold-gradient" />
          <h2 className="mt-4 text-xl font-bold tracking-tight md:text-3xl">Олон улсын стандартууд — нэг платформд</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">IMS — нэгдсэн удирдлага. Тус бүрд GAP, баримт бичиг, сургалт, аудитын хэрэгсэл. Tablet 2 багана, Desktop 3 багана.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map((s) => (
            <HoverPeek key={s.id} peek={`✦ ${s.code} — Hover → GAP үнэлгээ шууд!`}>
              <Link href={`/standards/${s.id}`} className="group block rounded-2xl border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-[var(--royal-gold)]/30">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow ${s.color} text-sm transition group-hover:scale-110`}>{s.icon}</div>
                  <div className="text-xs font-medium text-muted-foreground">{s.code}</div>
                  <span className="ml-auto rounded-full bg-[var(--royal-gold-light)] px-2 py-0.5 text-[10px] font-bold text-[var(--royal)] opacity-0 transition group-hover:opacity-100">Hover ✨</span>
                </div>
                <div className="mt-3 text-sm font-semibold">{s.nameMn}</div>
                <div className="text-xs text-muted-foreground">{s.name}</div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{s.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--royal)] group-hover:underline dark:text-[var(--royal-gold)]">Дэлгэрэнгүй → {s.clauses} бүлэг</span>
                  <span className="h-1.5 w-16 rounded-full bg-muted"><span className="block h-1.5 rounded-full gold-gradient transition-all group-hover:w-full" style={{ width: `${60 + Math.floor(Math.random()*35)}%` }} /></span>
                </div>
              </Link>
            </HoverPeek>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-xl font-bold md:text-2xl">Яагаад estandard.mn?</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Royal Classic өнгө — navy #1a2540 + gold #c5a46a — итгэл, тогтвортой байдал, дээд зэрэглэлийг илэрхийлнэ. Бүх төхөөрөмжид төгс харагдана.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {IMS_BENEFITS.map((b) => (
                  <div key={b.title} className="rounded-xl border bg-muted/50 p-4 transition hover:bg-muted">
                    <div className="text-sm font-semibold">{b.title}</div>
                    <div className="mt-1 text-xs leading-5 text-muted-foreground">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border royal-gradient p-6 text-white shadow-xl md:p-8">
              <h3 className="text-base font-semibold">Платформын боломжууд</h3>
              <div className="mt-1 h-0.5 w-10 rounded-full bg-[var(--royal-gold)]" />
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  "GAP шинжилгээ — 5 шатлал, автомат тайлан + chart",
                  "Баримт бичиг — хувилбар, баталгаа, хандалт",
                  "Эрсдэлийн матриц 5×5 — dynamic heatmap",
                  "Дотоод аудит — чеклист, ололт, CAPA",
                  "Сургалт & ур чадвар — матриц",
                  "KPI самбар — PDCA, donut/bar chart",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-0.5 text-[var(--royal-gold)]">◆</span>
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[var(--royal)] hover:bg-slate-100">Самбар үзэх →</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <div className="rounded-2xl royal-gradient p-6 text-white shadow-xl md:flex md:items-center md:justify-between md:p-8">
          <div>
            <h3 className="text-lg font-bold">Байгууллагадаа ISO нэвтрүүлэхэд бэлэн үү?</h3>
            <p className="mt-2 max-w-xl text-sm text-slate-300">Утас • Таблет • Компьютер — бүх төхөөрөмжид бэлэн.</p>
          </div>
          <Link href="/dashboard" className="mt-4 inline-flex justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--royal)] hover:bg-slate-100 md:mt-0">Бүртгүүлэх — үнэгүй</Link>
        </div>
      </section>

      <SurpriseSpotlight />
      <Footer />
    </div>
  );
}
