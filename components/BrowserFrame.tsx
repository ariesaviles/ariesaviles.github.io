"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/projects";

interface BrowserFrameProps {
  project: Project | null;
  active: boolean;
}

export default function BrowserFrame({ project, active }: BrowserFrameProps) {
  const hasImage = project?.desktopImage;
  const url = project?.url?.replace("https://", "") ?? "ariesaviles.com";

  return (
    <motion.div
      className="flex-1 flex flex-col rounded-xl overflow-hidden shadow-lg border border-stone-200 bg-white min-w-0"
      animate={{ opacity: active ? 1 : 0.35, scale: active ? 1 : 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 px-3.5 py-2.5 bg-stone-100 border-b border-stone-200 shrink-0">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>

        {/* Address bar */}
        <div className="flex-1 bg-white border border-stone-200 rounded-md px-3 py-1 flex items-center gap-2 min-w-0">
          {/* Lock icon */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="text-stone-400 shrink-0"
          >
            <rect
              x="1.5"
              y="4.5"
              width="7"
              height="5"
              rx="1"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M3 4.5V3a2 2 0 0 1 4 0v1.5"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <AnimatePresence mode="wait">
            <motion.span
              key={url}
              className="text-[10px] text-stone-500 truncate font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {url}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Content area */}
      <div className="relative flex-1 bg-stone-50 overflow-hidden" style={{ minHeight: 0 }}>
        <AnimatePresence mode="wait">
          {hasImage ? (
            <motion.div
              key={project?.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={project!.desktopImage!}
                alt={project!.title}
                fill
                className="object-cover object-top"
                unoptimized
              />
            </motion.div>
          ) : (
            <motion.div
              key={project?.id ?? "empty"}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {project ? (
                <>
                  {/* Placeholder with project name */}
                  <div className="w-8 h-8 rounded-lg bg-stone-200 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-stone-500"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.4"
                      />
                      <rect
                        x="9"
                        y="2"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.7"
                      />
                      <rect
                        x="2"
                        y="9"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.7"
                      />
                      <rect
                        x="9"
                        y="9"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.4"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-stone-400 font-mono">
                    {project.title}
                  </p>
                </>
              ) : (
                <p className="text-xs text-stone-300 font-mono">
                  Hover a project
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
