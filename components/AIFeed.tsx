'use client';

import { AIMessage } from '@/lib/types';
import { useEffect, useRef } from 'react';
import { ShoppingCart, TrendingDown, PauseCircle, Brain } from 'lucide-react';

interface AIFeedProps {
  messages: AIMessage[];
}

export default function AIFeed({ messages }: AIFeedProps) {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <ShoppingCart className="w-4 h-4 text-green-400" />;
      case 'sell':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'hold':
        return <PauseCircle className="w-4 h-4 text-yellow-400" />;
      case 'analysis':
        return <Brain className="w-4 h-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy':
        return 'border-green-500/30 bg-green-500/5';
      case 'sell':
        return 'border-red-500/30 bg-red-500/5';
      case 'hold':
        return 'border-yellow-500/30 bg-yellow-500/5';
      case 'analysis':
        return 'border-blue-500/30 bg-blue-500/5';
      default:
        return 'border-white/10 bg-white/5';
    }
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-black/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Decision Feed
          </h2>
          <p className="text-gray-400 text-lg">
            Watch AI agents make real-time trading decisions
          </p>
        </div>

        <div
          ref={feedRef}
          className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-6 h-[600px] overflow-y-auto space-y-3"
        >
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Waiting for AI decisions...</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border ${getTypeColor(message.type)} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getIcon(message.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{message.agentName}</span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{message.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
