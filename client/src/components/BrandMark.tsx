/* Quiet Operations reminder: the mark is the shared anchor between public pages and the operator shell. */
import { Link } from "wouter";

type BrandMarkProps = {
  compact?: boolean;
  light?: boolean;
  href?: string;
};

export default function BrandMark({ compact = false, light = false, href = "/" }: BrandMarkProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5 group" aria-label="Onfon Next home">
      <img src="/public/manus-storage/onfon-next-mark-red-black_b74af078.png" alt="" className={`${compact ? "h-8 w-8" : "h-9 w-9"} rounded-[9px] object-contain transition-transform duration-200 group-hover:-translate-y-0.5`} />
      <span className={`leading-none ${light ? "text-white" : "text-[#202b37]"}`}>
        <span className="block text-[12px] font-black uppercase tracking-[0.16em]">ONFON</span>
        <span className={`mt-0.5 block text-[8px] font-black uppercase tracking-[0.3em] ${light ? "text-[#ff8a94]" : "text-[#e60012]"}`}>NEXT</span>
      </span>
    </Link>
  );
}
