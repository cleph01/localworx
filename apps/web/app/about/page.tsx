import type { Metadata } from "next";
import Link from "next/link";
import { FREE_POSTS_PER_DAY } from "@localworx/shared";
import { publicFeeInfo } from "@/lib/fees";

export const metadata: Metadata = {
  title: "About",
  description: "Why LocalWorx exists, what we believe, how Nostr, Bitcoin and local content fit together, and what it costs.",
};

export const dynamic = "force-dynamic"; // fee amounts come from server config

export default function AboutPage() {
  const fees = publicFeeInfo();
  return (
    <>
      <Hero />
      <Stack />
      <Reciprocity />
      <Beliefs />
      <Costs fees={fees} />
      <Cta />
    </>
  );
}

/* ───────────────────────────── Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-[-10%] h-[480px] w-[480px] rounded-full bg-orange/15 blur-3xl" />
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-16 sm:px-6 md:pt-24">
        <p className="eyebrow">About LocalWorx</p>
        <h1 className="h-display mt-4 text-[2.4rem] leading-[1.08] sm:text-6xl">
          Value belongs to the people who create it, <em className="font-display text-orange-dark not-italic">not the platforms that harvest it.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-2">
          Big platforms make money from our attention, our data and our neighborhoods, and send it far away.
          LocalWorx is built the other way round: the shop owner, the regular who brings friends, and the
          neighbor who writes about their town keep what their work is worth.
        </p>
        <p className="mt-4 max-w-2xl text-lg text-ink-2">We are all influencers to the people who matter most to us.</p>
      </div>
    </section>
  );
}

/* ───────────────────────────── Stack */
const PARTS = [
  {
    tag: "Identity & content",
    name: "Nostr",
    line: "Who you are and what you said.",
    points: [
      "Your account is a key that stays on your device. No email, no password to leak.",
      "Posts are signed by you and published to the open Nostr network, readable in any Nostr app.",
      "If LocalWorx disappeared tomorrow, your identity and your posts would not.",
    ],
  },
  {
    tag: "Money",
    name: "Bitcoin",
    line: "How value moves.",
    points: [
      "Tips, promoter payouts and reward sales go wallet to wallet over Lightning, in seconds.",
      "LocalWorx never holds anyone's money, so there's no balance to freeze, lose or hack.",
      "Fees can be paid in sats, or in dollars by card if you'd rather.",
    ],
  },
  {
    tag: "The reason anyone shows up",
    name: "Local content",
    line: "Your town, told by its people.",
    points: [
      "Shops, punch cards and promotions from real businesses on real streets.",
      "Check-ins proven in person: a code that changes every 30 seconds, plus your phone's location.",
      "Posts from neighbors about the places and people worth knowing.",
    ],
  },
];

