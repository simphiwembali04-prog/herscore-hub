import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Shield, Lock, Database, Cookie, Mail, FileText } from "lucide-react";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Trust & Privacy — HerScore" },
      {
        name: "description",
        content:
          "How HerScore handles security, privacy, and data. Maintained by the HerScore team.",
      },
      { property: "og:title", content: "Trust & Privacy — HerScore" },
      {
        property: "og:description",
        content: "Security, privacy, and data practices at HerScore.",
      },
    ],
  }),
  component: TrustPage,
});

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Shield;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand shadow-brand">
          <Icon className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
        </span>
        <h2 className="font-display font-semibold text-lg">{title}</h2>
      </div>
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function TrustPage() {
  return (
    <>
      <TopBar title="Trust & Privacy" subtitle="Security and data practices" />
      <main className="mx-auto max-w-3xl px-5 py-6 space-y-5">
        <div className="rounded-2xl gradient-brand shadow-brand p-6 text-primary-foreground">
          <h1 className="font-display font-bold text-2xl">Trust at HerScore</h1>
          <p className="mt-2 text-sm/relaxed opacity-95">
            This page is maintained by the HerScore team to answer common
            security and privacy questions about the HerScore platform. It
            describes practices we currently have in place. It is editable
            project content, not an independent certification or audit.
          </p>
        </div>

        <Section icon={Shield} title="Shared responsibility">
          <p>
            HerScore is built on the Lovable platform, which provides hosting,
            managed infrastructure, and platform-level security capabilities.
            The HerScore team is responsible for our application logic, content
            decisions, and how we handle user data within that platform.
          </p>
          <p>
            References to platform capabilities below describe features enabled
            for this project and are not certification-style claims.
          </p>
        </Section>

        <Section icon={Lock} title="Access & authentication">
          <p>
            The current HerScore MVP is a visual experience with sample data
            and does not require an account to browse scores, athletes, or
            news. When account-based features ship, authentication will be
            handled through the managed auth provided by our hosting platform.
          </p>
        </Section>

        <Section icon={Database} title="Data we collect today">
          <p>
            The MVP displays sample sports content and does not collect
            personal profiles, payment details, or biometric data. Standard
            request metadata (such as IP address and user agent) may be
            processed by our hosting provider to deliver the site.
          </p>
        </Section>

        <Section icon={Cookie} title="Cookies & analytics">
          <p>
            HerScore does not set marketing or advertising cookies in this
            release. Essential cookies may be used by the hosting platform to
            serve the application reliably.
          </p>
        </Section>

        <Section icon={FileText} title="Subprocessors & integrations">
          <p>
            HerScore relies on the Lovable hosting platform to serve the app.
            Additional third-party integrations will be listed here as they are
            introduced.
          </p>
        </Section>

        <Section icon={Mail} title="Contact & reporting">
          <p>
            To report a security concern or ask a privacy question, contact the
            HerScore team from the in-app profile screen. We aim to acknowledge
            reports promptly and route them to the right owner.
          </p>
        </Section>

        <p className="text-xs text-muted-foreground text-center pt-2">
          This page is app-owned editable content and may be updated as the
          product evolves.{" "}
          <Link to="/" className="underline">
            Back to HerScore
          </Link>
        </p>
      </main>
    </>
  );
}
