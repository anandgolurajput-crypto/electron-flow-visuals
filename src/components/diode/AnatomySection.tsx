import { SectionShell, FadeUp } from "./SectionShell";
import { Plus, Minus, GitMerge } from "lucide-react";

const blocks = [
  {
    icon: Plus,
    tag: "P-Type",
    title: "Anode",
    color: "from-rose-500/20 to-rose-500/0 text-rose-300 ring-rose-400/30",
    desc: "Doped with trivalent impurities. Majority carriers are HOLES — vacancies behaving as mobile positive charges.",
  },
  {
    icon: GitMerge,
    tag: "Junction",
    title: "PN Interface",
    color: "from-violet-500/20 to-violet-500/0 text-violet-300 ring-violet-400/30",
    desc: "Where P meets N. A thin depletion region forms — devoid of free carriers, packed with an internal electric field.",
  },
  {
    icon: Minus,
    tag: "N-Type",
    title: "Cathode",
    color: "from-sky-500/20 to-sky-500/0 text-sky-300 ring-sky-400/30",
    desc: "Doped with pentavalent impurities. Majority carriers are ELECTRONS — free to drift under any applied field.",
  },
];

export function AnatomySection() {
  return (
    <SectionShell id="anatomy" eyebrow="01 · Core Concept" title="The Electronic Valve.">
      <FadeUp>
        <p className="text-slate-400 max-w-2xl text-lg leading-relaxed mb-12">
          A diode is a fundamental semiconductor device that allows electric current to flow effortlessly in one
          direction — and acts as an impenetrable wall the moment current tries to reverse.
        </p>
      </FadeUp>
      <div className="grid md:grid-cols-3 gap-5">
        {blocks.map((b, i) => (
          <FadeUp key={b.title} delay={i * 0.08}>
            <div className={`glass rounded-2xl p-6 h-full ring-1 transition-all duration-300 hover:scale-[1.02] hover:ring-2 bg-gradient-to-b ${b.color}`}>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-70">{b.tag}</span>
                <b.icon size={18} />
              </div>
              <h3 className="text-2xl font-semibold text-white tracking-tight">{b.title}</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{b.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionShell>
  );
}
