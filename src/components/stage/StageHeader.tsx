"use client";

interface StageHeaderProps {
  title: string;
  subtitle: string;
}

export function StageHeader({ title, subtitle }: StageHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-[24px] bg-white px-8 py-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-medium leading-[30px] text-black">{title}</h1>
        <p className="text-sm text-muted-500">{subtitle}</p>
      </div>
    </div>
  );
}
