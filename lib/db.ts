
import { Pool } from 'pg';

// Create a singleton connection pool
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }
  return pool;
}

export async function query(text: string, params?: any[]) {
  const pool = getPool();
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Initialize database tables
export async function initializeDatabase() {
  const pool = getPool();
  
  try {
    // Create shared_data table for global stats
    await pool.query(`
      CREATE TABLE IF NOT EXISTS shared_data (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create bot_stats table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bot_stats (
        id SERIAL PRIMARY KEY,
        agent_name VARCHAR(255) UNIQUE NOT NULL,
        total_trades INTEGER DEFAULT 0,
        winning_trades INTEGER DEFAULT 0,
        portfolio_value DECIMAL(20, 2) DEFAULT 10000.00,
        portfolio JSONB DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create challenges table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS challenges (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        duration INTEGER NOT NULL,
        prize_pool INTEGER NOT NULL,
        current_leader VARCHAR(255),
        end_time TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Initialize global stats if they don't exist
    await pool.query(`
      INSERT INTO shared_data (key, value)
      VALUES ('total_battles', '12847')
      ON CONFLICT (key) DO NOTHING
    `);

    await pool.query(`
      INSERT INTO shared_data (key, value)
      VALUES ('total_volume', '2458963')
      ON CONFLICT (key) DO NOTHING
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
