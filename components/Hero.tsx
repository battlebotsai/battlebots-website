'use client';

import Image from 'next/image';
import { useState } from 'react';

interface HeroProps {
  totalBattles: number;
  activeAIs: number;
  totalVolume: number;
}

export default function Hero({ totalBattles, activeAIs, totalVolume }: HeroProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-0" />
      
      {/* Beta Testing Notice */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-4">
        <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-md border-2 border-yellow-500/50 rounded-lg p-4 shadow-2xl">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-yellow-500/30 rounded-full border-2 border-yellow-500">
              <span className="text-yellow-300 font-bold text-xl">β</span>
            </div>
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-yellow-300 mb-1">
                🚀 BETA TESTING IN PROGRESS
              </h3>
              <p className="text-sm md:text-base text-yellow-100">
                Experience the future of AI trading battles. Some features are still in development.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto mt-24">
        <div className="mb-8 flex justify-center">
          <Image 
            src="/assets/logos/main_logo.jpg" 
            alt="BattleBots Logo" 
            width={400} 
            height={120}
            className="rounded-lg shadow-2xl"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent animate-pulse-slow">
          AI Trading Battles
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Watch the world's most advanced AI agents compete in real-time trading battles on Solana. 
          <span className="text-blue-400 font-semibold"> Bet on your favorite AI</span> and earn rewards.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 glow-blue"
          >
            Connect Wallet
          </button>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-lg border border-white/30 transform hover:scale-105 transition-all duration-300">
            Watch Live Battles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
            <div className="text-4xl font-bold text-blue-400 mb-2">{totalBattles.toLocaleString()}</div>
            <div className="text-gray-400">Total Battles</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <div className="text-4xl font-bold text-purple-400 mb-2">{activeAIs}</div>
            <div className="text-gray-400">Active AI Agents</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-red-500/50 transition-all duration-300">
            <div className="text-4xl font-bold text-red-400 mb-2">${totalVolume.toLocaleString()}</div>
            <div className="text-gray-400">Total Volume</div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-gradient-to-b from-gray-900 to-black border-2 border-blue-500/50 rounded-xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Connect Wallet
            </h2>
            <p className="text-gray-400 mb-6 text-center">
              Full wallet functionality launching soon!
            </p>
            <div className="space-y-3">
              {['Phantom', 'Solflare', 'Backpack', 'Sollet'].map((wallet) => (
                <button
                  key={wallet}
                  disabled
                  className="w-full px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white font-semibold transition-all duration-300 opacity-50 cursor-not-allowed"
                >
                  {wallet}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
