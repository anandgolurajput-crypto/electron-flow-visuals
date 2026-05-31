import { SectionShell, FadeUp } from "./SectionShell";
import {
  BookOpen, Hammer, Sigma, Zap, ShieldOff, ListChecks, Layers,
  Cpu, CheckCircle2, XCircle, Lightbulb, Radio, Sun, Shield, Smartphone,
} from "lucide-react";

const types = [
  { n: "1", name: "PN Junction Diode", use: "Rectification" },
  { n: "2", name: "LED", use: "Produces light" },
  { n: "3", name: "Zener Diode", use: "Voltage regulation" },
  { n: "4", name: "Photodiode", use: "Works with light" },
  { n: "5", name: "Laser Diode", use: "Fiber optics & laser devices" },
  { n: "6", name: "Schottky Diode", use: "Fast switching" },
  { n: "7", name: "Tunnel Diode", use: "High-speed circuits" },
];

const applications = [
  { icon: Zap, title: "Rectifier", desc: "Converts AC into DC.", ex: "Mobile chargers · Power supplies" },
  { icon: Lightbulb, title: "LED Lighting", desc: "Produces light from current.", ex: "Bulbs · TV displays · Indicators" },
  { icon: Shield, title: "Voltage Regulation", desc: "Zener holds constant output voltage.", ex: "Stabilizers · Electronic circuits" },
  { icon: Radio, title: "Signal Demodulation", desc: "Extracts audio from RF carriers.", ex: "Radio · Communication systems" },
  { icon: ShieldOff, title: "Protection Circuits", desc: "Blocks reverse current & spikes.", ex: "Flyback diodes · TVS clamps" },
  { icon: Sun, title: "Solar Cells & Sensors", desc: "Photodiodes detect light.", ex: "Auto doors · Remotes · Cameras" },
];

const realLife = [
  { dev: "Mobile Charger", use: "Rectifier" },
  { dev: "LED Bulb", use: "Light emission" },
  { dev: "TV Remote", use: "Infrared diode" },
  { dev: "Solar Panel", use: "Photodiode principle" },
  { dev: "Radio", use: "Signal detection" },
];

const characteristics = [
  { p: "Unidirectional", d: "Current flows in only one direction" },
  { p: "Low Resistance", d: "In forward bias" },
  { p: "High Resistance", d: "In reverse bias" },
  { p: "Semiconductor", d: "Made of Silicon or Germanium" },
];

