import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/diode/Nav";
import { Hero } from "@/components/diode/Hero";
import { AnatomySection } from "@/components/diode/AnatomySection";
import { MathematicsCard } from "@/components/diode/MathematicsCard";
import { RealWorldGrid } from "@/components/diode/RealWorldGrid";
import { LoopholesWarning } from "@/components/diode/LoopholesWarning";
import { DiodeFactsGrid } from "@/components/diode/DiodeFactsGrid";
import { GeminiChat } from "@/components/diode/GeminiChat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diodes · Structural, Mathematical & Real-World Breakdown" },
      { name: "description", content: "An interactive WebGL exploration of diodes — P-N junctions, Shockley equation, Zener, Schottky, LEDs and the engineering trade-offs. With a built-in AI tutor. By Anand, ITM Gwalior." },
      { property: "og:title", content: "Diodes · The Electronic Valve" },
      { property: "og:description", content: "Live 3D P-N junction visualizer, Shockley math, real-world diode tear-downs and a Gemini-powered tutor." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen text-white antialiased">
      <Nav />
      <Hero />
      <AnatomySection />
      <MathematicsCard />
      <RealWorldGrid />
      <LoopholesWarning />
      <DiodeFactsGrid />
      <GeminiChat />
      <Footer />
    </main>
  );
}
