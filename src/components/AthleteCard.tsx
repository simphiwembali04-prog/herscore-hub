import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import type { Athlete } from "@/lib/mock-data";
import { sportLabel } from "@/lib/mock-data";

export function AthleteCard({ athlete }: { athlete: Athlete }) {
  return (
    <Link
      to="/athletes/$id"
      params={{ id: athlete.id }}
      className="group block rounded-3xl overflow-hidden bg-surface border border-border/70 hover:shadow-soft transition-all hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="absolute inset-0 gradient-brand-soft" />
        <img
          src={athlete.image}
          alt={athlete.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-95 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {athlete.trending && (
          <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-gold text-gold-foreground">
            <TrendingUp className="h-3 w-3" /> Trending
          </span>
        )}
        {athlete.rank && (
          <span className="absolute top-3 right-3 h-7 min-w-7 px-2 grid place-items-center rounded-full bg-background/90 backdrop-blur text-[11px] font-bold">
            #{athlete.rank}
          </span>
        )}

        <div className="absolute bottom-0 inset-x-0 p-4 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
            {sportLabel[athlete.sport]} · {athlete.country}
          </p>
          <h3 className="font-display font-bold text-lg leading-tight mt-0.5">{athlete.name}</h3>
          <p className="text-xs opacity-90 truncate">{athlete.team}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 divide-x divide-border/60 text-center">
        {athlete.stats.map((s) => (
          <div key={s.label} className="py-2.5">
            <div className="text-sm font-display font-bold">{s.value}</div>
            <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}
