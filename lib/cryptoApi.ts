import { CryptoPrice, CRYPTOCURRENCIES } from './types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  try {
    const ids = CRYPTOCURRENCIES.map(c => c.id).join(',');
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false`,
      { next: { revalidate: 60 } } // Cache for 60 seconds
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }
    
    const data = await response.json();
    return data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      image: coin.image,
    }));
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    // Return mock data as fallback
    return CRYPTOCURRENCIES.map(crypto => ({
      id: crypto.id,
      symbol: crypto.symbol,
      name: crypto.name,
      current_price: Math.random() * 50000 + 100,
      price_change_percentage_24h: (Math.random() - 0.5) * 20,
      market_cap: Math.random() * 1000000000,
    }));
  }
}

export function getMockPrices(): CryptoPrice[] {
  return CRYPTOCURRENCIES.map(crypto => ({
    id: crypto.id,
    symbol: crypto.symbol,
    name: crypto.name,
    current_price: Math.random() * 50000 + 100,
    price_change_percentage_24h: (Math.random() - 0.5) * 20,
    market_cap: Math.random() * 1000000000,
  }));
}
