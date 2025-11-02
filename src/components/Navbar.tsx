"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="text-white px-4 py-3">
      <div className="flex flex-row justify-between items-center">
        {/* Title */}
        <div className="text-lg font-bold">Repair Shop</div>
        
        {/* Burger */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>

        {/* Links - Desktop */}
        <ul className="hidden md:flex md:items-center md:space-x-6">
          <li>
            <Link href="/devs">For devs</Link>
          </li>
          <li>
            <Link href="/tickets">Tickets</Link>
          </li>
        </ul>
      </div>

      {/* Links - Mobile */}
      {isMenuOpen && (
        <ul className="md:hidden mt-4 space-y-2">
          <li className="p-3">
            <Link href="/docs" onClick={() => setIsMenuOpen(false)}>Docs</Link>
          </li>
          <li className="p-3">
            <Link href="/tickets" onClick={() => setIsMenuOpen(false)}>Tickets</Link>
          </li>
          <li className="p-3">
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}