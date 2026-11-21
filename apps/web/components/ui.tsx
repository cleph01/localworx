import Link from "next/link";

export function PageTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="h-display mt-2 text-4xl">{title}</h1>
      {children && <div className="mt-3 max-w-2xl text-ink-2">{children}</div>}
    </div>
  );
}

export function Empty({ title, body, action }: { title: string; body?: string; action?: [string, string] }) {
  return (
    <div className="card grid place-items-center p-10 text-center">
      <p className="font-display text-xl">{title}</p>
      {body && <p className="mt-2 max-w-md text-sm text-muted">{body}</p>}
      {action && <Link href={action[0]} className="btn-primary mt-5">{action[1]}</Link>}
    </div>
  );
}

export function Container({ children, narrow }: { children: React.ReactNode; narrow?: boolean }) {
  return <div className={`mx-auto ${narrow ? "max-w-3xl" : "max-w-6xl"} px-4 py-12 sm:px-6`}>{children}</div>;
}

export function SignInPrompt({ next, what }: { next: string; what: string }) {
  return (
    <Empty title={`Sign in to ${what}`} body="It takes under a minute, with no email or password." action={[`/signin?next=${encodeURIComponent(next)}`, "Sign in"]} />
  );
}
