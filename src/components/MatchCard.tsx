import { Link } from "@tanstack/react-router";
import type { Match } from "@/lib/mock-data";
import { sportLabel } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function SportBadge({ sport }: { sport: Match["sport"] }) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
      {sportLabel[sport]}
    </span>
  );
}

function TeamLogo({ short }: { short: string }) {
  return (
    <span className="h-10 w-10 rounded-full grid place-items-center bg-gradient-to-br from-primary-soft to-accent text-[11px] font-bold text-primary-deep ring-1 ring-border">
      {short}
    </span>
  );
}

export function MatchCard({ match, compact = false }: { match: Match; compact?: boolean }) {
  const isLive = match.status === "live";
  const isFinished = match.status === "finished";

  return (
    <Link
      to="/scores"
      className={cn(
        "block rounded-3xl bg-surface border border-border/70 transition-all hover:-translate-y-0.5 hover:shadow-soft",
        compact ? "p-4" : "p-5",
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          {match.isWomens && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full gradient-brand text-primary-foreground">
              Women's
            </span>
          )}
          <SportBadge sport={match.sport} />
        </div>
        {isLive ? (
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-live">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-live pulse-live" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
            </span>
            LIVE {match.minute}
          </span>
        ) : isFinished ? (
          <span className="text-[11px] font-semibold text-muted-foreground">FT</span>
        ) : (
          <span className="text-[11px] font-semibold text-purple">{match.startsAt}</span>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground mb-3 truncate">{match.competition}</p>

      <div className="space-y-2.5">
        {[match.home, match.away].map((team, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <TeamLogo short={team.short} />
              <span className="text-sm font-semibold truncate">{team.name}</span>
            </div>
            <span
              className={cn(
                "text-xl font-display font-bold tabular-nums",
                team.score === undefined && "text-muted-foreground/40",
              )}
            >
              {team.score ?? "-"}
            </span>
          </div>
        ))}
      </div>

      {match.highlight && isLive && (
        <p className="mt-3 pt-3 border-t border-border/60 text-xs text-foreground/80 italic">
          ⚡ {match.highlight}
        </p>
      )}
    </Link>
  );
}
