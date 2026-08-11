"use client";

import { useEffect, useState } from "react";
import { motion, MotionValue, useMotionValueEvent, useTransform } from "framer-motion";

const ACCENT_HEX: Record<"blue" | "orange" | "purple", string> = {
  blue: "#3D5AFE",
  orange: "#FF6B35",
  purple: "#8B5CF6",
};

interface WorkTimelineProps {
  progress: MotionValue<number>;
}

export default function WorkTimeline({ progress }: WorkTimelineProps) {
  const fillHeight = useTransform(progress, [0, 1], ["0%", "100%"]);
  const cometTop = useTransform(progress, [0, 1], ["0%", "100%"]);
  const cometOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2">
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,20,26,0.11)" }} />
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{
          height: fillHeight,
          background:
            "linear-gradient(to bottom, #3D5AFE 0%, #FF6B35 52%, #8B5CF6 100%)",
        }}
      />
      <motion.div
        className="absolute left-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{
          top: cometTop,
          opacity: cometOpacity,
          boxShadow:
            "0 0 6px 2px rgba(255,107,53,0.85), 0 0 16px 6px rgba(139,92,246,0.55), 0 0 28px 12px rgba(61,90,254,0.35)",
        }}
      />
    </div>
  );
}

interface TimelineDotProps {
  progress: MotionValue<number>;
  threshold: number;
  accent: "blue" | "orange" | "purple";
}

export function TimelineDot({ progress, threshold, accent }: TimelineDotProps) {
  const lit = useTransform(progress, [Math.max(threshold - 0.015, 0), threshold], [0, 1]);
  const [isLit, setIsLit] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  useMotionValueEvent(lit, "change", (value) => {
    if (value >= 1 && !isLit) {
      setIsLit(true);
      setShowPulse(true);
    }
  });

  useEffect(() => {
    if (!showPulse) return;
    const timeout = setTimeout(() => setShowPulse(false), 550);
    return () => clearTimeout(timeout);
  }, [showPulse]);

  const accentColor = ACCENT_HEX[accent];

  return (
    <div className="relative flex h-full items-start justify-center pt-1">
      <div className="relative">
        {showPulse && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{ border: `1.5px solid ${accentColor}` }}
            initial={{ scale: 0.4, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
        <span
          className="relative block h-[13px] w-[13px] rounded-full border transition-colors duration-300"
          style={{
            backgroundColor: isLit ? accentColor : "#FAFAF7",
            borderColor: isLit ? accentColor : "rgba(107,107,101,0.4)",
            boxShadow: isLit ? `0 0 0 4px ${hexToRgba(accentColor, 0.18)}` : "none",
          }}
        />
      </div>
    </div>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
