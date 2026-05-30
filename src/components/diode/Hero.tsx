import { motion } from "framer-motion";
import { DiodeLogicVisualizer } from "./DiodeLogicVisualizer";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-12">
      <div className="grid lg:grid-cols-[1.05fr_1.4fr] gap-10 lg:gap-14 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-sky-400 font-mono"
          >
            Basic Electrical & Electronic Engg · CSE-AIML
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white leading-[1.02]"
          >
            Diodes.<br />
            <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-rose-300 bg-clip-text text-transparent">
              The one-way valve
            </span><br />
            powering modern electronics.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-7 text-slate-400 text-lg leading-relaxed max-w-xl"
          >
            A structural, mathematical and real-world breakdown of the semiconductor device that quietly built every
            charger, every LED, every photovoltaic cell on earth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex items-center gap-3 text-xs font-mono text-slate-500"
          >
            <ArrowDown size={14} className="animate-bounce" />
            Scroll · interact with the live P-N junction
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
        >
          <DiodeLogicVisualizer />
        </motion.div>
      </div>
    </section>
  );
}
