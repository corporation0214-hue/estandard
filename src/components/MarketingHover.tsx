"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const DEFAULT_BG = "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=800&q=80&auto=format&fit=crop";

export function SurpriseSpotlight() {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [flashOpen, setFlashOpen] = useState(false);
  const [bgImage, setBgImage] = useState(DEFAULT_BG);
  const [bgInput, setBgInput] = useState("");
  const [showBgSettings, setShowBgSettings] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bgSaving, setBgSaving] = useState(false);
  const [bgStatus, setBgStatus] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh бүрд дахин гарч ирнэ — localStorage шалгахгүй
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const supa = createClient();
    // 1) Public shared value — Supabase (бүх зочинд ижил харагдана)
    supa
      .from("site_settings")
      .select("value")
      .eq("key", "flash_bg")
      .single()
      .then(({ data }) => {
        if (data?.value) {
          setBgImage(data.value);
          setBgInput(data.value);
          localStorage.setItem("estandard-flash-bg", data.value);
        } else {
          // Fallback: local cache (Supabase хоосон/алдаатай үед)
          const saved = localStorage.getItem("estandard-flash-bg");
          if (saved) {
            setBgImage(saved);
            setBgInput(saved);
          }
        }
      });
    // Admin check — Supabase session
    supa.auth.getSession().then(({ data }) => {
      if (!data.session) return;
      // Any logged-in user is admin for MVP; production: check profiles.role === 'admin'
      setIsAdmin(true);
      supa
        .from("profiles")
        .select("role")
        .eq("id", data.session.user.id)
        .single()
        .then(({ data: p }) => {
          if (p?.role === "admin") setIsAdmin(true);
        });
    });
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;
    const t = setTimeout(() => setExpanded(true), 3500);
    const close = setTimeout(() => setExpanded(false), 8000);
    return () => {
      clearTimeout(t);
      clearTimeout(close);
    };
  }, [visible, dismissed]);

  function handleDismiss() {
    setDismissed(true);
    setExpanded(false);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current || !expanded) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
  }
  function handleMouseLeave() {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)";
    setExpanded(false);
  }

  async function applyBg(url: string) {
    const clean = url.trim();
    if (!clean) return;
    setBgSaving(true);
    setBgStatus(null);
    setBgImage(clean);
    localStorage.setItem("estandard-flash-bg", clean);
    try {
      const supa = createClient();
      const { error } = await supa
        .from("site_settings")
        .upsert({ key: "flash_bg", value: clean }, { onConflict: "key" });
      if (error) throw error;
      setBgStatus("✓ Нийтэд хадгалагдлаа — бүх зочинд харагдана");
    } catch (e) {
      setBgStatus(
        "⚠ Зөвхөн энэ browser-д хадгалагдлаа (серверт хадгалалт амжилтгүй: " +
          (e instanceof Error ? e.message : "алдаа") +
          "). SQL migration ажиллуулсан эсэхийг шалгана уу."
      );
    } finally {
      setBgSaving(false);
    }
  }

  async function handleFileUpload(file: File) {
    setBgSaving(true);
    setBgStatus(null);
    try {
      const supa = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const path = `flash-bg-${Date.now()}.${ext}`;
      const { error: upError } = await supa.storage.from("marketing").upload(path, file, {
        upsert: true,
        contentType: file.type,
      });
      if (upError) throw upError;
      const { data } = supa.storage.from("marketing").getPublicUrl(path);
      await applyBg(data.publicUrl);
    } catch (e) {
      // Fallback: local data URL (зөвхөн энэ browser-д харагдана)
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        setBgImage(dataUrl);
        setBgInput(dataUrl);
        localStorage.setItem("estandard-flash-bg", dataUrl);
        setBgStatus(
          "⚠ Storage upload амжилтгүй (" +
            (e instanceof Error ? e.message : "алдаа") +
            ") — зөвхөн энэ browser-д харагдана. 'marketing' bucket үүсгэсэн эсэхийг шалгана уу."
        );
        setBgSaving(false);
      };
      reader.readAsDataURL(file);
      return;
    }
    setBgSaving(false);
  }

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 px-2 md:bottom-6 md:right-6">
      {/* Collapsed pill */}
      <div
        onMouseEnter={() => setExpanded(true)}
        onClick={() => setExpanded((v) => !v)}
        className={`flex cursor-pointer items-center gap-2 rounded-full border bg-card px-3 py-2 shadow-xl transition-all hover:shadow-2xl md:px-4 ${expanded ? "opacity-0 pointer-events-none translate-y-2" : "opacity-100"}`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full gold-gradient text-sm animate-bounce">🎁</span>
        <span className="hidden text-xs font-semibold sm:inline">Сюрприз санал</span>
        <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white animate-pulse">ШИНЭ</span>
        <span className="text-xs text-muted-foreground">↗</span>
      </div>

      {/* Expanded window */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`w-[92vw] max-w-[380px] origin-bottom-right overflow-hidden rounded-2xl border bg-card shadow-2xl transition-all duration-500 ${expanded ? "scale-100 opacity-100 translate-y-0" : "pointer-events-none scale-95 opacity-0 translate-y-4"}`}
      >
        {/* Top shimmer */}
        <div className="relative royal-gradient p-5 text-white">
          <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shimmer 2s infinite" }} />
          <button onClick={handleDismiss} className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs hover:bg-white/30">✕</button>
          {/* Flash icon — second window trigger */}
          <button
            onClick={() => setFlashOpen(true)}
            className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--royal-gold)] text-[var(--royal)] shadow-lg ring-2 ring-white/30 hover:scale-110 transition-transform animate-pulse"
            title="Flash — зураг дэлгэх"
            aria-label="Flash image"
          >
            <span className="text-sm">⚡</span>
          </button>
          <div className="ml-8 inline-flex items-center gap-1.5 rounded-full bg-[var(--royal-gold)] px-2.5 py-1 text-[11px] font-bold text-[var(--royal)]">✦ INNOVATION DROP ✦</div>
          <h3 className="mt-3 text-lg font-bold leading-tight">AI-аар ISO нэвтрүүлэлт<br /><span className="text-[var(--royal-gold-light)]">70% хурдан</span> — сюрприз!</h3>
          <p className="mt-2 text-xs leading-5 text-slate-200">Эхний 10 байгууллагад GAP үнэлгээ + эрсдэлийн матриц <b className="text-white">үнэгүй</b>. Hover хийхэд 3D tilt, confetti!</p>
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="absolute h-1.5 w-1.5 rounded-full bg-[var(--royal-gold)] opacity-70" style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 2) * 40}%`, animation: `float ${2 + i * 0.3}s ease-in-out infinite` }} />
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: "3 хоног", l: "GAP тайлан" },
              { v: "5×5", l: "Матриц" },
              { v: "24/7", l: "AI туслах" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-muted p-2.5 text-center">
                <div className="text-sm font-bold text-[var(--royal)] dark:text-white">{s.v}</div>
                <div className="text-[11px] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs dark:border-amber-800 dark:bg-amber-950/30">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="font-medium">7 хоногийн урамшуулал</span>
            <span className="ml-auto font-mono text-amber-700 dark:text-amber-300">06:23:41</span>
          </div>

          <div className="mt-4 flex gap-2">
            <Link href="/dashboard" onClick={handleDismiss} className="flex-1 rounded-full royal-gradient px-4 py-2.5 text-center text-sm font-semibold text-white shadow hover:opacity-90">Сюрприз авах →</Link>
            <button onClick={handleDismiss} className="rounded-full border bg-card px-4 py-2.5 text-sm hover:bg-muted">Хаах</button>
          </div>
          <div className="mt-3 text-center text-[11px] text-muted-foreground">⚡ Flash → зураг • Hover → 3D</div>
        </div>
      </div>

      {/* Flash dot → image window — smooth scale + opacity, dissolves into flash icon */}
      <div className={`fixed inset-0 z-[60] flex items-center justify-center ${flashOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          onClick={() => setFlashOpen(false)}
          className={`absolute inset-0 bg-[var(--royal)]/50 backdrop-blur-sm transition-opacity duration-500 ease-out ${flashOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`relative flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${flashOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          style={{ transformOrigin: "calc(50% + 40vw - 80px) calc(50% + 40vh - 80px)" }}
        >
          {/* Title — outside & above the image edge */}
          <h4
            className="mb-3 bg-gradient-to-r from-[var(--royal-gold)] via-[#fff8d6] to-[var(--royal-gold)] bg-clip-text px-4 text-center text-3xl font-black tracking-tight text-transparent drop-shadow-[0_0_18px_rgba(197,164,106,0.8)] md:text-4xl"
            style={{ backgroundSize: "200% 100%", animation: "goldShimmer 2s linear infinite, vividPulse 1.2s ease-in-out infinite" }}
          >
            БАЯР ХҮРГЭЕ!
          </h4>
          <div className="relative w-[92vw] max-w-[560px] h-[360px] md:h-[440px] overflow-hidden rounded-2xl border shadow-2xl">
          {/* Background image */}
          <img alt="promo bg" src={bgImage} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--royal)]/90 via-[var(--royal)]/60 to-[var(--royal)]/20" />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="flex flex-col items-center justify-center">
              <p className="max-w-sm text-sm leading-6 text-slate-200">estandard.mn — таны байгууллага ISO нэгдсэн удирдлагын тогтолцоонд нэг алхам ойртлоо. Итгэл, чанар, тогтвортой хөгжил!</p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5 text-xs">
                <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">ISO 9001</span>
                <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">ISO 14001</span>
                <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">ISO 45001</span>
                <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">ISO 27001</span>
                <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">ISO 31000</span>
                <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur border border-[var(--royal-gold)]/40">ISO 19011</span>
              </div>
            </div>
          </div>
          {/* Close X */}
          <button onClick={() => setFlashOpen(false)} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60 transition">✕</button>

          {/* Background image settings — admin only (public-д огт харагдахгүй) */}
          {isAdmin && (
          <div className="absolute bottom-0 left-0 right-0 border-t bg-card/95 p-3 backdrop-blur">
            {!showBgSettings ? (
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium">🖼 Арын зураг • Админ</span>
                <button onClick={() => setShowBgSettings(true)} className="rounded-full border bg-card px-3 py-1 text-xs hover:bg-muted">Солих ⚙</button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">Зураг тохируулах (админ)</span>
                  <button onClick={() => setShowBgSettings(false)} className="text-xs text-muted-foreground hover:text-foreground">✕ хаах</button>
                </div>
                {bgStatus && (
                  <div className="rounded-xl border bg-muted px-3 py-2 text-[11px] leading-4">
                    {bgStatus}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    value={bgInput}
                    onChange={(e) => setBgInput(e.target.value)}
                    placeholder="https://... зураг URL"
                    className="flex-1 rounded-full border bg-background px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[var(--royal-gold)]"
                  />
                  <button
                    onClick={() => applyBg(bgInput)}
                    disabled={bgSaving}
                    className="rounded-full royal-gradient px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                  >
                    {bgSaving ? "Хадгалж..." : "Нийтэд хадгалах"}
                  </button>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {[
                    "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=800&q=80&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop",
                  ].map((url) => (
                    <button key={url} onClick={() => { setBgInput(url); applyBg(url); }} className={`h-10 w-14 shrink-0 overflow-hidden rounded-lg border-2 ${bgImage === url ? "border-[var(--royal-gold)]" : "border-transparent"}`}>
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                  <label className={`flex h-10 w-14 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-muted text-xs hover:bg-muted/80 ${bgSaving ? "pointer-events-none opacity-50" : ""}`}>
                    + Файл
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={bgSaving}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        setBgInput("");
                        handleFileUpload(f);
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => applyBg(DEFAULT_BG)} disabled={bgSaving} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50">Анхны болгох</button>
                  <span className="text-xs text-muted-foreground">• Админ горим • Нийтэд хадгалагдана</span>
                </div>
              </div>
            )}
          </div>
          )}
          </div>
        </div>
      </div>

      <style>{`@keyframes float { 0%,100% { transform: translateY(0)} 50% { transform: translateY(-6px)} } @keyframes shimmer { 0% { transform: translateX(-100%)} 100% { transform: translateX(100%)} } @keyframes goldShimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } } @keyframes vividPulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.05) } }`}</style>
    </div>
  );
}

export function HoverPeek({ children, peek }: { children: React.ReactNode; peek: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <div className={`pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-xl border bg-[var(--royal)] px-3 py-2 text-xs font-medium text-white shadow-xl transition-all duration-200 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
        <span className="whitespace-nowrap">{peek}</span>
        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[var(--royal)]" />
      </div>
    </div>
  );
}
