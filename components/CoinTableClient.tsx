"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import CoinTable from "./CoinTable";
import type { Coin } from "@/types/coin";

export default function CoinTableClient({ coins }: { coins: Coin[] }) {
  const [watchlist, setWatchlist] = useLocalStorage<string[]>("watchlist", []);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Avoid hydration mismatch by delaying rendering
    return null;
  }

  const toggleWatchlist = (id: string) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((coinId) => coinId !== id) : [...prev, id]
    );
  };

  return (
    <CoinTable
      coins={coins}
      watchlist={watchlist}
      toggleWatchlist={toggleWatchlist}
    />
  );
}
