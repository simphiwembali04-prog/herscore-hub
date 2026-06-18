import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { AthleteCard } from "@/components/AthleteCard";
import { athletes, sportLabel, type Sport } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/athletes")({
  head: () => ({
    meta: [
      { title: "Athletes — HerScore" },
      {
        name: "description",
        content:
          "Discover and follow the women athletes shaping football, tennis, rugby and cricket today.",
      },
      { property: "og:title", content: "Athletes — HerScore" },
      { property: "og:description", content: "Profiles, stats and stories from the women shaping sport." },
    ],
  }),
  component: AthletesPage,
});

const sports: ("all" | Sport)[] = ["all", "football", "tennis", "rugby", "cricket"];

function AthletesPage() {
  const [sport, setSport] = useState<(typeof sports)[number]>("all");
  const list = athletes.filter((a) => (sport === "all" ? true : a.sport === sport));

  return (
    <>
      <TopBar title="Athletes" subtitle="The women shaping sport" />

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

      <div className="px-5 pt-5 grid grid-cols-2 gap-3">
        {list.map((a) => (
          <AthleteCard key={a.id} athlete={a} />
        ))}
      </div>
    </>
  );
}
