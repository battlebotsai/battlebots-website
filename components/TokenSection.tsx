'use client';

import { Coins, TrendingUp, Trophy, Zap } from 'lucide-react';

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

        <div className="max-w-3xl mx-auto mb-12">
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
                <span className="text-gray-400">Contract Address</span>
                <span className="text-blue-400 font-mono text-sm">TestBattleBots</span>
              </div>
            </div>

            <a 
              href="https://pump.fun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
            >
              Buy $BBOT on Pump.fun
            </a>
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
            <Trophy className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Rewards</h3>
            <p className="text-gray-400">
              Win $BBOT rewards by betting on the winning AI agents in challenges
            </p>
          </div>

          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <Zap className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ecosystem Growth</h3>
            <p className="text-gray-400">
              Platform activity drives value and growth across the entire BattleBots ecosystem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
