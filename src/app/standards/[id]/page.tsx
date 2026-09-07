import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { STANDARDS } from "@/lib/standards";

const CLAUSES: Record<string, string[]> = {
  iso9001: ["4 Байгууллагын нөхцөл байдал", "5 Манлайлал", "6 Төлөвлөлт", "7 Дэмжлэг", "8 Үйл ажиллагаа", "9 Гүйцэтгэлийн үнэлгээ", "10 Сайжруулалт"],
  iso14001: ["4 Байгууллагын нөхцөл", "5 Манлайлал", "6 Төлөвлөлт — байгаль орчны асуудал", "7 Дэмжлэг", "8 Үйл ажиллагаа", "9 Гүйцэтгэлийн үнэлгээ", "10 Сайжруулалт"],
  iso45001: ["4 Байгууллагын нөхцөл", "5 Манлайлал ба ажилтны оролцоо", "6 Төлөвлөлт — аюул, эрсдэл", "7 Дэмжлэг", "8 Үйл ажиллагаа", "9 Гүйцэтгэлийн үнэлгээ", "10 Сайжруулалт"],
  iso27001: ["4 Байгууллагын нөхцөл", "5 Манлайлал", "6 Төлөвлөлт — эрсдэл", "7 Дэмжлэг", "8 Үйл ажиллагаа", "9 Гүйцэтгэлийн үнэлгээ", "10 Сайжруулалт"],
  iso31000: ["4 Зарчим", "5 Хүрээ", "6 Процесс — үнэлгээ, боловсруулалт"],
  iso19011: ["4 Аудитын зарчим", "5 Аудитын хөтөлбөр удирдах", "6 Аудит хийх", "7 Аудиторын ур чадвар"],
};

export default async function StandardDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const std = STANDARDS.find((s) => s.id === id);
  if (!std) return notFound();
  const clauses = CLAUSES[id] ?? [];
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/standards" className="text-sm text-muted-foreground hover:text-foreground">← Стандартууд</Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden rounded-full border px-3 py-1.5 text-xs hover:bg-muted md:inline-flex">← Нүүр</Link>
            <Link href="/dashboard" className="rounded-full bg-muted px-3 py-1.5 text-xs hover:bg-border">Самбар</Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className={`inline-flex rounded-full px-3 py-1 text-xs font-medium text-white ${std.color}`}>{std.code}</div>
        <h1 className="mt-3 text-xl font-bold md:text-2xl">{std.nameMn} — {std.name}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{std.description}</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5 lg:col-span-2">
            <h2 className="text-sm font-semibold">Бүлгүүд & GAP үнэлгээ</h2>
            <p className="mt-1 text-xs text-muted-foreground">0–5 үнэлгээ (0=байхгүй, 5=бүрэн)</p>
            <div className="mt-4 divide-y">
              {clauses.map((c) => (
                <div key={c} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm">{c}</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <button key={n} className="h-7 w-7 rounded-full border bg-card text-xs hover:bg-[var(--royal)] hover:text-white dark:hover:bg-[var(--royal-gold)] dark:hover:text-[var(--royal)]">
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 rounded-full royal-gradient px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">Үнэлгээ хадгалах</button>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-semibold">Шаардлагатай баримт бичиг</h3>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>• Чанарын бодлого, зорилтууд</li>
              <li>• Эрсдэл, боломжийн бүртгэл</li>
              <li>• Журам, заавар, маягтууд</li>
              <li>• Дотоод аудитын тайлан</li>
              <li>• Менежментийн хяналтын тэмдэглэл</li>
            </ul>
            <div className="mt-6 rounded-xl royal-gradient p-4 text-xs text-white">Annex SL — 10 бүлэгт IMS нэвтрүүлэхэд хялбар.</div>
            <div className="mt-4 flex justify-end"><ThemeToggle /></div>
          </div>
        </div>
      </main>
    </div>
  );
}
