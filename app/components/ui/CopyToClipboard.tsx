"use client";

import { toast } from "react-toastify";

const CopyToClipboard = ({
  toBeCopied,
  msg,
  css,
}: {
  toBeCopied: string;
  msg: string;
  css: string;
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(toBeCopied);

      toast.success(`${msg} copied to clipboard!`);
    } catch (err: any) {
      toast.error(`Failed to copy ${msg}: `, err);
    }
  };

  return (
    <div className="flex flex-col items-center my-2 cursor-pointer">
      <button onClick={handleCopy} className={css}>
        📋 Copy {msg}
      </button>
    </div>
  );
};
export default CopyToClipboard;
// This component provides a button to copy text to the clipboard.
// It uses the Clipboard API to write the text and provides feedback on success or failure.
// Usage example:
// <CopyToClipboard text="Some text to copy" />

// className="mt-2 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition duration-300"
