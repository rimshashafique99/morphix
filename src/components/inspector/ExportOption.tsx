"use client";

import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface ExportOptionProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  selected: boolean;
  onSelect: () => void;
}

export function ExportOption({
  icon: Icon,
  title,
  subtitle,
  selected,
  onSelect,
}: ExportOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center justify-between rounded-[12px] border px-3 py-2 text-left",
        "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        selected
          ? "bg-brand-gradient-10 border-primary"
          : "border-line-strong bg-surface-100 hover:border-primary/40",
      )}
    >
      <span className="flex items-center gap-3">
        <span className="flex h-[37px] w-8 items-center justify-center rounded-[8px] bg-white">
          <Icon className="size-5 text-black" aria-hidden />
        </span>
        <span className="flex flex-col">
          <span className="text-sm text-black">{title}</span>
          <span className="text-xs text-muted-500">{subtitle}</span>
        </span>
      </span>
      {selected && <Check className="size-5 text-primary" aria-hidden />}
    </button>
  );
}
