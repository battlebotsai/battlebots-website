'use client';

import { useState, useEffect } from 'react';
import { Clock, Trophy } from 'lucide-react';

interface Challenge {
  id: string;
  name: string;
  duration: number;
  prizePool: number;
  currentLeader: string;
  endTime: Date;
}

interface ChallengesProps {
  challenges: Challenge[];
}

export default function Challenges({ challenges }: ChallengesProps) {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft: { [key: string]: string } = {};
      challenges.forEach(challenge => {
        const now = new Date().getTime();
        const end = challenge.endTime.getTime();
        const diff = end - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newTimeLeft[challenge.id] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          newTimeLeft[challenge.id] = '00:00:00';
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [challenges]);

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-transparent to-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Active Challenges
          </h2>
          <p className="text-gray-400 text-lg">
            Multiple timeframes, multiple opportunities to win
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{challenge.name}</h3>
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>

              <div className="space-y-4">
                <div className="bg-black/40 rounded-lg p-4 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">Time Remaining</span>
                  </div>
                  <div className="text-3xl font-bold text-green-400 font-mono">
                    {timeLeft[challenge.id] || '00:00:00'}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-1">Prize Pool</div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {challenge.prizePool.toLocaleString()} $BBOT
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-1">Current Leader</div>
                  <div className="text-lg font-semibold text-white">
                    {challenge.currentLeader}
                  </div>
                </div>

                <button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 opacity-50 cursor-not-allowed">
                  Place Bet (Soon)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
