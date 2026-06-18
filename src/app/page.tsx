"use client";

import { useMemo, useState } from "react";
import type { BackgroundId, SelectionState } from "@/types";
import {
  characters,
  getCharacter,
  getPose,
  renderSrc,
} from "@/data/characters";
import { Sidebar } from "@/components/layout/Sidebar";
import { Stage } from "@/components/layout/Stage";
import { InspectorPanel } from "@/components/layout/InspectorPanel";

const ZOOM_MIN = 25;
const ZOOM_MAX = 200;
const ZOOM_STEP = 10;

const clampZoom = (z: number) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z));

export default function Home() {
  const [selection, setSelection] = useState<SelectionState>({
    characterId: "leo",
    poseId: "stand",
    colorId: "oliver",
    backgroundId: "white",
    exportFormat: "png",
    zoom: 100,
  });

  const character = useMemo(
    () => getCharacter(selection.characterId),
    [selection.characterId],
  );
  const pose = getPose(character, selection.poseId);
  const colorId = character.colors
    ? character.colors.find((c) => c.id === selection.colorId)?.id ??
      character.colors[0].id
    : selection.colorId;
  const render = renderSrc(character, colorId, pose.id);

  const update = (patch: Partial<SelectionState>) =>
    setSelection((prev) => ({ ...prev, ...patch }));

  // Switching character resets pose + color to that character's defaults.
  const handleSelectCharacter = (id: string) => {
    const next = getCharacter(id);
    update({
      characterId: id,
      poseId: next.poses[0].id,
      colorId: next.colors?.[0].id ?? selection.colorId,
    });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = render;
    link.download = `${character.id}-${pose.id}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {
        /* no-op: clipboard unavailable */
      }
    }
  };

  return (
    <main className="flex h-screen gap-5 bg-surface-100 p-5">
      <Sidebar
        characters={characters}
        activeCharacterId={selection.characterId}
        onSelectCharacter={handleSelectCharacter}
      />

      <Stage
        title={character.name}
        subtitle={pose.name}
        render={render}
        alt={`${character.name} — ${pose.name} pose`}
        backgroundId={selection.backgroundId}
        zoom={selection.zoom}
        onShare={handleShare}
        onZoomIn={() => update({ zoom: clampZoom(selection.zoom + ZOOM_STEP) })}
        onZoomOut={() => update({ zoom: clampZoom(selection.zoom - ZOOM_STEP) })}
        onReset={() => update({ zoom: 100 })}
      />

      <InspectorPanel
        character={character}
        selection={{ ...selection, colorId }}
        onSelectColor={(id) => update({ colorId: id })}
        onSelectPose={(id) => update({ poseId: id })}
        onSelectBackground={(id: BackgroundId) => update({ backgroundId: id })}
        onSelectExport={(id) => update({ exportFormat: id })}
        onDownload={handleDownload}
      />
    </main>
  );
}
