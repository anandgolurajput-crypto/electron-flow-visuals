import { SectionShell, FadeUp } from "./SectionShell";
import { Plug, ShieldCheck, Gauge, Lightbulb, SunMedium } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Item = {
  icon: LucideIcon;
  name: string;
  tag: string;
  blurb: string;
  example: string;
  span?: string;
};

const items: Item[] = [
  {
    icon: Plug,
    name: "Standard Rectifier",
    tag: "PN Junction",
    blurb: "Handles high voltage and current. The workhorse of AC → DC conversion.",
    example: "Bridge rectifiers inside laptop chargers flip negative AC half-cycles into positive DC power.",
    span: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    name: "Zener Diode",
    tag: "The Protector",
    blurb: "Heavily doped to operate intentionally in the Reverse Breakdown region — perfect voltage regulator.",
    example: "Placed parallel to a CPU rail: a 9 V spike on a 5 V line is dumped to ground, saving the chip.",
  },
  {
    icon: Gauge,
    name: "Schottky Diode",
    tag: "The Speed Demon",
    blurb: "Metal-to-semiconductor junction — no slow depletion region. Recovery time ≈ 0 ns, drop only 0.15–0.45 V.",
    example: "Switches millions of times per second inside RF circuits and high-speed logic gates.",
  },
  {
    icon: Lightbulb,
    name: "Light Emitting Diode",
    tag: "Electroluminescence",
    blurb: "Built from Gallium Arsenide. Electrons crossing the junction drop in energy and release photons.",
    example: "Fiber optic transmitters, indicator lamps, OLED-class displays — the backbone of modern photonics.",
    span: "md:col-span-2",
  },
  {
    icon: SunMedium,
    name: "Photodiode & Solar Cell",
    tag: "Light → Current",
    blurb: "Operates in reverse — incoming photons free carriers and generate a measurable current.",
    example: "Automatic doors, camera sensors, and rooftop solar arrays powering entire homes.",
    span: "md:col-span-3",
  },
];

export function RealWorldGrid() {
  return (
    <SectionShell id="types" eyebrow="03 · Atomic Tear-downs" title="Five diodes. Five completely different jobs.">
      <div className="grid md:grid-cols-3 gap-5 auto-rows-fr">
        {items.map((it, i) => (
          <FadeUp key={it.name} delay={i * 0.05}>
            <div className={`glass rounded-2xl p-6 h-full transition-all duration-300 hover:scale-[1.02] hover:ring-1 hover:ring-sky-400/40 ${it.span ?? ""}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="w-9 h-9 rounded-lg bg-sky-400/10 ring-1 ring-sky-400/30 flex items-center justify-center text-sky-300">
                  <it.icon size={18} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{it.tag}</span>
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight">{it.name}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{it.blurb}</p>
              <p className="mt-4 text-xs text-slate-500 border-l-2 border-sky-400/40 pl-3 italic">{it.example}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionShell>
  );
}
