import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Founding partners" };

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const contactNpub = process.env.NEXT_PUBLIC_CONTACT_NPUB;

export default function PartnersPage() {
  return (
    <Container narrow>
      <p className="eyebrow">Founding partners</p>
      <h1 className="h-display mt-2 text-5xl">Help a town go Bitcoin, one shop at a time.</h1>
      <p className="mt-6 text-lg text-ink-2">
        Bitcoiners stack sats but rarely spend or earn them locally. LocalWorx fixes that from the
        business side: shops pay neighbors for real foot traffic, in sats or in their own goods (IOUs anyone can resell
        for sats), so value lands in local hands first and keeps moving.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ["You", "Bring your voice and pick a pilot town. Share in the recurring revenue from businesses you help launch."],
          ["Us", "We sign up the first businesses in person, run support, and build what your audience asks for."],
          ["90 days", "Seed, launch, grow. Then we review the results together and decide what's next."],
        ].map(([t, b]) => (
          <div key={t} className="card p-5">
            <p className="h-display text-xl">{t}</p>
            <p className="mt-2 text-sm text-muted">{b}</p>
          </div>
        ))}
      </div>
      <div className="card mt-10 p-6">
        <p className="font-semibold">Interested?</p>
        <p className="mt-1 text-sm text-muted">We&apos;ll send a one-page summary and set up a 20-minute call.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {contactEmail && <a href={`mailto:${contactEmail}?subject=LocalWorx%20founding%20partner`} className="btn-primary">Email us</a>}
          {contactNpub && <a href={`https://njump.me/${contactNpub}`} className="btn-ghost" target="_blank" rel="noreferrer">Message on Nostr</a>}
          {!contactEmail && !contactNpub && <p className="text-sm text-muted">Contact details coming soon.</p>}
        </div>
      </div>
    </Container>
  );
}
