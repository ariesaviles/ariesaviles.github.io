import { useState, type MutableRefObject, type ReactNode } from "react";

export type RunRef = MutableRefObject<(cmd: string) => void>;

export const KNOWN_COMMANDS = [
  "help", "about", "whoami", "work", "think", "human", "contact", "clear",
  "sudo hire me", "rm -rf .impostor-syndrome", "git log", "vim", "neofetch",
  "man aries", "ls", "ls secrets/", "pwd", "uname -a",
];

// ─── Tiny styled-span helper ─────────────────────────────────────────────────

function S({ c, children }: { c: "accent" | "muted" | "text" | "green" | "dim"; children: ReactNode }) {
  const colors = {
    accent: "var(--color-accent)",
    muted:  "var(--color-muted)",
    text:   "var(--color-text)",
    green:  "#4ade80",
    dim:    "#2a2a2a",
  } as const;
  return <span style={{ color: colors[c] }}>{children}</span>;
}

// ─── Command registry ─────────────────────────────────────────────────────────

export function getCommandOutput(raw: string, runRef: RunRef): ReactNode | null {
  const cmd = raw.trim().toLowerCase();
  const run = (c: string) => runRef.current(c);

  switch (cmd) {
    case "help":
    case "--help":
    case "aries --help":
      return <HelpOutput run={run} />;

    case "about":
    case "whoami":
    case "aries about":
      return <AboutOutput />;

    case "work":
    case "projects":
    case "aries work":
      return <WorkOutput />;

    case "think":
    case "opinions":
    case "aries think":
      return <ThinkOutput />;

    case "human":
    case "personal":
    case "aries human":
      return <HumanOutput />;

    case "contact":
    case "aries contact":
      return <ContactOutput />;

    case "sudo hire me":
    case "hire me":
      return <HireOutput />;

    case "sudo":
      return (
        <div className="mt-1 space-y-1">
          <p><S c="muted">[sudo] password for hiring-manager: </S><S c="dim">**********</S></p>
          <p><S c="muted">Sorry, user hiring-manager is not in the sudoers file.</S></p>
          <p><S c="muted">This incident will be reported.</S></p>
          <p className="mt-2 text-xs"><S c="accent">hint:</S><S c="muted"> try </S><S c="accent">sudo hire me</S></p>
        </div>
      );

    case "rm -rf .impostor-syndrome":
    case "rm -rf impostor-syndrome":
      return <DeleteImpostorOutput />;

    case "git log":
    case "git log --all":
    case "git log --oneline":
      return <GitLogOutput />;

    case "vim":
    case "vi":
    case "nano":
      return <VimOutput />;

    case "neofetch":
      return <NeofetchOutput />;

    case "man aries":
    case "man":
      return <ManOutput />;

    case "ls":
    case "ls -la":
    case "ls -l":
      return <LsOutput />;

    case "ls secrets/":
    case "ls secrets":
      return (
        <div className="mt-1 space-y-1">
          <p><S c="muted">ls: cannot open directory 'secrets/': </S><S c="accent">Permission denied</S></p>
          <p className="text-xs mt-1"><S c="muted">1 item: </S><S c="text">definitely_not_salary.txt</S></p>
        </div>
      );

    case "pwd":
      return <p className="mt-1"><S c="text">/home/aries/universe/earth/internet/portfolio</S></p>;

    case "uname -a":
    case "uname":
      return <p className="mt-1"><S c="text">Aries-OS 2.6.0 portfolio SMP curiosity-driven x86_64 GNU/vibes</S></p>;

    case "exit":
    case "logout":
    case "quit":
      return (
        <div className="mt-1 space-y-1">
          <p><S c="muted">not so fast.</S></p>
          <p><S c="muted">type </S><S c="accent">contact</S><S c="muted"> first.</S></p>
        </div>
      );

    case "clear":
      return null;

    default:
      return null;
  }
}

// ─── Command outputs ──────────────────────────────────────────────────────────

