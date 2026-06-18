import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { MatchCard } from "@/components/MatchCard";
import { matches, sportLabel, type Sport } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/scores")({
  head: () => ({
    meta: [
      { title: "Live Scores — HerScore" },
      {
        name: "description",
        content:
          "Live and upcoming scores from women's football, tennis, rugby and cricket — all in one place.",
      },
      { property: "og:title", content: "Live Scores — HerScore" },
      { property: "og:description", content: "Real-time women's sports scores." },
    ],
  }),
  component: ScoresPage,
});

const sports: ("all" | Sport)[] = ["all", "football", "tennis", "rugby", "cricket"];
const statuses = ["Live", "Upcoming", "Finished"] as const;

function ScoresPage() {
  const [sport, setSport] = useState<(typeof sports)[number]>("all");
  const [status, setStatus] = useState<(typeof statuses)[number]>("Live");

  const statusKey = status === "Live" ? "live" : status === "Upcoming" ? "upcoming" : "finished";
  const filtered = matches
    .filter((m) => (sport === "all" ? true : m.sport === sport))
    .filter((m) => m.status === statusKey)
    .sort((a, b) => Number(b.isWomens) - Number(a.isWomens));

  return (
    <>
      <TopBar title="Live Scores" subtitle="Women's competitions first" />

      {/* Sport filter */}
      <div className="px-5 pt-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {sports.map((s) => (
            <button
              key={s}
              onClick={() => setSport(s)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all",
                sport === s
                  ? "gradient-brand text-primary-foreground border-transparent shadow-brand"
                  : "bg-surface text-foreground border-border hover:border-primary/40",
              )}
            >
              {s === "all" ? "All sports" : sportLabel[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Status tabs */}
      <div className="px-5 pt-4">
        <div className="grid grid-cols-3 p-1 rounded-full bg-muted">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cn(
                "py-2 rounded-full text-xs font-semibold transition-all",
                status === s ? "bg-surface shadow-sm text-foreground" : "text-muted-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Matches */}
      <div className="px-5 pt-5 space-y-3">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-sm text-muted-foreground">
            No {status.toLowerCase()} matches right now.
          </div>
        ) : (
          filtered.map((m) => <MatchCard key={m.id} match={m} />)
        )}
      </div>
    </>
  );
}
