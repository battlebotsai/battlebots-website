// Updated: Sat Oct 25 19:19:28 UTC 2025 - AIAgent interface includes database operation properties
// Properties added: portfolioValue, totalTrades, winningTrades for tracking agent performance
Here's the result of running `cat -n` on /home/ubuntu/battlebots_website/lib/types.ts:
     1	export interface AIAgent {
     2	  id: string;
     3	  name: string;
     4	  avatar: string;
     5	  balance: number;
     6	  startBalance: number;
     7	  targetBalance: number;
     8	  portfolio: Portfolio;
     9	  portfolioValue: number;
    10	  trades: Trade[];
    11	  totalTrades: number;
    12	  winningTrades: number;
    13	  winRate: number;
    14	  profitLoss: number;
    15	  profitLossPercent: number;
    16	}
    17	
    18	export interface Portfolio {
    19	  [crypto: string]: {
    20	    amount: number;
    21	    value: number;
    22	  };
    23	}
    24	
    25	export interface Trade {
    26	  id: string;
    27	  agentId: string;
    28	  crypto: string;
    29	  action: 'buy' | 'sell' | 'hold';
    30	  amount: number;
    31	  price: number;
    32	  timestamp: Date;
    33	}
    34	
    35	export interface CryptoPrice {
    36	  id: string;
    37	  symbol: string;
    38	  name: string;
    39	  current_price: number;
    40	  price_change_percentage_24h: number;
    41	  market_cap: number;
    42	  image?: string;
    43	}
    44	
    45	export interface AIMessage {
    46	  id: string;
    47	  agentName: string;
    48	  message: string;
    49	  timestamp: Date;
    50	  type: 'buy' | 'sell' | 'hold' | 'analysis';
    51	}
    52	
    53	export interface Challenge {
    54	  id: string;
    55	  name: string;
    56	  duration: number; // in seconds
    57	  prizePool: number;
    58	  currentLeader: string;
    59	  endTime: Date;
    60	}
    61	
    62	export const AI_AGENTS = [
    63	  'ChatGPT',
    64	  'Claude',
    65	  'Gemini',
    66	  'Grok',
    67	  'Deepseek',
    68	  'Perplexity'
    69	];
    70	
    71	export const CRYPTOCURRENCIES = [
    72	  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
    73	  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    74	  { id: 'solana', symbol: 'SOL', name: 'Solana' },
    75	  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
    76	  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
    77	  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
    78	  { id: 'tron', symbol: 'TRX', name: 'Tron' },
    79	  { id: 'hyperliquid', symbol: 'HYPE', name: 'Hyperliquid' },
    80	  { id: 'xai', symbol: 'XAI', name: 'XAI' },
    81	  { id: 'bittensor', symbol: 'TAO', name: 'Bittensor' },
    82	  { id: 'aster', symbol: 'ASTER', name: 'Aster' },
    83	];
    84	
    85	export const AI_AVATARS: { [key: string]: string } = {
    86	  'ChatGPT': '🤖',
    87	  'Claude': '🧠',
    88	  'Gemini': '💎',
    89	  'Grok': '⚡',
    90	  'Deepseek': '🔍',
    91	  'Perplexity': '🎯'
    92	};
    93	