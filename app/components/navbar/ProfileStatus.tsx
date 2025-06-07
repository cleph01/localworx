import Link from "next/link";
import LogOutButton from "../ui/LogOutButton";
import AvatarWrapper from "../ui/AvatarWrapper";

type ProfileStatusProps = {
  user: { npub: string; name?: string; picture?: string };
  css?: string;
};

const ProfileStatus = ({ user, css }: ProfileStatusProps) => {
  return (
    <div className={`flex ${css}`}>
      <Link
        href="/profile/me"
        className="flex items-center gap-2 border border-white/30 px-2 py-1 rounded-md hover:bg-white/10 transition"
      >
        {user.picture ? (
          <AvatarWrapper css="h-8 w-8">
            <img
              src={user.picture}
              alt="User Avatar"
              className="w-full h-full object-cover ring-2 ring-white shadow-md"
            />
          </AvatarWrapper>
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-500" />
        )}
        <span className="text-sm font-medium">
          {user.name || `${user.npub.slice(0, 12)}…`}
        </span>
      </Link>
      <LogOutButton />
    </div>
  );
};

export default ProfileStatus;
