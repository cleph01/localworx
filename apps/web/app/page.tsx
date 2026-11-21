import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <Roles />
      <HowItWorks />
      <Principles />
      <PartnerBand />
      <MiniFaq />
    </>
  );
}

/* ───────────────────────────── Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-orange/15 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-20 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pt-24">
        <div className="rise">
          <p className="eyebrow">Main Street first · Powered by Bitcoin</p>
          <h1 className="h-display mt-4 text-[2.6rem] leading-[1.05] sm:text-6xl">
            Keep your town&apos;s money <em className="font-display text-orange-dark not-italic">in your town.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-2">
            LocalWorx pays neighbors in Bitcoin for bringing customers to local shops. Check in where
            you already spend, earn rewards you actually own, and get paid for spreading the word.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/directory" className="btn-primary">Find local shops</Link>
            <Link href="/business/new" className="btn-ghost">List your business</Link>
          </div>
          <p className="mt-5 text-sm text-muted">Free for members. No email, no password, no ads.</p>
        </div>
        <PhoneMock />
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]" aria-label="Example: a check-in at Joe's Coffee">
      <div className="rounded-[2.2rem] border border-ink/10 bg-ink p-3 shadow-2xl shadow-ink/20">
        <div className="space-y-3 rounded-[1.7rem] bg-paper p-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>9:41</span><span>LocalWorx</span>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-light text-xl">☕</div>
              <div>
                <p className="font-semibold">Joe&apos;s Coffee</p>
                <p className="text-xs whitespace-nowrap text-muted">Main St · 12 m away</p>
              </div>
              <span className="ml-auto shrink-0 whitespace-nowrap rounded-full bg-good/10 px-2.5 py-1 text-xs font-semibold text-good">Checked in</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs"><span className="text-muted">Free latte</span><span className="font-semibold">4 of 5 visits</span></div>
              <div className="mt-1.5 grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`h-2 rounded-full ${i <= 4 ? "bg-orange" : "bg-paper-2"}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="card flex items-center gap-3 p-4">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-light text-sm font-bold">M</div>
            <div className="text-sm">
              <p><span className="font-semibold">Maria</span> sent you here</p>
              <p className="text-xs text-muted">Joe&apos;s paid her for the visit</p>
            </div>
            <span className="ml-auto shrink-0 whitespace-nowrap font-mono text-sm font-semibold text-orange-dark">+500 sats</span>
          </div>
          <div className="rounded-2xl bg-ink p-4 text-paper">
            <p className="text-xs text-paper/60">Your rewards</p>
            <p className="mt-1 font-display text-lg">2 ready to use · 1 for sale</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Roles */
const ROLES = [
  {
    who: "Neighbors",
    title: "Get rewarded for shopping local",
    points: ["Scan the code at the counter to check in", "Fill a punch card, earn a reward", "Use it, gift it, or sell it for sats"],
    cta: ["/directory", "Browse the directory"],
  },
  {
    who: "Promoters",
    title: "Get paid for the word of mouth you already give",
    points: ["Claim a promotion from a shop you love", "Share your link with your people", "Earn sats for every visit you send"],
    cta: ["/promotions", "See open promotions"],
  },
  {
    who: "Businesses",
    title: "Only pay for customers who walk in",
    points: ["Set a reward in two minutes", "Hire local promoters, pay per verified visit", "See who your regulars really are"],
    cta: ["/business/new", "List your business"],
  },
] as const;

