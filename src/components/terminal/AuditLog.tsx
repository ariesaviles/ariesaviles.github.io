import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Level = "INFO" | "GET" | "CMD" | "WARN" | "ERROR";

interface LogEntry {
  id: number;
  time: string;
  level: Level;
  message: string;
  detail?: string;
}

export interface CommandEvent {
  id: number;
  cmd: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _id = 0;
const uid = () => ++_id;

function now() {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function randMs(min = 3, max = 24) {
  return Math.floor(Math.random() * (max - min) + min);
}

const EASTER_EGG_CMDS = new Set([
  "sudo hire me", "hire me", "rm -rf .impostor-syndrome",
  "rm -rf impostor-syndrome", "vim", "vi", "nano",
  "neofetch", "man aries", "man", "git log",
  "git log --all", "git log --oneline",
]);

const LEVEL_COLORS: Record<Level, string> = {
  INFO:  "var(--color-muted)",
  GET:   "#4ade80",
  CMD:   "var(--color-accent)",
  WARN:  "#fbbf24",
  ERROR: "#f87171",
};

const NOISE: { level: Level; message: string; detail?: string }[] = [
  { level: "INFO",  message: "heartbeat ok" },
  { level: "INFO",  message: "memory stable",       detail: `${Math.floor(Math.random() * 20 + 30)}mb / 512mb` },
  { level: "INFO",  message: "cache warm",           detail: `${Math.floor(Math.random() * 10 + 8)} items` },
  { level: "WARN",  message: "coffee levels critical" },
  { level: "INFO",  message: "no errors detected" },
  { level: "GET",   message: "/favicon.svg",         detail: `200  1ms` },
  { level: "INFO",  message: "gc run",               detail: "freed 4mb" },
  { level: "INFO",  message: "session active" },
];

// ─── Boot sequence ────────────────────────────────────────────────────────────

const BOOT: { delay: number; level: Level; message: string; detail?: string }[] = [
  { delay: 0,    level: "INFO", message: "initializing portfolio runtime v1.0.0" },
  { delay: 120,  level: "INFO", message: "loading modules",    detail: "done" },
  { delay: 220,  level: "INFO", message: "compiling routes",   detail: "done" },
  { delay: 320,  level: "INFO", message: "server started",     detail: ":4321" },
  { delay: 460,  level: "INFO", message: "ready",              detail: "571ms" },
  { delay: 600,  level: "GET",  message: "/",                  detail: "200  22ms" },
  { delay: 720,  level: "INFO", message: "visitor connected" },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  commandEvents: CommandEvent[];
  visible: boolean;
}

export default function AuditLog({ commandEvents, visible }: Props) {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevLen   = useRef(0);

  const push = (entry: Omit<LogEntry, "id">) =>
    setEntries(e => [...e, { id: uid(), ...entry }]);

  // Boot sequence
  useEffect(() => {
    const timers = BOOT.map(({ delay, level, message, detail }) =>
      setTimeout(() => push({ time: now(), level, message, detail }), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Background noise
  useEffect(() => {
    const schedule = () => {
      const delay = Math.random() * 12000 + 8000;
      return setTimeout(() => {
        const item = NOISE[Math.floor(Math.random() * NOISE.length)];
        push({ time: now(), level: item.level, message: item.message, detail: item.detail });
        timerRef.current = schedule();
      }, delay);
    };
    const timerRef = { current: schedule() };
    return () => clearTimeout(timerRef.current);
  }, []);

  // Log incoming command events
  useEffect(() => {
    if (commandEvents.length <= prevLen.current) return;
    const latest = commandEvents[commandEvents.length - 1];
    prevLen.current = commandEvents.length;

    const isEgg = EASTER_EGG_CMDS.has(latest.cmd.toLowerCase());
    const detail = isEgg
      ? `easter egg  🥚  ${randMs(1, 6)}ms`
      : `200  ${randMs()}ms`;

    // Small delay so it feels like a server responding
    setTimeout(() => {
      push({ time: now(), level: "CMD", message: latest.cmd, detail });
    }, randMs(40, 120));
  }, [commandEvents]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-6"
      style={{
        display: visible ? "block" : "none",
        fontFamily: "var(--font-mono)",
        fontSize: "0.8rem",
        lineHeight: "1.7",
      }}
    >
      {entries.map(({ id, time, level, message, detail }) => (
        <div key={id} className="flex gap-3 flex-wrap">
          <span style={{ color: "var(--color-muted)", userSelect: "none" }}>{time}</span>
          <span
            className="w-10 shrink-0 font-medium"
            style={{ color: LEVEL_COLORS[level] }}
          >
            {level}
          </span>
          <span style={{ color: "var(--color-text)" }}>{message}</span>
          {detail && (
            <span style={{ color: "var(--color-muted)" }}>{detail}</span>
          )}
        </div>
      ))}
    </div>
  );
}