function HelpOutput({ run }: { run: (cmd: string) => void }) {
  const cmds = [
    { name: "about",   desc: "who i am and what i'm working on" },
    { name: "work",    desc: "things i've built"                },
    { name: "think",   desc: "how i see engineering"            },
    { name: "human",   desc: "beyond the keyboard"              },
    { name: "contact", desc: "let's talk"                       },
    { name: "clear",   desc: "clear the terminal"               },
  ];
  return (
    <div className="mt-2 space-y-1">
      <p><S c="muted">available commands</S></p>
      <p style={{ color: "var(--color-border)", fontSize: "0.7rem" }}>──────────────────────────────────</p>
      {cmds.map(({ name, desc }) => (
        <div key={name} className="flex gap-4">
          <button
            onClick={() => run(name)}
            className="w-16 text-left hover:underline shrink-0"
            style={{ color: "var(--color-accent)" }}
          >
            {name}
          </button>
          <S c="muted">{desc}</S>
        </div>
      ))}
      <p className="mt-3" style={{ color: "var(--color-muted)", fontSize: "0.7rem" }}>
        easter eggs exist. explore.
      </p>
    </div>
  );
}

function AboutOutput() {
  return (
    <div className="mt-2 space-y-1">
      <p style={{ color: "var(--color-text)", fontWeight: 600 }}>Aries Aviles</p>
      <p style={{ color: "var(--color-border)", fontSize: "0.7rem" }}>──────────────────────────────────</p>
      <p><S c="text">Sr. Fullstack Engineer</S></p>
      <p><S c="muted">5+ yrs · startups · independent work</S></p>
      <div className="pt-2 space-y-1">
        <p><S c="muted">{"currently building  "}</S><S c="text">this portfolio</S></p>
        <p><S c="muted">{"open to             "}</S><S c="accent">the right opportunity ●</S></p>
      </div>
    </div>
  );
}

