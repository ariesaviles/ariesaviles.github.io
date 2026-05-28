"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorState {
  hovering: boolean;
  clicking: boolean;
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<CursorState>({
    hovering: false,
    clicking: false,
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot follows cursor exactly
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

  // Ring follows with lag
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setState((s) => ({ ...s, clicking: true }));
    const handleMouseUp = () => setState((s) => ({ ...s, clicking: false }));

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor-hover], input, textarea, select, label"
      );
      setState((s) => ({ ...s, hovering: !!interactive }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Only render on pointer-capable devices
  if (!mounted) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-stone-900"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: state.hovering ? 0 : state.clicking ? 8 : 6,
          height: state.hovering ? 0 : state.clicking ? 8 : 6,
          opacity: state.hovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-stone-900"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: state.hovering ? 44 : state.clicking ? 28 : 36,
          height: state.hovering ? 44 : state.clicking ? 28 : 36,
          opacity: state.clicking ? 0.4 : 0.5,
          borderColor: state.hovering
            ? "rgb(28 25 23)"
            : "rgb(120 113 108)",
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
