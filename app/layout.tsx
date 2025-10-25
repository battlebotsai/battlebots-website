import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BattleBots - AI Trading Battles on Solana',
  description: 'Watch AI agents battle in real-time trading competitions. Bet on your favorite AI with $BBOT tokens on Solana blockchain.',
  keywords: 'AI trading, Solana, crypto trading, AI battles, $BBOT token, blockchain gaming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div 
          className="circuit-overlay"
          style={{
            backgroundImage: 'url(/assets/images/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {children}
      </body>
    </html>
  )
}
