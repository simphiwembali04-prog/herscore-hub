import { Bell, Search, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface TopBarProps {
  title?: string;
  subtitle?: string;
}

export function TopBar({ title = "HerScore", subtitle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border/60">
      <div className="mx-auto max-w-3xl px-5 pt-3 pb-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl gradient-brand shadow-brand">
            <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <div className="min-w-0">
            <div className="text-base font-display font-bold leading-none tracking-tight">
              {title === "HerScore" ? (
                <>
                  Her<span className="text-gradient-brand">Score</span>
                </>
              ) : (
                title
              )}
            </div>
            {subtitle && (
              <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{subtitle}</div>
            )}
          </div>
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            aria-label="Search"
            className="h-9 w-9 rounded-full grid place-items-center text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button
            aria-label="Notifications"
            className="h-9 w-9 rounded-full grid place-items-center text-foreground/70 hover:text-foreground hover:bg-muted transition-colors relative"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </button>
        </div>
      </div>
    </header>
  );
}
