import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, Mail, Loader2, Copy, Check } from "lucide-react";
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/ai/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — HerScore" }] }),
  component: EmailPage,
});

type Tone = "professional" | "friendly" | "enthusiastic" | "concise";

function EmailPage() {
  const gen = useServerFn(generateEmail);
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState<Tone>("friendly");
  const [keyPoints, setKeyPoints] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim() || !audience.trim()) return;
    setLoading(true);
    setError(null);
    setEmail("");
    try {
      const res = await gen({
        data: { purpose: purpose.trim(), audience: audience.trim(), tone, keyPoints },
      });
      setEmail(res.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate email");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border/60">
        <div className="mx-auto max-w-3xl px-5 py-3 flex items-center gap-3">
          <Link to="/ai" className="h-9 w-9 rounded-full grid place-items-center hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-2xl gradient-brand shadow-brand grid place-items-center">
              <Mail className="h-4 w-4 text-primary-foreground" />
            </span>
            <div>
              <div className="font-display font-bold leading-none">Smart Email</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Drafts in one click
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-5 space-y-5">
        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-surface p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Purpose</label>
            <input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Invite sponsors to WSL launch night"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Audience</label>
            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Marketing leads at women's sports brands"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Tone</label>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {(["professional", "friendly", "enthusiastic", "concise"] as Tone[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize border transition-colors ${
                    tone === t
                      ? "gradient-brand text-primary-foreground border-transparent"
                      : "border-border bg-background"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">
              Key points (optional)
            </label>
            <textarea
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              rows={3}
              placeholder="Anything specific to include — dates, names, links…"
              className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !purpose.trim() || !audience.trim()}
            className="w-full h-11 rounded-full gradient-brand shadow-brand text-primary-foreground font-semibold text-sm disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Drafting…
              </>
            ) : (
              "Generate email"
            )}
          </button>
        </form>

        {error && (
          <div className="text-xs text-destructive border border-destructive/40 rounded-xl p-3">
            {error}
          </div>
        )}

        {email && (
          <article className="rounded-2xl border border-border bg-surface p-5 relative">
            <button
              onClick={copy}
              className="absolute top-3 right-3 h-8 px-3 rounded-full border border-border bg-background text-xs font-semibold inline-flex items-center gap-1.5"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed pr-16">{email}</pre>
          </article>
        )}
      </main>
    </>
  );
}
