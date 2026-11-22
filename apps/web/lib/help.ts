// Help center content. Plain language, written for neighbors and shop owners,
// not developers. When a feature changes, update its article here.

export type HelpArticle = { slug: string; title: string; summary: string; body: string[] };
export type HelpSection = { title: string; articles: HelpArticle[] };

export const HELP: HelpSection[] = [
  {
    title: "Getting started",
    articles: [
      {
        slug: "what-is-localworx",
        title: "What is LocalWorx?",
        summary: "A Main Street app that pays neighbors in Bitcoin for bringing customers to local shops.",
        body: [
          "LocalWorx connects three groups: neighbors who shop locally, promoters who recommend local shops, and the shops themselves.",
          "When you check in at a shop, you fill a punch card toward a reward. If a promoter sent you, the shop pays that promoter: in sats (small amounts of Bitcoin) straight from its wallet to theirs, in goods from the shop (a meal, a haircut) as an IOU the promoter can use or sell, or both.",
          "Every shop signs an honor pledge to keep those IOUs. That trust is what keeps neighbors promoting, and what keeps value moving around town.",
          "The result: money a shop would have spent on online ads goes to people in its own town instead.",
        ],
      },
      {
        slug: "create-account",
        title: "Creating your account",
        summary: "No email or password. Your account is a key that lives on your device.",
        body: [
          "Tap Sign in, then New here. Choose a name and a passcode for this device.",
          "LocalWorx creates a Nostr key for you: a secret code that is your account. It's stored on your device, locked with your passcode. We never see it.",
          "Next you'll see your key once, as a code starting with nsec1. Save it in a password manager or write it down. It's the only way to get into your account on a new device.",
          "Already use Nostr? Choose Extension (Alby, nos2x) or I have a key instead.",
        ],
      },
      {
        slug: "lost-device",
        title: "I lost my phone or cleared my browser",
        summary: "Sign in again with the key you backed up.",
        body: [
          "On any device, go to Sign in, choose I have a key, and paste the nsec1… code you saved when you signed up. Pick a new passcode for that device.",
          "If you didn't save your key, the account can't be recovered. No one has a copy, including LocalWorx. Your rewards and check-ins stay with the old account.",
        ],
      },
    ],
  },
  {
    title: "Checking in and rewards",
    articles: [
      {
        slug: "check-in",
        title: "How to check in",
        summary: "Scan the LocalWorx code at the counter with your phone camera.",
        body: [
          "Participating shops display a LocalWorx code by the register. Point your phone camera at it and open the link.",
          "Your phone asks for your location once, to confirm you're at the shop. Allow it, and you're checked in.",
          "Each shop sets how often a visit counts, for example once every 3 hours. If you scan again too soon, the app tells you when your next visit will count.",
          "The code changes every 30 seconds, so a photo of it won't work later. That keeps rewards fair for everyone.",
        ],
      },
      {
        slug: "punch-cards",
        title: "Punch cards and rewards",
        summary: "Each shop sets its own reward, like a free coffee after 5 visits.",
        body: [
          "Every check-in moves your punch card forward. When it's full, the reward lands in My rewards and your card starts over.",
          "If a shop changes its reward, everyone's card starts over, but rewards you already earned still work.",
        ],
      },
      {
        slug: "use-reward",
        title: "Using a reward",
        summary: "Show the reward's code to staff. It works once.",
        body: [
          "Open My rewards and tap Use it on the reward. A code appears.",
          "Staff scan it with the LocalWorx app (or enter it on their dashboard). Once used, the reward moves to your Used list and can't be used again.",
        ],
      },
      {
        slug: "sell-reward",
        title: "Selling or buying a reward",
        summary: "Won't use a reward or IOU? Sell it to a neighbor for sats.",
        body: [
          "Anything in My rewards can be sold: punch-card rewards, and IOUs promoters earned from shops (a free meal, a haircut).",
          "To sell: in My rewards, tap Sell and set a price in sats. You need a Lightning address in Profile & wallet so buyers can pay you.",
          "To buy: open the Marketplace and tap Buy. Pay the invoice with any Lightning wallet. The listing is held for you for 10 minutes while you pay.",
          "The buyer pays the seller directly. As soon as the payment lands, the reward moves to the buyer. LocalWorx never holds the money.",
          "You can take a listing off the market any time, unless a buyer is in the middle of paying.",
          "Every shop has pledged to honor its rewards and IOUs for whoever holds them, including a buyer.",
        ],
      },
      {
        slug: "unhonored",
        title: "A shop won't honor my reward or IOU",
        summary: "Report it from My rewards. The shop has 7 days to make it right.",
        body: [
          "Every shop on LocalWorx signs a pledge to honor every reward and IOU it issues, for whoever holds it.",
          "If a shop refuses one, open My rewards, tap \"Shop won't honor this?\" on that reward and tell us what happened.",
          "The shop sees your report. If it's still open after 7 days, the shop's page, promotions and marketplace listings show an \"Unpaid IOU\" badge.",
          "Once the shop makes it right, tap \"They made it right\" on the reward to close your report. Only you can close it. The shop marking the reward used doesn't, so a shop can't clear its own badge.",
          "Please report only real refusals. LocalWorx can dismiss reports that turn out to be false.",
        ],
      },
    ],
  },
  {
    title: "Promoters",
    articles: [
      {
        slug: "become-promoter",
        title: "Earning as a promoter",
        summary: "Claim a promotion, share your link, get paid per visit in sats or goods.",
        body: [
          "Browse Promotions and tap Promote this on a shop you'd happily recommend. The shop approves you.",
          "Once approved, you'll find your personal link under Promoting. Share it however you like.",
          "When someone opens your link and then checks in at that shop, the visit is credited to you, and the shop pays you what the promotion shows.",
          "Sats go straight to your Lightning address. Add one in Profile & wallet.",
          "Goods (a meal, a haircut) arrive as an IOU in My rewards, for example one free haircut every 3 visits you send. Use it yourself, give it away, or sell it on the Marketplace for sats.",
          "Your own visits through your own link don't count.",
        ],
      },
      {
        slug: "disclosure",
        title: "Saying it's a paid promotion",
        summary: "The law requires it, and it builds trust.",
        body: [
          "In the US, the FTC requires anyone paid to promote something to say so clearly. A simple \"#ad\" or \"I get paid when you visit\" works."
        ],
      },
    ],
  },
  {
    title: "Community posts and tips",
    articles: [
      {
        slug: "write-post",
        title: "Writing a community post",
        summary: "Share what's worth knowing in your town. Readers can tip you in sats.",
        body: [
          "Go to Community and tap Write a post. Add a title, your words, and optionally a photo link, a topic and your town.",
          "Your post is signed with your own key on your device, then published to the LocalWorx feed and to the open Nostr network, so it can be read in any Nostr app.",
          "Posting carries a small fee, paid in sats or in dollars by card. It keeps bots and spam out of the feed. During the pilot, posting is free with a limit of a few posts a day.",
          "Signed posts can't be edited. If you need to change something, delete it and post again.",
        ],
      },
      {
        slug: "tips",
        title: "Tips and zaps",
        summary: "Readers send sats straight to your wallet. LocalWorx takes no cut.",
        body: [
          "To receive tips, add a Lightning address in Profile & wallet.",
          "On a post, pick an amount and tap Tip. The invoice comes from the author's own wallet, so the sats go straight from the reader to the author.",
          "If the author's wallet supports Nostr zaps, the tip also shows as a public zap on Nostr.",
          "The tip total on a post counts tips confirmed through LocalWorx.",
        ],
      },
    ],
  },
  {
    title: "Businesses",
    articles: [
      {
        slug: "list-business",
        title: "Listing your business",
        summary: "Two minutes: name, address, category, and the honor pledge.",
        body: [
          "Go to List your business, fill in the basics, type your street address and tap Find.",
          "A map appears. Drag the pin to where your counter QR will stand (or tap the map). Check-ins count within 60 meters of it by default; you can widen that later in Manage, up to 250 meters, for big stores or markets.",
          "Another shop somewhere else can have the same name. Your name shows exactly as you typed it, with your town next to it, and we pick a free page address for you (for example adding your town). You can type your own instead.",
          "Tick the honor pledge at the bottom. It's required before you can offer a punch card or promotion.",
          "You become the owner of the listing. You can add staff later.",
        ],
      },
      {
        slug: "honor-pledge",
        title: "The honor pledge",
        summary: "Your rewards and IOUs are promises. Keep them, or your page shows a badge.",
        body: [
          "Punch-card rewards and in-kind promoter payouts are IOUs from your shop. Customers and promoters own them, trade them and sell them to each other, so they only have value if you always honor them.",
          "Before offering any, the owner ticks the pledge: honor every reward and IOU for whoever holds it, and if you stop offering an item, give the holder something of equal value.",
          "If a holder reports that you refused one, you'll see it at the top of Manage. Make it right and they'll close the report.",
          "A report still open after 7 days puts an \"Unpaid IOU\" badge on your page, your promotions and your marketplace listings until the holder closes it.",
          "Keeping your word is what makes people want to promote you. It's the whole engine.",
        ],
      },
      {
        slug: "counter-code",
        title: "Setting up the counter code",
        summary: "A tablet or old phone by the register, showing a code that changes every 30 seconds.",
        body: [
          "From Manage, tap Open counter QR on a device you'll keep by the register, then tap Full screen.",
          "The code refreshes every 30 seconds. Customers scan it with their phone camera to check in.",
          "Only you and your staff can open this page. If someone who had access leaves, the owner can reset the code.",
        ],
      },
      {
        slug: "punch-card-setup",
        title: "Choosing a reward",
        summary: "Pick something simple: a free coffee after 5 visits.",
        body: [
          "In Manage, under Punch card, enter the reward and how many visits earn it.",
          "A visit counts once per gap you set under Check-in rules (3 hours by default), so 5 visits means 5 separate trips.",
          "Each reward is an IOU covered by your honor pledge. Pick something you'll always be happy to give.",
          "When a customer shows you a reward, scan it with the LocalWorx app or paste its code under Use a reward.",
        ],
      },
      {
        slug: "hire-promoters",
        title: "Working with promoters",
        summary: "Post a promotion, approve promoters, pay per verified visit in goods, sats or both.",
        body: [
          "In Manage, tap New promotion. Say what promoters should tell people and how you'll pay them.",
          "Something from your shop: a meal, a haircut, a coffee, every so many visits they send. They get an IOU they can use or sell for sats. It costs you your cost of goods, not cash, and it brings promoters back through your door.",
          "Sats: a set amount per visit, paid straight to the promoter's Lightning address. Quickest if you'd rather settle in money.",
          "Or both.",
          "Promoters who want to work with you show up under Promoters. Approve the ones you trust.",
          "You only owe a promoter when someone they sent actually checks in at your counter.",
        ],
      },
    ],
  },
  {
    title: "Wallets, privacy and security",
    articles: [
      {
        slug: "lightning-wallet",
        title: "Do I need a Bitcoin wallet?",
        summary: "Only to send or receive sats.",
        body: [
          "Checking in and earning rewards needs no wallet at all.",
          "To get paid (as a promoter or seller), add a Lightning address in Profile & wallet. It looks like an email address, for example you@getalby.com. Wallets such as Alby, Wallet of Satoshi, Strike and Primal give you one for free.",
          "To pay, use any Lightning wallet to scan the invoice, or a browser wallet like Alby for one-click payments.",
        ],
      },
      {
        slug: "custody",
        title: "Does LocalWorx hold my money?",
        summary: "No. Never.",
        body: [
          "Every payment goes straight from the payer's wallet to the receiver's wallet over the Lightning Network.",
          "There's no LocalWorx balance, so there's nothing for us to freeze, lose, or be hacked out of.",
        ],
      },
      {
        slug: "privacy",
        title: "What data do you keep?",
        summary: "Your public key, your name, and your check-ins. No email, no tracking.",
        body: [
          "We store your public key (your Nostr ID), the display name you chose, your Lightning address if you add one, and a record of each check-in: which shop, when, and the location your phone reported at that moment.",
          "Community posts you publish are public, on LocalWorx and on Nostr. Tips you send or receive are visible only to you and the other person; posts show a total.",
          "If you pay a fee by card, Stripe handles the card. We never see or store card numbers.",
          "We don't track your location outside check-ins, and we don't run ads.",
          "Shops see check-ins at their own shop. Other members can't see your check-ins.",
        ],
      },
    ],
  },
];

export const ALL_ARTICLES = HELP.flatMap((s) => s.articles);
export const findArticle = (slug: string) => ALL_ARTICLES.find((a) => a.slug === slug);
