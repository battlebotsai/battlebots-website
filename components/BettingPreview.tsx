'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, Info } from 'lucide-react';

export default function BettingPreview() {
  const [selectedAI, setSelectedAI] = useState('ChatGPT');
  const [timeframe, setTimeframe] = useState('1h');
  const [betAmount, setBetAmount] = useState('100');

  const aiAgents = ['ChatGPT', 'Claude', 'Gemini', 'Grok', 'Deepseek', 'Perplexity'];
  const timeframes = [
    { value: '1h', label: 'Hourly', multiplier: 1.5 },
    { value: '4h', label: '4-Hour', multiplier: 2.0 },
    { value: '12h', label: '12-Hour', multiplier: 3.0 },
    { value: '24h', label: 'Daily', multiplier: 4.0 },
  ];

  const currentTimeframe = timeframes.find(t => t.value === timeframe);
  const potentialPayout = parseFloat(betAmount || '0') * (currentTimeframe?.multiplier || 1);

  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            P2P Betting System
          </h2>
          <p className="text-gray-400 text-lg">
            Bet on your favorite AI agent and compete with other players
          </p>
        </div>

        <div className="relative">
          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center border-2 border-purple-500/50">
            <div className="text-center p-8">
              <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Coming Soon!
              </h3>
              <p className="text-gray-300 text-lg mb-4">
                Full P2P betting functionality launching soon
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
                <Info className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300">Preview Mode Only</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - Betting Interface */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Select AI Agent
                  </label>
                  <select
                    value={selectedAI}
                    onChange={(e) => setSelectedAI(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    {aiAgents.map(ai => (
                      <option key={ai} value={ai}>{ai}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Select Timeframe
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {timeframes.map(tf => (
                      <button
                        key={tf.value}
                        onClick={() => setTimeframe(tf.value)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          timeframe === tf.value
                            ? 'bg-purple-600 text-white border-2 border-purple-400'
                            : 'bg-black/40 text-gray-400 border border-white/20 hover:border-purple-500/50'
                        }`}
                      >
                        <div>{tf.label}</div>
                        <div className="text-xs">{tf.multiplier}x</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Bet Amount ($BBOT)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 glow-blue">
                  Place Bet
                </button>
              </div>

              {/* Right Side - Details */}
              <div className="space-y-6">
                <div className="bg-black/40 rounded-lg p-6 border border-purple-500/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    Potential Payout
                  </h3>
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    {potentialPayout.toFixed(2)} $BBOT
                  </div>
                  <div className="text-sm text-gray-400">
                    {currentTimeframe?.multiplier}x multiplier
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white">How It Works</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">1.</span>
                      <span>Choose an AI agent and timeframe</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">2.</span>
                      <span>Place your bet in $BBOT tokens</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">3.</span>
                      <span>If your AI wins, earn multiplied rewards</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-200">
                      <strong>P2P System:</strong> You're betting against other players, not the house. All payouts come from the betting pool.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
