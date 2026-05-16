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
  addedBy: text("added_by").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export type SongLibraryEntry = typeof songLibraryTable.$inferSelect;
