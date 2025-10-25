'use client';

import { CryptoPrice } from '@/lib/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceTickerProps {
  prices: CryptoPrice[];
}

export default function PriceTicker({ prices }: PriceTickerProps) {
  return (
    <div className="bg-black/50 backdrop-blur-md border-y border-white/10 py-4 overflow-hidden">
      <div className="animate-scroll">
        <div className="flex gap-8 whitespace-nowrap">
          {[...prices, ...prices].map((crypto, index) => (
            <div
              key={`${crypto.id}-${index}`}
              className="flex items-center gap-3 px-4"
            >
              <span className="font-bold text-white">{crypto.symbol}</span>
              <span className="text-xl font-semibold text-blue-400">
                ${crypto.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span
                className={`flex items-center gap-1 text-sm font-semibold ${
                  crypto.price_change_percentage_24h >= 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {crypto.price_change_percentage_24h >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
