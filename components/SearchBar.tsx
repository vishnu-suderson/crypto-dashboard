// components/SearchBar.tsx
"use client";

import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 400);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      className="border p-2 w-full rounded-md"
      placeholder="Search by name or symbol..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
