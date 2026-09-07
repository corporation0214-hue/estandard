import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { STANDARDS } from "@/lib/standards";
import { Donut, BarChart, RiskMatrix } from "@/components/Charts";

export default function DashboardPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> IMS • Royal Classic
            </div>
            <h1 className="mt-3 text-xl font-bold md:text-2xl">Хяналтын самбар</h1>
            <p className="mt-1 text-sm text-muted-foreground">Байгууллагын нэгдсэн удирдлагын тогтолцооны төлөв — responsive, dark/light, dynamic charts</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full border bg-card px-4 py-2 text-sm hover:bg-muted">Тайлан PDF</button>
            <Link href="/standards/iso9001" className="rounded-full royal-gradient px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">+ Шинэ үнэлгээ</Link>
          </div>
        </div>

        {/* KPI — 1 col phone, 2 tablet, 4 desktop */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Ерөнхий нийцэл", value: "68%", sub: "+4% сард", accent: "border-[var(--royal-gold)]" },
            { label: "Нээлттэй эрсдэл", value: "14", sub: "3 өндөр", accent: "border-amber-300" },
            { label: "Баримт бичиг", value: "47", sub: "5 шинэчлэл хүлээгдэж буй", accent: "border-emerald-300" },
            { label: "CAPA", value: "9", sub: "4 хугацаа хэтэрсэн", accent: "border-red-300" },
          ].map((k) => (
            <div key={k.label} className={`rounded-2xl border-2 bg-card p-4 shadow-sm md:p-5 ${k.accent}`}>
              <div className="text-xs text-muted-foreground">{k.label}</div>
              <div className="mt-1 text-2xl font-bold">{k.value}</div>
              <div className="text-xs text-muted-foreground">{k.sub}</div>
              <div className="mt-3 h-1 rounded-full bg-muted"><div className="h-1 w-3/4 rounded-full gold-gradient" /></div>
            </div>
          ))}
        </div>

        {/* Donuts + Progress */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5 md:p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Стандарт тус бүрээр ахиц</h2>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs">Chart • Royal Gold</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 md:gap-4">
              <Donut value={72} label="9001" sub="Чанар" />
              <Donut value={58} label="14001" sub="Байгаль" />
              <Donut value={65} label="45001" sub="ХАБ" />
            </div>
            <div className="mt-8">
              <BarChart data={[
                { label: "ISO 9001 — Чанар", value: 78 },
                { label: "ISO 14001 — Байгаль", value: 58 },
                { label: "ISO 45001 — ХАБ", value: 65 },
                { label: "ISO 27001 — Мэдээлэл", value: 52 },
              ]} />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {STANDARDS.slice(0,5).map((s) => (
                <Link key={s.id} href={`/standards/${s.id}`} className="rounded-full border bg-card px-3 py-1 text-xs hover:bg-muted">{s.code} →</Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="text-sm font-semibold">Сүүлийн үйл ажиллагаа</h3>
              <ul className="mt-4 space-y-2.5 text-xs leading-5 text-muted-foreground">
                <li className="rounded-xl bg-muted p-2.5">• GAP — ISO 9001 (4-р бүлэг) — 2 цагийн өмнө</li>
                <li className="rounded-xl bg-muted p-2.5">• Баримт — “Эрсдэлийн журам v2.1” батлагдлаа</li>
                <li className="rounded-xl bg-muted p-2.5">• Аудит #03 — ололт бүртгэгдлээ</li>
              </ul>
            </div>
            <div className="rounded-2xl royal-gradient p-5 text-white shadow">
              <h3 className="text-sm font-semibold">Дараагийн алхам</h3>
              <p className="mt-2 text-xs leading-5 text-slate-200">ISO 45001 эрсдэлийн үнэлгээг дуусгаж, менежментийн хяналтын хурлаа төлөвлөнө үү.</p>
              <button className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[var(--royal)]">Төлөвлөгөө үүсгэх</button>
            </div>
          </div>
        </div>

        {/* Risk matrix + tables — responsive */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-semibold">Эрсдэлийн матриц 5×5 — heatmap</h3>
            <p className="mt-1 text-xs text-muted-foreground">Dynamic — phone-д scroll, desktop-д бүтэн</p>
            <div className="mt-4"><RiskMatrix /></div>
            <table className="mt-4 w-full text-xs">
              <thead className="text-muted-foreground"><tr><th className="pb-2 text-left">Эрсдэл</th><th className="pb-2 text-left">L×I</th><th className="pb-2 text-left">Түвшин</th></tr></thead>
              <tbody className="divide-y">
                {[["Галын аюул — үйлдвэр","4×5=20","Өндөр"],["Мэдээлэл алдагдал","3×5=15","Өндөр"],["Хог хаягдал — хөрс","3×3=9","Дунд"]].map(([a,b,c])=>(
                  <tr key={a}><td className="py-2">{a}</td><td className="py-2">{b}</td><td className="py-2"><span className={`rounded-full px-2 py-0.5 text-[11px] ${c==="Өндөр"?"bg-red-50 text-red-700 dark:bg-red-950/30":"bg-amber-50 text-amber-700 dark:bg-amber-950/30"}`}>{c}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-semibold">Дотоод аудитын төлөв</h3>
            <div className="mt-4 space-y-2.5">
              {[
                ["Аудит #03 — ЧАНАР","2026-03-15","Дууссан","bg-emerald-50 text-emerald-700"],
                ["Аудит #04 — ХАБ","2026-04-10","Төлөвлөсөн","bg-blue-50 text-blue-700"],
                ["Аудит #05 — Байгаль","2026-05-20","Төлөвлөсөн","bg-muted text-muted-foreground"],
              ].map(([t,d,s,cls])=>(
                <div key={t} className="flex items-center justify-between rounded-xl border bg-card px-3 py-2.5">
                  <div><div className="text-xs font-medium">{t}</div><div className="text-xs text-muted-foreground">{d}</div></div>
                  <span className={`rounded-full px-2 py-1 text-xs ${cls}`}>{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border bg-muted p-3 text-xs text-muted-foreground">CAPA: 9 нээлттэй • 4 хугацаа хэтэрсэн — royal gold progress</div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border bg-card p-4 text-center text-xs text-muted-foreground">Desktop 1280px • Tablet 768px • Phone 375px — бүгдэд туршигдсан • Sidebar collapse/expand • Dark/Light</div>
      </main>
    </AppShell>
  );
}
