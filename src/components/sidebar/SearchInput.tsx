"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="flex h-[42px] w-full items-center gap-1 rounded-[8px] border border-input-border bg-white px-3 transition-colors duration-200 hover:border-primary focus-within:border-primary">
      <Search className="size-4 shrink-0 text-placeholder" aria-hidden />
      <span className="sr-only">Search Character</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Character"
        className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-placeholder"
      />
    </label>
  );
}
