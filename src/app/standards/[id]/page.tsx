import Link from "next/link";
import { notFound } from "next/navigation";
import { STANDARDS } from "@/lib/standards";

const CLAUSES: Record<string, string[]> = {
  iso9001: [
    "4 Байгууллагын нөхцөл байдал",
    "5 Манлайлал",
    "6 Төлөвлөлт",
    "7 Дэмжлэг",
    "8 Үйл ажиллагаа",
    "9 Гүйцэтгэлийн үнэлгээ",
    "10 Сайжруулалт",
  ],
  iso14001: [
    "4 Байгууллагын нөхцөл",
    "5 Манлайлал",
    "6 Төлөвлөлт — байгаль орчны асуудал",
    "7 Дэмжлэг",
    "8 Үйл ажиллагаа",
    "9 Гүйцэтгэлийн үнэлгээ",
    "10 Сайжруулалт",
  ],
  iso45001: [
    "4 Байгууллагын нөхцөл",
    "5 Манлайлал ба ажилтны оролцоо",
    "6 Төлөвлөлт — аюул, эрсдэл",
    "7 Дэмжлэг",
    "8 Үйл ажиллагаа",
    "9 Гүйцэтгэлийн үнэлгээ",
    "10 Сайжруулалт",
  ],
  iso27001: [
    "4 Байгууллагын нөхцөл",
    "5 Манлайлал",
    "6 Төлөвлөлт — эрсдэл",
    "7 Дэмжлэг",
    "8 Үйл ажиллагаа",
    "9 Гүйцэтгэлийн үнэлгээ",
    "10 Сайжруулалт",
  ],
  iso31000: ["4 Зарчим", "5 Хүрээ", "6 Процесс — үнэлгээ, боловсруулалт"],
  iso19011: ["4 Аудитын зарчим", "5 Аудитын хөтөлбөр удирдах", "6 Аудит хийх", "7 Аудиторын ур чадвар"],
};

export default async function StandardDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const std = STANDARDS.find((s) => s.id === id);
  if (!std) return notFound();

  const clauses = CLAUSES[id] ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link href="/standards" className="text-sm text-slate-600 hover:text-slate-900">
            ← Стандартууд
          </Link>
          <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
            Самбар
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className={`inline-flex rounded-full px-3 py-1 text-xs font-medium text-white ${std.color}`}>
          {std.code}
        </div>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          {std.nameMn} — {std.name}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{std.description}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border bg-white p-6">
            <h2 className="text-sm font-semibold text-slate-900">Бүлгүүд & GAP үнэлгээ</h2>
            <p className="mt-1 text-xs text-slate-500">Тус бүрд 0–5 үнэлгээ (0=байхгүй, 5=бүрэн нэвтэрсэн)</p>
            <div className="mt-4 divide-y">
              {clauses.map((c) => (
                <div key={c} className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-700">{c}</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        className="h-7 w-7 rounded-full border text-xs hover:bg-slate-900 hover:text-white"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800">
              Үнэлгээ хадгалах (Supabase)
            </button>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="text-sm font-semibold">Шаардлагатай баримт бичиг</h3>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li>• Чанарын бодлого, зорилтууд</li>
              <li>• Эрсдэл, боломжийн бүртгэл</li>
              <li>• Журам, заавар, маягтууд</li>
              <li>• Дотоод аудитын тайлан</li>
              <li>• Менежментийн хяналтын тэмдэглэл</li>
            </ul>
            <div className="mt-6 rounded-xl bg-slate-900 p-4 text-xs text-slate-200">
              Annex SL бүтэц — бүх ISO стандартууд нэгдсэн 10 бүлэгтэй (HSL), ингэснээр IMS
              нэвтрүүлэхэд хялбар.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
