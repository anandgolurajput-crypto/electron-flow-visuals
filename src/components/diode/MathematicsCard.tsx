import { SectionShell, FadeUp } from "./SectionShell";
import { ArrowRightCircle, ArrowLeftCircle } from "lucide-react";

const variables = [
  { sym: "I", desc: "Diode current" },
  { sym: "Iₛ", desc: "Reverse saturation current" },
  { sym: "V_D", desc: "Applied voltage across diode" },
  { sym: "n", desc: "Ideality factor (≈ 1–2)" },
  { sym: "V_T", desc: "Thermal voltage ≈ 25.85 mV @ 300 K" },
];

export function MathematicsCard() {
  return (
    <SectionShell id="math" eyebrow="02 · Principle & Mathematics" title="Biasing decides everything. Math proves it.">
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        <FadeUp>
          <BiasCard
            icon={<ArrowRightCircle size={18} />}
            tone="sky"
            state="ON"
            title="Forward Bias"
            wires="P → (+)   ·   N → (−)"
            rows={[
              ["Depletion region", "Shrinks"],
              ["Resistance", "Very low"],
              ["Current", "Flows easily"],
              ["Si drop", "≈ 0.7 V"],
            ]}
          />
        </FadeUp>
        <FadeUp delay={0.08}>
          <BiasCard
            icon={<ArrowLeftCircle size={18} />}
            tone="rose"
            state="OFF"
            title="Reverse Bias"
            wires="P → (−)   ·   N → (+)"
            rows={[
              ["Depletion region", "Expands"],
              ["Resistance", "Extremely high"],
              ["Current", "I ≈ 0 (leakage only)"],
              ["Limit", "Breakdown voltage"],
            ]}
          />
        </FadeUp>
      </div>

      <FadeUp delay={0.1}>
        <div className="glass rounded-2xl p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-400/80 font-mono">Shockley Diode Equation</p>
          <div className="mt-6 text-center font-mono text-3xl md:text-5xl text-white tracking-tight leading-tight">
            <span className="text-sky-300">I</span>
            <span className="text-slate-500 mx-3">=</span>
            <span className="text-slate-200">Iₛ</span>
            <span className="text-slate-500 mx-2">·</span>
            <span className="text-slate-300">(</span>
            <span className="text-rose-300">e</span>
            <sup className="text-base md:text-xl text-slate-300">V_D / (n·V_T)</sup>
            <span className="text-slate-500 mx-2">−</span>
            <span className="text-slate-300">1</span>
            <span className="text-slate-300">)</span>
          </div>
          <p className="mt-8 text-sm text-slate-400 max-w-2xl mx-auto text-center">
            Diodes are <span className="text-white">non-linear</span> components — current rises exponentially with
            voltage. They categorically <span className="text-rose-300">defy Ohm's Law</span> (V = IR), which only
            describes linear resistive elements.
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
            {variables.map((v) => (
              <div key={v.sym} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="font-mono text-sky-300 text-lg">{v.sym}</div>
                <div className="text-[11px] text-slate-400 mt-1 leading-snug">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </SectionShell>
  );
}

function BiasCard({
  icon, tone, state, title, wires, rows,
}: {
  icon: React.ReactNode;
  tone: "sky" | "rose";
  state: string;
  title: string;
  wires: string;
  rows: [string, string][];
}) {
  const accent = tone === "sky" ? "text-sky-300 ring-sky-400/30" : "text-rose-300 ring-rose-400/30";
  return (
    <div className={`glass rounded-2xl p-7 h-full ring-1 transition-all duration-300 hover:scale-[1.02] ${accent}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded glass">{state}</span>
      </div>
      <p className="mt-3 font-mono text-xs text-slate-400">{wires}</p>
      <div className="mt-6 divide-y divide-white/5">
        {rows.map(([k, v]) => (
          <div key={k} className="py-2.5 flex justify-between text-sm">
            <span className="text-slate-400">{k}</span>
            <span className="text-white">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
