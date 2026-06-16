"use client";

import { Share2 } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";

interface StageHeaderProps {
  title: string;
  subtitle: string;
  onShare: () => void;
}

export function StageHeader({ title, subtitle, onShare }: StageHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-[24px] bg-white p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-medium leading-[30px] text-black">{title}</h1>
        <p className="text-sm text-muted-500">{subtitle}</p>
      </div>
      <GradientButton onClick={onShare} className="px-3 py-2.5 text-md">
        <Share2 className="size-4" aria-hidden />
        Share
      </GradientButton>
    </div>
  );
}
