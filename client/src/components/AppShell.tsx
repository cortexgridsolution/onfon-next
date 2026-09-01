/* Quiet Operations reminder: internal pages are dense, anchored by persistent navigation, and use coral only for operational risk. */
import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Bell, ChevronDown, Command, LayoutDashboard, PackageSearch, ClipboardList, Users, Store, Sparkles, Settings2, Settings, FileText, BarChart3, ShieldCheck, CircleHelp } from "lucide-react";
import BrandMark from "./BrandMark";
import { toast } from "sonner";

const primaryNav = [
  { label: "Command center", path: "/app", icon: LayoutDashboard },
  { label: "Customers", path: "/customers", icon: Users },
  { label: "Merchants", path: "/merchants", icon: Store },
  { label: "Catalogue", path: "/catalogue", icon: PackageSearch },
  { label: "Orders", path: "/orders", icon: ClipboardList },
  { label: "Offers & pricing", path: "/offers-pricing", icon: Sparkles },
];
const secondaryNav = [
  { label: "Automations", path: "/automations", icon: Settings2 },
  { label: "Templates", path: "/templates", icon: FileText },
  { label: "Next best action", path: "/next-best-action", icon: Command },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
  { label: "Governance & audit", path: "/governance-audit", icon: ShieldCheck },
  { label: "Settings", path: "/settings", icon: Settings },
];

type AppShellProps = { children: ReactNode; title: string; eyebrow: string; action?: ReactNode };

export default function AppShell({ children, title, eyebrow, action }: AppShellProps) {
  const [location, setLocation] = useLocation();
  const handleNav = (label: string, path?: string) => {
    if (path) setLocation(path);
    else toast.info(`${label} is staged for the next prototype pass.`);
  };

  return (
    <div className="qo-app min-h-screen bg-[#f7f8fb] text-[#202b37]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[238px] flex-col border-r border-[#e4e8ef] bg-[#fbfcfe] px-4 py-5 lg:flex">
        <div className="px-2 pb-8"><BrandMark compact href="/app" /></div>
        <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9aa5b2]">Workspace</div>
        <nav className="space-y-1">
          {primaryNav.map(({ label, path, icon: Icon }) => {
            const active = path && (location === path || (path === "/app" && location === "/command-center"));
            return (
              <button key={label} type="button" onClick={() => handleNav(label, path)} className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] font-semibold transition-colors ${active ? "border-l-2 border-[#e60012] bg-[#fff0f1] pl-[10px] text-[#e60012]" : "border-l-2 border-transparent text-[#657181] hover:bg-[#f0f3f7] hover:text-[#202b37]"}`}>
                <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />{label}
                {label === "Catalogue" && <span className="ml-auto rounded-full bg-[#f7d9dc] px-1.5 py-0.5 text-[9px] font-bold text-[#e60012]">24</span>}
              </button>
            );
          })}
        </nav>
        <div className="mb-2 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9aa5b2]">Operate</div>
        <nav className="space-y-1">
          {secondaryNav.map(({ label, path, icon: Icon }) => {
            const active = path && location === path;
            return <button key={label} type="button" onClick={() => handleNav(label, path)} className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] font-semibold transition-colors ${active ? "border-l-2 border-[#e60012] bg-[#fff0f1] pl-[10px] text-[#e60012]" : "border-l-2 border-transparent text-[#657181] hover:bg-[#f0f3f7] hover:text-[#202b37]"}`}><Icon size={16} strokeWidth={active ? 2.5 : 1.8} />{label}</button>;
          })}
        </nav>
        <div className="mt-auto rounded-xl border border-[#f0d8da] bg-[#fff7f7] p-3.5">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-bold text-[#e60012]"><CircleHelp size={14} /> Barely-There Rule</div>
          <p className="text-[11px] leading-[1.55] text-[#64748b]">Offer only when the customer has room to say yes.</p>
          <button type="button" onClick={() => toast.info("Pricing policy guide is available in the Offers & Pricing workspace.")} className="mt-3 text-[11px] font-bold text-[#e60012] hover:underline">Read the guardrails →</button>
        </div>
      </aside>

      <div className="lg:pl-[238px]">
        <header className="sticky top-0 z-20 flex min-h-[74px] items-center justify-between border-b border-[#e4e8ef] bg-[#f7f8fb]/95 px-5 backdrop-blur-xl sm:px-8">
          <div className="qo-signal-rail min-w-0">
            <div className="qo-eyebrow mb-1">{eyebrow}</div>
            <h1 className="truncate text-[24px] font-bold tracking-[-0.045em] text-[#202b37]">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            {action}
            <button type="button" onClick={() => toast.info("You are all caught up for this shift.")} aria-label="Notifications" className="relative rounded-lg p-2 text-[#64748b] transition-colors hover:bg-white hover:text-[#e60012]"><Bell size={18} strokeWidth={1.8} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#e47b71]" /></button>
            <div className="hidden h-7 w-px bg-[#e1e6ed] sm:block" />
            <button type="button" onClick={() => toast.info("Profile settings are staged for the next prototype pass.")} className="flex items-center gap-2 rounded-lg px-1 py-1.5 text-left hover:bg-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7d9dc] text-[11px] font-bold text-[#e60012]">AM</span>
              <span className="hidden text-[11px] font-bold leading-tight sm:block">Amina M.<span className="mt-0.5 block font-medium text-[#8c97a4]">Operator</span></span><ChevronDown size={14} className="text-[#8c97a4]" />
            </button>
          </div>
        </header>
        <main className="px-5 py-7 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
