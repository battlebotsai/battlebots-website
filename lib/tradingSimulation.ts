import { AIAgent, Trade, AIMessage, CryptoPrice, AI_AGENTS, AI_AVATARS, CRYPTOCURRENCIES } from './types';

const STARTING_BALANCE = 1000;
const TARGET_BALANCE = 10000;
const MAX_LEVERAGE = 50; // Maximum 50x leverage for AI agents

const TRADING_MESSAGES = {
  buy: [
    "Strong upward momentum detected. Initiating buy order.",
    "Technical analysis shows bullish signals. Buying now.",
    "Market sentiment positive. Accumulating position.",
    "Support level confirmed. Entering long position.",
    "Volume spike detected. Placing buy order.",
    "RSI indicates oversold. Perfect buy opportunity.",
  ],
  sell: [
    "Taking profits at resistance level. Selling position.",
    "Risk management triggered. Closing position.",
    "Technical indicators bearish. Exiting trade.",
    "Profit target reached. Selling portion of holdings.",
    "Market volatility increasing. Reducing exposure.",
    "Overbought conditions detected. Taking profits.",
  ],
  hold: [
    "Market consolidating. Holding current positions.",
    "Waiting for clearer signals. Standing pat.",
    "Portfolio balanced. No action needed.",
    "Range-bound market. Maintaining positions.",
    "Monitoring for breakout. Holding steady.",
    "Current positions optimal. No changes.",
  ],
  analysis: [
    "Analyzing market conditions across all pairs...",
    "Running risk assessment on current portfolio...",
    "Evaluating correlation patterns...",
    "Calculating optimal position sizes...",
    "Scanning for arbitrage opportunities...",
    "Updating machine learning models...",
  ],
};

export function initializeAgents(cryptoPrices: CryptoPrice[]): AIAgent[] {
  return AI_AGENTS.map((name, index) => ({
    id: `agent-${index}`,
    name,
    avatar: AI_AVATARS[name],
    balance: STARTING_BALANCE,
    startBalance: STARTING_BALANCE,
    targetBalance: TARGET_BALANCE,
    portfolio: {},
    portfolioValue: STARTING_BALANCE,
    trades: [],
    totalTrades: 0,
    winningTrades: 0,
    winRate: 0.5 + Math.random() * 0.3,
    profitLoss: 0,
    profitLossPercent: 0,
  }));
}

