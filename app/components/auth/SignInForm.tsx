"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useNostrUser } from "@/app/context/NostrUserContext";
import Card from "../ui/Card";

export default function SignInForm() {
  const [nsec, setNsec] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { signIn } = useNostrUser();

  const handleSignIn = async () => {
    setLoading(true);
    const success = await signIn(nsec);
    if (success) router.push("/dashboard");
    setLoading(false);
  };

  return (
    <Card
      Header={<SignInHeader />}
      Content={
        <SignInContent
          nsec={nsec}
          setNsec={setNsec}
          error={error}
          success={success}
        />
      }
      Footer={<SignInFooter handleSignIn={handleSignIn} loading={loading} />}
      css="w-full max-w-sm"
    />
  );
}

const SignInHeader = () => (
  <div className="flex flex-col items-center">
    <img className="w-20 h-20" src="/localworx-logo.svg" alt="logo" />
    <h3 className="text-xl my-2">Welcome Back</h3>
  </div>
);

/**
 *
 * SignInContent
 */

type SignInContentProps = {
  nsec: string;
  setNsec: (value: string) => void;
  error?: string;
  success?: boolean;
};

const SignInContent = ({
  nsec,
  setNsec,
  error,
  success,
}: SignInContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter your nsec (private key)"
        value={nsec}
        onChange={(e) => setNsec(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="text-sm text-green-600">Signed in successfully!</p>
      )}
    </div>
  );
};

/**
 *
 * SignInFooter
 */

type SignInFooterProps = {
  handleSignIn: () => void;
  loading: boolean;
};

const SignInFooter = ({ handleSignIn, loading }: SignInFooterProps) => {
  return (
    <button
      onClick={handleSignIn}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      disabled={loading}
    >
      {!loading ? "Sign In" : "...loading"}
    </button>
  );
};
