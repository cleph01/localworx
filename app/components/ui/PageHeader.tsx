"use client";

import { usePathname } from "next/navigation";
import headerValues from "../../lib/header/headerValues";

const PageHeader = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const directory = segments[0];

  let contentKey: keyof typeof headerValues | null = null;

  if (!directory) {
    contentKey = "home";
  } else {
    const formattedKey = directory.split("-").join("_") as keyof typeof headerValues;
    contentKey = formattedKey in headerValues ? formattedKey : null;
  }

  if (!contentKey) return null;

  const { headLine, tagLine } = headerValues[contentKey];
  const [firstWord, ...rest] = headLine.split(" ");

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-6 pt-10 pb-6">
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
        <span className="font-serif italic text-brand-orange">{firstWord}</span>{" "}
        <span>{rest.join(" ")}</span>
      </h1>
      <p className="mt-3 text-base text-gray-500 max-w-xl">{tagLine}</p>
    </section>
  );
};

export default PageHeader;
