"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/projects";
import BrowserFrame from "./BrowserFrame";
import MobileFrame from "./MobileFrame";

interface DeviceStageProps {
  activeProject: Project | null;
}

export default function DeviceStage({ activeProject }: DeviceStageProps) {
  const showBrowser =
    !activeProject || activeProject.type === "web" || activeProject.type === "both";
  const showMobile =
    !activeProject || activeProject.type === "mobile" || activeProject.type === "both";

  const browserActive =
    !activeProject || activeProject.type === "web" || activeProject.type === "both";
  const mobileActive =
    !activeProject || activeProject.type === "mobile" || activeProject.type === "both";

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Project meta */}
      <div className="h-16 flex flex-col justify-end">
        <motion.div
          key={activeProject?.id ?? "idle"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeProject ? (
            <>
              <div className="flex items-center gap-2 mb-1">
                <TypeBadge type={activeProject.type} />
                <span className="text-xs text-stone-400 font-mono">
                  {activeProject.year}
                </span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-400">{activeProject.role}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono text-stone-500 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-xs text-stone-300 font-mono">
              — hover a project to preview
            </p>
          )}
        </motion.div>
      </div>

      {/* Frames */}
      <div className="flex items-end gap-3 w-full" style={{ height: 340 }}>
        {showBrowser && (
          <BrowserFrame project={activeProject} active={browserActive} />
        )}
        {showMobile && (
          <MobileFrame project={activeProject} active={mobileActive} />
        )}
      </div>

      {/* Links */}
      <motion.div
        key={`links-${activeProject?.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: activeProject ? 1 : 0 }}
        className="flex items-center gap-4"
      >
        {activeProject?.url && (
          <a
            href={activeProject.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-stone-900 border-b border-stone-300 hover:border-stone-900 transition-colors pb-0.5"
            data-cursor-hover
          >
            Live site
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 8.5L8.5 1.5M8.5 1.5H4M8.5 1.5V6"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
        {activeProject?.github && (
          <a
            href={activeProject.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors"
            data-cursor-hover
          >
            GitHub
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 8.5L8.5 1.5M8.5 1.5H4M8.5 1.5V6"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </motion.div>
    </div>
  );
}

function TypeBadge({ type }: { type: Project["type"] }) {
  const map = {
    web: { label: "WEB", color: "text-blue-600 bg-blue-50 border-blue-200" },
    mobile: {
      label: "MOBILE",
      color: "text-violet-600 bg-violet-50 border-violet-200",
    },
    both: {
      label: "FULL-STACK",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
  };
  const { label, color } = map[type];
  return (
    <span
      className={`text-[9px] font-mono font-semibold tracking-widest px-1.5 py-0.5 rounded border ${color}`}
    >
      {label}
    </span>
  );
}
