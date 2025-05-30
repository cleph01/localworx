// components/profile/UserProfileHeader.tsx

import { nip19 } from "nostr-tools";

type Props = {
  npub: string;
  profile: {
    name?: string;
    picture?: string;
    about?: string;
  };
};

export default function UserProfileHeader({ npub, profile }: Props) {
  return (
    <header className="flex flex-col items-center gap-4 border-b border-gray-3  00 pb-4">
      {profile.picture ? (
        <div className="aspect-square rounded-full bg-base-100 flex items-center justify-center select-none relative w-64 h-64">
          <div className="w-full rounded-full overflow-hidden aspect-square not-prose">
            <img
              src={profile.picture}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="h-16 w-16 rounded-full bg-gray-500" />
      )}

      <h1 className="text-2xl font-bold">
        {profile.name || npub.slice(0, 12) + "…"}
      </h1>
      {/* encode the raw pub key to npub prefixed version */}
      <p className="text-sm text-gray-400 line-clamp-[calc(var(--characters)/20)]">
        {nip19.npubEncode(npub)}
      </p>
      {profile.about && <p className="mt-2 text-gray-600">{profile.about}</p>}
    </header>
  );
}
