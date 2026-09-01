/* Quiet Operations reminder: every major workspace should expose a compact reason, value, constraint, and next step before the operator reaches the table. */
import { ReactNode } from "react";

type Instrument = { label: string; value: string; detail: string; tone?: "blue" | "mint" | "amber" | "coral"; icon?: ReactNode };

const tones = {
  blue: "border-[#f0d8da] bg-[#fff7f7] text-[#e60012]",
  mint: "border-[#f7d9dc] bg-[#fff7f7] text-[#6d6d6d]",
  amber: "border-[#f0dec4] bg-[#fffaf1] text-[#6d6d6d]",
  coral: "border-[#f0d8d4] bg-[#fffaf9] text-[#bd6b60]",
};

export default function StationInstrument({ items }: { items: Instrument[] }) {
  return <div className="mb-6 grid gap-2 border-y border-[#dce3eb] bg-[#fafbfd] p-2 sm:grid-cols-3">{items.map((item) => <div key={item.label} className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${tones[item.tone || "blue"]}`}><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/80 text-current">{item.icon}</div><div className="min-w-0"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.11em] text-current"><span>{item.label}</span><span className="h-1 w-1 rounded-full bg-current opacity-50" /></div><div className="mt-1 flex items-baseline gap-2"><span className="truncate text-[12px] font-bold text-[#36465a]">{item.value}</span><span className="truncate text-[10px] text-[#7f8d9d]">{item.detail}</span></div></div></div>)}</div>;
}
