"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
}

const MAX_OFFSET = 10; // px, max magnetic pull
const TRIGGER_PADDING = 24; // px, extra radius beyond the element's own bounds

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function MagneticButton({ children }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const bounds = ref.current?.getBoundingClientRect();
      if (!bounds) return;

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const relativeX = event.clientX - centerX;
      const relativeY = event.clientY - centerY;

      const triggerRadiusX = bounds.width / 2 + TRIGGER_PADDING;
      const triggerRadiusY = bounds.height / 2 + TRIGGER_PADDING;

      const isNear =
        Math.abs(relativeX) < triggerRadiusX && Math.abs(relativeY) < triggerRadiusY;

      if (isNear) {
        x.set(clamp((relativeX / triggerRadiusX) * MAX_OFFSET, -MAX_OFFSET, MAX_OFFSET));
        y.set(clamp((relativeY / triggerRadiusY) * MAX_OFFSET, -MAX_OFFSET, MAX_OFFSET));
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.span
      ref={ref}
      style={{ display: "inline-block", x: springX, y: springY }}
    >
      {children}
    </motion.span>
  );
}
