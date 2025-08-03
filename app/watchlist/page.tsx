"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import CoinTable from "@/components/CoinTable";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useLocalStorage<string[]>("watchlist", []);
  const [coins, setCoins] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  // ⭐ Toggle watchlist handler
  const toggleWatchlist = (id: string) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((coinId) => coinId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (!watchlist.length) {
      setCoins([]);
      setLoading(false);
      return;
    }

    const fetchWatchlistCoins = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${watchlist.join(",")}`,
          {
            headers: {
              "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
            },
          }
        );
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        console.error("Failed to load watchlist coins:", err);
        setCoins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistCoins();
  }, [watchlist]);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">⭐ Watchlist</h1>

      {loading && <LoadingSkeleton />}

      {!loading && coins?.length === 0 && (
        <p className="text-gray-500">
          No coins saved yet. Go to the homepage and star your favorites.
        </p>
      )}

      {!loading && coins && coins.length > 0 && (
        <CoinTable
          coins={coins}
          watchlist={watchlist}
          toggleWatchlist={toggleWatchlist}
        />
      )}
    </main>
  );
}