function Stack() {
  return (
    <section className="border-y border-line bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="eyebrow">How it fits together</p>
        <h2 className="h-display mt-3 max-w-3xl text-4xl">Three open pieces. No one in the middle.</h2>
        <p className="mt-4 max-w-2xl text-ink-2">
          Nostr says who you are and what you said. Bitcoin moves the value. Local content is why it matters.
          Each is an open standard, so nothing locks you in, including us.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PARTS.map((p, i) => (
            <div key={p.name} className="card flex flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-paper">{i + 1}</span>
                <p className="text-sm font-semibold text-slate">{p.tag}</p>
              </div>
              <h3 className="h-display mt-4 text-3xl">{p.name}</h3>
              <p className="mt-1 text-ink-2">{p.line}</p>
              <ul className="mt-5 space-y-2.5 text-[15px] text-ink-2">
                {p.points.map((t) => (
                  <li key={t} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Reciprocity */
function Reciprocity() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="eyebrow">The engine</p>
          <h2 className="h-display mt-3 text-4xl">Paid in sats, or in kind. Promises kept.</h2>
          <p className="mt-4 text-ink-2">
            A shop can pay the neighbors who bring in customers with what it already makes: a meal, a haircut, a coffee.
            The promoter gets an IOU they own. They can use it, give it away, or sell it on the marketplace for sats.
            Shops that want to cut to the chase can pay sats instead, or both.
          </p>
          <p className="mt-4 text-ink-2">
            It only works if every IOU is honored. So every shop signs a pledge before it can offer one, and a shop that
            refuses one carries a public <strong>Unpaid IOU</strong> badge until it makes it right.
          </p>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {[
            ["A shop pays in goods", "Ana's Barbershop gives a free cut for every 3 customers a promoter sends."],
            ["The promoter owns the IOU", "Leo earns one. It sits in his rewards like cash in a drawer."],
            ["It circulates", "Leo doesn't need a haircut, so he sells it on the marketplace for sats to a neighbor who does."],
            ["The shop keeps its word", "The neighbor walks in, Ana honors it, and Leo goes back to promoting her. That trust is the loop."],
          ].map(([t, b], i) => (
            <li key={t} className="card p-5">
              <p className="font-display text-sm text-orange-dark">{i + 1}</p>
              <p className="mt-1 font-semibold">{t}</p>
              <p className="mt-1.5 text-sm text-muted">{b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────────── Beliefs */
const BELIEFS = [
  ["Main Street first", "Marketing money should reach the regulars who bring in their friends, not an ad network in another state."],
  ["Non-custodial, always", "We verify payments; we never hold them. Every sat goes straight from one person's wallet to another's."],
  ["You own your account", "A key, not a login we can revoke. Take your identity and your posts to any Nostr app."],
  ["Real people, real visits", "Small costs keep bots out; in-person check-ins keep rewards honest."],
  ["No ads, no data sales", "We earn from small, visible fees, so we never need to sell your attention or your location."],
  ["Open source", "Every line is public under GPLv3. Any town can check our work, or run its own."],
];

function Beliefs() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-orange uppercase">What we believe</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-tight">Rebuilding trust, locally.</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          {BELIEFS.map(([t, b]) => (
            <div key={t} className="bg-ink p-6">
              <p className="font-display text-xl">{t}</p>
              <p className="mt-2 text-[15px] text-paper/70">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Costs */
function Costs({ fees }: { fees: ReturnType<typeof publicFeeInfo> }) {
  const usd = `$${(fees.postUsdCents / 100).toFixed(2)}`;
  const sats = `${fees.postSats.toLocaleString()} sats`;
  const postingLive = fees.methods.length > 0;
  const rows: [string, string, string, string][] = [
    ["Members", "Sign up, check in, earn and use rewards", "Free", "Being a customer should never cost you anything."],
    ["Promoters", "Claim promotions, send friends to shops", "Free · you keep 100% of payouts", "Shops pay you directly: sats wallet to wallet, or goods as IOUs you own."],
    ["Tips & sales", "Tips on posts, reselling a reward", "No LocalWorx cut", "It's your money; it goes straight to you."],
    ["Community posts", "Publish to your town's feed",
      postingLive ? `${sats} or ${usd} by card` : `Proposed: ${sats} or ${usd} by card · free now (${FREE_POSTS_PER_DAY} a day)`,
      "A bot can make a million free accounts. It can't pay a million posting fees."],
    ["Businesses", "Listing, counter code, punch cards, promotions",
      "Proposed: a modest monthly fee, lower the more you pay local promoters · free during the pilot",
      "Keeps listings to real shops, funds the work, and rewards shops that invest in their neighbors."],
  ];
  return (
    <section id="costs" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow">What it costs, and why</p>
          <h2 className="h-display mt-3 text-4xl">Small costs keep it honest.</h2>
          <p className="mt-4 text-ink-2">
            &quot;Free&quot; platforms are paid for with ads and your data, and they fill up with bots and fake
            accounts because faking is free. LocalWorx puts a small, visible price on the few things a bot
            would abuse, and keeps everything else free.
          </p>
          <p className="mt-4 text-ink-2">
            Pay in <strong>sats over Lightning</strong>, or in <strong>US dollars by card</strong> (through
            Stripe) if you don&apos;t use Bitcoin yet. Fees go to LocalWorx to run and build the service.
            Money between members never passes through us.
          </p>
          <p className="mt-4 text-sm text-muted">
            Amounts marked &quot;proposed&quot; are being set with our founding towns and may change before launch.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">LocalWorx costs by role</caption>
            <thead className="bg-paper-2 text-xs tracking-wide text-muted uppercase">
              <tr><th scope="col" className="px-4 py-3">Who</th><th scope="col" className="px-4 py-3">Cost</th><th scope="col" className="hidden px-4 py-3 md:table-cell">Why</th></tr>
            </thead>
            <tbody className="divide-y divide-line align-top">
              {rows.map(([who, what, cost, why]) => (
                <tr key={who}>
                  <th scope="row" className="px-4 py-4 font-normal">
                    <span className="block font-semibold text-ink">{who}</span>
                    <span className="mt-0.5 block text-muted">{what}</span>
                  </th>
                  <td className="px-4 py-4 font-medium text-ink">{cost}<span className="mt-1 block font-normal text-muted md:hidden">{why}</span></td>
                  <td className="hidden px-4 py-4 text-muted md:table-cell">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Fake check-ins", "The counter code changes every 30 seconds and your phone must be at the shop. Each shop also sets how often a visit counts."],
          ["Fake accounts", "A posting fee makes spam expensive. Keys are free to make, but a key alone can't post or farm rewards."],
          ["Fake shops", "Listings will carry a Verified badge once the owner proves they run the shop at that address."],
          ["Broken promises", "Every shop pledges to honor its rewards and IOUs. One that refuses and doesn't make it right within 7 days gets a public Unpaid IOU badge."],
        ].map(([t, b]) => (
          <div key={t} className="card p-5">
            <p className="font-semibold">{t}</p>
            <p className="mt-1.5 text-sm text-muted">{b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────────── CTA */
function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="card relative overflow-hidden p-8 text-center sm:p-12">
        <div aria-hidden className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange/20 blur-2xl" />
        <h2 className="h-display text-3xl sm:text-4xl">Promote, or get promoted.</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-2">Whether you run a shop, love one, or have something to say about your town, there&apos;s a place for you.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/business/new" className="btn-dark">I run a business</Link>
          <Link href="/community" className="btn-primary">Join the community</Link>
          <Link href="/directory" className="btn-ghost">Find local shops</Link>
        </div>
      </div>
    </section>
  );
}
