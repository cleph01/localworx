// Public contact details, set per deployment (NEXT_PUBLIC_CONTACT_EMAIL / NEXT_PUBLIC_CONTACT_NPUB).
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || null;
export const contactNpub = process.env.NEXT_PUBLIC_CONTACT_NPUB || null;

export function contactHref(subject: string): string | null {
  if (contactEmail) return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
  if (contactNpub) return `https://njump.me/${contactNpub}`;
  return null;
}
