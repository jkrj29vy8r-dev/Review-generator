"use client";

import { useRef, useCallback, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glowColor?: string;
  disabled?: boolean;
}

export function TiltCard({
  children,
  className,
  tiltAmount = 8,
  glowColor = "rgba(97,114,243,0.3)",
  disabled = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [disabled, rawX, rawY, glowX, glowY]);

  const handleMouseEnter = useCallback(() => {
    if (!disabled) scale.set(1.02);
  }, [disabled, scale]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    glowX.set(50);
    glowY.set(50);
    scale.set(1);
  }, [rawX, rawY, glowX, glowY, scale]);

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${glowColor} 0%, transparent 60%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
    >
      {/* Spotlight glow */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{ background: glowBackground }}
        />
      )}
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
