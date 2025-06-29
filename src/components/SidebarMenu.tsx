"use client";
import { useState } from "react";
import Link from "next/link";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-white text-green-700 border border-green-700 px-3 py-1 rounded-full text-sm shadow hover:bg-green-50 transition"
      >
        Menu
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-[#1a1a1a] shadow-xl z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col space-y-4 h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-green-700">Milo Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col space-y-3 mt-4 text-sm text-gray-800 dark:text-gray-200">
            <Link href="/" onClick={() => setIsOpen(false)}>🏠 Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>💚 About</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>📬 Contact</Link>
            <Link href="/terms" onClick={() => setIsOpen(false)}>📄 Terms</Link>
            <Link href="/privacy" onClick={() => setIsOpen(false)}>🔐 Privacy</Link>
          </nav>

          <div className="mt-auto text-xs text-gray-400">
            © 2025 Milo. All rights reserved.
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
