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

/** Base on-screen size of the character box at 100% zoom. */
const BASE_W = 420;
const BASE_H = 600;
/**
 * The character is rasterized into a texture this many times larger than its
 * 100% on-screen size, then the zoom transform only ever scales that texture
 * DOWN (never up). Downsampling a texture stays crisp; upsampling is what
 * blurs — so the character is sharp at every zoom level and during rotation.
 * 2× is chosen so that at the 200% zoom cap the texture is shown ~1:1.
 */
const RENDER_SCALE = 2;
const BOX_W = BASE_W * RENDER_SCALE;
const BOX_H = BASE_H * RENDER_SCALE;

/**
 * Fake-3D character viewer: a flat PNG given depth via CSS 3D transforms.
 * - Infinite idle "float" loop.
 * - Drag-driven rotateX/rotateY (passed in from the canvas).
 * - A high-res render box (see RENDER_SCALE) keeps the image crisp at any zoom.
 * - A light highlight overlay whose position tracks rotateY.
 * - A contact shadow + ground glow that react to rotation.
 *
 * Ported from the Figma Make prototype's OliverCharacter, dropping its
 * `url(#removeWhiteBg)` filter — our renders are already transparent.
 */
export function Character3D({ src, alt, rotation, scale }: Character3DProps) {
  // `scale` is zoom/100. The render box already lives at RENDER_SCALE, so the
  // visible transform is the remainder — always ≤ 1, i.e. a crisp downscale.
  const visualScale = scale / RENDER_SCALE;
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
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Drag rotation (no scale here — see note on the main <img>) */}
        <motion.div
          className="relative flex size-full items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
          animate={{ rotateX: rotation.x, rotateY: rotation.y }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {/*
            High-res render box. The image is rasterized at BOX_W×BOX_H
            (RENDER_SCALE× the on-screen size) and the zoom is applied as a
            downscale (visualScale ≤ 1), so the character never magnifies a
            low-res texture — it stays crisp at every zoom level and while
            rotating.
          */}
          <motion.div
            className="relative"
            style={{
              width: BOX_W,
              height: BOX_H,
              transformStyle: "preserve-3d",
            }}
            animate={{ scale: visualScale }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Main character (front) */}
            <motion.img
              key={src}
              src={src}
              alt={alt}
              draggable={false}
              decoding="async"
              initial={{ opacity: 0, rotateY: -10 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 size-full object-contain"
              style={{
                // No CSS filter / will-change here — keeping the <img> a
                // "directly composited image" lets the GPU sample the full-res
                // source bitmap into this high-res render box.
                z: 40,
                backfaceVisibility: "hidden",
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
      </motion.div>
    </div>
  );
}
