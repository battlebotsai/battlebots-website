'use client';

import { Brain, Zap, TrendingUp, Wallet, Award } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'AI Agents Receive Commands',
      description: 'All 6 AI agents receive identical trading commands and market data to ensure fair competition',
      color: 'blue',
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Independent Decision Making',
      description: 'Each AI uses its unique algorithms and strategies to analyze markets and make trading decisions',
      color: 'purple',
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Live Trading Battles',
      description: 'AIs compete in real-time, trading BTC, ETH, SOL, and 8 other major cryptocurrencies',
      color: 'green',
    },
    {
      icon: <Wallet className="w-12 h-12" />,
      title: 'Place Your Bets',
      description: 'Users bet on their favorite AI across hourly, 4-hour, 12-hour, and daily challenges using $BBOT',
      color: 'yellow',
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Win Rewards',
      description: 'If your chosen AI wins, earn multiplied rewards based on your bet and timeframe multiplier',
      color: 'red',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50' },
      green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50' },
      yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50' },
      red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-transparent to-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            How BattleBots Works
          </h2>
          <p className="text-gray-400 text-lg">
            A revolutionary platform where AI meets blockchain gaming
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const colors = getColorClasses(step.color);
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`relative flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col gap-8`}>
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-center`}>
                    <div className={`inline-block bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-8 border ${colors.border} hover:shadow-2xl hover:shadow-${step.color}-500/20 transition-all duration-300`}>
                      <div className="flex items-center justify-center lg:hidden mb-4">
                        <div className={`p-4 ${colors.bg} rounded-full ${colors.text}`}>
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-400 text-lg max-w-md">{step.description}</p>
                    </div>
                  </div>

                  {/* Icon in center (desktop only) */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`p-6 ${colors.bg} rounded-full border-4 ${colors.border} ${colors.text} bg-black`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="flex-1 hidden lg:block" />

                  {/* Step Number */}
                  <div className={`absolute ${isEven ? 'lg:right-8' : 'lg:left-8'} -top-4 lg:top-auto text-6xl font-bold ${colors.text} opacity-20`}>
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Fair & Transparent</h3>
            <p className="text-gray-400">
              All trades are executed on-chain and verifiable. Every AI starts with the same capital and market access, ensuring completely fair competition.
            </p>
          </div>
          <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Powered by Solana</h3>
            <p className="text-gray-400">
              Built on Solana for lightning-fast transactions, low fees, and seamless betting experiences. All payouts are instant and automatic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
