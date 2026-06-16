"use client";

import { Download } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";

interface DownloadButtonProps {
  onDownload: () => void;
}

export function DownloadButton({ onDownload }: DownloadButtonProps) {
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <GradientButton onClick={onDownload} className="w-full px-4 py-3 text-md">
        <Download className="size-6" aria-hidden />
        Download PNG
      </GradientButton>
      <p className="text-center text-xs text-muted-500">2048 × 2048 px · 4MB</p>
    </div>
  );
}
