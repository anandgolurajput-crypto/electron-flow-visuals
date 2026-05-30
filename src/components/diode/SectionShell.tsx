import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionShell({
  eyebrow, title, children, id,
}: { eyebrow: string; title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-sky-400/80 font-mono">{eyebrow}</p>
        <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-white max-w-3xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

export function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
