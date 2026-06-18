import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import type { NewsItem } from "@/lib/mock-data";
import { sportLabel } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  if (featured) {
    return (
      <Link
        to="/news"
        className="block rounded-3xl overflow-hidden relative aspect-[5/4] group"
      >
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
          <div className="flex items-center gap-2 mb-2">
            {item.isWomens && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full gradient-brand">
                Women's
              </span>
            )}
            <span className="text-[10px] font-semibold uppercase tracking-wider opacity-90">
              {item.category} · {sportLabel[item.sport]}
            </span>
          </div>
          <h3 className="font-display font-bold text-xl leading-tight">{item.title}</h3>
          <p className="text-sm opacity-85 mt-2 line-clamp-2">{item.excerpt}</p>
          <div className="flex items-center gap-3 mt-3 text-[11px] opacity-80">
            <span>{item.author}</span>
            <span>·</span>
            <span>{item.publishedAt}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {item.readTime} min
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/news"
      className={cn(
        "flex gap-3 p-3 rounded-2xl bg-surface border border-border/60 hover:shadow-soft transition-all",
      )}
    >
      <div className="relative h-20 w-20 flex-none rounded-xl overflow-hidden">
        <img src={item.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 mb-1">
          {item.isWomens && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
              Women's
            </span>
          )}
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {item.category}
          </span>
        </div>
        <h4 className="font-semibold text-sm leading-tight line-clamp-2">{item.title}</h4>
        <p className="text-[11px] text-muted-foreground mt-1.5">
          {item.publishedAt} · {item.readTime} min read
        </p>
      </div>
    </Link>
  );
}
