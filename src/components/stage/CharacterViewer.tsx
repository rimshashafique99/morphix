"use client";

import Image from "next/image";
import type { BackgroundId } from "@/types";
import { cn } from "@/lib/cn";
import { LivePreviewBadge } from "./LivePreviewBadge";
import { ViewerControls } from "./ViewerControls";

interface CharacterViewerProps {
  render: string;
  alt: string;
  backgroundId: BackgroundId;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function CharacterViewer({
  render,
  alt,
  backgroundId,
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
}: CharacterViewerProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-px flex-1 items-center justify-center overflow-hidden rounded-[24px] border border-line",
        backgroundId === "soft" ? "bg-surface-100" : "bg-white",
      )}
    >
      <LivePreviewBadge />

      {/* soft purple radial glow behind the character */}
      <div className="viewer-glow pointer-events-none absolute left-1/2 top-1/2 size-[560px] max-h-[90%] max-w-[90%] -translate-x-1/2 -translate-y-1/2" />

      <div
        className="relative transition-transform duration-200 ease-out"
        style={{ transform: `scale(${zoom / 100})` }}
      >
        <Image
          src={render}
          alt={alt}
          width={419}
          height={629}
          priority
          className="h-auto max-h-[70vh] w-auto object-contain"
        />
      </div>

      <ViewerControls
        zoom={zoom}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onReset={onReset}
      />
    </div>
  );
}
