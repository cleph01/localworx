"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNostrUser } from "@/app/context/NostrUserContext";
import Card from "../ui/Card";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const [username, setUsername] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [userKeys, setUserKeys] = useState<{
    pubkey: string;
    privkey: string;
  } | null>(null);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const router = useRouter();
  const { signUp } = useNostrUser();

  const handleSignUp = async () => {
    setGenerating(true);
    if (!username.trim()) {
      toast.error("Name cannot be empty");
      setGenerating(false);
      return;
    }

    const keys = await signUp(username);
    if (keys) {
      // Save keys temporarily for display only
      setUserKeys(keys);
    }

    setGenerating(false);
  };

  return (
    <Card
      Header={<SignUpHeader />}
      Content={
        <SignUpContent
          username={username}
          setUsername={setUsername}
          userKeys={userKeys}
          hasConfirmed={hasConfirmed}
          setHasConfirmed={setHasConfirmed}
        />
      }
      Footer={
        <SignUpFooter
          handleSignUp={handleSignUp}
          userKeys={userKeys}
          generating={generating}
          hasConfirmed={hasConfirmed}
        />
      }
      css="w-full max-w-sm"
    />
  );
}

/**
 * SignUpHeader
 */
const SignUpHeader = () => (
  <div className="flex flex-col items-center">
    <img className="w-20 h-20" src="/localworx-logo.svg" alt="logo" />
    <h3 className="text-xl my-2">Create a Nostr Account</h3>
    <p className="text-sm text-gray-600 mt-2 text-center">
      By creating a Nostr account, you are taking control of your digital
      identity—no central authority, no gatekeepers. This empowers you with true
      digital sovereignty and supports a decentralized internet.
    </p>
  </div>
);

/**
 * SignUpContent
 */
type SignUpContentProps = {
  username: string;
  setUsername: (value: string) => void;
  userKeys: {
    pubkey: string;
    privkey: string;
  } | null;
  hasConfirmed: boolean;
  setHasConfirmed: (val: boolean) => void;
};

const SignUpContent = ({
  username,
  setUsername,
  userKeys,
  hasConfirmed,
  setHasConfirmed,
}: SignUpContentProps) => (
  <div className="flex flex-col items-center justify-center gap-2">
    {!userKeys && (
      <input
        type="text"
        placeholder="Enter your first name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded"
      />
    )}

    {userKeys && (
      <div className="bg-gray-100 p-4 rounded my-2 text-sm w-full">
        <p>
          <strong>Public Key (npub):</strong> {userKeys.pubkey.slice(0, 26)}...
        </p>
        <div className="flex flex-col items-center my-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(userKeys.pubkey);
              toast.success("Public key copied to clipboard!");
            }}
            className="mt-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
          >
            📋 Copy Public Key
          </button>
        </div>
        <div className="mt-2">
          <p>
            <strong>Private Key (nsec):</strong> {userKeys.privkey.slice(0, 26)}
            ...
          </p>
          <div className="flex flex-col items-center my-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(userKeys.privkey);
                toast.success("Private key copied to clipboard!");
              }}
              className="mt-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
            >
              📋 Copy Private Key
            </button>
          </div>
          <p className="mt-2 text-red-600 text-center">
            ⚠️ Save your private key somewhere safe!
          </p>
          <p className="text-red-600 text-center">
            You <strong>CANNOT</strong> recover it if lost!
          </p>
        </div>

        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={hasConfirmed}
              onChange={(e) => setHasConfirmed(e.target.checked)}
            />
            <span className="text-sm">
              I have saved my private key securely
            </span>
          </label>
        </div>
      </div>
    )}
  </div>
);

/**
 * SignUpFooter
 */
interface SignUpFooterProps {
  handleSignUp: () => void;
  userKeys: {
    pubkey: string;
    privkey: string;
  } | null;
  generating: boolean;
  hasConfirmed: boolean;
}

const SignUpFooter = ({
  handleSignUp,
  userKeys,
  generating,
  hasConfirmed,
}: SignUpFooterProps) => {
  const router = useRouter();

  return userKeys ? (
    <button
      onClick={() => router.push("/dashboard")}
      disabled={!hasConfirmed}
      className={`w-full py-2 rounded ${
        hasConfirmed
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-gray-400 text-white cursor-not-allowed"
      }`}
    >
      Continue to Dashboard
    </button>
  ) : (
    <button
      onClick={handleSignUp}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
      disabled={generating}
    >
      {!generating ? "Generate Nostr Keys & Sign Up" : "Generating..."}
    </button>
  );
};
