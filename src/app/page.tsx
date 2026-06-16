"use client";

import { useMemo, useState } from "react";
import type { BackgroundId, SelectionState } from "@/types";
import {
  characters,
  getAvatar,
  getCharacter,
  getPose,
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
    avatarId: "oliver",
    backgroundId: "white",
    exportFormat: "png",
    zoom: 100,
  });

  const character = useMemo(
    () => getCharacter(selection.characterId),
    [selection.characterId],
  );
  const pose = getPose(character, selection.poseId);
  const avatar = getAvatar(character, selection.avatarId);

  const update = (patch: Partial<SelectionState>) =>
    setSelection((prev) => ({ ...prev, ...patch }));

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pose.render;
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
        onSelectCharacter={(id) => update({ characterId: id })}
      />

      <Stage
        title={avatar.name}
        subtitle={`${character.name} / ${pose.name}`}
        render={pose.render}
        alt={`${avatar.name} — ${pose.name} pose`}
        backgroundId={selection.backgroundId}
        zoom={selection.zoom}
        onShare={handleShare}
        onZoomIn={() => update({ zoom: clampZoom(selection.zoom + ZOOM_STEP) })}
        onZoomOut={() => update({ zoom: clampZoom(selection.zoom - ZOOM_STEP) })}
        onReset={() => update({ zoom: 100 })}
      />

      <InspectorPanel
        character={character}
        selection={selection}
        onSelectAvatar={(id) => update({ avatarId: id })}
        onSelectPose={(id) => update({ poseId: id })}
        onSelectBackground={(id: BackgroundId) => update({ backgroundId: id })}
        onSelectExport={(id) => update({ exportFormat: id })}
        onDownload={handleDownload}
      />
    </main>
  );
}
