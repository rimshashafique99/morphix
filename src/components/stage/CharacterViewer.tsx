"use client";

import { useEffect, useRef, useState } from "react";
import type { BackgroundId } from "@/types";
import { cn } from "@/lib/cn";
import { LivePreviewBadge } from "./LivePreviewBadge";
import { ViewerControls } from "./ViewerControls";
import { Character3D } from "./Character3D";

interface CharacterViewerProps {
  render: string;
  alt: string;
  backgroundId: BackgroundId;
  zoom: number;
  rotation: { x: number; y: number };
  onRotate: (rotation: { x: number; y: number }) => void;
  onWheelZoom: (deltaY: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function CharacterViewer({
  render,
  alt,
  backgroundId,
  zoom,
  rotation,
  onRotate,
  onWheelZoom,
  onZoomIn,
  onZoomOut,
  onReset,
}: CharacterViewerProps) {
  // Drag origin (pointer + rotation at mousedown); null when not dragging.
  const dragRef = useRef<{ x: number; y: number; rx: number; ry: number } | null>(
    null,
  );
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      onRotate({
        x: Math.max(-30, Math.min(30, dragRef.current.rx - dy * 0.4)),
        y: dragRef.current.ry + dx * 0.5,
      });
    };
    const onUp = () => {
      dragRef.current = null;
      setDragging(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [onRotate]);

  return (
    <div
      className={cn(
        "relative flex min-h-px flex-1 select-none items-center justify-center overflow-hidden rounded-[24px] border border-line",
        backgroundId === "soft" ? "bg-surface-100" : "bg-white",
        dragging ? "cursor-grabbing" : "cursor-grab",
      )}
      onMouseDown={(e) => {
        dragRef.current = {
          x: e.clientX,
          y: e.clientY,
          rx: rotation.x,
          ry: rotation.y,
        };
        setDragging(true);
      }}
      onWheel={(e) => onWheelZoom(e.deltaY)}
    >
      <LivePreviewBadge />

      {/* soft purple radial glow behind the character */}
      <div className="viewer-glow pointer-events-none absolute left-1/2 top-1/2 size-[560px] max-h-[90%] max-w-[90%] -translate-x-1/2 -translate-y-1/2" />

      <Character3D src={render} alt={alt} rotation={rotation} scale={zoom / 100} />

      <ViewerControls
        zoom={zoom}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onReset={onReset}
      />
    </div>
  );
}
