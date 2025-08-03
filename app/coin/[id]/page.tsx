import { fetchCoinDetails, fetchMarketChart } from "@/lib/api";
import Chart from "@/components/Chart";
import Image from "next/image";

type Props = {
  params: { id: string };
};

export default async function CoinDetail({ params }: Props) {
  const { id } = params;

  const coin = await fetchCoinDetails(id);
  const chart = await fetchMarketChart(id, 7);

  const market = coin.market_data;

  return (
    <main className="p-4 max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center gap-4">
        <Image src={coin.image.large} alt={coin.name} width={48} height={48} />
        <div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {coin.name} ({coin.symbol.toUpperCase()})
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Rank #{coin.market_cap_rank}
          </p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 space-y-2">
          <p className="text-sm text-gray-500">Current Price</p>
          <p className="text-xl font-semibold text-green-600 dark:text-green-400">
            ${market.current_price.usd.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 space-y-2">
          <p className="text-sm text-gray-500">Market Cap</p>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            ${market.market_cap.usd.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 space-y-2">
          <p className="text-sm text-gray-500">24h Volume</p>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            ${market.total_volume.usd.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 space-y-2">
          <p className="text-sm text-gray-500">Circulating Supply</p>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            {market.circulating_supply.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Price Chart (7 Days)
        </h2>
        <Chart data={chart.prices} />
      </div>
    </main>
  );
}
