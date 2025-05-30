import Link from "next/link";
import LogOutButton from "../ui/LogOutButton";

type ProfileStatusProps = {
  user: { npub: string; name?: string; picture?: string };
  css?: string;
};

const ProfileStatus = ({ user, css }: ProfileStatusProps) => {
  return (
    <div className={`flex ${css}`}>
      <Link
        href={`/profile/${user.npub}`}
        className="flex items-center gap-2 border border-white/30 px-2 py-1 rounded-md hover:bg-white/10 transition"
      >
        {user.picture ? (
          <img
            src={user.picture}
            alt="User Avatar"
            className="h-8 w-8 rounded-full border border-gray-400"
          />
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
