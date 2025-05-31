import { publishKind0Profile } from "../[pubkey]/profileService";

export async function publishProfileService({
  pubkey,
  privkey,
  profile,
}: {
  pubkey: string;
  privkey: string;
  profile: { name?: string; about?: string; picture?: string };
}) {
  return publishKind0Profile({
    pubkey,
    privkey,
    profile: {
      name: profile.name ?? "",
      about: profile.about,
      picture: profile.picture,
    },
  });
}
