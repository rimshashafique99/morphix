"use client";

import type { BackgroundId } from "@/types";
import { StageHeader } from "@/components/stage/StageHeader";
import { CharacterViewer } from "@/components/stage/CharacterViewer";

interface StageProps {
  title: string;
  subtitle: string;
  render: string;
  alt: string;
  backgroundId: BackgroundId;
  zoom: number;
  rotation: { x: number; y: number };
  onShare: () => void;
  onRotate: (rotation: { x: number; y: number }) => void;
  onWheelZoom: (deltaY: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function Stage({
  title,
  subtitle,
  render,
  alt,
  backgroundId,
  zoom,
  rotation,
  onShare,
  onRotate,
  onWheelZoom,
  onZoomIn,
  onZoomOut,
  onReset,
}: StageProps) {
  return (
    <div className="flex min-w-px flex-1 flex-col gap-4">
      <StageHeader title={title} subtitle={subtitle} onShare={onShare} />
      <CharacterViewer
        render={render}
        alt={alt}
        backgroundId={backgroundId}
        zoom={zoom}
        rotation={rotation}
        onRotate={onRotate}
        onWheelZoom={onWheelZoom}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onReset={onReset}
      />
    </div>
  );
}
