"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="text-white px-4 py-3 flex justify-between items-center">
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png" // Replace with your logo path in public folder
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-lg font-bold">Repair Shop</span>
      </div>

      {/* Hamburger for small screens */}
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>

      {/* Links */}
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-[60px] left-0 w-full md:bg-transparent md:static md:flex md:items-center md:space-x-6`}
      >
        <li className="p-3 md:p-0">
          <Link href="/">Home</Link>
        </li>
        <li className="p-3 md:p-0">
          <Link href="/about">About</Link>
        </li>
        <li className="p-3 md:p-0">
          <Link href="/login">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}
