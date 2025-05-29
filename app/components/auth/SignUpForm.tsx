"use client";

import { useState } from "react";
import Card from "../ui/Card";

export default function SignUpForm() {
  type UserKeys = {
    pubkey: string;
    privkey: string;
  };

  const [username, setUsername] = useState<string>("");
  const [userKeys, setUserKeys] = useState<UserKeys | null>(null);

  //   {
  //     pubkey: "ljfsajfljslfslfjjflsjfdllalkdjdf",
  //     privkey: "asjflsjflsjdljslfjlsjflsjflksdl",
  //   }

  const handleSignUp = async () => {
    const res = await fetch("/api/nostr/keys", {
      method: "POST",
    });

    const data = await res.json();
    if (data.pubkey && data.privkey) {
      localStorage.setItem("nsec", data.privkey);
      localStorage.setItem("npub", data.pubkey);
      setUserKeys(data);
      //
      localStorage.set("isAuth", true);
    }
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
      Footer={<SignUpFooter handleSignUp={handleSignUp} userKeys={userKeys} />}
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
    <button
      onClick={handleSignUp}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
    >
      Generate Nostr Keys & Sign Up
    </button>
  );
};
