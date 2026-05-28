"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/projects";

interface MobileFrameProps {
  project: Project | null;
  active: boolean;
}

export default function MobileFrame({ project, active }: MobileFrameProps) {
  const hasImage = project?.mobileImage;

  return (
    <motion.div
      className="relative shrink-0 flex flex-col"
      style={{ width: 148 }}
      animate={{ opacity: active ? 1 : 0.35, scale: active ? 1 : 0.97 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Phone shell */}
      <div
        className="relative flex flex-col rounded-[28px] overflow-hidden border-[6px] border-stone-800 bg-stone-800 shadow-xl flex-1"
        style={{ minHeight: 0 }}
      >
        {/* Side buttons — left */}
        <div className="absolute -left-[9px] top-16 w-1 h-7 rounded-l-sm bg-stone-700" />
        <div className="absolute -left-[9px] top-24 w-1 h-7 rounded-l-sm bg-stone-700" />
        {/* Power button — right */}
        <div className="absolute -right-[9px] top-20 w-1 h-9 rounded-r-sm bg-stone-700" />

        {/* Screen */}
        <div className="relative flex-1 bg-stone-50 overflow-hidden rounded-[22px] flex flex-col" style={{ minHeight: 0 }}>
          {/* Dynamic island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10 w-14 h-3 rounded-full bg-stone-800" />

          {/* Status bar */}
          <div className="flex items-center justify-between px-4 pt-1 pb-0.5 shrink-0 mt-6">
            <span className="text-[8px] font-semibold text-stone-900 font-mono">
              9:41
            </span>
            <div className="flex items-center gap-0.5">
              <div className="flex gap-px items-end h-2">
                {[2, 3, 4, 5].map((h, i) => (
                  <div
                    key={i}
                    className="w-0.5 rounded-sm bg-stone-900"
                    style={{ height: h }}
                  />
                ))}
              </div>
              <svg
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
                className="text-stone-900 ml-0.5"
              >
                <path
                  d="M0.5 2.5C1.5 1.2 2.7 0.5 4 0.5C5.3 0.5 6.5 1.2 7.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M2 4C2.7 3 3.3 2.5 4 2.5C4.7 2.5 5.3 3 6 4"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <circle cx="4" cy="5.2" r="0.6" fill="currentColor" />
              </svg>
              {/* Battery */}
              <div className="relative w-3.5 h-2 border border-stone-900 rounded-[1px] ml-0.5">
                <div className="absolute inset-[1px] right-[1px] bg-stone-900 rounded-[0.5px]" style={{ right: 1, width: "75%" }} />
                <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[1.5px] h-1 bg-stone-900 rounded-r-[1px]" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="relative flex-1 overflow-hidden" style={{ minHeight: 0 }}>
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
                    src={project!.mobileImage!}
                    alt={project!.title}
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={project?.id ?? "empty"}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {project ? (
                    <>
                      <div className="w-8 h-8 rounded-xl bg-stone-200 flex items-center justify-center">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="text-stone-500"
                        >
                          <rect
                            x="1"
                            y="1"
                            width="5"
                            height="8"
                            rx="1"
                            fill="currentColor"
                            opacity="0.5"
                          />
                          <rect
                            x="8"
                            y="1"
                            width="5"
                            height="5"
                            rx="1"
                            fill="currentColor"
                            opacity="0.8"
                          />
                          <rect
                            x="8"
                            y="8"
                            width="5"
                            height="5"
                            rx="1"
                            fill="currentColor"
                            opacity="0.4"
                          />
                        </svg>
                      </div>
                      <p className="text-[8px] text-stone-400 font-mono text-center leading-tight px-2">
                        {project.title}
                      </p>
                    </>
                  ) : (
                    <p className="text-[8px] text-stone-300 font-mono">
                      ——
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-2 shrink-0">
            <div className="w-10 h-1 rounded-full bg-stone-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
