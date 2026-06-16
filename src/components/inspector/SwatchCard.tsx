"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SwatchCardProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  children: ReactNode; // media: avatar circle or pose thumbnail
}

export function SwatchCard({
  label,
  selected,
  onSelect,
  children,
}: SwatchCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex flex-1 flex-col items-center gap-2 rounded-[12px] border p-4",
        "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        selected
          ? "bg-brand-gradient-10 border-primary"
          : "border-line bg-surface-50 hover:border-line-strong",
      )}
    >
      {children}
      <span
        className={cn(
          "w-full text-center text-sm",
          selected ? "text-brand-gradient font-medium" : "text-black",
        )}
      >
        {label}
      </span>
    </button>
  );
}
