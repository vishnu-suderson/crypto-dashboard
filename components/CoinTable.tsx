"use client";

import Image from "next/image";
import Link from "next/link";

type CoinTableProps = {
  coins: any[];
  watchlist: string[];
  toggleWatchlist: (id: string) => void;
};

export default function CoinTable({ coins, watchlist, toggleWatchlist }: CoinTableProps) {
  return (
    <div className="overflow-x-auto rounded-md shadow border dark:border-gray-700">
      <table className="min-w-full table-auto text-sm bg-white dark:bg-gray-950">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs uppercase">
            <th className="p-3 text-left">★</th>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Coin</th>
            <th className="p-3 text-right">Price</th>
            <th className="p-3 text-right">24h %</th>
            <th className="p-3 text-right">Market Cap</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {coins.map((coin) => {
            const isWatched = watchlist.includes(coin.id);
            return (
              <tr
                key={coin.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <td
                  className="p-3 text-center cursor-pointer select-none text-lg"
                  onClick={() => toggleWatchlist(coin.id)}
                  title={isWatched ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                  {isWatched ? "⭐" : "☆"}
                </td>
                <td className="p-3">{coin.market_cap_rank}</td>
                <td className="p-3">
                  <Link
                    href={`/coin/${coin.id}`}
                    className="flex items-center gap-2 text-sm font-medium hover:underline"
                  >
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span>{coin.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({coin.symbol.toUpperCase()})
                    </span>
                  </Link>
                </td>
                <td className="p-3 text-right font-medium text-gray-800 dark:text-gray-200">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td
                  className={`p-3 text-right font-semibold ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="p-3 text-right text-gray-700 dark:text-gray-300">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
