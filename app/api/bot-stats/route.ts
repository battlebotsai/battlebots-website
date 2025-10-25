
import { NextResponse } from 'next/server';
import { upsertBotStats, getAllBotStats } from '@/lib/dbOperations';
import { AIAgent } from '@/lib/types';

export async function GET() {
  try {
    const stats = await getAllBotStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching bot stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bot stats' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { agent } = await request.json();

    if (!agent || !agent.name) {
      return NextResponse.json(
        { error: 'Invalid agent data' },
        { status: 400 }
      );
    }

    await upsertBotStats(agent as AIAgent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating bot stats:', error);
    return NextResponse.json(
      { error: 'Failed to update bot stats' },
      { status: 500 }
    );
  }
}
