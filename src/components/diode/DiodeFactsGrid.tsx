import { SectionShell, FadeUp } from "./SectionShell";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

const characteristics: [string, string][] = [
  ["Unidirectional", "Allows current in one direction only"],
  ["Low Resistance", "In forward bias — current flows freely"],
  ["High Resistance", "In reverse bias — current is blocked"],
  ["Semiconductor", "Made of Silicon (Si) or Germanium (Ge)"],
  ["Temperature Sensitive", "Characteristics drift with temperature"],
  ["Non-linear", "Defies Ohm's Law (V ≠ IR)"],
];

const advantages = [
  "Compact, low footprint",
  "Inexpensive to manufacture",
  "Fast switching operation",
  "Very low power consumption",
  "Reliable and durable for decades",
];

const disadvantages = [
  "Current only in one direction",
  "Highly temperature sensitive",
  "Limited power handling capability",
  "Forward voltage drop wastes energy",
];

const realLife: [string, string][] = [
  ["Mobile Charger", "Rectifier diode converts AC → DC"],
  ["LED Bulb", "LEDs emit visible light from electron drop"],
  ["TV Remote", "Infrared diode transmits encoded signals"],
  ["Solar Panel", "Photodiode operates on light-induced current"],
  ["Radio Receiver", "Diodes demodulate the signal envelope"],
  ["Surge Protector", "Zener clamps voltage spikes to ground"],
];

export function DiodeFactsGrid() {
  return (
    <SectionShell id="facts" eyebrow="06 · Reference Sheet" title="Everything in one screen.">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Characteristics */}
        <FadeUp>
          <div className="glass rounded-2xl p-6 h-full">
            <p className="text-[10px] uppercase tracking-widest text-sky-400/80 font-mono">Characteristics</p>
            <h3 className="mt-2 text-xl font-semibold text-white tracking-tight">Six defining traits.</h3>
            <ul className="mt-5 space-y-3">
              {characteristics.map(([k, v]) => (
                <li key={k} className="flex items-start gap-3 text-sm">
                  <Sparkles size={14} className="mt-1 text-sky-300 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">{k}</span>
                    <span className="text-slate-400"> — {v}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        {/* Advantages / Disadvantages */}
        <FadeUp delay={0.08}>
          <div className="grid grid-rows-2 gap-5 h-full">
            <div className="glass rounded-2xl p-6 ring-1 ring-emerald-400/20 bg-gradient-to-b from-emerald-500/[0.06] to-transparent">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 size={16} />
                <p className="text-[10px] uppercase tracking-widest font-mono">Advantages</p>
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-1.5 text-sm text-slate-300">
                {advantages.map((a) => (
                  <li key={a} className="flex gap-2"><span className="text-emerald-300">✓</span>{a}</li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-6 ring-1 ring-rose-400/20 bg-gradient-to-b from-rose-500/[0.06] to-transparent">
              <div className="flex items-center gap-2 text-rose-300">
                <XCircle size={16} />
                <p className="text-[10px] uppercase tracking-widest font-mono">Disadvantages</p>
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-1.5 text-sm text-slate-300">
                {disadvantages.map((a) => (
                  <li key={a} className="flex gap-2"><span className="text-rose-300">✗</span>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* Real life uses */}
        <FadeUp delay={0.16}>
          <div className="glass rounded-2xl p-6 h-full ring-1 ring-violet-400/20 bg-gradient-to-b from-violet-500/[0.06] to-transparent">
            <p className="text-[10px] uppercase tracking-widest text-violet-300 font-mono">Real life uses</p>
            <h3 className="mt-2 text-xl font-semibold text-white tracking-tight">Where you've already met one.</h3>
            <div className="mt-5 divide-y divide-white/5">
              {realLife.map(([k, v]) => (
                <div key={k} className="py-2.5 flex justify-between gap-4 text-sm">
                  <span className="text-white font-medium flex-shrink-0">{k}</span>
                  <span className="text-slate-400 text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      <FadeUp delay={0.2}>
        <div className="mt-8 rounded-2xl glass p-6 md:p-8 flex flex-wrap items-center justify-between gap-4 border border-sky-400/20">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-sky-400/80 font-mono">Remember</p>
            <p className="mt-2 text-lg md:text-xl text-white tracking-tight">
              A diode is a <span className="text-sky-300">one-way gate</span> for electric current.
            </p>
          </div>
          <p className="font-mono text-sm text-slate-300 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/10">
            P (Anode) <span className="text-sky-300 mx-1">→</span> N (Cathode) · current flows <span className="text-rose-300">only</span> this way
          </p>
        </div>
      </FadeUp>
    </SectionShell>
  );
}
