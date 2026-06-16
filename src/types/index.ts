export interface Pose {
  id: string;
  name: string; // "Stand"
  thumbnail: string; // small preview used in the inspector grid
  render: string; // full-size render shown in the center viewer
}

export interface AvatarVariant {
  id: string;
  name: string; // inspector "Character" swatch label, e.g. "Oliver"
  avatar: string; // circle swatch image
}

export interface Character {
  id: string; // "leo"
  name: string; // sidebar + header label
  poses: Pose[];
  avatars: AvatarVariant[];
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
  avatarId: string;
  backgroundId: BackgroundId;
  exportFormat: string;
  zoom: number; // percent, default 100
}
