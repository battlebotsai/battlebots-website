
import { query } from './db';
import { AIAgent, Challenge } from './types';

// Global stats operations
export async function getTotalBattles(): Promise<number> {
  try {
    const result = await query(
      "SELECT value FROM shared_data WHERE key = 'total_battles'"
    );
    return result.rows.length > 0 ? parseInt(result.rows[0].value) : 12847;
  } catch (error) {
    console.error('Error getting total battles:', error);
    return 12847;
  }
}

export async function incrementTotalBattles(): Promise<void> {
  try {
    await query(`
      UPDATE shared_data 
      SET value = (value::int + 1)::text, updated_at = CURRENT_TIMESTAMP
      WHERE key = 'total_battles'
    `);
  } catch (error) {
    console.error('Error incrementing total battles:', error);
  }
}

export async function getTotalVolume(): Promise<number> {
  try {
    const result = await query(
      "SELECT value FROM shared_data WHERE key = 'total_volume'"
    );
    return result.rows.length > 0 ? parseFloat(result.rows[0].value) : 2458963;
  } catch (error) {
    console.error('Error getting total volume:', error);
    return 2458963;
  }
}

export async function incrementTotalVolume(amount: number): Promise<void> {
  try {
    await query(`
      UPDATE shared_data 
      SET value = (value::numeric + $1)::text, updated_at = CURRENT_TIMESTAMP
      WHERE key = 'total_volume'
    `, [amount]);
  } catch (error) {
    console.error('Error incrementing total volume:', error);
  }
}

// Bot stats operations
export async function getBotStats(agentName: string): Promise<any> {
  try {
    const result = await query(
      'SELECT * FROM bot_stats WHERE agent_name = $1',
      [agentName]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error getting bot stats:', error);
    return null;
  }
}

export async function upsertBotStats(agent: AIAgent): Promise<void> {
  try {
    await query(`
      INSERT INTO bot_stats (agent_name, total_trades, winning_trades, portfolio_value, portfolio, updated_at)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      ON CONFLICT (agent_name) 
      DO UPDATE SET 
        total_trades = $2,
        winning_trades = $3,
        portfolio_value = $4,
        portfolio = $5,
        updated_at = CURRENT_TIMESTAMP
    `, [
      agent.name,
      agent.totalTrades,
      agent.winningTrades,
      agent.portfolioValue,
      JSON.stringify(agent.portfolio)
    ]);
  } catch (error) {
    console.error('Error upserting bot stats:', error);
  }
}

export async function getAllBotStats(): Promise<any[]> {
  try {
    const result = await query('SELECT * FROM bot_stats');
    return result.rows;
  } catch (error) {
    console.error('Error getting all bot stats:', error);
    return [];
  }
}

// Challenge operations
export async function getChallenges(): Promise<Challenge[]> {
  try {
    const result = await query('SELECT * FROM challenges ORDER BY duration ASC');
    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      duration: row.duration,
      prizePool: row.prize_pool,
      currentLeader: row.current_leader,
      endTime: new Date(row.end_time)
    }));
  } catch (error) {
    console.error('Error getting challenges:', error);
    return [];
  }
}

export async function upsertChallenge(challenge: Challenge): Promise<void> {
  try {
    await query(`
      INSERT INTO challenges (id, name, duration, prize_pool, current_leader, end_time)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id)
      DO UPDATE SET
        current_leader = $5,
        end_time = $6
    `, [
      challenge.id,
      challenge.name,
      challenge.duration,
      challenge.prizePool,
      challenge.currentLeader,
      challenge.endTime
    ]);
  } catch (error) {
    console.error('Error upserting challenge:', error);
  }
}

export async function updateChallengeLeader(challengeId: string, leaderName: string): Promise<void> {
  try {
    await query(`
      UPDATE challenges 
      SET current_leader = $1
      WHERE id = $2
    `, [leaderName, challengeId]);
  } catch (error) {
    console.error('Error updating challenge leader:', error);
  }
}
