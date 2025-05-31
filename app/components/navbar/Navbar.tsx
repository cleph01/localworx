"use client";

import Link from "next/link";

import React, { useState } from "react";
import Image from "next/image";
import { FaBars, FaRegWindowClose } from "react-icons/fa";
import CartIcon from "../ui/CartIcon";
import { useNostrUser } from "@/app/context/NostrUserContext";

import ProfileStatus from "./ProfileStatus";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { user } = useNostrUser();

  return (
    <nav className="bg-navy-blue-background text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 p-1">
            <Link href="/">
              <Image
                src="/localworx-text-only.svg" // Updated logo for LocalWorx
                alt="LocalWorx Logo"
                width={150}
                height={75}
              />
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              About
            </Link>
            <Link
              href="/services-directory"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Services Directory
            </Link>
            <Link
              href="/marketplace"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Marketplace
            </Link>
            <Link
              href="/promotions"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Promotions
            </Link>
            {/* <Link
              href="/promoter-hub"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Promoter Hub
            </Link> */}
            {/* <Link
              href="/help"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Help
            </Link> */}
            {/* Cart Icon */}
            <CartIcon />
            {/* TODO: should push to Dashboard - Next-Auth will pick up and for signin 
            Should probably use useSession() in the Navbar to toggle "Join LocalWorx" vs. "Signin"
            Which will automatically push to dashboard and pick up the fact that a session is detected
            */}

            {/* User Profile Avatar or Join Button */}
            {user ? (
              <ProfileStatus user={user} css="flex-row gap-2" />
            ) : (
              <Link
                href="/auth"
                className="text-center block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md mt-4 md:mt-0 transition duration-300"
              >
                Join LocalWorx
              </Link>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <FaRegWindowClose className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900">
          <div className="px-3 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              About
            </Link>
            <Link
              href="/services-directory"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Services Directory
            </Link>
            <Link
              href="/marketplace"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Marketplace
            </Link>
            <Link
              href="/promotions"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Promotions
            </Link>
            {/* <Link
              href="/promoter-hub"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Promoter Hub
            </Link> */}
            {/* <Link
              href="/help"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Help
            </Link> */}
            {/* Cart Icon */}
            <div className="my-4">
              <CartIcon />
            </div>

            {/* Profile Avatar or Join Button */}
            {user ? (
              <ProfileStatus user={user} css="flex-col gap-2" />
            ) : (
              <Link
                href="/auth"
                className="text-center block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md mt-4 md:mt-0 transition duration-300"
              >
                Join LocalWorx
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
