import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ArrowRight } from "lucide-react";

const KEY = "diode.visitor.name";

export function useVisitorName() {
  const [name, setName] = useState<string>("");
  useEffect(() => {
    try { setName(localStorage.getItem(KEY) ?? ""); } catch { /* ignore */ }
  }, []);
  return name;
}

export function WelcomeGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [hasName, setHasName] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    try {
      const n = localStorage.getItem(KEY);
      if (n && n.trim()) setHasName(true);
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    try { localStorage.setItem(KEY, v); } catch { /* ignore */ }
    setHasName(true);
  };

  if (!ready) return null;

  return (
    <>
      <AnimatePresence>
        {!hasName && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            style={{
              background:
                "radial-gradient(at 25% 20%, oklch(0.32 0.10 250 / 0.55) 0px, transparent 55%), radial-gradient(at 80% 90%, oklch(0.30 0.12 320 / 0.35) 0px, transparent 55%), oklch(0.18 0.02 260)",
            }}
          >
            <motion.div
              initial={{ y: 18, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md rounded-2xl glass p-8 md:p-10"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-sky-300/80 font-mono">
                <span className="w-7 h-7 rounded-md bg-gradient-to-br from-sky-400 to-violet-400 flex items-center justify-center">
                  <Cpu size={14} className="text-slate-950" />
                </span>
                diode / lab
              </div>
              <h1 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
                Hi, welcome.<br />
                <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-rose-300 bg-clip-text text-transparent">
                  What should we call you?
                </span>
              </h1>
              <p className="mt-3 text-sm text-slate-400">
                A quick name so the lab feels personal. Stored only on your device.
              </p>
              <form onSubmit={submit} className="mt-7 flex gap-2">
                <input
                  autoFocus
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Your name"
                  maxLength={40}
                  className="flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 transition"
                />
                <button
                  type="submit"
                  disabled={!value.trim()}
                  className="rounded-lg px-4 py-3 bg-gradient-to-br from-sky-400 to-violet-500 text-slate-950 font-medium flex items-center gap-1.5 disabled:opacity-40 transition hover:brightness-110"
                >
                  Enter <ArrowRight size={16} />
                </button>
              </form>
              <p className="mt-6 text-[11px] font-mono text-slate-500">
                ITM · Gwalior · CSE-AIML
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div aria-hidden={!hasName} style={{ filter: hasName ? "none" : "blur(6px)" }}>
        {children}
      </div>
    </>
  );
}