export function SyllabusSection() {
  return (
    <SectionShell
      id="syllabus"
      eyebrow="Complete Reference · Unit Notes"
      title="Diode — full syllabus, structured."
    >
      <div className="space-y-6">

        {/* 1. Introduction */}
        <FadeUp>
          <Topic n="01" icon={BookOpen} title="Introduction">
            <p className="text-slate-300 leading-relaxed">
              A <b className="text-white">diode</b> is a semiconductor device that allows electric current to
              flow in only <b className="text-white">one direction</b>. It is also called the{" "}
              <span className="text-sky-300">“Electronic Valve.”</span>
            </p>
            <p className="mt-2 text-slate-400 text-sm">
              इसे <b className="text-slate-200">Electronic Valve</b> भी कहते हैं — एक तरफ से करंट जाने देता है, दूसरी तरफ रोक देता है।
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <Pill tone="emerald" icon={CheckCircle2}>Forward direction → Current flows</Pill>
              <Pill tone="rose" icon={XCircle}>Reverse direction → Current blocks</Pill>
            </div>
          </Topic>
        </FadeUp>

        {/* 2. Construction */}
        <FadeUp delay={0.05}>
          <Topic n="02" icon={Hammer} title="Construction">
            <p className="text-slate-300 leading-relaxed">
              A diode is formed by joining two semiconductor regions. Their meeting line is called the{" "}
              <b className="text-violet-300">PN Junction</b>.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <MiniCard tone="rose" title="P-Type" sub="Anode side">
                Positive charge carriers — <b>holes</b>.
              </MiniCard>
              <MiniCard tone="sky" title="N-Type" sub="Cathode side">
                Negative charge carriers — <b>electrons</b>.
              </MiniCard>
            </div>
          </Topic>
        </FadeUp>

        {/* 3. Symbol */}
        <FadeUp delay={0.05}>
          <Topic n="03" icon={Sigma} title="Symbol">
            <div className="rounded-xl bg-black/30 border border-white/10 px-5 py-6 font-mono text-center text-lg md:text-2xl text-slate-100">
              <span className="text-rose-300">Anode (P)</span>
              <span className="mx-3 text-slate-500">────</span>
              <span className="text-violet-300">▶|</span>
              <span className="mx-3 text-slate-500">────</span>
              <span className="text-sky-300">Cathode (N)</span>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <div className="text-slate-300"><b className="text-rose-300">Anode</b> → Positive side</div>
              <div className="text-slate-300"><b className="text-sky-300">Cathode</b> → Negative side</div>
            </div>
          </Topic>
        </FadeUp>

        {/* 4. Working Principle */}
        <FadeUp delay={0.05}>
          <Topic n="04" icon={Zap} title="Working Principle">
            <div className="grid md:grid-cols-2 gap-4">
              <BiasCard
                tone="emerald"
                title="Forward Bias"
                state="✅ Diode ON"
                rows={[
                  ["P-side", "Positive terminal"],
                  ["N-side", "Negative terminal"],
                  ["Result", "Current flows easily"],
                ]}
              />
              <BiasCard
                tone="rose"
                title="Reverse Bias"
                state="❌ Diode OFF"
                rows={[
                  ["P-side", "Negative terminal"],
                  ["N-side", "Positive terminal"],
                  ["Result", "Current does not flow"],
                ]}
              />
            </div>
          </Topic>
        </FadeUp>

        {/* 5. Characteristics */}
        <FadeUp delay={0.05}>
          <Topic n="05" icon={ListChecks} title="Characteristics">
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.04] text-slate-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Property</th>
                    <th className="text-left px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {characteristics.map((c, i) => (
                    <tr key={c.p} className={i % 2 ? "bg-white/[0.02]" : ""}>
                      <td className="px-4 py-3 text-white font-medium">{c.p}</td>
                      <td className="px-4 py-3 text-slate-300">{c.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Topic>
        </FadeUp>

        {/* 6. Types */}
        <FadeUp delay={0.05}>
          <Topic n="06" icon={Layers} title="Types of Diodes">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {types.map((t) => (
                <div key={t.n} className="rounded-xl glass px-4 py-3 flex items-start gap-3">
                  <span className="text-xs font-mono text-sky-300 mt-0.5">{t.n}</span>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{t.use}</p>
                  </div>
                </div>
              ))}
            </div>
          </Topic>
        </FadeUp>

        {/* 7. Applications */}
        <FadeUp delay={0.05}>
          <Topic n="07" icon={Cpu} title="Applications">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {applications.map((a) => (
                <div key={a.title} className="rounded-xl glass p-4">
                  <div className="flex items-center gap-2 text-sky-200">
                    <a.icon size={16} />
                    <h4 className="font-medium text-white text-sm">{a.title}</h4>
                  </div>
                  <p className="mt-2 text-slate-300 text-sm">{a.desc}</p>
                  <p className="mt-2 text-[11px] font-mono text-slate-500">{a.ex}</p>
                </div>
              ))}
            </div>
          </Topic>
        </FadeUp>

        {/* 8 & 9. Advantages / Disadvantages */}
        <FadeUp delay={0.05}>
          <div className="grid md:grid-cols-2 gap-4">
            <Topic n="08" icon={CheckCircle2} title="Advantages" compact>
              <ul className="space-y-2 text-slate-300 text-sm">
                {["Small size", "Low cost", "Fast operation", "Low power consumption", "Reliable"].map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {a}
                  </li>
                ))}
              </ul>
            </Topic>
            <Topic n="09" icon={XCircle} title="Disadvantages" compact>
              <ul className="space-y-2 text-slate-300 text-sm">
                {["Works only in one direction", "Temperature sensitive", "Limited power handling"].map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> {a}
                  </li>
                ))}
              </ul>
            </Topic>
          </div>
        </FadeUp>

        {/* 10. Real Life Uses */}
        <FadeUp delay={0.05}>
          <Topic n="10" icon={Smartphone} title="Real Life Uses">
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.04] text-slate-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Device</th>
                    <th className="text-left px-4 py-3 font-medium">Use of Diode</th>
                  </tr>
                </thead>
                <tbody>
                  {realLife.map((r, i) => (
                    <tr key={r.dev} className={i % 2 ? "bg-white/[0.02]" : ""}>
                      <td className="px-4 py-3 text-white font-medium">{r.dev}</td>
                      <td className="px-4 py-3 text-slate-300">{r.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Topic>
        </FadeUp>
      </div>
    </SectionShell>
  );
}

/* ——— Helpers ——— */

function Topic({
  n, icon: Icon, title, children, compact,
}: {
  n: string; icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string; children: React.ReactNode; compact?: boolean;
}) {
  return (
    <div className={`glass rounded-2xl ${compact ? "p-5" : "p-6 md:p-7"}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[11px] font-mono text-sky-300/80 bg-sky-300/10 border border-sky-300/20 rounded-md px-2 py-0.5">
          {n}
        </span>
        <Icon size={18} className="text-sky-200" />
        <h3 className="text-white text-lg md:text-xl font-semibold tracking-tight">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Pill({
  tone, icon: Icon, children,
}: { tone: "emerald" | "rose"; icon: React.ComponentType<{ size?: number; className?: string }>; children: React.ReactNode }) {
  const map = {
    emerald: "text-emerald-200 bg-emerald-400/10 border-emerald-400/30",
    rose: "text-rose-200 bg-rose-400/10 border-rose-400/30",
  } as const;
  return (
    <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${map[tone]}`}>
      <Icon size={15} /> {children}
    </div>
  );
}

function MiniCard({
  tone, title, sub, children,
}: { tone: "rose" | "sky"; title: string; sub: string; children: React.ReactNode }) {
  const ring = tone === "rose" ? "ring-rose-400/30" : "ring-sky-400/30";
  const tColor = tone === "rose" ? "text-rose-200" : "text-sky-200";
  return (
    <div className={`rounded-xl glass p-4 ring-1 ${ring}`}>
      <div className="flex items-center justify-between">
        <h4 className={`font-semibold ${tColor}`}>{title}</h4>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{sub}</span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{children}</p>
    </div>
  );
}

function BiasCard({
  tone, title, state, rows,
}: { tone: "emerald" | "rose"; title: string; state: string; rows: [string, string][] }) {
  const ring = tone === "emerald" ? "ring-emerald-400/30" : "ring-rose-400/30";
  const titleC = tone === "emerald" ? "text-emerald-200" : "text-rose-200";
  return (
    <div className={`rounded-xl glass p-5 ring-1 ${ring}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className={`font-semibold ${titleC}`}>{title}</h4>
        <span className="text-xs font-mono text-slate-300">{state}</span>
      </div>
      <dl className="divide-y divide-white/5 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between py-2">
            <dt className="text-slate-400">{k}</dt>
            <dd className="text-white text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
