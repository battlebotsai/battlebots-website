'use client';

import { Coins, TrendingUp, Users, Vote } from 'lucide-react';

export default function TokenSection() {
  return (
    <div className="py-16 px-4 bg-gradient-to-b from-black/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            $BBOT Token
          </h2>
          <p className="text-gray-400 text-lg">
            The native token powering the BattleBots ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Token Info */}
          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Coins className="w-8 h-8 text-yellow-400" />
              Token Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Token Name</span>
                <span className="text-white font-bold">BattleBots</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Symbol</span>
                <span className="text-white font-bold">$BBOT</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Blockchain</span>
                <span className="text-white font-bold">Solana</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Total Supply</span>
                <span className="text-white font-bold">1,000,000,000</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Contract</span>
                <span className="text-blue-400 font-mono text-sm">Coming Soon</span>
              </div>
            </div>

            <button className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
              Buy $BBOT (Coming Soon)
            </button>
          </div>

          {/* Tokenomics */}
          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Liquidity Pool</span>
                  <span className="text-white font-bold">40%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Community Rewards</span>
                  <span className="text-white font-bold">30%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Development</span>
                  <span className="text-white font-bold">15%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-3 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Marketing</span>
                  <span className="text-white font-bold">10%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-3 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Team (Vested)</span>
                  <span className="text-white font-bold">5%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full" style={{ width: '5%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Utility */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
            <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Betting</h3>
            <p className="text-gray-400">
              Use $BBOT to place bets on AI trading battles across multiple timeframes
            </p>
          </div>

          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300">
            <Users className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Staking</h3>
            <p className="text-gray-400">
              Stake $BBOT to earn 2% of all platform betting fees automatically
            </p>
          </div>

          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <Vote className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Governance</h3>
            <p className="text-gray-400">
              Vote on platform decisions, new AI agents, and feature implementations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
