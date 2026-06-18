export interface Pose {
  id: string; // also the render filename, e.g. "party-dance"
  name: string; // "Party Dance"
}

export interface ColorVariant {
  id: string; // outfit-color id, also the asset folder name e.g. "luna"
  name: string; // inspector "Character" swatch label, e.g. "Luna"
  color: string; // CSS background for the colored circle swatch
}

export interface Character {
  id: string; // "leo" — also the asset folder for characters without color variants
  name: string; // sidebar + header label
  poses: Pose[];
  /**
   * Outfit-color variants. Present only for characters that have multiple
   * recolored renders (Leo). When set, the render folder is the selected
   * color id; otherwise it falls back to the character id.
   */
  colors?: ColorVariant[];
}

export type BackgroundId = "white" | "soft";

export interface BackgroundOption {
  id: BackgroundId;
  name: string; // "White" | "Soft"
}

export interface ExportFormat {
  id: string; // "png" | "transparent-png" | "svg"
  label: string; // "PNG"
  sublabel: string; // "High quality"
}

export interface SelectionState {
  characterId: string;
  poseId: string;
  colorId: string; // active outfit color (only meaningful when the character has colors)
  backgroundId: BackgroundId;
  exportFormat: string;
  zoom: number; // percent, default 100
}
