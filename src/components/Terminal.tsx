"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { getCommandOutput, KNOWN_COMMANDS, type RunRef } from "./terminal/outputs";
import AuditLog, { type CommandEvent } from "./terminal/AuditLog";

// ─── ASCII header (figlet "standard" font) ────────────────────────────────────

const ASCII_LINES = [
  "    _    ____  ___ _____ ____  ",
  "   / \\  |  _ \\|_ _| ____/ ___| ",
  "  / _ \\ | |_) || ||  _| \\___ \\ ",
  " / ___ \\|  _ < | || |___ ___) |",
  "/_/   \\_\\_| \\_\\___|_____|____/ ",
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Entry {
  id: number;
  node: ReactNode;
}

let _uid = 0;
const uid = () => ++_uid;

// ─── Component ───────────────────────────────────────────────────────────────

export default function Terminal() {
  const [entries, setEntries]       = useState<Entry[]>([]);
  const [input, setInput]           = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx]       = useState(-1);
  const [ready, setReady]           = useState(false);
  const [activeTab, setActiveTab]   = useState<"terminal" | "log">("terminal");
  const [commandEvents, setCommandEvents] = useState<CommandEvent[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const runRef    = useRef<(cmd: string) => void>(null!) as RunRef;

  const push = useCallback((node: ReactNode) => {
    setEntries(e => [...e, { id: uid(), node }]);
  }, []);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory(h => [raw.trim(), ...h]);
    setHistIdx(-1);
    setCommandEvents(evts => [...evts, { id: uid(), cmd: raw.trim() }]);

    push(
      <div className="flex gap-2 mt-1 flex-wrap">
        <span style={{ color: "var(--color-accent)" }}>aries</span>
        <span style={{ color: "var(--color-muted)" }}>@portfolio:~$</span>
        <span style={{ color: "var(--color-text)" }}>{raw.trim()}</span>
      </div>
    );

    if (cmd === "clear") {
      setEntries([]);
      return;
    }

    const output = getCommandOutput(cmd, runRef);

    push(
      output ?? (
        <p className="mt-1" style={{ color: "var(--color-muted)" }}>
          command not found:{" "}
          <span style={{ color: "var(--color-text)" }}>{cmd}</span>
          {"  "}— type{" "}
          <span style={{ color: "var(--color-accent)" }}>help</span>{" "}
          for commands
        </p>
      )
    );

    push(<div className="h-2" />);
  }, [push, runRef]);

  // Keep ref current so command output click handlers always call latest version
  useEffect(() => { runRef.current = runCommand; }, [runCommand, runRef]);

  // ─── Boot sequence ──────────────────────────────────────────────────────────

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 0;

    // Print ASCII art lines one by one
    ASCII_LINES.forEach((line) => {
      const l = line;
      timers.push(setTimeout(() => {
        setEntries(e => [...e, {
          id: uid(),
          node: (
            <pre
              className="leading-snug"
              style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(0.6rem, 2vw, 0.9rem)",
              }}
            >
              {l}
            </pre>
          ),
        }]);
      }, t));
      t += 60;
    });

    // Subtitle
    t += 160;
    timers.push(setTimeout(() => {
      setEntries(e => [...e, {
        id: uid(),
        node: (
          <p
            className="mt-1"
            style={{ color: "var(--color-muted)", fontSize: "0.75rem" }}
          >
            aviles · sr. fullstack engineer · open to work
          </p>
        ),
      }]);
    }, t));

    // Gap then auto-run help
    t += 340;
    timers.push(setTimeout(() => {
      setEntries(e => [...e, { id: uid(), node: <div className="h-4" /> }]);
      runRef.current("help");
      setReady(true);
    }, t));

    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to bottom whenever entries change
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  // ─── Keyboard handler ───────────────────────────────────────────────────────

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim()) runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(idx);
      if (cmdHistory[idx] !== undefined) setInput(cmdHistory[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : cmdHistory[idx]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.toLowerCase();
      const match = KNOWN_COMMANDS.find(c => c.startsWith(partial) && c !== partial);
      if (match) setInput(match);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    // Grid paper background
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 md:p-10"
      style={{
        backgroundColor: "#f7f6f1",
        backgroundImage: `
          linear-gradient(rgba(100, 120, 180, 0.10) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100, 120, 180, 0.10) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Terminal window */}
      <div
        className="w-full flex flex-col rounded-xl overflow-hidden"
        style={{
          maxWidth: "80vw",
          height: "76vh",
          backgroundColor: "var(--color-bg)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.25)",
          border: "1px solid #1e1e1e",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-3 px-4 shrink-0"
          style={{ height: "42px", backgroundColor: "#161616" }}
        >
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ffbd2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
          </div>
          <span
            className="flex-1 text-center text-xs select-none"
            style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
          >
            aries@portfolio — zsh
          </span>
          <div style={{ width: "54px" }} />
        </div>

        {/* Tab bar */}
        <div
          className="flex shrink-0"
          style={{ backgroundColor: "#161616", borderBottom: "1px solid #222" }}
        >
          {(["terminal", "log"] as const).map((tab) => {
            const isActive = activeTab === tab;
            const dot      = tab === "terminal" ? "#28c840" : "var(--color-accent)";
            const label    = tab === "terminal" ? "zsh" : "server.log";
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex items-center gap-2 px-4 py-2 text-xs select-none transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: isActive ? "var(--color-text)" : "var(--color-muted)",
                  backgroundColor: isActive ? "var(--color-bg)" : "transparent",
                  borderRight: "1px solid #222",
                  borderBottom: isActive ? `1px solid var(--color-bg)` : "none",
                  marginBottom: isActive ? "-1px" : "0",
                  position: "relative",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: isActive ? dot : "#333" }}
                />
                {label}
              </button>
            );
          })}
        </div>

        {/* Terminal panel */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 cursor-text"
          style={{
            display: activeTab === "terminal" ? "block" : "none",
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="max-w-2xl">
            {entries.map(e => (
              <div key={e.id}>{e.node}</div>
            ))}
            {ready && (
              <div className="flex gap-2 items-center mt-1 flex-wrap">
                <span style={{ color: "var(--color-accent)" }}>aries</span>
                <span style={{ color: "var(--color-muted)" }}>@portfolio:~$</span>
                <input
                  ref={inputRef}
                  autoFocus
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="flex-1 min-w-0 bg-transparent outline-none"
                  style={{
                    color: "var(--color-text)",
                    caretColor: "var(--color-accent)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "inherit",
                  }}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="terminal input"
                />
              </div>
            )}
          </div>
        </div>

        {/* Audit log panel — always mounted so boot sequence + noise keep running */}
        <AuditLog commandEvents={commandEvents} visible={activeTab === "log"} />
      </div>

      {/* Command dock */}
      <CommandDock onCommand={(cmd) => { setActiveTab("terminal"); runRef.current(cmd); }} />
    </div>
  );
}

// ─── Command Dock ─────────────────────────────────────────────────────────────

const DOCK_COMMANDS = [
  { cmd: "about",   label: "about"   },
  { cmd: "work",    label: "work"    },
  { cmd: "think",   label: "think"   },
  { cmd: "human",   label: "human"   },
  { cmd: "contact", label: "contact" },
];

function CommandDock({ onCommand }: { onCommand: (cmd: string) => void }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Glass pill container */}
      <div
        className="flex flex-wrap justify-center gap-1 px-3 py-2 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.62)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.85)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        {DOCK_COMMANDS.map(({ cmd, label }) => (
          <button
            key={cmd}
            onClick={() => onCommand(cmd)}
            className="group flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-150"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              color: "#666",
              background: "transparent",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.05)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--color-accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#666";
            }}
          >
            <span style={{ color: "var(--color-accent)", opacity: 0.5, fontSize: "0.65rem" }}>$</span>
            {label}
          </button>
        ))}
      </div>

      {/* Subtle hint */}
      <p
        className="text-xs select-none"
        style={{ color: "rgba(0,0,0,0.25)", fontFamily: "var(--font-mono)" }}
      >
        click to explore · or type in the terminal
      </p>
    </div>
  );
}
