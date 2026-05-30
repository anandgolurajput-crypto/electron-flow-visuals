import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are DiodeGPT — an expert tutor in semiconductor electronics, specialising in diodes, P-N junctions, and applied electronic engineering. You are embedded in an educational project built by Anand (ITM Gwalior, CSE-AIML) for the Basic Electrical & Electronic Engineering course.

Style:
- Crisp, technical, friendly. Short paragraphs. Use bullet points and LaTeX-free plain math (e.g. I = Iₛ(e^(V_D/nV_T) − 1)).
- When asked "what is X", give: 1-line definition → key physics → typical numbers → one real-world example.
- Cover: P-type / N-type doping, depletion region, forward/reverse bias, Shockley equation, rectifiers, Zener, Schottky, LED, photodiode, tunnel diode, breakdown, thermal effects.
- If asked something off-topic, gently steer back to electronics, but answer briefly.
- Never invent numbers; use standard textbook values (Si drop ≈ 0.7 V, Ge ≈ 0.3 V, Schottky 0.15–0.45 V, V_T ≈ 25.85 mV @ 300 K).`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as {
            messages: { role: "user" | "assistant"; content: string }[];
          };
          if (!Array.isArray(messages) || messages.length === 0) {
            return new Response(JSON.stringify({ error: "messages required" }), { status: 400 });
          }

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), { status: 500 });
          }

          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              stream: true,
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            }),
          });

          if (upstream.status === 429) {
            return new Response(JSON.stringify({ error: "Rate limit reached. Try again in a moment." }), {
              status: 429,
              headers: { "Content-Type": "application/json" },
            });
          }
          if (upstream.status === 402) {
            return new Response(JSON.stringify({ error: "AI credits exhausted. Top up your Lovable workspace." }), {
              status: 402,
              headers: { "Content-Type": "application/json" },
            });
          }
          if (!upstream.ok || !upstream.body) {
            const t = await upstream.text();
            console.error("Gateway error", upstream.status, t);
            return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500 });
          }

          return new Response(upstream.body, {
            headers: { "Content-Type": "text/event-stream" },
          });
        } catch (e) {
          console.error("chat route error", e);
          return new Response(JSON.stringify({ error: "Internal error" }), { status: 500 });
        }
      },
    },
  },
});
