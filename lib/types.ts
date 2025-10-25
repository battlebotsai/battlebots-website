export interface AIAgent {
  id: string;
  name: string;
  avatar: string;
  balance: number;
  startBalance: number;
  targetBalance: number;
  portfolio: Portfolio;
  portfolioValue: number;
  trades: Trade[];
  totalTrades: number;
  winningTrades: number;
  winRate: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Portfolio {
  [crypto: string]: {
    amount: number;
    value: number;
  };
}

export interface Trade {
  id: string;
  agentId: string;
  crypto: string;
  action: 'buy' | 'sell' | 'hold';
  amount: number;
  price: number;
  timestamp: Date;
}

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image?: string;
}

export interface AIMessage {
  id: string;
  agentName: string;
  message: string;
  timestamp: Date;
  type: 'buy' | 'sell' | 'hold' | 'analysis';
}

export interface Challenge {
  id: string;
  name: string;
  duration: number; // in seconds
  prizePool: number;
  currentLeader: string;
  endTime: Date;
}

export const AI_AGENTS = [
  'ChatGPT',
  'Claude',
  'Gemini',
  'Grok',
  'Deepseek',
  'Perplexity'
];

export const CRYPTOCURRENCIES = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'tron', symbol: 'TRX', name: 'Tron' },
  { id: 'hyperliquid', symbol: 'HYPE', name: 'Hyperliquid' },
  { id: 'xai', symbol: 'XAI', name: 'XAI' },
  { id: 'bittensor', symbol: 'TAO', name: 'Bittensor' },
  { id: 'aster', symbol: 'ASTER', name: 'Aster' },
];

export const AI_AVATARS: { [key: string]: string } = {
  'ChatGPT': '🤖',
  'Claude': '🧠',
  'Gemini': '💎',
  'Grok': '⚡',
  'Deepseek': '🔍',
  'Perplexity': '🎯'
};
