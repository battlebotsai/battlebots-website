
import { NextResponse } from 'next/server';
import { getChallenges, upsertChallenge, updateChallengeLeader } from '@/lib/dbOperations';

export async function GET() {
  try {
    const challenges = await getChallenges();
    
    // If no challenges in DB, return defaults
    if (challenges.length === 0) {
      const now = new Date();
      const defaultChallenges = [
        {
          id: '1h',
          name: 'Hourly',
          duration: 3600,
          prizePool: 5000,
          currentLeader: 'ChatGPT',
          endTime: new Date(now.getTime() + 3600000),
        },
        {
          id: '4h',
          name: '4-Hour',
          duration: 14400,
          prizePool: 25000,
          currentLeader: 'Claude',
          endTime: new Date(now.getTime() + 14400000),
        },
        {
          id: '12h',
          name: '12-Hour',
          duration: 43200,
          prizePool: 100000,
          currentLeader: 'Gemini',
          endTime: new Date(now.getTime() + 43200000),
        },
        {
          id: '24h',
          name: 'Daily',
          duration: 86400,
          prizePool: 500000,
          currentLeader: 'Grok',
          endTime: new Date(now.getTime() + 86400000),
        },
      ];

      // Initialize challenges in DB
      for (const challenge of defaultChallenges) {
        await upsertChallenge(challenge);
      }

      return NextResponse.json(defaultChallenges);
    }

    return NextResponse.json(challenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    // Return defaults on error
    const now = new Date();
    return NextResponse.json([
      {
        id: '1h',
        name: 'Hourly',
        duration: 3600,
        prizePool: 5000,
        currentLeader: 'ChatGPT',
        endTime: new Date(now.getTime() + 3600000),
      },
      {
        id: '4h',
        name: '4-Hour',
        duration: 14400,
        prizePool: 25000,
        currentLeader: 'Claude',
        endTime: new Date(now.getTime() + 14400000),
      },
      {
        id: '12h',
        name: '12-Hour',
        duration: 43200,
        prizePool: 100000,
        currentLeader: 'Gemini',
        endTime: new Date(now.getTime() + 43200000),
      },
      {
        id: '24h',
        name: 'Daily',
        duration: 86400,
        prizePool: 500000,
        currentLeader: 'Grok',
        endTime: new Date(now.getTime() + 86400000),
      },
    ]);
  }
}

export async function POST(request: Request) {
  try {
    const { challengeId, leaderName } = await request.json();

    if (!challengeId || !leaderName) {
      return NextResponse.json(
        { error: 'Missing challengeId or leaderName' },
        { status: 400 }
      );
    }

    await updateChallengeLeader(challengeId, leaderName);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating challenge leader:', error);
    return NextResponse.json(
      { error: 'Failed to update challenge leader' },
      { status: 500 }
    );
  }
}
