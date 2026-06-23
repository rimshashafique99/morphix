"use client";

import { useMemo, useState } from "react";
import type { BackgroundId, SelectionState } from "@/types";
import {
  characters,
  getCharacter,
  getPose,
  renderSrc,
  resolveColorId,
} from "@/data/characters";
import { Sidebar } from "@/components/layout/Sidebar";
import { Stage } from "@/components/layout/Stage";
import { InspectorPanel } from "@/components/layout/InspectorPanel";
import { MobileGate } from "@/components/layout/MobileGate";

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
  // Drag-driven 3D tilt for the live preview (ephemeral view state).
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const character = useMemo(
    () => getCharacter(selection.characterId),
    [selection.characterId],
  );
  const pose = getPose(character, selection.poseId);
  // selection.colorId is the user's chosen color across all characters;
  // resolve it to one this character actually has a render for.
  const colorId = resolveColorId(character, selection.colorId);
  const render = renderSrc(character, colorId, pose.id);

  const update = (patch: Partial<SelectionState>) =>
    setSelection((prev) => ({ ...prev, ...patch }));

  // Switching character resets the pose but keeps the chosen outfit color so it
  // carries across every character (falling back per-character when missing).
  const handleSelectCharacter = (id: string) => {
    const next = getCharacter(id);
    update({
      characterId: id,
      poseId: next.poses[0].id,
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

  return (
    <>
      <MobileGate />

      <main className="hidden h-screen gap-3 bg-surface-100 p-3 md:flex lg:gap-4 lg:p-4 xl:gap-5 xl:p-5">
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
        rotation={rotation}
        onRotate={setRotation}
        onWheelZoom={(deltaY) =>
          update({ zoom: clampZoom(selection.zoom - deltaY * 0.1) })
        }
        onZoomIn={() => update({ zoom: clampZoom(selection.zoom + ZOOM_STEP) })}
        onZoomOut={() => update({ zoom: clampZoom(selection.zoom - ZOOM_STEP) })}
        onReset={() => {
          update({ zoom: 100 });
          setRotation({ x: 0, y: 0 });
        }}
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
    </>
  );
}
