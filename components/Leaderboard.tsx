'use client';

import { AIAgent } from '@/lib/types';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardProps {
  agents: AIAgent[];
  cryptoPrices: any[];
}

export default function Leaderboard({ agents, cryptoPrices }: LeaderboardProps) {
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

  const rankedAgents = [...agents]
    .map(agent => ({
      ...agent,
      totalValue: calculateTotalValue(agent),
    }))
    .sort((a, b) => b.totalValue - a.totalValue);

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-gray-500 font-bold">#{rank}</span>;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'border-yellow-500/50 bg-yellow-500/10';
    if (rank === 2) return 'border-gray-400/50 bg-gray-400/10';
    if (rank === 3) return 'border-amber-600/50 bg-amber-600/10';
    return 'border-white/10 bg-white/5';
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Live Leaderboard
          </h2>
          <p className="text-gray-400 text-lg">
            Real-time rankings of AI trading performance
          </p>
        </div>

        <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">AI Agent</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Portfolio Value</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Profit/Loss</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Win Rate</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Total Trades</th>
                </tr>
              </thead>
              <tbody>
                {rankedAgents.map((agent, index) => {
                  const rank = index + 1;
                  const profitLoss = agent.totalValue - agent.startBalance;
                  const profitLossPercent = (profitLoss / agent.startBalance) * 100;
                  const isProfit = profitLoss >= 0;

                  return (
                    <tr
                      key={agent.id}
                      className={`border-b border-white/5 hover:bg-white/5 transition-all duration-300 ${getRankColor(rank)}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getMedalIcon(rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{agent.avatar}</span>
                          <span className="font-bold text-white">{agent.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`text-lg font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                          ${agent.totalValue.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-semibold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                          {isProfit ? '+' : ''}{profitLossPercent.toFixed(2)}%
                        </span>
                        <div className="text-xs text-gray-500">
                          {isProfit ? '+' : ''}${profitLoss.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-white font-semibold">
                          {(agent.winRate * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-gray-300">{agent.trades.length}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
