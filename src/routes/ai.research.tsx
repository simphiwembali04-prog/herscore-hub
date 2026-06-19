import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, Search, Loader2 } from "lucide-react";
import { researchTopic } from "@/lib/ai.functions";

export const Route = createFileRoute("/ai/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — HerScore" }] }),
  component: ResearchPage,
});

type Focus = "athlete" | "team" | "league" | "match" | "general";

function ResearchPage() {
  const research = useServerFn(researchTopic);
  const [topic, setTopic] = useState("");
  const [focus, setFocus] = useState<Focus>("general");
  const [brief, setBrief] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    setBrief("");
    try {
      const res = await research({ data: { topic: topic.trim(), focus } });
      setBrief(res.brief);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate brief");
    } finally {
      setLoading(false);
    }
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
              <Search className="h-4 w-4 text-primary-foreground" />
            </span>
            <div>
              <div className="font-display font-bold leading-none">Research Assistant</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Briefs in seconds
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-5 space-y-5">
        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-surface p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Focus</label>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {(["athlete", "team", "league", "match", "general"] as Focus[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFocus(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize border transition-colors ${
                    focus === f
                      ? "gradient-brand text-primary-foreground border-transparent"
                      : "border-border bg-background"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Topic</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              placeholder="e.g. Aitana Bonmatí's 2024 season"
              className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="w-full h-11 rounded-full gradient-brand shadow-brand text-primary-foreground font-semibold text-sm disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Researching…
              </>
            ) : (
              "Generate brief"
            )}
          </button>
        </form>

        {error && (
          <div className="text-xs text-destructive border border-destructive/40 rounded-xl p-3">
            {error}
          </div>
        )}

        {brief && (
          <article className="rounded-2xl border border-border bg-surface p-5">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{brief}</pre>
          </article>
        )}
      </main>
    </>
  );
}
