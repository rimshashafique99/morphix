"use client";

import type { Character } from "@/types";
import { CharacterListItem } from "./CharacterListItem";

interface CharacterListProps {
  characters: Character[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function CharacterList({
  characters,
  activeId,
  onSelect,
}: CharacterListProps) {
  return (
    <div className="flex flex-col gap-1.5 p-2">
      <p className="px-2 py-1 font-geist text-xs font-medium text-muted-500 opacity-70">
        Library
      </p>
      <nav className="flex flex-col gap-1.5" aria-label="Character library">
        {characters.length === 0 ? (
          <p className="px-3 py-2 font-geist text-sm text-muted-400">
            No characters found
          </p>
        ) : (
          characters.map((character) => (
            <CharacterListItem
              key={character.id}
              name={character.name}
              active={character.id === activeId}
              onSelect={() => onSelect(character.id)}
            />
          ))
        )}
      </nav>
    </div>
  );
}
