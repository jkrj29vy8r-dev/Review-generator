"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function HolographicGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 420;
    const H = 420;
    canvas.width = W;
    canvas.height = H;
    const cx = W / 2;
    const cy = H / 2;
    const R = 160;

    // Lat/lon grid points (approximate globe)
    const DOTS: [number, number][] = [];
    for (let lat = -90; lat <= 90; lat += 12) {
      const r = Math.cos((lat * Math.PI) / 180) * R;
      const steps = Math.max(1, Math.floor((2 * Math.PI * r) / 18));
      for (let i = 0; i < steps; i++) {
        const lon = (i / steps) * 360 - 180;
        DOTS.push([lat, lon]);
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      rotationRef.current += 0.003;

      // Outer glow rings
      for (let i = 3; i > 0; i--) {
        const gradient = ctx.createRadialGradient(cx, cy, R - 10, cx, cy, R + i * 25);
        gradient.addColorStop(0, `rgba(97,114,243,${0.06 / i})`);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, R + i * 25, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Equator ring
      const ringGrad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      ringGrad.addColorStop(0, "transparent");
      ringGrad.addColorStop(0.3, "rgba(97,114,243,0.5)");
      ringGrad.addColorStop(0.7, "rgba(139,92,246,0.5)");
      ringGrad.addColorStop(1, "transparent");
      ctx.save();
      ctx.scale(1, 0.28);
      ctx.beginPath();
      ctx.arc(cx, cy / 0.28, R * 1.05, 0, Math.PI * 2);
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Draw dots
      DOTS.forEach(([lat, lon]) => {
        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = ((lon + rotationRef.current * (180 / Math.PI)) * Math.PI) / 180;
        const x3 = R * Math.sin(phi) * Math.cos(theta);
        const y3 = R * Math.cos(phi);
        const z3 = R * Math.sin(phi) * Math.sin(theta);

        if (z3 < 0) return; // Back face culling

        const screenX = cx + x3;
        const screenY = cy - y3;
        const depth = (z3 + R) / (2 * R);
        const size = 1.2 + depth * 0.8;
        const opacity = 0.15 + depth * 0.65;

        // Color gradient from brand to violet
        const r = Math.round(97 + depth * (139 - 97));
        const g = Math.round(114 + depth * (92 - 114));
        const b = Math.round(243 + depth * (246 - 243));

        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.fill();
      });

      // Atmosphere glow
      const atmoGrad = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.15);
      atmoGrad.addColorStop(0, "transparent");
      atmoGrad.addColorStop(0.5, "rgba(97,114,243,0.04)");
      atmoGrad.addColorStop(1, "rgba(6,182,212,0.06)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = atmoGrad;
      ctx.fill();

      // Highlight
      const hlGrad = ctx.createRadialGradient(cx - 50, cy - 50, 0, cx, cy, R);
      hlGrad.addColorStop(0, "rgba(255,255,255,0.08)");
      hlGrad.addColorStop(0.4, "rgba(255,255,255,0.02)");
      hlGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = hlGrad;
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <canvas
        ref={canvasRef}
        className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px]"
        style={{ imageRendering: "pixelated" }}
        aria-hidden="true"
      />
      {/* Glow base */}
      <div className="absolute inset-0 -z-10 rounded-full blur-[60px] bg-brand-500/20 scale-75" />
    </motion.div>
  );
}
