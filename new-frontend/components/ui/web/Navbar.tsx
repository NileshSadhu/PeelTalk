"use client";
import Link from "next/link";
import { useState } from "react";

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-[#FFF872] shadow-md">
        <div className="w-full px-15 py-4 flex items-center justify-between">
            <div className="flex items-center">
            <img
                src="https://www.peeltalk.live/assets/logo-BZrFWz77.png"
                alt="peetalk logo"
                className="h-15"
            />
            </div>
            <ul className="hidden md:flex gap-8 font-medium items-center">
            <li className="hover:text-[#653516] hover:font-bold text-[#653516] cursor-pointer">
                Home
            </li>
            <li className="hover:text-[#653516] hover:font-bold text-[#653516] cursor-pointer">
                About
            </li>
            <li className="hover:text-[#653516] hover:font-bold text-[#653516] cursor-pointer">
                Blog
            </li>
            <li className="hover:text-[#653516] hover:font-bold text-[#653516] cursor-pointer">
                <Link href="documentation">Docs</Link>
            </li>
            <li className="hover:text-[#653516] hover:font-bold text-[#653516] cursor-pointer">
                Pricing
            </li>

            <li className="hover:text-[#653516] hover:font-bold text-[#653516] cursor-pointer">
                Contact
            </li>

            <li className="bg-[#653516] hover:bg-[#875d41] px-8 py-1 rounded text-white cursor-pointer">
                <Link href="/signup">Register</Link>
            </li>
            </ul>

            <button
            className="md:hidden text-3xl text-[#653516]"
            onClick={() => setOpen(!open)}
            >
            {open ? "✕" : "☰"}
            </button>
        </div>

        {open && (
            <ul className="md:hidden items-center flex flex-col gap-4 px-6 pb-4 font-medium">
            <li className="hover:text-[#653516] hover:font-bold  text-[#653516] cursor-pointer">
                Home
            </li>
            <li className="hover:text-[#653516] hover:font-bold  text-[#653516] cursor-pointer">
                About
            </li>
            <li className="hover:text-[#653516] hover:font-bold  text-[#653516] cursor-pointer">
                Blog
            </li>
            <li className="hover:text-[#653516] hover:font-bold  text-[#653516] cursor-pointer">
                Docs
            </li>
            <li className="hover:text-[#653516] hover:font-bold  text-[#653516] cursor-pointer">
                Pricing
            </li>
            <li className="hover:text-[#653516] hover:font-bold  text-[#653516] cursor-pointer">
                Contact
            </li>
            </ul>
        )}
        </nav>
    );
}

export default Navbar;
