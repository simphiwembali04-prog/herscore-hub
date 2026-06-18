import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Heart, Share2, Trophy, Sparkles } from "lucide-react";
import { athletes, sportLabel } from "@/lib/mock-data";

export const Route = createFileRoute("/athletes/$id")({
  head: ({ params }) => {
    const a = athletes.find((x) => x.id === params.id);
    return {
      meta: [
        { title: a ? `${a.name} — HerScore` : "Athlete — HerScore" },
        {
          name: "description",
          content: a
            ? `${a.name} (${a.team}) — career stats, achievements and recent form on HerScore.`
            : "Athlete profile on HerScore.",
        },
        { property: "og:title", content: a ? `${a.name} — HerScore` : "Athlete — HerScore" },
        { property: "og:description", content: a?.bio ?? "Athlete profile on HerScore." },
        ...(a ? [{ property: "og:image", content: a.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const athlete = athletes.find((a) => a.id === params.id);
    if (!athlete) throw notFound();
    return { athlete };
  },
  component: AthletePage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-xl font-bold">Athlete not found</h1>
        <Link to="/athletes" className="text-sm text-primary mt-2 inline-block">
          Back to athletes
        </Link>
      </div>
    </div>
  ),
});

function AthletePage() {
  const { athlete } = Route.useLoaderData();

  return (
    <div className="pb-8">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[460px] overflow-hidden">
        <img src={athlete.image} alt={athlete.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        <div className="absolute inset-0 gradient-brand opacity-20 mix-blend-overlay" />

        <div className="absolute top-0 inset-x-0 p-5 flex items-center justify-between">
          <Link
            to="/athletes"
            className="h-10 w-10 grid place-items-center rounded-full bg-background/80 backdrop-blur"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-2">
            <button className="h-10 w-10 grid place-items-center rounded-full bg-background/80 backdrop-blur">
              <Share2 className="h-[18px] w-[18px]" />
            </button>
            <button className="h-10 w-10 grid place-items-center rounded-full bg-background/80 backdrop-blur">
              <Heart className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full gradient-brand text-primary-foreground">
              {sportLabel[athlete.sport]}
            </span>
            {athlete.rank && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-gold text-gold-foreground">
                World #{athlete.rank}
              </span>
            )}
          </div>
          <h1 className="font-display font-extrabold text-4xl text-white drop-shadow-lg">
            {athlete.name}
          </h1>
          <p className="text-white/90 text-sm mt-1">
            {athlete.team} · {athlete.country} · Age {athlete.age}
            {athlete.position ? ` · ${athlete.position}` : ""}
          </p>
        </div>
      </section>

      <div className="px-5 -mt-6 relative">
        <button className="w-full py-3 rounded-full gradient-brand text-primary-foreground font-semibold shadow-brand">
          Follow {athlete.name.split(" ")[0]}
        </button>
      </div>

      {/* Stats */}
      <section className="px-5 pt-6">
        <h2 className="font-display font-bold text-lg mb-3">Season stats</h2>
        <div className="grid grid-cols-4 gap-2">
          {athlete.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-surface border border-border/70 p-3 text-center"
            >
              <div className="text-xl font-display font-bold">{s.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      {athlete.recentForm && (
        <section className="px-5 pt-6">
          <h2 className="font-display font-bold text-lg mb-3">Recent form</h2>
          <div className="flex gap-2">
            {athlete.recentForm.map((r, i) => (
              <span
                key={i}
                className={
                  "h-9 w-9 grid place-items-center rounded-full text-xs font-bold " +
                  (r === "W"
                    ? "bg-success/15 text-success"
                    : r === "L"
                      ? "bg-destructive/15 text-destructive"
                      : "bg-muted text-muted-foreground")
                }
              >
                {r}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* AI Spotlight */}
      <section className="px-5 pt-6">
        <div className="rounded-3xl p-5 gradient-brand-soft border border-primary/15">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              AI Spotlight
            </span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/85">{athlete.bio}</p>
        </div>
      </section>

      {/* Achievements */}
      <section className="px-5 pt-6">
        <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-gold" /> Career achievements
        </h2>
        <div className="space-y-2">
          {athlete.achievements.map((ach, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-2xl bg-surface border border-border/70"
            >
              <span className="h-7 w-7 grid place-items-center rounded-full bg-gold/15 text-gold-foreground text-[11px] font-bold flex-none">
                {i + 1}
              </span>
              <p className="text-sm font-medium">{ach}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
