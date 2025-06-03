// components/profile/UserProfileHeader.tsx

import { nip19 } from "nostr-tools";
import CopyToClipboard from "../ui/CopyToClipboard";

type UserProfileHeaderProps = {
  profile: {
    name?: string;
    picture?: string;
    about?: string;
    pubkey: string;
  };
};

export default function UserProfileHeader({ profile }: UserProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-4 border-b border-gray-300 pb-4">
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
        {profile.name || profile.pubkey.slice(0, 12) + "…"}
      </h1>
      {/* encode the raw pub key to npub prefixed version */}
      <p className="text-sm text-gray-400 line-clamp-[calc(var(--characters)/20)]">
        {profile.pubkey.slice(0, 12) + "… "}
      </p>
      <CopyToClipboard
        toBeCopied={profile.pubkey}
        msg="Public key"
        css="mt-2 text-xs text-slate-600 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition duration-300"
      />
      {profile.about && <p className="mt-2 text-gray-600">{profile.about}</p>}
    </header>
  );
}
