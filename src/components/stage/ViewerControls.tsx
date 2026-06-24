"use client";

import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

interface ViewerControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ViewerControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
}: ViewerControlsProps) {
  return (
    <div
      className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="flex h-[47px] items-center gap-5 rounded-[12px] border border-line bg-white px-5 py-2 shadow-[4px_7px_4px_rgba(0,0,0,0.03),1px_2px_2px_rgba(0,0,0,0.03)]">
        <div className="flex w-28 items-center justify-between">
          <button
            type="button"
            onClick={onZoomOut}
            aria-label="Zoom out"
            className="text-[#1A1A1A] transition-all duration-200 hover:scale-125 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ZoomOut className="size-4" aria-hidden />
          </button>
          <span className="text-center text-xs text-muted-500 tabular-nums">
            {Math.round(zoom)}%
          </span>
          <button
            type="button"
            onClick={onZoomIn}
            aria-label="Zoom in"
            className="text-[#1A1A1A] transition-all duration-200 hover:scale-125 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ZoomIn className="size-4" aria-hidden />
          </button>
        </div>
        <div className="flex items-center border-l border-line pl-4">
          <button
            type="button"
            onClick={onReset}
            aria-label="Reset view"
            className="flex size-6 items-center justify-center text-[#1A1A1A] transition-all duration-200 hover:scale-125 hover:-rotate-45 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <RotateCcw className="size-4" aria-hidden />
          </button>
        </div>
      </div>
      <p className="text-center text-xs text-muted-500">
        Drag to rotate - Scroll to zoom
      </p>
    </div>
  );
}
