"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils"; // optional utility for className joining
import  SearchBar  from "./SearchBar"; // Adjust the import path as necessary

export default function Navbar() {
  const pathname = usePathname();
const [query, setQuery] = useState("");
  const navItems = [
    { name: "Market", path: "/" },
    { name: "Watchlist", path: "/watchlist" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          CoinTracker
        </Link>
        <div className="flex gap-6">
          {navItems.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className={cn(
                "text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors",
                pathname === path && "font-semibold text-blue-600 dark:text-blue-400"
              )}
            >
              {name}
            </Link>
          ))}
            
<SearchBar onSearch={setQuery} />
        </div>
      </div>
    </nav>
  );
}
