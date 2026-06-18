"use client";

import Image from "next/image";
import { FileCode, FileImage, ImageIcon } from "lucide-react";
import type { BackgroundId, Character, SelectionState } from "@/types";
import { backgrounds, exportFormats, renderSrc } from "@/data/characters";
import { cn } from "@/lib/cn";
import { Divider } from "@/components/ui/Divider";
import { InspectorSection } from "@/components/inspector/InspectorSection";
import { SwatchGrid } from "@/components/inspector/SwatchGrid";
import { SwatchCard } from "@/components/inspector/SwatchCard";
import { ExportOption } from "@/components/inspector/ExportOption";
import { DownloadButton } from "@/components/inspector/DownloadButton";

const exportIcons = {
  png: ImageIcon,
  "transparent-png": FileImage,
  svg: FileCode,
} as const;

interface InspectorPanelProps {
  character: Character;
  selection: SelectionState;
  onSelectColor: (id: string) => void;
  onSelectPose: (id: string) => void;
  onSelectBackground: (id: BackgroundId) => void;
  onSelectExport: (id: string) => void;
  onDownload: () => void;
}

export function InspectorPanel({
  character,
  selection,
  onSelectColor,
  onSelectPose,
  onSelectBackground,
  onSelectExport,
  onDownload,
}: InspectorPanelProps) {
  return (
    <aside className="flex h-full w-[300px] shrink-0 flex-col gap-6 overflow-y-auto rounded-[16px] border border-line bg-white p-4">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <h2 className="text-md font-medium text-black">Inspector</h2>
        <span className="text-sm text-muted-400">Auto-saved</span>
      </div>

      {/* Character — outfit colors (only for characters that have variants) */}
      {character.colors && (
        <>
          <InspectorSection title="Character">
            <SwatchGrid>
              {character.colors.map((variant) => (
                <SwatchCard
                  key={variant.id}
                  label={variant.name}
                  selected={variant.id === selection.colorId}
                  onSelect={() => onSelectColor(variant.id)}
                >
                  <div
                    className="size-[42px] rounded-full"
                    style={{ background: variant.color }}
                  />
                </SwatchCard>
              ))}
            </SwatchGrid>
          </InspectorSection>

          <Divider />
        </>
      )}

      {/* Poses */}
      <InspectorSection title="Poses">
        <SwatchGrid>
          {character.poses.map((pose) => (
            <SwatchCard
              key={pose.id}
              label={pose.name}
              selected={pose.id === selection.poseId}
              onSelect={() => onSelectPose(pose.id)}
            >
              <div className="relative h-[78px] w-full overflow-hidden rounded-[8px] bg-surface-100">
                <Image
                  src={renderSrc(character, selection.colorId, pose.id)}
                  alt=""
                  fill
                  sizes="109px"
                  className="object-contain"
                />
              </div>
            </SwatchCard>
          ))}
        </SwatchGrid>
      </InspectorSection>

      <Divider />

      {/* Background */}
      <InspectorSection title="Background">
        <SwatchGrid>
          {backgrounds.map((bg) => (
            <SwatchCard
              key={bg.id}
              label={bg.name}
              selected={bg.id === selection.backgroundId}
              onSelect={() => onSelectBackground(bg.id)}
            >
              <div
                className={cn(
                  "h-[57px] w-full rounded-[8px] border",
                  bg.id === "white"
                    ? "border-line bg-white"
                    : "border-transparent bg-surface-100",
                )}
              />
            </SwatchCard>
          ))}
        </SwatchGrid>
      </InspectorSection>

      <Divider />

      {/* Export */}
      <InspectorSection title="Export">
        <div className="flex flex-col gap-3">
          {exportFormats.map((format) => (
            <ExportOption
              key={format.id}
              icon={exportIcons[format.id as keyof typeof exportIcons] ?? ImageIcon}
              title={format.label}
              subtitle={format.sublabel}
              selected={format.id === selection.exportFormat}
              onSelect={() => onSelectExport(format.id)}
            />
          ))}
        </div>
        <DownloadButton onDownload={onDownload} />
      </InspectorSection>
    </aside>
  );
}
