"use client";

import Link from "next/link";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-navy-background text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 p-1 bg-white rounded">
            <Link href="/">
              <Image
                src="/localworx-text-only.svg" // Updated logo for LocalWorx
                alt="LocalWorx Logo"
                width={100}
                height={50}
              />
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden font-sans md:flex items-center space-x-8">
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
              href="/how-it-works"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              How It Works
            </Link>
            <Link
              href="/marketplace"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Marketplace
            </Link>
            <Link
              href="/businesses"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Businesses
            </Link>
            <Link
              href="/promoters"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Promoters
            </Link>
            <Link
              href="/contact"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Contact
            </Link>
            <Link
              href="/signup"
              className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md mt-4 md:mt-0 transition duration-300"
            >
              Join LocalWorx
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
              href="/how-it-works"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              How It Works
            </Link>
            <Link
              href="/marketplace"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Marketplace
            </Link>
            <Link
              href="/businesses"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Businesses
            </Link>
            <Link
              href="/promoters"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Promoters
            </Link>
            <Link
              href="/contact"
              className="block mt-4 md:mt-0 hover:text-blue-500 transition duration-300"
            >
              Contact
            </Link>
            <Link
              href="/signup"
              className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md mt-4 md:mt-0 transition duration-300"
            >
              Join LocalWorx
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
