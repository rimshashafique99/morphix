"use client";

import { cn } from "@/lib/cn";

interface CharacterListItemProps {
  name: string;
  active: boolean;
  onSelect: () => void;
}

export function CharacterListItem({
  name,
  active,
  onSelect,
}: CharacterListItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={cn(
        "flex h-[42px] w-full items-center gap-2.5 rounded-[12px] px-3 text-left",
        "font-geist text-sm font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        active
          ? "bg-brand-gradient text-white"
          : "text-muted-400 hover:bg-surface-50 hover:text-black",
      )}
    >
      <span
        className={cn(
          "size-2 shrink-0 rounded-full",
          active ? "bg-white" : "bg-muted-400",
        )}
        aria-hidden
      />
      <span className="truncate">{name}</span>
    </button>
  );
}
