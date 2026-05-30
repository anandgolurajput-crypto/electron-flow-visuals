import { SectionShell, FadeUp } from "./SectionShell";
import { AlertTriangle, Flame, ThermometerSun } from "lucide-react";

const issues = [
  {
    icon: AlertTriangle,
    title: "The 0.7 V Voltage Drop Penalty",
    body: "A standard silicon diode burns 0.7 V every time it conducts. In a 3.3 V IoT sensor that is over 21% of the entire battery budget — wasted as heat.",
    fix: "Engineers swap in MOSFETs or Schottky diodes (~0.2 V drop) for high-efficiency power paths.",
  },
  {
    icon: Flame,
    title: "Power Loss as Pure Heat",
    body: "P = V · I. A 10 A current through that 0.7 V drop dissipates 7 W as heat inside a single component.",
    fix: "High-power rectifiers demand massive aluminum heatsinks — and active cooling — to avoid thermal runaway.",
  },
  {
    icon: ThermometerSun,
    title: "Temperature Sensitivity",
    body: "Reverse leakage current roughly doubles every 10 °C. In harsh thermal environments diodes drift, mis-bias, and ultimately fail unpredictably.",
    fix: "Aerospace and automotive systems use temperature-graded SiC or GaN devices instead.",
  },
];

export function LoopholesWarning() {
  return (
    <SectionShell id="loopholes" eyebrow="04 · Engineering Reality" title="Diodes are not free. Here is what nobody puts on the datasheet front page.">
      <div className="grid md:grid-cols-3 gap-5">
        {issues.map((x, i) => (
          <FadeUp key={x.title} delay={i * 0.07}>
            <div className="rounded-2xl p-6 h-full glass ring-1 ring-amber-400/20 hover:ring-amber-400/50 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-b from-amber-500/[0.06] to-transparent">
              <div className="flex items-center justify-between mb-6">
                <div className="w-9 h-9 rounded-lg bg-amber-400/10 ring-1 ring-amber-400/40 flex items-center justify-center text-amber-300">
                  <x.icon size={18} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/80">Caution</span>
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight">{x.title}</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{x.body}</p>
              <div className="mt-5 pt-4 border-t border-white/5">
                <p className="text-[11px] uppercase tracking-widest text-sky-400/70 font-mono mb-1.5">Mitigation</p>
                <p className="text-sm text-slate-300 leading-relaxed">{x.fix}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionShell>
  );
}
