import type {
  BackgroundOption,
  Character,
  ColorVariant,
  ExportFormat,
} from "@/types";

/**
 * Each sidebar character is a distinct person with its own poses and render
 * folder under `public/characters/<id>/<poseId>.png`.
 *
 * Leo additionally has outfit-color variants (oliver = green, luna = purple,
 * pip = yellow, bo = cyan). For Leo the render folder is the selected color id;
 * for everyone else it is the character id.
 */
const leoColors: ColorVariant[] = [
  { id: "oliver", name: "Oliver", color: "radial-gradient(circle at 35% 30%, #B7DCA0, #6FA84B)" },
  { id: "luna", name: "Luna", color: "radial-gradient(circle at 35% 30%, #C9B8F5, #8B5CF6)" },
  { id: "pip", name: "Pip", color: "radial-gradient(circle at 35% 30%, #FFE08A, #F5C518)" },
  { id: "bo", name: "Bo", color: "radial-gradient(circle at 35% 30%, #9BE3EF, #3FC5DC)" },
];

export const characters: Character[] = [
  {
    id: "leo",
    name: "Leo",
    colors: leoColors,
    poses: [
      { id: "stand", name: "Stand" },
      { id: "cheer", name: "Cheer" },
      { id: "sparkler", name: "Sparkler" },
      { id: "party-dance", name: "Party Dance" },
    ],
  },
  {
    id: "mavi",
    name: "Mavi",
    poses: [
      { id: "presentation", name: "Presentation" },
      { id: "working", name: "Working" },
      { id: "greeting", name: "Greeting" },
      { id: "watching", name: "Watching" },
    ],
  },
  {
    id: "noah",
    name: "Noah",
    poses: [
      { id: "stand", name: "Stand" },
      { id: "reading", name: "Reading" },
      { id: "walking", name: "Walking" },
      { id: "joyful", name: "Joyful" },
    ],
  },
  {
    id: "zuno",
    name: "Zuno",
    poses: [
      { id: "on-call", name: "On Call" },
      { id: "waving", name: "Waving" },
      { id: "selfie", name: "Selfie" },
      { id: "dancing", name: "Dancing" },
    ],
  },
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

/**
 * Render path for the current character + outfit color + pose.
 * Falls back to the character id when the character has no color variants.
 */
export const renderSrc = (
  character: Character,
  colorId: string,
  poseId: string,
): string => {
  const dir = character.colors ? colorId : character.id;
  return `/characters/${dir}/${poseId}.png`;
};
