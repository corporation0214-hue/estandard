"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Handle hash fragment (#access_token=...) and code exchange
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      // Supabase JS will auto-detect session from hash
      setTimeout(() => supabase.auth.getSession().then(({ data }) => {
        if (data.session) setReady(true);
      }), 500);
    } else {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) setReady(true);
        else setErr("Холбоос хүчингүй эсвэл хугацаа дууссан. /login дээр Дахин сэргээх дарж шинэ холбоос аваарай. Холбоос 1 цаг хүчинтэй, 1 удаа л ашиглагдана.");
      });
    }
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) {
        setReady(true);
        setErr(null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (password.length < 6) {
      setErr("Нууц үг хамгийн багадаа 6 тэмдэгт");
      return;
    }
    if (password !== confirm) {
      setErr("Нууц үг таарахгүй байна");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setErr(error.message);
    } else {
      setMsg("Нууц үг амжилттай солигдлоо! Одоо нэвтэрнэ.");
      setTimeout(() => router.push("/login"), 1500);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg royal-gradient text-xs font-bold text-white">E</div>
            <span className="text-xs font-bold">ESTANDARD<span className="text-[var(--royal-gold)]">.MN</span></span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto flex max-w-[420px] flex-col px-4 py-10">
        <div className="rounded-2xl border bg-card p-6 shadow-xl">
          <h1 className="text-center text-xl font-bold">Нууц үг тохируулах</h1>
          <p className="mt-2 text-center text-xs text-muted-foreground">Invitation эсвэл сэргээх холбоосоор орж ирсэн бол энд шинэ нууц үгээ үүсгэнэ.</p>
          {!ready ? (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
              {err || "Сесс шалгаж байна..."}
              <div className="mt-3">
                <Link href="/login" className="text-[var(--royal)] underline dark:text-[var(--royal-gold)]">Нэвтрэх хуудас → Дахин сэргээх</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium">Шинэ нууц үг</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[var(--royal-gold)]" />
              </div>
              <div>
                <label className="text-xs font-medium">Баталгаажуулах</label>
                <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" className="mt-1 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[var(--royal-gold)]" />
              </div>
              {err && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950/30">{err}</div>}
              {msg && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:bg-emerald-950/30">{msg}</div>}
              <button disabled={loading} className="w-full rounded-full royal-gradient py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
                {loading ? "Хадгалж байна..." : "Нууц үг хадгалах →"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
