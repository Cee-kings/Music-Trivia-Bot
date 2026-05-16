import { db } from "./db.js";
import { songLibraryTable } from "./schema.js";
import { eq, ilike, and } from "drizzle-orm";
import type { SongEntry } from "./songs.js";

export async function addSong(
  title: string,
  artist: string,
  youtubeUrl: string,
  addedBy: string,
): Promise<void> {
  await db.insert(songLibraryTable).values({ title, artist, youtubeUrl, addedBy });
}

export async function removeSong(id: number): Promise<boolean> {
  const result = await db
    .delete(songLibraryTable)
    .where(eq(songLibraryTable.id, id))
    .returning();
  return result.length > 0;
}

export async function listSongs() {
  return db.select().from(songLibraryTable).orderBy(songLibraryTable.addedAt);
}

export async function getSongCount(): Promise<number> {
  const rows = await db.select().from(songLibraryTable);
  return rows.length;
}

export async function getAllSongsAsEntries(): Promise<SongEntry[]> {
  const rows = await db.select().from(songLibraryTable);
  return rows.map((r) => ({ title: r.title, artist: r.artist, youtubeUrl: r.youtubeUrl }));
}

export async function findSongByTitleArtist(
  title: string,
  artist: string,
): Promise<number | null> {
  const rows = await db
    .select()
    .from(songLibraryTable)
    .where(
      and(
        ilike(songLibraryTable.title, title),
        ilike(songLibraryTable.artist, artist),
      ),
    )
    .limit(1);
  return rows.length > 0 ? rows[0].id : null;
}
