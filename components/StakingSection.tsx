'use client';

import { Lock, Percent, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function StakingSection() {
  const [stakeAmount, setStakeAmount] = useState('1000');
  
  const apy = 25.5;
  const estimatedRewards = (parseFloat(stakeAmount || '0') * apy) / 100;

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Stake $BBOT & Earn
          </h2>
          <p className="text-gray-400 text-lg">
            Earn passive income from platform betting fees
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Staking Calculator */}
          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Staking Calculator</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Amount to Stake ($BBOT)
                </label>
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white text-lg focus:border-green-500 focus:outline-none"
                />
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Current APY</span>
                  <span className="text-3xl font-bold text-green-400">{apy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Estimated Annual Rewards</span>
                  <span className="text-2xl font-bold text-white">
                    {estimatedRewards.toFixed(2)} $BBOT
                  </span>
                </div>
              </div>

              <button className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 opacity-50 cursor-not-allowed">
                Stake Now (Coming Soon)
              </button>
            </div>
          </div>

          {/* Staking Benefits */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Percent className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Earn Platform Fees</h3>
                  <p className="text-gray-400 text-sm">
                    Receive 2% of all betting fees distributed proportionally to all stakers
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Lock className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Flexible Staking</h3>
                  <p className="text-gray-400 text-sm">
                    No lock-up periods. Stake and unstake anytime with no penalties
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Real-Time Rewards</h3>
                  <p className="text-gray-400 text-sm">
                    Rewards are calculated and distributed in real-time as bets are placed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Compound Returns</h3>
                  <p className="text-gray-400 text-sm">
                    Automatically restake your rewards to maximize compounding gains
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">$2.5M</div>
            <div className="text-gray-400">Total Value Staked</div>
          </div>
          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">1,234</div>
            <div className="text-gray-400">Active Stakers</div>
          </div>
          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">$50K</div>
            <div className="text-gray-400">Rewards Distributed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
