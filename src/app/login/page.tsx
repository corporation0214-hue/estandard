"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlError = params.get("error_description") || params.get("error");
    if (urlError) setErr(decodeURIComponent(urlError.replace(/\+/g, " ")) + " — Дахин сэргээх холбоос илгээнэ үү (1 цаг хүчинтэй, 1 удаа).");
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/dashboard");
    });
  }, [router, supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setMsg(null);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMsg("Бүртгэл амжилттай! Имэйлээ шалгаж баталгаажуулна уу. Дараа нь админ эрх олгогдоно.");
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!email) {
      setErr("Эхлээд имэйлээ оруулна уу, дараа нь сэргээх дарна");
      return;
    }
    setLoading(true);
    setErr(null);
    setMsg(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    setLoading(false);
    if (error) setErr(error.message);
    else setMsg(`Сэргээх холбоос ${email} руу илгээлээ. Имэйл доторх холбоосоор орж шинэ нууц үгээ үүсгэнэ. (Invitation-д мөн адил)`);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg royal-gradient text-xs font-bold text-white">E</div>
            <span className="text-xs font-bold">ESTANDARD<span className="text-[var(--royal-gold)]">.MN</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden rounded-full border px-3 py-1.5 text-xs hover:bg-muted md:inline-flex">← Нүүр</Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col items-center px-4 py-10 md:py-16">
        <div className="w-full max-w-[420px] rounded-2xl border bg-card p-6 shadow-xl md:p-8">
          <div className="mx-auto h-1 w-12 rounded-full gold-gradient" />
          <h1 className="mt-4 text-center text-xl font-bold">{mode === "login" ? "Нэвтрэх" : "Бүртгүүлэх"}</h1>
          <p className="mt-2 text-center text-xs leading-5 text-muted-foreground">
            {mode === "login" ? "Админ эрхээр нэвтэрч зураг солих тохиргоог удирдана." : "Шинэ хаяг үүсгэх — нэвтэрсний дараа админ эрх олгогдоно."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium">Имэйл</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@estandard.mn"
                className="mt-1 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[var(--royal-gold)]"
              />
            </div>
            <div>
              <label className="text-xs font-medium">Нууц үг</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[var(--royal-gold)]"
              />
            </div>

            {err && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950/30 dark:text-red-300">{err}</div>}
            {msg && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{msg}</div>}

            <button type="submit" disabled={loading} className="w-full rounded-full royal-gradient py-2.5 text-sm font-semibold text-white shadow hover:opacity-90 disabled:opacity-50">
              {loading ? "Түр хүлээнэ үү..." : mode === "login" ? "Нэвтрэх →" : "Бүртгүүлэх"}
            </button>
          </form>

          <div className="mt-2 text-center">
            <button type="button" onClick={handleResetPassword} className="text-xs text-amber-700 hover:underline dark:text-amber-300">
              Нууц үг мартсан / Invitation? — Сэргээх холбоос илгээх
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-[var(--royal)] hover:underline dark:text-[var(--royal-gold)]">
              {mode === "login" ? "Шинэ хаяг үүсгэх" : "Нэвтрэх рүү буцах"}
            </button>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Самбар →</Link>
          </div>

        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">Royal • Responsive • Аюулгүй нэвтрэлт</div>
      </main>
    </div>
  );
}
