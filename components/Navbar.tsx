"use client"

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon  } from "@heroicons/react/24/outline"; // optional for mobile menu

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1F7A3F] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <div className="shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold">KhetConnect</h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
             
            <div className="flex gap-6">
            <Link
              href="/auth/login"
              className="hover:text-[#F4C430] font-semibold underline"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="bg-[#F4C430] text-black px-4 py-1 rounded font-bold hover:bg-yellow-500 transition"
            >
              Register
            </Link>
            </div>
            </div>
         

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon  className="h-6 w-6 text-white" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1F7A3F] px-2 pt-2 pb-4 space-y-1">
          {/* <Link
            href="/"
            className="block text-white hover:text-[#F4C430] font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/how-it-works"
            className="block text-white hover:text-[#F4C430] font-medium"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/crops"
            className="block text-white hover:text-[#F4C430] font-medium"
            onClick={() => setIsOpen(false)}
          >
            Browse Crops
          </Link> */}
          <Link
            href="/auth/login"
            className="block text-white hover:text-[#F4C430] font-semibold underline"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="block bg-[#F4C430] text-black px-4 py-1 rounded font-bold hover:bg-yellow-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