export function simulateTrade(
  agent: AIAgent,
  cryptoPrices: CryptoPrice[]
): { agent: AIAgent; message?: AIMessage; trade?: Trade } {
  const action = Math.random();
  
  // 40% buy, 30% sell, 30% hold/analysis
  if (action < 0.4 && agent.balance > 10) {
    // Buy action with leverage
    const crypto = cryptoPrices[Math.floor(Math.random() * cryptoPrices.length)];
    const investmentPercent = 0.05 + Math.random() * 0.15; // 5-20% of balance
    const leverage = Math.floor(1 + Math.random() * MAX_LEVERAGE); // Random leverage 1x-50x
    const baseInvestmentAmount = agent.balance * investmentPercent;
    const investmentAmount = baseInvestmentAmount * leverage; // Apply leverage
    const cryptoAmount = investmentAmount / crypto.current_price;
    
    const newPortfolio = { ...agent.portfolio };
    if (newPortfolio[crypto.symbol]) {
      newPortfolio[crypto.symbol].amount += cryptoAmount;
      newPortfolio[crypto.symbol].value += investmentAmount;
    } else {
      newPortfolio[crypto.symbol] = {
        amount: cryptoAmount,
        value: investmentAmount,
      };
    }
    
    const trade: Trade = {
      id: `trade-${Date.now()}-${Math.random()}`,
      agentId: agent.id,
      crypto: crypto.symbol,
      action: 'buy',
      amount: cryptoAmount,
      price: crypto.current_price,
      timestamp: new Date(),
    };
    
    const message: AIMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      agentName: agent.name,
      message: `${TRADING_MESSAGES.buy[Math.floor(Math.random() * TRADING_MESSAGES.buy.length)]} Buying ${cryptoAmount.toFixed(4)} ${crypto.symbol} at $${crypto.current_price.toFixed(2)} with ${leverage}x leverage`,
      timestamp: new Date(),
      type: 'buy',
    };
    
    return {
      agent: {
        ...agent,
        balance: agent.balance - baseInvestmentAmount, // Only deduct the base investment (margin), not leveraged amount
        portfolio: newPortfolio,
        trades: [...agent.trades, trade],
        totalTrades: agent.totalTrades + 1,
      },
      message,
      trade,
    };
  } else if (action < 0.7 && Object.keys(agent.portfolio).length > 0) {
    // Sell action
    const portfolioKeys = Object.keys(agent.portfolio);
    const cryptoToSell = portfolioKeys[Math.floor(Math.random() * portfolioKeys.length)];
    const cryptoPrice = cryptoPrices.find(c => c.symbol === cryptoToSell);
    
    if (cryptoPrice && agent.portfolio[cryptoToSell]) {
      const sellPercent = 0.3 + Math.random() * 0.5; // Sell 30-80% of holding
      const amountToSell = agent.portfolio[cryptoToSell].amount * sellPercent;
      const saleValue = amountToSell * cryptoPrice.current_price;
      
      const newPortfolio = { ...agent.portfolio };
      newPortfolio[cryptoToSell].amount -= amountToSell;
      newPortfolio[cryptoToSell].value -= saleValue;
      
      if (newPortfolio[cryptoToSell].amount < 0.0001) {
        delete newPortfolio[cryptoToSell];
      }
      
      const trade: Trade = {
        id: `trade-${Date.now()}-${Math.random()}`,
        agentId: agent.id,
        crypto: cryptoToSell,
        action: 'sell',
        amount: amountToSell,
        price: cryptoPrice.current_price,
        timestamp: new Date(),
      };
      
      const message: AIMessage = {
        id: `msg-${Date.now()}-${Math.random()}`,
        agentName: agent.name,
        message: `${TRADING_MESSAGES.sell[Math.floor(Math.random() * TRADING_MESSAGES.sell.length)]} Selling ${amountToSell.toFixed(4)} ${cryptoToSell} at $${cryptoPrice.current_price.toFixed(2)}`,
        timestamp: new Date(),
        type: 'sell',
      };
      
      return {
        agent: {
          ...agent,
          balance: agent.balance + saleValue,
          portfolio: newPortfolio,
          trades: [...agent.trades, trade],
          totalTrades: agent.totalTrades + 1,
        },
        message,
        trade,
      };
    }
  }
  
  // Hold or analysis
  const messageType = Math.random() < 0.5 ? 'hold' : 'analysis';
  const message: AIMessage = {
    id: `msg-${Date.now()}-${Math.random()}`,
    agentName: agent.name,
    message: TRADING_MESSAGES[messageType][Math.floor(Math.random() * TRADING_MESSAGES[messageType].length)],
    timestamp: new Date(),
    type: messageType,
  };
  
  return { agent, message };
}

export function calculatePortfolioValue(
  agent: AIAgent,
  cryptoPrices: CryptoPrice[]
): number {
  let portfolioValue = agent.balance;
  
  Object.entries(agent.portfolio).forEach(([symbol, holding]) => {
    const crypto = cryptoPrices.find(c => c.symbol === symbol);
    if (crypto) {
      portfolioValue += holding.amount * crypto.current_price;
    }
  });
  
  return portfolioValue;
}

export function updateAgentStats(
  agent: AIAgent,
  totalValue: number
): AIAgent {
  const profitLoss = totalValue - agent.startBalance;
  const profitLossPercent = (profitLoss / agent.startBalance) * 100;
  
  // Calculate winning trades (trades that resulted in profit)
  let winningTrades = 0;
  const buyTrades: { [crypto: string]: { amount: number; totalCost: number }[] } = {};
  
  agent.trades.forEach(trade => {
    if (trade.action === 'buy') {
      if (!buyTrades[trade.crypto]) {
        buyTrades[trade.crypto] = [];
      }
      buyTrades[trade.crypto].push({
        amount: trade.amount,
        totalCost: trade.amount * trade.price,
      });
    } else if (trade.action === 'sell' && buyTrades[trade.crypto]?.length > 0) {
      // Calculate if this sell trade was profitable
      const buys = buyTrades[trade.crypto];
      const avgBuyPrice = buys.reduce((sum, b) => sum + b.totalCost, 0) / 
                          buys.reduce((sum, b) => sum + b.amount, 0);
      
      if (trade.price > avgBuyPrice) {
        winningTrades++;
      }
    }
  });
  
  return {
    ...agent,
    portfolioValue: totalValue,
    winningTrades,
    profitLoss,
    profitLossPercent,
  };
}
