'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import PriceTicker from '@/components/PriceTicker';
import AIBattleDisplay from '@/components/AIBattleDisplay';
import AIFeed from '@/components/AIFeed';
import Leaderboard from '@/components/Leaderboard';
import Challenges from '@/components/Challenges';
import BettingPreview from '@/components/BettingPreview';
import TokenSection from '@/components/TokenSection';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import { AIAgent, AIMessage, CryptoPrice, Challenge } from '@/lib/types';
import { initializeAgents, simulateTrade, calculatePortfolioValue, updateAgentStats } from '@/lib/tradingSimulation';
import { getMockPrices } from '@/lib/cryptoApi';

export default function Home() {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [totalBattles, setTotalBattles] = useState(12847);
  const [totalVolume, setTotalVolume] = useState(2458963);

  // Fetch stats from database
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setTotalBattles(data.totalBattles);
          setTotalVolume(data.totalVolume);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch challenges from database
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('/api/challenges');
        if (response.ok) {
          const data = await response.json();
          setChallenges(data.map((c: any) => ({
            ...c,
            endTime: new Date(c.endTime)
          })));
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
        // Initialize with defaults on error
        const now = new Date();
        setChallenges([
          {
            id: '1h',
            name: '1 Hour Blitz',
            duration: 3600,
            prizePool: 5000,
            currentLeader: 'ChatGPT',
            endTime: new Date(now.getTime() + 3600000),
          },
          {
            id: '4h',
            name: '4 Hour Sprint',
            duration: 14400,
            prizePool: 25000,
            currentLeader: 'Claude',
            endTime: new Date(now.getTime() + 14400000),
          },
          {
            id: '12h',
            name: '12 Hour Marathon',
            duration: 43200,
            prizePool: 100000,
            currentLeader: 'Gemini',
            endTime: new Date(now.getTime() + 43200000),
          },
          {
            id: '24h',
            name: 'Daily Domination',
            duration: 86400,
            prizePool: 500000,
            currentLeader: 'Grok',
            endTime: new Date(now.getTime() + 86400000),
          },
        ]);
      }
    };

    fetchChallenges();
  }, []);

  // Initialize data and load from database
  useEffect(() => {
    const prices = getMockPrices();
    setCryptoPrices(prices);
    
    // Try to load bot stats from database
    const loadBotStats = async () => {
      try {
        const response = await fetch('/api/bot-stats');
        if (response.ok) {
          const dbStats = await response.json();
          
          // If we have stats in DB, merge them with initialized agents
          if (dbStats && dbStats.length > 0) {
            const initializedAgents = initializeAgents(prices);
            const mergedAgents = initializedAgents.map(agent => {
              const dbStat = dbStats.find((s: any) => s.agent_name === agent.name);
              if (dbStat) {
                return {
                  ...agent,
                  totalTrades: dbStat.total_trades || 0,
                  winningTrades: dbStat.winning_trades || 0,
                  portfolioValue: parseFloat(dbStat.portfolio_value) || agent.portfolioValue,
                  portfolio: dbStat.portfolio ? JSON.parse(dbStat.portfolio) : {},
                };
              }
              return agent;
            });
            setAgents(mergedAgents);
          } else {
            setAgents(initializeAgents(prices));
          }
        } else {
          setAgents(initializeAgents(prices));
        }
      } catch (error) {
        console.error('Error loading bot stats:', error);
        setAgents(initializeAgents(prices));
      }
    };
    
    loadBotStats();
  }, []);

  // Fetch real crypto prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,binancecoin,ripple,dogecoin,tron,hyperliquid,xai,bittensor&order=market_cap_desc&sparkline=false'
        );
        
        if (response.ok) {
          const data = await response.json();
          const formattedPrices = data.map((coin: any) => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            current_price: coin.current_price,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            market_cap: coin.market_cap,
            image: coin.image,
          }));
          setCryptoPrices(formattedPrices);
        }
      } catch (error) {
        console.error('Error fetching prices:', error);
        // Keep using mock prices
      }
    };

    fetchPrices();
    const priceInterval = setInterval(fetchPrices, 60000); // Update every minute

    return () => clearInterval(priceInterval);
  }, []);

  // Simulate price fluctuations for mock data
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prev => 
        prev.map(crypto => ({
          ...crypto,
          current_price: crypto.current_price * (1 + (Math.random() - 0.5) * 0.002),
          price_change_percentage_24h: crypto.price_change_percentage_24h + (Math.random() - 0.5) * 0.5,
        }))
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate AI trading and update database
  useEffect(() => {
    if (agents.length === 0 || cryptoPrices.length === 0) return;

    const interval = setInterval(async () => {
      setAgents(prevAgents => {
        const randomAgentIndex = Math.floor(Math.random() * prevAgents.length);
        const agentToTrade = prevAgents[randomAgentIndex];
        
        const { agent: updatedAgent, message, trade } = simulateTrade(agentToTrade, cryptoPrices);
        
        if (message) {
          setMessages(prev => [...prev.slice(-50), message]); // Keep last 50 messages
        }

        if (trade) {
          // Update database with new trade
          const tradeValue = trade.amount * trade.price;
          fetch('/api/stats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'battle' })
          }).catch(err => console.error('Error updating battle count:', err));

          fetch('/api/stats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'volume', amount: tradeValue })
          }).catch(err => console.error('Error updating volume:', err));

          // Update local state immediately for responsiveness
          setTotalBattles(prev => prev + 1);
          setTotalVolume(prev => prev + tradeValue);
        }

        const totalValue = calculatePortfolioValue(updatedAgent, cryptoPrices);
        const finalAgent = updateAgentStats(updatedAgent, totalValue);

        // Persist bot stats to database
        if (trade) {
          fetch('/api/bot-stats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              agent: finalAgent
            })
          }).catch(err => console.error('Error updating bot stats:', err));
        }

        return prevAgents.map((a, i) => 
          i === randomAgentIndex ? finalAgent : a
        );
      });
    }, 5000); // Trade every 5 seconds

    return () => clearInterval(interval);
  }, [agents.length, cryptoPrices]);

  // Update challenge leaders
  useEffect(() => {
    if (agents.length === 0) return;

    const interval = setInterval(async () => {
      setChallenges(prev => prev.map(challenge => {
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        
        // Update database
        fetch('/api/challenges', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            challengeId: challenge.id, 
            leaderName: randomAgent.name 
          })
        }).catch(err => console.error('Error updating challenge leader:', err));

        return {
          ...challenge,
          currentLeader: randomAgent.name,
        };
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [agents]);

  return (
    <main className="min-h-screen">
      <Hero 
        totalBattles={totalBattles} 
        activeAIs={6} 
        totalVolume={totalVolume}
      />
      
      {cryptoPrices.length > 0 && <PriceTicker prices={cryptoPrices} />}
      
      {agents.length > 0 && cryptoPrices.length > 0 && (
        <>
          <AIBattleDisplay agents={agents} cryptoPrices={cryptoPrices} />
          <AIFeed messages={messages} />
          <Leaderboard agents={agents} cryptoPrices={cryptoPrices} />
          <Challenges challenges={challenges} />
          <BettingPreview />
          <HowItWorks />
          <TokenSection />
        </>
      )}
      
      <Footer />
    </main>
  );
}
