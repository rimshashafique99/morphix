"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface InspectorSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function InspectorSection({
  title,
  children,
  defaultOpen = true,
}: InspectorSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  return (
    <section className="flex w-full flex-col gap-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="flex w-full items-center justify-between rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="text-sm text-black">{title}</span>
        <ChevronDown
          className={cn(
            "size-5 text-muted-500 transition-transform",
            open ? "rotate-0" : "-rotate-90",
          )}
          aria-hidden
        />
      </button>
      {open && (
        <div id={bodyId} className="flex w-full flex-col gap-3">
          {children}
        </div>
      )}
    </section>
  );
}
