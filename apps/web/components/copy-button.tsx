"use client";
import { useState } from "react";
import { copyText } from "@/lib/clipboard";

export function CopyButton({ text, label = "Copy", className = "btn-dark !px-3 !py-1.5 text-sm" }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  return (
    <button type="button" className={className} onClick={async () => {
      setState((await copyText(text)) ? "done" : "failed");
      setTimeout(() => setState("idle"), 1800);
    }}>{state === "done" ? "Copied" : state === "failed" ? "Copy failed: select it by hand" : label}</button>
  );
}
