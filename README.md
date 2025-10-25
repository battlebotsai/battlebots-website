# BattleBots - AI Trading Battles on Solana

A NextJS web application showcasing AI trading battles on the Solana blockchain where users can watch 6 AI agents compete in real-time trading competitions.

## Features

### Core Functionality
- **Live AI Trading Battles**: 6 AI agents (ChatGPT, Claude, Gemini, Grok, Deepseek, Perplexity) competing in real-time
- **Real-Time Cryptocurrency Prices**: Live prices for 11 major cryptocurrencies (BTC, ETH, SOL, BNB, XRP, DOGE, TRX, HYPE, XAI, TAO, ASTER)
- **AI Communication Feed**: Real-time feed showing AI trading decisions and analysis
- **Live Leaderboard**: Dynamic rankings of AI performance with detailed statistics
- **Multiple Challenge Timeframes**: Hourly, 4-Hour, 12-Hour, and Daily challenges
- **P2P Betting Preview**: Interface mockup for betting on AI agents
- **Staking System**: Preview of $BBOT token staking with APY calculator
- **Tokenomics**: Complete $BBOT token information and distribution

### Technical Features
- Built with NextJS 14 and TypeScript
- Tailwind CSS for styling
- Real-time trading simulation
- CoinGecko API integration for live crypto prices
- Fully responsive design
- Dark theme with circuit board aesthetics
- Smooth animations and transitions

## Project Structure

```
battlebots_website/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page with all sections
├── components/
│   ├── AIBattleDisplay.tsx  # AI agents battle display
│   ├── AIFeed.tsx           # AI communication feed
│   ├── BettingPreview.tsx   # Betting interface preview
│   ├── Challenges.tsx       # Challenge timeframes
│   ├── Footer.tsx           # Footer with links
│   ├── Hero.tsx             # Hero section with stats
│   ├── HowItWorks.tsx       # How it works section
│   ├── Leaderboard.tsx      # Live leaderboard
│   ├── PriceTicker.tsx      # Crypto price ticker
│   ├── StakingSection.tsx   # Staking information
│   └── TokenSection.tsx     # Token information
├── lib/
│   ├── cryptoApi.ts         # Crypto price API integration
│   ├── tradingSimulation.ts # Trading simulation logic
│   └── types.ts             # TypeScript types
└── public/
    └── assets/
        ├── images/          # Background image
        └── logos/           # Brand logos

```

## Setup Instructions

### Prerequisites
- Node.js 18+ or compatible runtime
- Yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd /home/ubuntu/battlebots_website
```

2. Install dependencies (already done):
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
yarn build
yarn start
```

## Features Breakdown

### 1. Hero Section
- BattleBots main logo
- Compelling headline
- "Connect Wallet" button with modal (non-functional, shows "Coming Soon")
- Live stats: Total Battles, Active AIs, Total Volume

### 2. Live Price Ticker
- Scrolling ticker showing real-time prices for all 11 cryptocurrencies
- 24h price change indicators
- Auto-scroll with pause on hover

### 3. AI Battle Display
- 6 AI agent cards showing:
  - Current portfolio value
  - Cash balance
  - Profit/Loss percentage
  - Progress to $10,000 target
  - Current holdings

### 4. AI Communication Feed
- Real-time feed of AI decisions
- Color-coded by action type (buy/sell/hold/analysis)
- Timestamps for each message
- Auto-scroll to latest messages

### 5. Leaderboard
- Real-time rankings of all AI agents
- Detailed statistics: Portfolio Value, P/L, Win Rate, Total Trades
- Medal icons for top 3 positions

### 6. Challenges
- 4 timeframes: Hourly, 4-Hour, 12-Hour, Daily
- Countdown timers for each challenge
- Prize pools and current leaders
- "Place Bet" buttons (coming soon)

### 7. Betting Interface
- Preview of P2P betting system
- AI agent selection
- Timeframe selection with multipliers
- Bet amount input
- Potential payout calculator
- "Coming Soon" overlay

### 8. How It Works
- Step-by-step explanation of the platform
- Visual timeline with icons
- Fair and transparent information

### 9. Token Section
- $BBOT token information
- Tokenomics and distribution chart
- Utility: Betting, Staking, Governance
- "Buy $BBOT" button (coming soon)

### 10. Staking Section
- Staking calculator with APY
- Benefits of staking
- Real-time rewards information
- Platform statistics

### 11. Footer
- Social media links (Twitter, Telegram)
- Quick links and resources
- "Built on Solana" badge
- Copyright and disclaimer

## Simulation Details

### Trading Simulation
- Each AI starts with $1,000
- Target balance: $10,000
- AIs make trades every 5 seconds
- 40% buy probability, 30% sell probability, 30% hold/analysis
- Investment range: 5-20% of available balance per trade

### Price Updates
- Real crypto prices fetched every 60 seconds from CoinGecko API
- Mock price fluctuations every 10 seconds for dynamic feel
- Fallback to mock data if API fails

### AI Messages
- Context-aware messages based on action type
- Buy, sell, hold, and analysis message variations
- Timestamps for tracking

## Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: CoinGecko (for crypto prices)
- **Blockchain**: Solana (design theme)

## Future Enhancements (Phase 2+)

- Actual wallet connection functionality (Phantom, Solflare, etc.)
- Real betting system with smart contracts
- Actual staking implementation
- User accounts and bet history
- Live chat and community features
- Mobile app versions
- More AI agents and cryptocurrencies

## Notes

- Wallet connection is currently non-functional (shows "Coming Soon" modal)
- Betting and staking interfaces are preview-only
- All trading data is simulated for demonstration purposes
- This is Phase 1 - showcasing the concept

## License

All rights reserved © 2025 BattleBots

## Contact

- Twitter: [@battlebots](https://twitter.com/battlebots)
- Telegram: [t.me/battlebots](https://t.me/battlebots)
- Website: [battlebots.website](https://battlebots.website)

---

**Built with ❤️ on Solana**
