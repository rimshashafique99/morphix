"use client";

import { motion, useMotionValue, useTransform } from "motion/react";

interface Character3DProps {
  src: string;
  alt: string;
  /** Drag-driven tilt in degrees. */
  rotation: { x: number; y: number };
  /** Zoom as a multiplier (zoom% / 100). */
  scale: number;
}

/**
 * Fake-3D character viewer: a flat PNG given depth via CSS 3D transforms.
 * - Infinite idle "float" loop.
 * - Drag-driven rotateX/rotateY (passed in from the canvas).
 * - translateZ depth stack: blurred shadow copy behind, main image in front,
 *   and a light highlight overlay whose position tracks rotateY.
 * - A contact shadow + ground glow that react to rotation.
 *
 * Ported from the Figma Make prototype's OliverCharacter, dropping its
 * `url(#removeWhiteBg)` filter — our renders are already transparent.
 */
export function Character3D({ src, alt, rotation, scale }: Character3DProps) {
  const ry = useMotionValue(rotation.y);
  ry.set(rotation.y);
  const highlight = useTransform(
    ry,
    (v) =>
      `radial-gradient(circle at ${50 + v * 0.6}% 30%, rgba(255,255,255,0.35), transparent 45%)`,
  );
  const shadowSkew = rotation.y * 0.25;
  const shadowScaleX = Math.max(0.5, 1 - Math.abs(rotation.y) * 0.004);

  return (
    <div
      className="relative max-h-full max-w-full"
      style={{ width: 420, height: 600, perspective: 1600 }}
    >
      {/* 3D ground glow plane */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: 40,
          width: 520,
          height: 520,
          transformStyle: "preserve-3d",
          transform: "translateX(-50%) rotateX(72deg)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,44,255,0.07), transparent 60%)",
          }}
        />
      </div>

      {/* Contact shadow */}
      <motion.div
        className="absolute left-1/2 rounded-[50%]"
        style={{
          bottom: 26,
          width: 240,
          height: 28,
          x: "-50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.32), rgba(0,0,0,0))",
          filter: "blur(8px)",
          skewX: shadowSkew,
          scaleX: shadowScaleX,
        }}
        animate={{ opacity: 0.95 }}
        transition={{ type: "spring", stiffness: 160, damping: 14 }}
      />

      {/* Idle float loop */}
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Drag rotation + zoom */}
        <motion.div
          className="relative flex size-full items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: rotation.x, rotateY: rotation.y, scale }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {/* Depth shadow copy (behind) */}
          <motion.img
            key={`shadow-${src}`}
            src={src}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 size-full object-contain"
            style={{
              filter: "brightness(0) blur(10px)",
              opacity: 0.25,
              z: -60,
              y: 20,
              scale: 0.96,
            }}
          />

          {/* Main character (front) */}
          <motion.img
            key={src}
            src={src}
            alt={alt}
            draggable={false}
            initial={{ opacity: 0, scale: 0.94, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 size-full object-contain"
            style={{
              filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.22))",
              z: 40,
            }}
          />

          {/* Lighting highlight that tracks rotation */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: highlight,
              mixBlendMode: "soft-light",
              z: 50,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
