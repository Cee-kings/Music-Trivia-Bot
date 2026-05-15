import path from "path";
import ffmpegPath from "ffmpeg-static";
import { migrateDb } from "./db.js";
import { createBot } from "./bot.js";

if (ffmpegPath) {
  const dir = path.dirname(ffmpegPath);
  process.env.PATH = `${dir}:${process.env.PATH ?? ""}`;
  console.log(`[startup] ffmpeg found at: ${ffmpegPath}`);
} else {
  console.warn("[startup] ffmpeg-static returned null — relying on system ffmpeg");
}

console.log("[startup] Music Trivia Bot starting…");

migrateDb()
  .then(() => {
    createBot();
    console.log("[startup] Bot is running");
  })
  .catch((err) => {
    console.error("[startup] Failed to migrate database:", err);
    process.exit(1);
  });
