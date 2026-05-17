import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.js";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

/**
 * Creates tables if they don't exist yet.
 * Runs automatically on startup so no separate migration step is needed.
 */
export async function migrateDb(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id               SERIAL PRIMARY KEY,
      discord_user_id  TEXT    NOT NULL,
      username         TEXT    NOT NULL,
      wins             INTEGER NOT NULL DEFAULT 0,
      total_answers    INTEGER NOT NULL DEFAULT 0,
      correct_answers  INTEGER NOT NULL DEFAULT 0,
      best_time_ms     INTEGER,
      updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS song_library (
      id          SERIAL PRIMARY KEY,
      title       TEXT      NOT NULL,
      artist      TEXT      NOT NULL,
      youtube_url TEXT      NOT NULL DEFAULT '',
      audio_url   TEXT,
      added_by    TEXT      NOT NULL,
      added_at    TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
  // Add audio_url column if it was added after initial deployment
  await pool.query(`
    ALTER TABLE song_library ADD COLUMN IF NOT EXISTS audio_url TEXT;
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS challenge_leaderboard (
      id                 SERIAL PRIMARY KEY,
      discord_user_id    TEXT    NOT NULL UNIQUE,
      username           TEXT    NOT NULL,
      challenge_wins     INTEGER NOT NULL DEFAULT 0,
      total_participated INTEGER NOT NULL DEFAULT 0,
      total_correct      INTEGER NOT NULL DEFAULT 0,
      total_answers      INTEGER NOT NULL DEFAULT 0,
      best_avg_time_ms   INTEGER,
      updated_at         TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
  console.log("[db] Tables ready");
}
