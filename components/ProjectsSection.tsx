"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { projects, Project } from "@/lib/projects";
import DeviceStage from "./DeviceStage";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-xs font-mono tracking-widest text-stone-400 uppercase">
          Selected Work
        </span>
        <div className="flex-1 h-px bg-stone-200" />
        <span className="text-xs font-mono text-stone-300">
          {String(projects.length).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Two-column layout */}
      <div className="flex items-start gap-12 lg:gap-20">
        {/* LEFT — Project list */}
        <div
          ref={listRef}
          className="w-full lg:w-2/5 shrink-0 flex flex-col"
          onMouseLeave={() => setActiveProject(null)}
        >
          {projects.map((project, i) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={i}
              isActive={activeProject?.id === project.id}
              onHover={setActiveProject}
            />
          ))}
        </div>

        {/* RIGHT — Device Stage (sticky) */}
        <div className="hidden lg:flex flex-1 sticky top-20 pt-2">
          <DeviceStage activeProject={activeProject} />
        </div>
      </div>
    </section>
  );
}

interface ProjectItemProps {
  project: Project;
  index: number;
  isActive: boolean;
  onHover: (p: Project | null) => void;
}

function ProjectItem({ project, index, isActive, onHover }: ProjectItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className={`group relative py-7 border-b border-stone-200 transition-all duration-300 ${
          isActive ? "pl-4" : "pl-0 hover:pl-4"
        }`}
        onMouseEnter={() => onHover(project)}
        data-cursor-hover
      >
        {/* Active left bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-stone-900 rounded-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isActive ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ originY: 0 }}
        />

        {/* Index + title row */}
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-mono text-stone-300 shrink-0 w-5">
            {String(project.index).padStart(2, "0")}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3
                className={`text-base font-semibold tracking-tight transition-colors duration-200 ${
                  isActive ? "text-stone-900" : "text-stone-700 group-hover:text-stone-900"
                }`}
              >
                {project.title}
              </h3>
              {/* Arrow — slides in on hover */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                transition={{ duration: 0.25 }}
                className="shrink-0"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-stone-900"
                >
                  <path
                    d="M2 12L12 2M12 2H5M12 2V9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>

            <p
              className={`text-sm mt-0.5 transition-colors duration-200 ${
                isActive ? "text-stone-500" : "text-stone-400"
              }`}
            >
              {project.tagline}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
