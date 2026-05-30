import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/diode/Nav";
import { Hero } from "@/components/diode/Hero";
import { AnatomySection } from "@/components/diode/AnatomySection";
import { MathematicsCard } from "@/components/diode/MathematicsCard";
import { RealWorldGrid } from "@/components/diode/RealWorldGrid";
import { LoopholesWarning } from "@/components/diode/LoopholesWarning";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diodes · Structural, Mathematical & Real-World Breakdown" },
      { name: "description", content: "An interactive WebGL exploration of diodes — P-N junctions, Shockley equation, Zener, Schottky, LEDs and the engineering trade-offs. By Anand, ITM Gwalior." },
      { property: "og:title", content: "Diodes · The Electronic Valve" },
      { property: "og:description", content: "Live 3D P-N junction visualizer with bias control, Shockley math, and real-world diode tear-downs." },
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
      <Footer />
    </main>
  );
}
