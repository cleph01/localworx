"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNostrUser } from "@/app/context/NostrUserContext";
import Card from "../ui/Card";

export default function SignUpForm() {
  const [username, setUsername] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [userKeys, setUserKeys] = useState<{
    pubkey: string;
    privkey: string;
  } | null>(null);

  const router = useRouter();

  const { signUp } = useNostrUser();

  const handleSignUp = async () => {
    setGenerating(true);
    // const keys = await signUp();
    // if (keys) {
    //   setUserKeys(keys);
    //   router.push("/dashboard");
    // }
    console.log("Test Sign Up");

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
        />
      }
      Footer={
        <SignUpFooter
          handleSignUp={handleSignUp}
          userKeys={userKeys}
          generating={generating}
        />
      }
      css="w-full max-w-sm"
    />
  );
}

/**
 *
 * SignUpHeader
 *
 */
const SignUpHeader = () => {
  return (
    <div className="flex flex-col items-center">
      <img className="w-20 h-20" src="/localworx-logo.svg" alt="logo" />
      <h3 className="text-xl my-2">Create a Nostr Account</h3>
      <p className="text-sm text-gray-600 mt-2">
        By creating a Nostr account, you are taking control of your digital
        identity—no central authority, no gatekeepers. This empowers you with
        true digital sovereignty and supports a decentralized internet.
      </p>
    </div>
  );
};

/**
 *
 * SignUpContent
 *
 */

type SignUpContentProps = {
  username: string;
  setUsername: (value: string) => void;
  userKeys: {
    pubkey: string;
    privkey: string;
  } | null;
};
const SignUpContent = ({
  username,
  setUsername,
  userKeys,
}: SignUpContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center  gap-2">
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
            <strong>Public Key (npub):</strong> {userKeys.pubkey}
          </p>
          <div className="mt-2">
            <p>
              <strong>Private Key (nsec):</strong> {userKeys.privkey}
            </p>
            <div className="flex flex-col items-center mt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(userKeys.privkey);
                }}
                className="mt-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
              >
                📋 Copy Private Key
              </button>
            </div>
            <p className="mt-2 text-red-600 text-center">
              ⚠️ Save your private key somewhere safe!
            </p>
            <p className="mt-2 text-red-600 text-center">
              You cannot recover it if lost!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface SignUpFooterProps {
  handleSignUp: () => void;
  userKeys: {
    pubkey: string;
    privkey: string;
  } | null;
  generating: boolean;
}

/**
 *
 * SignUpFooter
 *
 */
const SignUpFooter = ({ handleSignUp, userKeys }: SignUpFooterProps) => {
  return userKeys ? (
    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
      Nsec Saved! Continue to Dashboard
    </button>
  ) : (
    <>
      <button
        onClick={handleSignUp}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        disabled={true}
      >
        Generate Nostr Keys & Sign Up
      </button>
      <p className="text-xs text-red-500 text-center mt-2">
        Button Disabled While in Development
      </p>
    </>
  );
};