function WorkOutput() {
  return (
    <div className="mt-2 space-y-3">
      <p><S c="muted">ls projects/</S></p>
      <div className="space-y-1 pl-2">
        {[
          ["cross-functional-launch/", "led x-func team, shipped ahead of schedule"],
          ["web3-hackathon-tooling/",  "award-winning wallet tax tool"             ],
          ["cross-platform-suite/",   "web + mobile (iOS & Android)"              ],
        ].map(([name, desc]) => (
          <div key={name} className="flex flex-wrap gap-3">
            <S c="accent">├── {name}</S>
            <S c="muted">{desc}</S>
          </div>
        ))}
      </div>
      <p><S c="muted">cat projects/cross-functional-launch/</S></p>
      <div className="pl-2 space-y-1">
        {[
          ["Problem",  "high-stakes launch, misaligned stakeholders, tight deadline",      "muted" ],
          ["Approach", "daily standups w/ explicit ownership, shared decision log",        "muted" ],
          ["Tradeoff", "communication over velocity in sprint 1 — bought trust for 2 & 3","muted" ],
          ["Outcome",  "✓ shipped early · client expanded engagement",                    "accent"],
        ].map(([label, text, color]) => (
          <div key={label} className="flex flex-wrap gap-2">
            <span className="w-20 shrink-0" style={{ color: "var(--color-muted)" }}>{label}</span>
            <S c={color as "accent" | "muted"}>{text}</S>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThinkOutput() {
  const opinions = [
    "shipping early isn't luck — it's over-communication in sprint one.",
    "teaching juniors made me a better engineer, not a slower one.",
    "the best architecture decision is often the one you defer.",
    "cross-platform is a product problem, not a technical one.",
  ];
  return (
    <div className="mt-2 space-y-1">
      <p><S c="muted">cat opinions.txt</S></p>
      <p style={{ color: "var(--color-border)", fontSize: "0.7rem" }}>──────────────────────────────────</p>
      {opinions.map((op, i) => (
        <div key={i} className="flex gap-3">
          <S c="muted">[{i + 1}]</S>
          <S c="text">{op}</S>
        </div>
      ))}
    </div>
  );
}

function HumanOutput() {
  return (
    <div className="mt-2 space-y-1">
      <p><S c="muted">cat /etc/aries/personal</S></p>
      <p style={{ color: "var(--color-border)", fontSize: "0.7rem" }}>──────────────────────────────────</p>
      {[
        ["interests", "woodworking · piano · cooking · figure drawing"],
        ["",          "soccer · art history · building small apps"     ],
        ["community", "local makerspace volunteer"                      ],
        ["approach",  "active listening · continuous learning"          ],
      ].map(([k, v], i) => (
        <div key={i} className="flex gap-3">
          <span className="w-20 shrink-0" style={{ color: "var(--color-muted)" }}>{k}</span>
          <S c="text">{v}</S>
        </div>
      ))}
    </div>
  );
}

function ContactOutput() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("ariesaviles.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-3 items-center flex-wrap">
        <span className="w-16 shrink-0" style={{ color: "var(--color-muted)" }}>email</span>
        <S c="text">ariesaviles.dev@gmail.com</S>
        <button
          onClick={copy}
          className="text-xs px-2 py-0.5 border rounded transition-colors"
          style={{ color: "var(--color-muted)", borderColor: "var(--color-border)" }}
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <div className="flex gap-3">
        <span className="w-16 shrink-0" style={{ color: "var(--color-muted)" }}>github</span>
        <a
          href="https://github.com/rivitt"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--color-text)" }}
          className="hover:underline"
        >
          github.com/rivitt
        </a>
      </div>
      <div className="flex gap-3 pt-1">
        <span className="w-16 shrink-0" style={{ color: "var(--color-muted)" }}>status</span>
        <span style={{ color: "#4ade80" }}>● open to work</span>
      </div>
    </div>
  );
}

function HireOutput() {
  return (
    <div className="mt-1 space-y-1">
      <p><S c="muted">[sudo] password for hiring-manager: </S><S c="dim">**********</S></p>
      <p><S c="muted">authenticating</S></p>
      <p><S c="green">✓ Permission granted.</S></p>
      <p className="pt-1">
        <S c="muted">opening calendar</S><S c="muted">...</S><S c="accent">  done</S>
      </p>
      <p>
        <S c="text">● ready when you are — type </S><S c="accent">contact</S>
      </p>
    </div>
  );
}

function DeleteImpostorOutput() {
  return (
    <div className="mt-1 space-y-1">
      <p><S c="muted">removing .impostor-syndrome...</S></p>
      <p>
        <S c="muted">[</S>
        <S c="accent">████████████████████</S>
        <S c="muted">] 100%</S>
      </p>
      <p><S c="green">✓ deleted successfully.</S></p>
      <p><S c="text">you were always good enough.</S></p>
    </div>
  );
}

function GitLogOutput() {
  const commits = [
    { hash: "a7f3d2e", date: "2026", msg: "led cross-functional launch → shipped early" },
    { hash: "3bc1e8f", date: "2024", msg: "led product scoping, mentored junior engineers" },
    { hash: "9de4a1c", date: "2022", msg: "started independent contracting alongside startup work" },
    { hash: "2f7b0e3", date: "2021", msg: "first startup — built full-stack platform from ground up" },
  ];
  return (
    <div className="mt-2 space-y-3">
      {commits.map(({ hash, date, msg }) => (
        <div key={hash}>
          <p><S c="accent">commit {hash}</S></p>
          <p><S c="muted">Author: Aries Aviles  Date: {date}</S></p>
          <p className="pl-4 pt-0.5"><S c="text">{msg}</S></p>
        </div>
      ))}
    </div>
  );
}

function VimOutput() {
  return (
    <div className="mt-1 space-y-0.5" style={{ fontSize: "0.82rem" }}>
      {["~", "~", "~"].map((l, i) => <p key={i}><S c="muted">{l}</S></p>)}
      <p className="text-center pt-1"><S c="accent">VIM — Vi IMproved</S></p>
      <p className="text-center"><S c="muted">trying :q  — nope</S></p>
      <p className="text-center"><S c="muted">trying :q! — nope</S></p>
      <p className="text-center"><S c="muted">trying :wq — nope</S></p>
      <p className="text-center pt-2"><S c="text">have you tried closing the tab?</S></p>
      <p className="pt-2"><S c="muted">-- INSERT panic --</S></p>
    </div>
  );
}

function NeofetchOutput() {
  const specs = [
    ["OS",         "Aries OS v2.6 (coffee-powered)"],
    ["Host",       "The Internet"                  ],
    ["Shell",      "zsh + good taste"              ],
    ["Resolution", "whatever fits"                 ],
    ["Theme",      "dark (always)"                 ],
    ["Terminal",   "this one"                      ],
    ["CPU",        "overclocked on curiosity"      ],
    ["Memory",     "not enough"                    ],
  ];
  return (
    <div className="mt-2 flex gap-8 flex-wrap items-start">
      <pre
        style={{ color: "var(--color-accent)", lineHeight: 1.5, fontSize: "0.8rem" }}
      >{`      .:::.
    .:::::::.
  .::::::::::.
 ::::  ::::::::
 ::::  ::::::::
  ':::::::::::'
    '::::::::'
      ':::::'
        ':'    `}</pre>
      <div className="space-y-1 self-center" style={{ fontSize: "0.82rem" }}>
        <p><S c="accent">aries</S><S c="muted">@portfolio</S></p>
        <p style={{ color: "var(--color-border)", fontSize: "0.7rem" }}>──────────────────</p>
        {specs.map(([k, v]) => (
          <p key={k}>
            <S c="accent">{k.padEnd(12)}</S>
            <S c="text">{v}</S>
          </p>
        ))}
      </div>
    </div>
  );
}

function ManOutput() {
  return (
    <div className="mt-2 space-y-1" style={{ fontSize: "0.82rem" }}>
      <div className="flex justify-between">
        <S c="muted">ARIES(1)</S>
        <S c="muted">User Commands</S>
        <S c="muted">ARIES(1)</S>
      </div>
      {[
        ["NAME",        "aries — sr. fullstack engineer, builder, occasional woodworker"],
        ["SYNOPSIS",    "aries [--help] [--work] [--think] [--contact]"],
        ["DESCRIPTION", "Fullstack engineer, 5+ yrs shipping at startups and as an independent\n          contractor. Known for cross-functional communication, end-to-end\n          ownership, mentoring, and occasionally excellent cooking."],
        ["BUGS",        "Cannot stop building side projects. Stays up too late woodworking."],
      ].map(([section, body]) => (
        <div key={section} className="pt-1">
          <p><S c="text">{section}</S></p>
          <p className="pl-6 whitespace-pre-wrap"><S c="muted">{body}</S></p>
        </div>
      ))}
      <div className="flex justify-between pt-2">
        <S c="muted">Aries OS 2.6</S>
        <S c="muted">May 2026</S>
        <S c="muted">ARIES(1)</S>
      </div>
    </div>
  );
}

function LsOutput() {
  const entries = [
    ["drwxr-xr-x", "projects/"],
    ["drwxr-xr-x", "personal/"],
    ["-rw-r--r--", "opinions.txt"],
    ["-rw-r--r--", "contact.txt"],
    ["-rw-------", "secrets/"],
  ];
  return (
    <div className="mt-1 space-y-0.5">
      {entries.map(([perms, name]) => (
        <p key={name}>
          <S c="muted">{perms}  aries  </S>
          <S c={name === "secrets/" ? "muted" : "accent"}>{name}</S>
          {name === "secrets/" && <S c="muted">  [permission denied]</S>}
        </p>
      ))}
    </div>
  );
}
