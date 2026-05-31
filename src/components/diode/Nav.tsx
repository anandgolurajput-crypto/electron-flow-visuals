import { Cpu } from "lucide-react";

const links = [
  ["Anatomy", "#anatomy"],
  ["Mathematics", "#math"],
  ["Types", "#types"],
  ["Reality", "#loopholes"],
  ["Syllabus", "#syllabus"],
  ["Reference", "#facts"],
  ["Ask AI", "#ask"],
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-white font-semibold tracking-tight">
          <span className="w-7 h-7 rounded-md bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center">
            <Cpu size={15} className="text-slate-950" />
          </span>
          DIODE<span className="text-slate-500 font-normal">/lab</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-400">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-white transition-colors">{label}</a>
          ))}
        </nav>
        <div className="text-[11px] font-mono text-slate-500 hidden sm:block">ITM · Gwalior</div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-sm">
        <p className="text-white tracking-tight">
          Made by <span className="bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-transparent font-semibold">Anand</span>
        </p>
        <p className="text-slate-400 font-mono text-xs">
          ITM Gwalior · Branch: CSE-AIML · Department: Basic Electrical & Electronic Engg.
        </p>
      </div>
    </footer>
  );
}
