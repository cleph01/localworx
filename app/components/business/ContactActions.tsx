"use client";

import { useState } from "react";
import { FaEnvelope, FaCopy, FaCheck } from "react-icons/fa";

type ContactActionsProps = {
  email: string;
};

const ContactActions = ({ email }: ContactActionsProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange text-white font-semibold rounded-xl hover:bg-orange-600 transition duration-300 shadow-sm text-sm"
      >
        <FaEnvelope className="h-4 w-4" />
        Reach Out
      </a>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-500 hover:border-brand-orange hover:text-brand-orange rounded-xl transition duration-300 text-sm"
        title={`Copy ${email}`}
      >
        {copied ? (
          <FaCheck className="h-4 w-4 text-green-500" />
        ) : (
          <FaCopy className="h-4 w-4" />
        )}
        {copied ? "Copied!" : "Copy email"}
      </button>
    </div>
  );
};

export default ContactActions;
