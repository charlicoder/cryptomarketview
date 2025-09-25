import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

// Type for CoinGecko search response
interface SearchCoin {
  id: string;
  name: string;
  symbol: string;
}

interface SearchResponse {
  coins: SearchCoin[];
}

// Type for CoinGecko market response
interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  [key: string]: unknown; // allow extra fields
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "market_cap_desc";

    let url = `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=${sortBy}&per_page=100&page=${page}&sparkline=false`;

    if (search) {
      // If searching, use the search endpoint first
      const searchUrl = `${COINGECKO_API_BASE}/search?query=${search}`;
      const searchResponse = await fetch(searchUrl);
      const searchData: SearchResponse = await searchResponse.json();

      if (searchData.coins && searchData.coins.length > 0) {
        const coinIds = searchData.coins
          .slice(0, 20)
          .map((coin) => coin.id)
          .join(",");
        url = `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&sparkline=false`;
      }
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `CoinGecko API responded with status: ${response.status}`
      );
    }

    const data: MarketCoin[] = await response.json();

    // Always ensure VANRY is first if it exists in the data
    if (!search) {
      const vanryIndex = data.findIndex(
        (coin) => coin.symbol.toLowerCase() === "vanry"
      );
      if (vanryIndex > 0) {
        const [vanry] = data.splice(vanryIndex, 1);
        data.unshift(vanry);
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error);
    return NextResponse.json(
      { error: "Failed to fetch cryptocurrency data" },
      { status: 500 }
    );
  }
}
