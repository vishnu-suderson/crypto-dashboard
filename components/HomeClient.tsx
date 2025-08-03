"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCoins } from "@/lib/api";
import CoinTableClient from "./CoinTableClient";
import type { Coin } from "@/types/coin";


export default function HomeClient() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = Number(pageParam || "1");

  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCoins = async () => {
      setLoading(true);
      try {
        const data = await fetchCoins(page);
        setCoins(data);
      } catch (e) {
        console.error("Failed to fetch coins:", e);
        setCoins([]);
      } finally {
        setLoading(false);
      }
    };

    loadCoins();
  }, [page]);

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        🪙 Crypto Markets
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
        {loading ? (
          <p className="text-center p-4 text-gray-500">Loading...</p>
        ) : (
          <CoinTableClient coins={coins} />
        )}
      </div>

      <div className="mt-8 flex justify-between items-center max-w-lg mx-auto gap-4">
        <Link
          href={`/?page=${page - 1}`}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            page <= 1
              ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          ← Previous
        </Link>

        <span className="text-gray-600 dark:text-gray-300 text-sm">
          Page {page}
        </span>

        <Link
          href={`/?page=${page + 1}`}
          className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Next →
        </Link>
      </div>
    </main>
  );
}
