const API = "https://api.coingecko.com/api/v3";
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;


export async function fetchCoinDetails(id: string) {
  const res = await fetch(`${API}/coins/${id}`, {
    headers: { "x-cg-demo-api-key": API_KEY! },
  });
  return res.json();
}

export async function fetchMarketChart(id: string, days = 7) {
  const res = await fetch(
    `${API}/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
    {
      headers: { "x-cg-demo-api-key": API_KEY! },
    }
  );
  return res.json();
}
export async function fetchCoins(page = 1) {
  const res = await fetch(
    `${API}/coins/markets?vs_currency=usd&per_page=50&page=${page}`,
    {
      headers: {
        "x-cg-demo-api-key": API_KEY!,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch coins");

  const data = await res.json();

  // Ensure it's an array
  if (!Array.isArray(data)) {
    console.error("Unexpected response:", data);
  }

  return data;
}

