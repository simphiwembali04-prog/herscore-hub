import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Heart, Bell, Star, Bookmark, Moon, ChevronRight, LogIn } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { athletes } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — HerScore" },
      { name: "description", content: "Your follows, preferences and notifications on HerScore." },
      { property: "og:title", content: "Profile — HerScore" },
      { property: "og:description", content: "Your HerScore profile." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const following = athletes.slice(0, 4);

  return (
    <>
      <TopBar title="Profile" />

      {/* Sign-in card */}
      <section className="px-5 pt-5">
        <div className="rounded-3xl overflow-hidden gradient-brand text-primary-foreground p-6 shadow-brand relative">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <h2 className="font-display font-extrabold text-2xl leading-tight">
            Join the HerScore community.
          </h2>
          <p className="text-sm opacity-90 mt-2 max-w-[30ch]">
            Follow athletes, save stories and never miss a match. Free forever.
          </p>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2.5 rounded-full bg-white text-primary-deep text-xs font-bold inline-flex items-center gap-2">
              <LogIn className="h-3.5 w-3.5" /> Sign in
            </button>
            <button className="px-4 py-2.5 rounded-full bg-white/15 backdrop-blur text-xs font-semibold">
              Create account
            </button>
          </div>
        </div>
      </section>

      {/* Following */}
      <section className="pt-6">
        <div className="flex items-center justify-between px-5 mb-3">
          <h3 className="font-display font-bold text-lg">Following</h3>
          <Link to="/athletes" className="text-xs font-semibold text-primary inline-flex items-center">
            Manage <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
          {following.map((a) => (
            <Link
              key={a.id}
              to="/athletes/$id"
              params={{ id: a.id }}
              className="flex-none w-20 text-center"
            >
              <div className="h-20 w-20 rounded-full overflow-hidden ring-2 ring-primary/40 p-0.5">
                <img src={a.image} alt={a.name} className="h-full w-full rounded-full object-cover" />
              </div>
              <p className="text-[11px] font-semibold mt-1.5 leading-tight truncate">
                {a.name.split(" ")[0]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Settings list */}
      <section className="px-5 pt-6">
        <div className="rounded-3xl bg-surface border border-border/70 overflow-hidden">
          {[
            { icon: Heart, label: "Favorite sports & teams", hint: "4 selected" },
            { icon: Bell, label: "Notifications", hint: "All goals" },
            { icon: Bookmark, label: "Saved stories", hint: "12" },
            { icon: Star, label: "HerScore Premium", hint: "Try free", premium: true },
            { icon: Moon, label: "Appearance", hint: "System" },
            { icon: Settings, label: "Account & privacy" },
          ].map((row, i, arr) => (
            <button
              key={row.label}
              className={
                "w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted transition-colors " +
                (i < arr.length - 1 ? "border-b border-border/60" : "")
              }
            >
              <span
                className={
                  "h-9 w-9 rounded-full grid place-items-center flex-none " +
                  (row.premium ? "bg-gold/15 text-gold-foreground" : "bg-primary-soft text-primary-deep")
                }
              >
                <row.icon className="h-[18px] w-[18px]" />
              </span>
              <span className="flex-1 text-sm font-semibold">{row.label}</span>
              {row.hint && (
                <span
                  className={
                    "text-xs " + (row.premium ? "font-bold text-gold-foreground" : "text-muted-foreground")
                  }
                >
                  {row.hint}
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
        <p className="text-center text-[11px] text-muted-foreground mt-6">
          HerScore · Women's sports, first. · v0.1
        </p>
      </section>
    </>
  );
}
