import type {
  BackgroundOption,
  Character,
  ExportFormat,
} from "@/types";

/**
 * Only "Oliver" (Leo's avatar) has real pose renders exported from Figma.
 * Other characters reuse Oliver's renders as placeholders until real assets
 * are dropped into `public/characters/<id>/`. The paths are structured so
 * swapping in finals "just works".
 */
const oliverPoses = (charId: string) => {
  const base =
    charId === "leo"
      ? "/characters/oliver"
      : `/characters/${charId}`;
  // Fall back to Oliver's renders for characters without finals yet.
  const dir = charId === "leo" ? base : "/characters/oliver";
  return [
    { id: "stand", name: "Stand", thumbnail: `${dir}/stand.png`, render: `${dir}/stand.png` },
    { id: "cheer", name: "Cheer", thumbnail: `${dir}/cheer.png`, render: `${dir}/cheer.png` },
    { id: "sparkler", name: "Sparkler", thumbnail: `${dir}/sparkler.png`, render: `${dir}/sparkler.png` },
    { id: "party-dance", name: "Party Dance", thumbnail: `${dir}/party-dance.png`, render: `${dir}/party-dance.png` },
  ];
};

const avatarVariants = [
  { id: "oliver", name: "Oliver", avatar: "/characters/oliver/avatar.png" },
  { id: "luna", name: "Luna", avatar: "/characters/luna-avatar.png" },
  { id: "pip", name: "Pip", avatar: "/characters/pip-avatar.png" },
  { id: "bo", name: "Bo", avatar: "/characters/bo-avatar.png" },
];

export const characters: Character[] = [
  { id: "leo", name: "Leo", poses: oliverPoses("leo"), avatars: avatarVariants },
  { id: "mavi", name: "Mavi", poses: oliverPoses("mavi"), avatars: avatarVariants },
  { id: "noah", name: "Noah", poses: oliverPoses("noah"), avatars: avatarVariants },
  { id: "zuno", name: "Zuno", poses: oliverPoses("zuno"), avatars: avatarVariants },
];

export const backgrounds: BackgroundOption[] = [
  { id: "white", name: "White" },
  { id: "soft", name: "Soft" },
];

export const exportFormats: ExportFormat[] = [
  { id: "png", label: "PNG", sublabel: "High quality" },
  { id: "transparent-png", label: "Transparent PNG", sublabel: "No background" },
  { id: "svg", label: "SVG", sublabel: "Vector" },
];

export const getCharacter = (id: string): Character =>
  characters.find((c) => c.id === id) ?? characters[0];

export const getPose = (character: Character, poseId: string) =>
  character.poses.find((p) => p.id === poseId) ?? character.poses[0];

export const getAvatar = (character: Character, avatarId: string) =>
  character.avatars.find((a) => a.id === avatarId) ?? character.avatars[0];
