"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { FaBars, FaRegWindowClose } from "react-icons/fa";
import { useNostrUser } from "@/app/context/NostrUserContext";
import ProfileStatus from "./ProfileStatus";

const NAV_LINKS = [
  { href: "/services-directory", label: "Services" },
  { href: "/promotions", label: "Promotions" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/posts", label: "Community" },
  { href: "/about", label: "About" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useNostrUser();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="bg-navy-blue-background text-white shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/localworx-text-only.svg"
              alt="LocalWorx"
              width={140}
              height={36}
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "text-brand-orange"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <ProfileStatus user={user} css="flex-row gap-2" />
            ) : (
              <Link
                href="/auth"
                className="bg-brand-orange hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Join LocalWorx
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/80 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaRegWindowClose className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-navy-blue-background">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "text-brand-orange bg-white/5"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10 mt-2 flex flex-col gap-2">
              {user ? (
                <ProfileStatus user={user} css="flex-col gap-2" />
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-brand-orange hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Join LocalWorx
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
