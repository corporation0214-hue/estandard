"use client";

export function Donut({ value, label, sub }: { value: number; label: string; sub?: string }) {
  const r = 32;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-20 w-20">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} stroke="var(--border)" strokeWidth="8" fill="none" />
          <circle
            cx="40"
            cy="40"
            r={r}
            stroke="var(--royal-gold)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={off}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold">{value}%</span>
          <span className="text-[10px] text-muted-foreground">нийцэл</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="text-xs font-medium">{label}</div>
        {sub && <div className="text-[11px] text-muted-foreground">{sub}</div>}
      </div>
    </div>
  );
}

export function BarChart({
  data,
}: {
  data: { label: string; value: number; color?: string }[];
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label}>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{d.label}</span>
            <span className="font-medium">{d.value}%</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{
                width: `${(d.value / max) * 100}%`,
                background: d.color ?? "linear-gradient(90deg, #1a2540, #c5a46a)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RiskMatrix() {
  const cells = [
    [3, 6, 9, 12, 15],
    [2, 4, 6, 8, 10],
    [2, 3, 4, 6, 8],
    [1, 2, 3, 4, 5],
    [1, 1, 2, 2, 3],
  ];
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[220px]">
        <div className="grid grid-cols-6 gap-1 text-[11px]">
          <div />
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="py-1 text-center font-medium text-muted-foreground">
              {n}
            </div>
          ))}
          {cells.map((row, i) => (
            <>
              <div key={`r-${i}`} className="flex items-center justify-center font-medium text-muted-foreground">
                {5 - i}
              </div>
              {row.map((v, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`flex h-7 items-center justify-center rounded-lg border text-xs font-medium ${
                    v >= 12
                      ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300"
                      : v >= 6
                        ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300"
                  }`}
                >
                  {v}
                </div>
              ))}
            </>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>← Нөлөө бага</span>
          <span>Магадлал →</span>
        </div>
      </div>
    </div>
  );
}
