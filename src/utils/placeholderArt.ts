/**
 * Genre-specific fallback artwork engine.
 * -------------------------------------
 * The demo dataset ships without real poster/cover URLs. Instead of
 * initial-letter placeholders, the UI renders deterministic inline SVG
 * scene illustrations keyed to each title's primary genre (cosmic for
 * Sci-Fi, layered mountains for Fantasy, noir skylines for Thriller, ...).
 *
 * These illustrations are clearly original placeholders — they do not
 * imitate any real book covers or film posters. If a genuine posterUrl
 * is ever supplied by a future backend, it is displayed instead.
 *
 * Every scene is deterministic: the same title always produces the same
 * illustration via a seeded PRNG. No green hues are used anywhere.
 */

export type SceneKind =
  | "cosmic"
  | "fantasy"
  | "adventure"
  | "mystery"
  | "thriller"
  | "horror"
  | "romance"
  | "drama"
  | "crime"
  | "dystopian"
  | "noir"
  | "biography";

export interface ScenePalette {
  top: string;
  bottom: string;
  glow: string;
  glow2: string;
  accent: string;
}

const GENRE_TO_SCENE: Record<string, SceneKind> = {
  "Sci-Fi": "cosmic",
  "Neo-Noir": "noir",
  Fantasy: "fantasy",
  Adventure: "adventure",
  Mystery: "mystery",
  Thriller: "thriller",
  Horror: "horror",
  Romance: "romance",
  Drama: "drama",
  Crime: "crime",
  Dystopian: "dystopian",
  Biography: "biography",
};

export function getSceneKind(genres: string[]): SceneKind {
  for (const genre of genres) {
    const kind = GENRE_TO_SCENE[genre];
    if (kind) return kind;
  }
  return "drama";
}

export const SCENE_PALETTES: Record<SceneKind, ScenePalette> = {
  cosmic: { top: "#241B4E", bottom: "#05040D", glow: "#8B5CF6", glow2: "#60A5FA", accent: "#E9B86C" },
  fantasy: { top: "#3A2560", bottom: "#0A0616", glow: "#A78BFA", glow2: "#E9B86C", accent: "#E9B86C" },
  adventure: { top: "#4A2F17", bottom: "#100803", glow: "#E9B86C", glow2: "#C96A3B", accent: "#F2C48A" },
  mystery: { top: "#223354", bottom: "#070A13", glow: "#60A5FA", glow2: "#8B5CF6", accent: "#BFD9FF" },
  thriller: { top: "#3D1626", bottom: "#0B0409", glow: "#E0687E", glow2: "#8B5CF6", accent: "#F2B7C4" },
  horror: { top: "#262B38", bottom: "#07080C", glow: "#9FB2D8", glow2: "#6D81A8", accent: "#D6E0F2" },
  romance: { top: "#552239", bottom: "#130612", glow: "#E585A8", glow2: "#E9B86C", accent: "#F4C6D6" },
  drama: { top: "#251E4A", bottom: "#08060F", glow: "#E9B86C", glow2: "#8B5CF6", accent: "#F2DCA8" },
  crime: { top: "#18283F", bottom: "#05080E", glow: "#60A5FA", glow2: "#E9B86C", accent: "#BFD9FF" },
  dystopian: { top: "#2A3040", bottom: "#08090E", glow: "#E0896F", glow2: "#B6543F", accent: "#F0B9A3" },
  noir: { top: "#1C1340", bottom: "#040309", glow: "#D570F2", glow2: "#60A5FA", accent: "#E8C4F8" },
  biography: { top: "#3A2C1E", bottom: "#100A05", glow: "#E9B86C", glow2: "#A67B4F", accent: "#F2D9A8" },
};

export function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Deterministic PRNG so each title's scene never changes between renders. */
export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0 || 1;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
