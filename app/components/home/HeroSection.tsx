"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import VideoModal from "./VideoModal";

const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* Dark gradient hero banner */}
      <section
        className="w-full flex flex-col items-center justify-center px-6 py-20 text-center"
        style={{
          background:
            "linear-gradient(135deg, #091f36 0%, #0d2d50 60%, #0f3660 100%)",
        }}
      >
        <Image
          src="/localworx-logo.png"
          alt="LocalWorx"
          width={220}
          height={220}
          className="mb-8 drop-shadow-xl bg-white rounded-full p-1"
          priority
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
          The{" "}
          <span className="font-serif italic text-brand-orange">
            local economy
          </span>{" "}
          platform powered by Bitcoin
        </h1>

        <p className="text-white/70 text-lg max-w-xl mb-8">
          Connect with local businesses, earn Bitcoin for promoting your
          community, and take back your digital economy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/auth"
            className="px-8 py-3 bg-brand-orange text-white font-semibold rounded-xl hover:bg-orange-600 transition duration-300 shadow-lg"
          >
            Get Started — It&apos;s Free
          </Link>
          <button
            onClick={() => setVideoOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 text-white/80 hover:text-white border border-white/30 hover:border-white/60 rounded-xl transition duration-300"
          >
            <FaPlay className="text-brand-orange text-sm" />
            Watch how it works
          </button>
        </div>
      </section>

      {/* Copy section */}
      <section className="flex flex-col items-center justify-center text-lg px-6 py-12 max-w-4xl mx-auto text-center">
        <p className="text-gray-600 mb-4 text-xl">
          We are the{" "}
          <span className="font-bold text-foreground">Main Street First</span>{" "}
          platform that puts{" "}
          <span className="font-bold text-foreground">LOCAL</span> businesses
          ahead of global ones.
        </p>
        <p className="text-gray-500 mb-4">
          LocalWorx.io is a decentralized platform powered by{" "}
          <span className="font-semibold text-foreground">Lightning</span> and{" "}
          <span className="font-semibold text-foreground">Nostr</span>.
        </p>
        <p className="text-gray-500 mb-6">
          Fire up local economies through word-of-mouth marketing, decentralized
          social media, and Bitcoin micro-payments.
        </p>
        <p className="text-2xl font-bold">
          It&apos;s{" "}
          <span className="font-serif italic text-brand-orange">OUR</span> data,{" "}
          <span className="font-serif italic text-brand-orange">OUR</span>{" "}
          content,{" "}
          <span className="font-serif italic text-brand-orange">OUR</span>{" "}
          livelihood,{" "}
          <span className="font-serif italic text-brand-orange">OUR</span> money
        </p>
      </section>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
};

export default HeroSection;
