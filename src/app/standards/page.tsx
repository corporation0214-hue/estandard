import Link from "next/link";
import { STANDARDS } from "@/lib/standards";

export default function StandardsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-sm font-bold">
            ESTANDARD<span className="text-blue-700">.MN</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
            Самбар →
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900">Стандартууд</h1>
        <p className="mt-2 text-sm text-slate-600">
          ISO стандартын бүтэц (Annex SL), бүлэг тус бүрийн шаардлага, GAP үнэлгээний
          хэрэгсэл.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map((s) => (
            <Link
              key={s.id}
              href={`/standards/${s.id}`}
              className="rounded-2xl border bg-white p-6 hover:shadow-md"
            >
              <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${s.color} text-white text-xs`}>
                {s.icon}
              </div>
              <div className="mt-3 text-xs text-slate-500">{s.code}</div>
              <div className="font-semibold text-slate-900">{s.nameMn}</div>
              <div className="text-xs text-slate-500">{s.name}</div>
              <p className="mt-2 text-sm text-slate-600">{s.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
