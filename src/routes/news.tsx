import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { NewsCard } from "@/components/NewsCard";
import { news } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — HerScore" },
      {
        name: "description",
        content:
          "Match reports, transfer news, interviews and features from across women's sport.",
      },
      { property: "og:title", content: "News — HerScore" },
      { property: "og:description", content: "Stories from across women's sport." },
    ],
  }),
  component: NewsPage,
});

const categories = ["All", "Match Report", "Transfer", "Feature", "Team News"] as const;

function NewsPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const featured = news.find((n) => n.featured)!;
  const list = news
    .filter((n) => !n.featured)
    .filter((n) => (cat === "All" ? true : n.category === cat));

  return (
    <>
      <TopBar title="News" subtitle="Stories that matter" />

      <div className="px-5 pt-5">
        <NewsCard item={featured} featured />
      </div>

      <div className="px-5 pt-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all",
                cat === c
                  ? "gradient-brand text-primary-foreground border-transparent shadow-brand"
                  : "bg-surface text-foreground border-border hover:border-primary/40",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-4 space-y-3">
        {list.map((n) => (
          <NewsCard key={n.id} item={n} />
        ))}
      </div>
    </>
  );
}
