export interface ProcessEntry {
  pid: number;
  guildId: string;
  type: "quiz" | "challenge";
  startedAt: Date;
}

const activeProcesses = new Map<string, ProcessEntry>();

export function trackProcess(guildId: string, pid: number, type: "quiz" | "challenge"): void {
  activeProcesses.set(guildId, { pid, guildId, type, startedAt: new Date() });
}

export function untrackProcess(guildId: string): void {
  activeProcesses.delete(guildId);
}

export function getProcessStats(): ProcessEntry[] {
  return [...activeProcesses.values()];
}
