import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Plus, Send, Sparkles } from "lucide-react";
import { SectionShell, FadeUp } from "./SectionShell";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Explain the depletion region",
  "Why does Si drop ≈ 0.7 V?",
  "Zener vs Schottky — when to use which?",
  "Derive the Shockley equation intuitively",
];

function GeminiSpark({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(120,160,255,0.45)]">
      <defs>
        <linearGradient id="gspk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="35%" stopColor="#9B72F5" />
          <stop offset="65%" stopColor="#F25C8A" />
          <stop offset="100%" stopColor="#F9B23A" />
        </linearGradient>
      </defs>
      <path
        d="M50 4 C53 32 68 47 96 50 C68 53 53 68 50 96 C47 68 32 53 4 50 C32 47 47 32 50 4 Z"
        fill="url(#gspk)"
      />
    </svg>
  );
}

export function GeminiChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send(textOverride?: string) {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;
    setError(null);
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!resp.ok || !resp.body) {
        const j = await resp.json().catch(() => ({ error: "Failed" }));
        setError(j.error ?? "Request failed");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistant = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              assistant += delta;
              setMessages((m) => {
                const copy = m.slice();
                copy[copy.length - 1] = { role: "assistant", content: assistant };
                return copy;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionShell id="ask" eyebrow="05 · Ask Anything" title="DiodeGPT — your personal semiconductor tutor.">
      <FadeUp>
        <div className="rounded-3xl overflow-hidden ring-1 ring-white/10 bg-[#0a0a0f] relative">
          {/* Gemini-style ambient gradient */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 110%, rgba(66,133,244,0.35) 0%, rgba(155,114,245,0.18) 35%, transparent 70%)",
            }}
          />

          {/* Header bar */}
          <div className="relative flex items-center justify-between px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="text-lg font-medium">Gemini</span>
              <span className="text-xs text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">Pro</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Sparkles size={12} className="text-sky-300" /> diode-tuned
            </div>
          </div>

          {/* Conversation area */}
          <div
            ref={scrollRef}
            className="relative h-[460px] overflow-y-auto px-5 md:px-8 py-8"
          >
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <GeminiSpark />
                  <h3 className="mt-6 text-3xl md:text-4xl font-medium text-slate-100 tracking-tight">
                    Let's jump in, <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-rose-300 bg-clip-text text-transparent">Anand</span>
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">Ask anything about diodes, junctions, biasing or applications.</p>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="text-left text-sm text-slate-300 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="msgs" className="space-y-5 max-w-3xl mx-auto">
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={m.role === "user" ? "flex justify-end" : "flex gap-3"}
                    >
                      {m.role === "assistant" && (
                        <div className="flex-shrink-0 mt-1"><GeminiSpark size={22} /></div>
                      )}
                      <div
                        className={
                          m.role === "user"
                            ? "bg-white/[0.07] text-slate-100 rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%] text-sm leading-relaxed"
                            : "text-slate-200 text-sm leading-relaxed whitespace-pre-wrap max-w-[85%]"
                        }
                      >
                        {m.content || (loading && i === messages.length - 1 ? <TypingDots /> : null)}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {error && (
            <div className="relative px-5 py-2 text-xs text-rose-300 bg-rose-500/10 border-t border-rose-500/20">{error}</div>
          )}

          {/* Input bar */}
          <div className="relative p-4 md:p-5 border-t border-white/5">
            <div className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-3 py-2 max-w-3xl mx-auto">
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition">
                <Plus size={18} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                disabled={loading}
                placeholder="Ask Gemini"
                className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none px-2 py-1"
              />
              {input.trim() ? (
                <button
                  onClick={() => send()}
                  disabled={loading}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-sky-400 to-violet-500 text-slate-950 hover:scale-105 transition disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              ) : (
                <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition">
                  <Mic size={18} />
                </button>
              )}
            </div>
            <p className="text-[10px] text-slate-600 text-center mt-3 font-mono">
              Powered by Lovable AI · Gemini may display inaccurate info, verify critical answers.
            </p>
          </div>
        </div>
      </FadeUp>
    </SectionShell>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-center">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:0.2s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:0.4s]" />
    </span>
  );
}
