import Image from "next/image";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";

const NAV = [
  { href: "/directory", label: "Directory" },
  { href: "/community", label: "Community" },
  { href: "/promotions", label: "Promotions" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/about", label: "About" },
];

async function currentProfileOrNull() {
  try {
    return await getCurrentProfile();
  } catch {
    return null; // Supabase not configured (e.g. a landing-only preview)
  }
}

export async function SiteHeader() {
  const me = await currentProfileOrNull();
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="LocalWorx home">
          <Image src="/logo.png" alt="" width={36} height={36} className="rounded-full" priority />
          <span className="font-display text-xl font-semibold tracking-tight">LocalWorx</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-full px-3 py-1.5 text-[15px] text-ink-2 hover:bg-paper-2 hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {me ? (
            <details className="relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-light text-xs font-bold text-ink">
                  {me.display_name.slice(0, 1).toUpperCase()}
                </span>
                <span className="max-w-32 truncate">{me.display_name}</span>
              </summary>
              <div className="card absolute right-0 mt-2 w-56 p-1.5 shadow-lg">
                <MenuLink href="/me">My rewards</MenuLink>
                <MenuLink href="/me/businesses">My businesses</MenuLink>
                <MenuLink href="/me/promoting">Promoting</MenuLink>
                <MenuLink href="/me/profile">Profile & wallet</MenuLink>
                <div className="my-1 border-t border-line" />
                <SignOutButton />
              </div>
            </details>
          ) : (
            <Link href="/signin" className="btn-dark !py-2 text-sm">Sign in</Link>
          )}
          <details className="relative md:hidden">
            <summary className="list-none rounded-full border border-line bg-white p-2" aria-label="Menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </summary>
            <div className="card absolute right-0 mt-2 w-48 p-1.5 shadow-lg">
              {NAV.map((n) => <MenuLink key={n.href} href={n.href}>{n.label}</MenuLink>)}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

function MenuLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-paper-2 hover:text-ink">
      {children}
    </Link>
  );
}
