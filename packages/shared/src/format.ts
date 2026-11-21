// Two shops can share a name. Wherever a customer could confuse them, show the town too.
export function withTown(name: string, city?: string | null): string {
  return city ? `${name} · ${city}` : name;
}
