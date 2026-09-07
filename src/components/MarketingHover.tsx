"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export function SurpriseSpotlight() {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localStorage.getItem("estandard-surprise-dismissed")) {
      setDismissed(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
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
    localStorage.setItem("estandard-surprise-dismissed", "1");
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
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--royal-gold)] px-2.5 py-1 text-[11px] font-bold text-[var(--royal)]">✦ INNOVATION DROP ✦</div>
          <h3 className="mt-3 text-lg font-bold leading-tight">AI-аар ISO нэвтрүүлэлт<br /><span className="text-[var(--royal-gold-light)]">70% хурдан</span> — сюрприз!</h3>
          <p className="mt-2 text-xs leading-5 text-slate-200">Эхний 10 байгууллагад GAP үнэлгээ + эрсдэлийн матриц <b className="text-white">үнэгүй</b>. Hover хийхэд 3D tilt, confetti!</p>
          {/* confetti dots */}
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
          <div className="mt-3 text-center text-[11px] text-muted-foreground">Hover → 3D • Tap → нээх • 1 удаа л гарна</div>
        </div>
      </div>

      <style>{`@keyframes float { 0%,100% { transform: translateY(0)} 50% { transform: translateY(-6px)} } @keyframes shimmer { 0% { transform: translateX(-100%)} 100% { transform: translateX(100%)} }`}</style>
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
