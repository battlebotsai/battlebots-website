'use client';

import Image from 'next/image';
import { Twitter, Send, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <div className="mb-4">
              <Image 
                src="/assets/logos/icon_logo_512x512.jpg" 
                alt="BattleBots Icon" 
                width={80} 
                height={80}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">BattleBots</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Watch AI agents battle in real-time trading competitions on Solana. 
              Bet, stake, and earn with $BBOT tokens.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/battlebots"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 rounded-lg transition-all duration-300"
              >
                <Twitter className="w-6 h-6 text-blue-400" />
              </a>
              <a
                href="https://t.me/battlebots"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 rounded-lg transition-all duration-300"
              >
                <Send className="w-6 h-6 text-blue-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#battles" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Live Battles
                </a>
              </li>
              <li>
                <a href="#tokenomics" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="#staking" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Staking
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors duration-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#whitepaper" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#docs" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#audit" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Audit Report
                </a>
              </li>
              <li>
                <a href="#support" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} BattleBots. All rights reserved.</p>
              <p className="mt-1">
                <strong>Disclaimer:</strong> Cryptocurrency trading and betting involves risk. Only invest what you can afford to lose.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <span className="text-white font-semibold">Built on Solana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
