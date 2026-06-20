import type {
  BackgroundOption,
  Character,
  ColorVariant,
  ExportFormat,
} from "@/types";

/**
 * Selecting an outfit color recolors the clothes for *every* character: each
 * color maps to a recolored render folder at
 * `public/characters/<id>/<colorId>/<poseId>.png` (oliver = green,
 * luna = purple, pip = yellow, bo = cyan).
 *
 * Not every character ships every color, so each character lists only the
 * colors it actually has renders for (via `pickColors`). When the active color
 * is unavailable for a character, `renderSrc` falls back to that character's
 * first available color.
 */
const outfitColors: Record<string, ColorVariant> = {
  oliver: { id: "oliver", name: "Oliver", color: "radial-gradient(circle at 35% 30%, #B7DCA0, #6FA84B)" },
  luna: { id: "luna", name: "Luna", color: "radial-gradient(circle at 35% 30%, #C9B8F5, #8B5CF6)" },
  pip: { id: "pip", name: "Pip", color: "radial-gradient(circle at 35% 30%, #FFE08A, #F5C518)" },
  bo: { id: "bo", name: "Bo", color: "radial-gradient(circle at 35% 30%, #9BE3EF, #3FC5DC)" },
};

const pickColors = (...ids: string[]): ColorVariant[] =>
  ids.map((id) => outfitColors[id]);

export const characters: Character[] = [
  {
    id: "leo",
    name: "Leo",
    colors: pickColors("oliver", "luna", "pip", "bo"),
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
    colors: pickColors("oliver", "luna", "pip", "bo"),
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
    colors: pickColors("oliver", "luna", "pip", "bo"),
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
    colors: pickColors("oliver", "luna", "pip", "bo"),
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
 * Resolve the active color to one this character actually has a render for,
 * falling back to its first available color (oliver, which everyone ships).
 */
export const resolveColorId = (character: Character, colorId: string): string => {
  if (!character.colors?.length) return colorId;
  return character.colors.some((c) => c.id === colorId)
    ? colorId
    : character.colors[0].id;
};

/** Render path for the current character + outfit color + pose. */
export const renderSrc = (
  character: Character,
  colorId: string,
  poseId: string,
): string =>
  `/characters/${character.id}/${resolveColorId(character, colorId)}/${poseId}.png`;
