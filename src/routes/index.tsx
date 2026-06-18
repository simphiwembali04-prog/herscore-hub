import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Flame, Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { MatchCard } from "@/components/MatchCard";
import { AthleteCard } from "@/components/AthleteCard";
import { NewsCard } from "@/components/NewsCard";
import { matches, athletes, news, rankings } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HerScore — Women's Sports First. Live Scores & Stories." },
      {
        name: "description",
        content:
          "The home of women's sports. Live football, tennis, rugby and cricket scores, athlete spotlights and breaking news.",
      },
      { property: "og:title", content: "HerScore — Women's Sports First" },
      {
        property: "og:description",
        content: "Live scores, athletes and stories. Women's sports, finally front and center.",
      },
    ],
  }),
  component: Home,
});

function SectionHeader({
  title,
  href,
  icon: Icon,
}: {
  title: string;
  href?: "/scores" | "/athletes" | "/news";
  icon?: typeof Flame;
}) {
  return (
    <div className="flex items-center justify-between px-5 mb-3">
      <h2 className="font-display font-bold text-lg flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        {title}
      </h2>
      {href && (
        <Link to={href} className="text-xs font-semibold text-primary flex items-center gap-0.5">
          See all <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

function Home() {
  const live = matches.filter((m) => m.status === "live");
  const upcoming = matches.filter((m) => m.status === "upcoming");
  const featured = news.find((n) => n.featured)!;
  const rest = news.filter((n) => !n.featured).slice(0, 3);
  const featuredAthletes = athletes.slice(0, 4);

  return (
    <>
      <TopBar subtitle="Women's sports, first." />

      {/* Hero */}
      <section className="px-5 pt-5 pb-2">
        <div className="relative overflow-hidden rounded-3xl gradient-brand p-6 text-primary-foreground shadow-brand">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Tonight on HerScore
            </span>
            <h1 className="font-display font-extrabold text-3xl leading-[1.05] mt-3">
              Red Roses vs Les Bleues.
              <br />
              <span className="text-gold">A Six Nations classic.</span>
            </h1>
            <p className="text-sm opacity-90 mt-2 max-w-[28ch]">
              Live from Twickenham · 19:45. Set your reminder and follow every phase.
            </p>
            <div className="flex gap-2 mt-4">
              <Link
                to="/scores"
                className="px-4 py-2 rounded-full bg-white text-primary-deep text-xs font-bold shadow-sm"
              >
                Watch live
              </Link>
              <button className="px-4 py-2 rounded-full bg-white/15 backdrop-blur text-xs font-semibold">
                Remind me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Now */}
      <section className="pt-6">
        <SectionHeader title="Live now" href="/scores" icon={Flame} />
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2 snap-x snap-mandatory">
          {live.map((m) => (
            <div key={m.id} className="snap-start min-w-[300px] max-w-[300px]">
              <MatchCard match={m} compact />
            </div>
          ))}
        </div>
      </section>

      {/* Featured athletes */}
      <section className="pt-6">
        <SectionHeader title="Featured athletes" href="/athletes" icon={TrendingUp} />
        <div className="px-5 grid grid-cols-2 gap-3">
          {featuredAthletes.map((a) => (
            <AthleteCard key={a.id} athlete={a} />
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section className="pt-6">
        <SectionHeader title="Upcoming fixtures" href="/scores" />
        <div className="px-5 space-y-3">
          {upcoming.map((m) => (
            <MatchCard key={m.id} match={m} compact />
          ))}
        </div>
      </section>

      {/* News */}
      <section className="pt-6">
        <SectionHeader title="Top stories" href="/news" />
        <div className="px-5 space-y-3">
          <NewsCard item={featured} featured />
          {rest.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      </section>

      {/* Rankings */}
      <section className="pt-6 pb-4">
        <SectionHeader title="FIFA Women's Rankings" icon={Trophy} />
        <div className="px-5">
          <div className="rounded-3xl bg-surface border border-border/70 overflow-hidden">
            {rankings.map((r) => {
              const Arrow = r.change > 0 ? TrendingUp : r.change < 0 ? TrendingDown : Minus;
              const arrowColor =
                r.change > 0 ? "text-success" : r.change < 0 ? "text-destructive" : "text-muted-foreground";
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-3 px-4 py-3 border-b border-border/60 last:border-0"
                >
                  <span
                    className={
                      "h-8 w-8 grid place-items-center rounded-full text-[11px] font-bold " +
                      (r.position <= 3
                        ? "bg-gold/20 text-gold-foreground ring-1 ring-gold/40"
                        : "bg-muted text-muted-foreground")
                    }
                  >
                    {r.position}
                  </span>
                  <span className="font-semibold text-sm flex-1">{r.name}</span>
                  <span className="text-sm font-display font-bold tabular-nums">{r.points}</span>
                  <Arrow className={`h-4 w-4 ${arrowColor}`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
