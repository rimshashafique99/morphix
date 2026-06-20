"use client";

import { useMemo, useState } from "react";
import type { Character } from "@/types";
import { SidebarHeader } from "@/components/sidebar/SidebarHeader";
import { SearchInput } from "@/components/sidebar/SearchInput";
import { CharacterList } from "@/components/sidebar/CharacterList";
import { UpgradeCard } from "@/components/sidebar/UpgradeCard";

interface SidebarProps {
  characters: Character[];
  activeCharacterId: string;
  onSelectCharacter: (id: string) => void;
}

export function Sidebar({
  characters,
  activeCharacterId,
  onSelectCharacter,
}: SidebarProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return characters;
    return characters.filter((c) => c.name.toLowerCase().includes(q));
  }, [characters, query]);

  return (
    <aside className="relative flex h-full w-[230px] shrink-0 flex-col rounded-[24px] border border-line bg-white px-1 lg:w-[260px] xl:w-[300px]">
      <div className="flex flex-col gap-2 p-2">
        <SidebarHeader />
        <SearchInput value={query} onChange={setQuery} />
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <CharacterList
          characters={filtered}
          activeId={activeCharacterId}
          onSelect={onSelectCharacter}
        />
      </div>

      <UpgradeCard />
    </aside>
  );
}
