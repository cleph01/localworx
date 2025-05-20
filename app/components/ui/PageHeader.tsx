"use client";

import { usePathname } from "next/navigation";
import headerValues from "../../lib/header/headerValues";

const PageHeader = () => {
  const pathname = usePathname(); // e.g. "/dashboard" or "/promoter/settings"

  const segments = pathname.split("/").filter(Boolean);
  const directory = segments[0]; // could be undefined or empty

  let title: keyof typeof headerValues | null = null;
  let contentKey: keyof typeof headerValues | null = null;

  if (!directory) {
    contentKey = "home";
    title = "home";
  } else {
    switch (directory) {
      case "/":
        contentKey = "home";
        title = "home";
        break;

      default:
        // Convert the directory name to a more readable format
        // e.g. "promoter-hub" becomes "Promoter Hub"
        const formattedKey = directory.split("-").join(" ");

        title = formattedKey as keyof typeof headerValues;
        // Convert the formatted key to a valid key for headerValues
        contentKey = title.split(" ").join("_") as keyof typeof headerValues;
        break;
    }
  }

  return (
    <section className="flex flex-col justify-center text-lg px-4">
      <p className="my-6 text-base capitalize">🟦 {title}</p>
      <h1 className="text-5xl sm:text-4xl md:text-5xl font-bold">
        <span className="font-serif italic">
          {contentKey &&
            headerValues[contentKey].headLine.substring(
              0,
              headerValues[contentKey].headLine.indexOf(" ")
            )}
        </span>{" "}
        <span className="capitalize">
          {contentKey &&
            headerValues[contentKey].headLine.substring(
              headerValues[contentKey].headLine.indexOf(" ") + 1
            )}
        </span>
      </h1>
      <h3 className="mt-2 text-lg sm:text-base md:text-lg text-gray-500">
        {contentKey && headerValues[contentKey].tagLine}
      </h3>
    </section>
  );
};

export default PageHeader;
