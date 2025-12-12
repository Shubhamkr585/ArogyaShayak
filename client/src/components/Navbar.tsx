"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, LogIn } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
// I'll use standard HTML button with Tailwind for now if UI component not present, but I'll try to stick to Shadcn pattern if I can.
// Since I haven't installed Shadcn components yet, I'll use raw Tailwind.

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">ArogyaShayak</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/hospitals" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
              Find Hospitals
            </Link>
            <Link href="/schemes" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
              Schemes
            </Link>
            <Link href="/stays" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
              Stays
            </Link>
            <Link href="/chat" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">
              AI Assistant
            </Link>
            
            <ModeToggle />

            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/hospitals" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800">
              Find Hospitals
            </Link>
            <Link href="/schemes" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800">
              Schemes
            </Link>
            <Link href="/stays" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800">
              Stays
            </Link>
            <Link href="/chat" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800">
              AI Assistant
            </Link>
            <div className="mt-4 flex flex-col space-y-2 px-3">
              <Link href="/auth/login">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md">
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
