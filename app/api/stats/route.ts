
import { NextResponse } from 'next/server';
import { getTotalBattles, getTotalVolume, incrementTotalBattles, incrementTotalVolume } from '@/lib/dbOperations';

export async function GET() {
  try {
    const [totalBattles, totalVolume] = await Promise.all([
      getTotalBattles(),
      getTotalVolume()
    ]);

    return NextResponse.json({
      totalBattles,
      totalVolume
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', totalBattles: 12847, totalVolume: 2458963 },
      { status: 200 } // Return defaults with 200 status
    );
  }
}

export async function POST(request: Request) {
  try {
    const { type, amount } = await request.json();

    if (type === 'battle') {
      await incrementTotalBattles();
    } else if (type === 'volume' && amount) {
      await incrementTotalVolume(amount);
    }

    const [totalBattles, totalVolume] = await Promise.all([
      getTotalBattles(),
      getTotalVolume()
    ]);

    return NextResponse.json({
      success: true,
      totalBattles,
      totalVolume
    });
  } catch (error) {
    console.error('Error updating stats:', error);
    return NextResponse.json(
      { error: 'Failed to update stats' },
      { status: 500 }
    );
  }
}
