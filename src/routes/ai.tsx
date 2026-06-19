import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Search, Mail, Sparkles } from "lucide-react";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "HerScore AI — Chat, Research & Smart Emails" },
      {
        name: "description",
        content:
          "AI tools for women's sports fans: chat with a women's sports expert, get instant research briefs, and generate smart emails.",
      },
    ],
  }),
  component: AiHub,
});

const tools = [
  {
    to: "/ai/chat" as const,
    title: "AI Chatbot",
    desc: "Chat with a women's sports expert. Ask about players, matches, history.",
    icon: Bot,
  },
  {
    to: "/ai/research" as const,
    title: "Research Assistant",
    desc: "Generate a structured brief on any athlete, team, league or match.",
    icon: Search,
  },
  {
    to: "/ai/email" as const,
    title: "Smart Email Generator",
    desc: "Draft polished emails for fans, partners, athletes and press.",
    icon: Mail,
  },
];

function AiHub() {
  return (
    <>
      <TopBar title="HerScore AI" subtitle="Powered by Lovable AI" />
      <section className="px-5 pt-5">
        <div className="rounded-3xl gradient-brand p-6 text-primary-foreground shadow-brand relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">
            <Sparkles className="h-3 w-3" /> New
          </span>
          <h1 className="font-display font-extrabold text-3xl leading-[1.05] mt-3">
            Your AI courtside.
          </h1>
          <p className="text-sm opacity-90 mt-2 max-w-[32ch]">
            Three tools to go deeper on the women's game — chat, research, write.
          </p>
        </div>
      </section>

      <section className="px-5 mt-6 grid gap-3">
        {tools.map(({ to, title, desc, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-2xl border border-border bg-surface p-4 flex items-start gap-3 hover:border-primary/60 transition-colors"
          >
            <span className="h-11 w-11 rounded-xl gradient-brand grid place-items-center shadow-brand shrink-0">
              <Icon className="h-5 w-5 text-primary-foreground" />
            </span>
            <div className="min-w-0">
              <div className="font-display font-bold text-base">{title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
