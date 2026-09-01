/* Quiet Operations reminder: auth is a calm split stage—focused form on the left, a visual signal field on the right, no dead ends. */
import { ReactNode } from "react";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import BrandMark from "./BrandMark";

export default function AuthLayout({ children, mode }: { children: ReactNode; mode: "login" | "signup" }) {
  return (
    <div className="min-h-screen bg-[#f7f8fb] text-[#202b37] lg:grid lg:grid-cols-[0.92fr_1.08fr]">
      <section className="flex min-h-screen flex-col px-6 py-7 sm:px-12 lg:px-[12%] lg:py-10">
        <div className="flex items-center justify-between"><BrandMark href="/" /><Link href="/" className="flex items-center gap-1.5 text-[11px] font-bold text-[#7a8796] transition-colors hover:text-[#e60012]"><ArrowLeft size={14} /> Back to site</Link></div>
        <div className="flex flex-1 items-center justify-center py-14"><div className="w-full max-w-[410px]">{children}</div></div>
        <div className="flex items-center gap-2 text-[10px] text-[#9ba6b2]"><ShieldCheck size={13} className="text-[#e60012]" /> UI-only prototype · no real credentials are stored</div>
      </section>
      <section className="relative hidden overflow-hidden bg-[#edf4ff] lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.95),transparent_34%),linear-gradient(135deg,#edf4ff_0%,#f7f8fb_72%)]" />
        <div className="absolute left-[12%] top-[16%] h-44 w-44 rounded-full bg-[#f7d9dc]/70 blur-3xl" /><div className="absolute bottom-[12%] right-[12%] h-52 w-52 rounded-full bg-[#f6d8d1]/50 blur-3xl" />
        <div className="relative flex h-full min-h-screen flex-col justify-between p-12 xl:p-20">
          <div className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8491a1]"><span className="h-1.5 w-1.5 rounded-full bg-[#6d6d6d]" /> Station status · ready</div>
          <div className="relative mx-auto w-full max-w-[570px]">
            <img src="/public/manus-storage/onfon-next-auth-signal_b86be646.png" alt="Abstract Onfon Next signal field" className="absolute -inset-20 h-[calc(100%+10rem)] w-[calc(100%+10rem)] object-cover opacity-85 mix-blend-multiply" />
            <div className="relative rounded-[18px] border border-white/90 bg-white/82 p-6 shadow-[0_26px_70px_rgba(39,55,75,0.12)] backdrop-blur-xl xl:p-8">
              <div className="flex items-start justify-between border-b border-[#e8edf3] pb-5"><div><div className="qo-eyebrow text-[#e60012]">Onfon Next / {mode === "login" ? "01" : "02"}</div><div className="mt-2 text-[18px] font-bold tracking-[-0.04em]">{mode === "login" ? "Your shift, in context." : "Build a clearer shift."}</div></div><div className="rounded-lg bg-[#fff0f1] p-2 text-[#e60012]"><Check size={16} /></div></div>
              <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl border border-[#e9edf2] bg-white/80 p-4"><div className="qo-eyebrow">Today’s queue</div><div className="mt-3 text-[30px] font-bold tracking-[-0.07em]">128</div><div className="mt-1 text-[10px] font-semibold text-[#6d6d6d]">+14% ready to review</div></div><div className="rounded-xl border border-[#e9edf2] bg-white/80 p-4"><div className="qo-eyebrow">Avg. headroom</div><div className="mt-3 text-[30px] font-bold tracking-[-0.07em]">KES 12</div><div className="mt-1 text-[10px] font-semibold text-[#7e8a98]">per day / customer</div></div></div>
              <div className="mt-4 rounded-xl border border-[#e9edf2] bg-white/70 p-4"><div className="mb-4 flex items-center justify-between"><div className="text-[11px] font-bold">Decision pipeline</div><div className="text-[10px] text-[#8b97a5]">live</div></div><div className="flex h-20 items-end gap-2">{[34, 48, 42, 64, 58, 76, 88, 78, 94, 82, 100].map((h, i) => <div key={i} className={`flex-1 rounded-t-sm ${i === 9 ? 'bg-[#e60012]' : i > 7 ? 'bg-[#e60012]' : 'bg-[#d7e6ff]'}`} style={{ height: `${h}%` }} />)}</div><div className="mt-3 flex justify-between text-[9px] font-semibold text-[#9aa5b2]"><span>08:00</span><span>12:00</span><span>16:00</span><span>Now</span></div></div>
            </div>
          </div>
          <div className="flex items-end justify-between gap-4"><div><p className="qo-display max-w-[340px] text-[29px] font-semibold leading-[1.02] text-[#202b37]">Responsible growth starts with a visible reason.</p><p className="mt-3 text-[11px] leading-[1.6] text-[#738092]">From repayment baseline to inventory confidence, every signal stays close to the decision.</p></div><span className="qo-eyebrow hidden !text-[#e60012] xl:block">Onfon / operator tools</span></div>
        </div>
      </section>
    </div>
  );
}
