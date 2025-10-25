'use client';

import { AIAgent } from '@/lib/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AIBattleDisplayProps {
  agents: AIAgent[];
  cryptoPrices: any[];
}

export default function AIBattleDisplay({ agents, cryptoPrices }: AIBattleDisplayProps) {
  const calculateTotalValue = (agent: AIAgent) => {
    let total = agent.balance;
    Object.entries(agent.portfolio).forEach(([symbol, holding]) => {
      const crypto = cryptoPrices.find(c => c.symbol === symbol);
      if (crypto) {
        total += holding.amount * crypto.current_price;
      }
    });
    return total;
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Live AI Trading Battle
          </h2>
          <p className="text-gray-400 text-lg">
            6 AI agents competing to turn $1,000 into $10,000
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const totalValue = calculateTotalValue(agent);
            const progress = ((totalValue - agent.startBalance) / (agent.targetBalance - agent.startBalance)) * 100;
            const isProfit = totalValue >= agent.startBalance;
            
            return (
              <div
                key={agent.id}
                className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{agent.avatar}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                      <p className="text-sm text-gray-400">AI Agent</p>
                    </div>
                  </div>
                  {isProfit ? (
                    <TrendingUp className="text-green-400 w-6 h-6" />
                  ) : (
                    <TrendingDown className="text-red-400 w-6 h-6" />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Portfolio Value</span>
                    <span className={`text-2xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                      ${totalValue.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Cash Balance</span>
                    <span className="text-white font-semibold">${agent.balance.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Profit/Loss</span>
                    <span className={`font-semibold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                      {isProfit ? '+' : ''}{agent.profitLossPercent.toFixed(2)}%
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress to $10,000</span>
                      <span>{Math.max(0, Math.min(100, progress)).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isProfit
                            ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                            : 'bg-gradient-to-r from-red-500 to-rose-400'
                        }`}
                        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs text-gray-400 mb-2">Current Holdings:</p>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {Object.keys(agent.portfolio).length > 0 ? (
                        Object.entries(agent.portfolio).map(([symbol, holding]) => (
                          <div key={symbol} className="flex justify-between text-xs">
                            <span className="text-blue-400">{symbol}</span>
                            <span className="text-gray-300">{holding.amount.toFixed(4)}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 italic">No positions yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
