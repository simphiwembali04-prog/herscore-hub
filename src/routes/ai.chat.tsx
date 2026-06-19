import { createFileRoute, Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send, Bot, User } from "lucide-react";

export const Route = createFileRoute("/ai/chat")({
  head: () => ({
    meta: [{ title: "AI Chatbot — HerScore" }],
  }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Who's leading the WSL top scorer race?",
  "Explain the Women's Six Nations format",
  "Best women's tennis matches of 2024",
  "Tell me about the Australia women's cricket team",
];

function ChatPage() {
  const [input, setInput] = useState("");
  const initialMessages: UIMessage[] = [];
  const transport = useRef(new DefaultChatTransport({ api: "/api/chat" })).current;
  const { messages, sendMessage, status, error } = useChat({
    id: "herscore-chat",
    messages: initialMessages,
    transport,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);
  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  const isLoading = status === "submitted" || status === "streaming";

  const submit = async (text: string) => {
    const t = text.trim();
    if (!t || isLoading) return;
    setInput("");
    await sendMessage({ text: t });
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border/60">
        <div className="mx-auto max-w-3xl px-5 py-3 flex items-center gap-3">
          <Link to="/ai" className="h-9 w-9 rounded-full grid place-items-center hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-9 w-9 rounded-2xl gradient-brand shadow-brand grid place-items-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </span>
            <div>
              <div className="font-display font-bold leading-none">AI Chatbot</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Women's sports expert
              </div>
            </div>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-32">
        <div className="mx-auto max-w-3xl px-5 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Ask me anything about women's football, tennis, rugby or cricket.
              </p>
              <div className="grid gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="text-left text-sm rounded-2xl border border-border bg-surface p-3 hover:border-primary/60 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            const text = m.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("");
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
              >
                <span
                  className={`h-8 w-8 rounded-full grid place-items-center shrink-0 ${
                    isUser ? "bg-muted" : "gradient-brand shadow-brand"
                  }`}
                >
                  {isUser ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  )}
                </span>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${
                    isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface border border-border"
                  }`}
                >
                  {text || (isLoading ? "…" : "")}
                </div>
              </div>
            );
          })}

          {status === "submitted" && (
            <div className="flex gap-2.5">
              <span className="h-8 w-8 rounded-full gradient-brand shadow-brand grid place-items-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </span>
              <div className="rounded-2xl px-3.5 py-2.5 text-sm bg-surface border border-border text-muted-foreground">
                Thinking…
              </div>
            </div>
          )}

          {error && (
            <div className="text-xs text-destructive border border-destructive/40 rounded-xl p-3">
              {error.message || "Something went wrong. Try again."}
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="fixed bottom-0 inset-x-0 border-t border-border bg-background/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
      >
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(input);
              }
            }}
            rows={1}
            placeholder="Message HerScore AI…"
            className="flex-1 resize-none rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm focus:outline-none focus:border-primary max-h-32"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="h-10 w-10 rounded-full gradient-brand shadow-brand grid place-items-center text-primary-foreground disabled:opacity-50 shrink-0"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
