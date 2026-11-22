import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-2/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-semibold">LocalWorx</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Main Street first. Open source, non-custodial, built on Bitcoin and Nostr.
          </p>
        </div>
        <FooterCol title="Use it" links={[["/directory", "Find local shops"], ["/community", "Community posts"], ["/business/new", "List your business"], ["/promotions", "Earn as a promoter"], ["/marketplace", "Rewards marketplace"]]} />
        <FooterCol title="Learn" links={[["/about", "Why LocalWorx"], ["/white-paper", "White paper"], ["/help", "Help & FAQ"], ["/partners", "Founding partners"], ["https://github.com/cleph01/localworx", "Source code"]]} />
      </div>
      <p className="pb-8 text-center text-xs text-muted">© {new Date().getFullYear()} LocalWorx · GPLv3</p>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map(([href, label]) => (
          <li key={href}><Link href={href} className="text-sm text-muted hover:text-ink">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
