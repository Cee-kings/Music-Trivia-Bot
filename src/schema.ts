import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const leaderboardTable = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  discordUserId: text("discord_user_id").notNull(),
  username: text("username").notNull(),
  wins: integer("wins").notNull().default(0),
  totalAnswers: integer("total_answers").notNull().default(0),
  correctAnswers: integer("correct_answers").notNull().default(0),
  bestTimeMs: integer("best_time_ms"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type LeaderboardEntry = typeof leaderboardTable.$inferSelect;

export const songLibraryTable = pgTable("song_library", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  youtubeUrl: text("youtube_url").notNull().default(""),
  audioUrl: text("audio_url"),
  addedBy: text("added_by").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export type SongLibraryEntry = typeof songLibraryTable.$inferSelect;

export const challengeLeaderboardTable = pgTable("challenge_leaderboard", {
  id: serial("id").primaryKey(),
  discordUserId: text("discord_user_id").notNull().unique(),
  username: text("username").notNull(),
  challengeWins: integer("challenge_wins").notNull().default(0),
  totalParticipated: integer("total_participated").notNull().default(0),
  totalCorrect: integer("total_correct").notNull().default(0),
  totalAnswers: integer("total_answers").notNull().default(0),
  bestAvgTimeMs: integer("best_avg_time_ms"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ChallengeLeaderboardEntry = typeof challengeLeaderboardTable.$inferSelect;
