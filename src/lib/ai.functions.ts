import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

function getGateway() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  return createLovableAiGatewayProvider(key);
}

const ResearchInput = z.object({
  topic: z.string().min(2).max(500),
  focus: z.enum(["athlete", "team", "league", "match", "general"]).default("general"),
});

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ResearchInput.parse(input))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      system: `You are a women's sports research analyst for HerScore. Produce a clear, well-structured research brief on the requested topic. Use markdown with these sections: ## Overview, ## Key Facts (bullets), ## Recent Form / Momentum, ## Notable Stats, ## Storylines to Watch, ## Sources & Caveats. Be factual, neutral, and celebrate the women's game. If you are uncertain about a fact, say so.`,
      prompt: `Focus type: ${data.focus}\nTopic: ${data.topic}\n\nWrite the brief now.`,
    });
    return { brief: text };
  });

const EmailInput = z.object({
  purpose: z.string().min(2).max(300),
  audience: z.string().min(2).max(200),
  tone: z.enum(["professional", "friendly", "enthusiastic", "concise"]).default("friendly"),
  keyPoints: z.string().max(2000).optional(),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) => {
    const gateway = getGateway();
    const { text } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      system: `You are a smart email writer for HerScore — a women's sports platform. Produce a ready-to-send email. Return markdown with exactly two sections: \n\n**Subject:** <one-line subject>\n\n**Body:**\n<email body with greeting, 2-4 short paragraphs, and a sign-off as "The HerScore Team">. Match the requested tone. Be specific and avoid filler.`,
      prompt: `Purpose: ${data.purpose}\nAudience: ${data.audience}\nTone: ${data.tone}\nKey points to include: ${data.keyPoints || "(none provided — infer reasonable details)"}`,
    });
    return { email: text };
  });
