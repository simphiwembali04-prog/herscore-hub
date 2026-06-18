import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Radio, Users, Newspaper, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items: { to: "/" | "/scores" | "/athletes" | "/news" | "/profile"; label: string; icon: typeof Home; exact?: boolean }[] = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/scores", label: "Scores", icon: Radio },
  { to: "/athletes", label: "Athletes", icon: Users },
  { to: "/news", label: "News", icon: Newspaper },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-surface/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto grid max-w-3xl grid-cols-5">
        {items.map(({ to, label, icon: Icon, exact }) => {
          const active = exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
          return (
            <li key={to}>
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-all",
                    active && "gradient-brand shadow-brand text-primary-foreground",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 2} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