function Roles() {
  return (
    <section className="border-y border-line bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="eyebrow">One app, three ways in</p>
        <h2 className="h-display mt-3 max-w-2xl text-4xl">Everyone on Main Street comes out ahead.</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {ROLES.map((r) => (
            <div key={r.who} className="card flex flex-col p-6">
              <p className="text-sm font-semibold text-slate">{r.who}</p>
              <h3 className="h-display mt-2 text-2xl leading-snug">{r.title}</h3>
              <ul className="mt-5 space-y-2.5 text-[15px] text-ink-2">
                {r.points.map((p) => (
                  <li key={p} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />{p}</li>
                ))}
              </ul>
              <Link href={r.cta[0]} className="mt-auto pt-6 text-sm font-semibold text-orange-dark hover:underline">{r.cta[1]} →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── How it works */
const STEPS = [
  ["A shop posts a promotion", "Joe's Coffee offers 500 sats for every new customer a promoter sends in."],
  ["A promoter spreads the word", "Maria shares her LocalWorx link with friends who'd love Joe's."],
  ["You check in at the counter", "Scan the rotating code by the register. Your phone confirms you're really there."],
  ["Sats move, wallet to wallet", "Joe's pays Maria directly. Your punch card fills. The money stays in town."],
];

function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">How it works</p>
          <h2 className="h-display mt-3 text-4xl">Marketing money that stays on Main Street.</h2>
          <p className="mt-4 text-ink-2">
            Shops spend thousands on ads that send money to Silicon Valley. LocalWorx sends it to
            the regulars who actually bring in their friends, and only when those friends walk through the door.
          </p>
        </div>
        <ol className="relative space-y-4">
          {STEPS.map(([title, body], i) => (
            <li key={title} className="card flex gap-4 p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display text-paper">{i + 1}</span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-[15px] text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────────── Principles */
const PRINCIPLES = [
  ["We never hold your money", "Payments go straight from one wallet to another over Lightning. There's no LocalWorx balance to freeze or lose."],
  ["Your account is a key, not an email", "You sign in with a Nostr key that stays on your device. Nothing to leak, nothing to sell."],
  ["Your identity travels with you", "Your LocalWorx account is a standard Nostr identity. Use it in any Nostr app; no one can take it from you."],
  ["Open source", "Every line is public under GPLv3. Any town can check our work, or run its own."],
];

function Principles() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-orange uppercase">Built like Bitcoin</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-tight">
          Our data. Our content. Our livelihood. <span className="text-orange">Our money.</span>
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-paper/10 sm:grid-cols-2">
          {PRINCIPLES.map(([t, b]) => (
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

/* ───────────────────────────── Partner band */
function PartnerBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
      <div className="card relative overflow-hidden p-8 sm:p-12">
        <div aria-hidden className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-orange/20 blur-2xl" />
        <p className="eyebrow">Founding towns</p>
        <h2 className="h-display mt-3 max-w-2xl text-3xl sm:text-4xl">Bring LocalWorx to your town.</h2>
        <p className="mt-4 max-w-2xl text-ink-2">
          We&apos;re launching town by town with a small group of founding partners: creators and community
          builders who want to see sound money work on their own Main Street. Partners anchor a pilot town
          and share in what it earns.
        </p>
        <Link href="/partners" className="btn-dark mt-7">Become a founding partner</Link>
      </div>
    </section>
  );
}

/* ───────────────────────────── FAQ teaser */
const FAQ = [
  ["Do I need Bitcoin to use LocalWorx?", "No. Checking in and earning rewards is free and needs no wallet. You only need a Lightning wallet to send or receive sats."],
  ["Is my location tracked?", "Only at the moment you check in, to confirm you're at the shop. We store that one point with your check-in and nothing else."],
  ["What does it cost a business?", "We're setting pricing together with our pilot towns. Promoter payouts are set by the business and go straight to the promoter's wallet; LocalWorx never takes a cut of them."],
  ["What if I lose my phone?", "Your account is your key. If you backed it up when you signed up, sign in on any device with it."],
];

function MiniFaq() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-20 sm:px-6">
      <h2 className="h-display text-center text-3xl">Questions, answered</h2>
      <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {q}<span className="text-orange-dark transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-[15px] text-muted">{a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-center text-sm"><Link href="/help" className="font-semibold text-orange-dark hover:underline">All help topics →</Link></p>
    </section>
  );
}
