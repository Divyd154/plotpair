import { getAllItems, getItemById } from "@/services/catalogService";
import { buildTfIdfVectors, cosineSimilarity } from "@/utils/textSimilarity";
import type { CatalogItem, MediaFilter, RecommendationResult } from "@/types";

/**
 * Current method (documented):
 * 1. Build a text "document" per item from its description, genres,
 *    keywords/themes and creator (director/author). Genres and keywords
 *    are given extra weight since they carry the strongest content signal.
 * 2. Vectorize every document with TF-IDF.
 * 3. Rank candidates for a chosen seed item by cosine similarity.
 * 4. Explanations are derived only from genres/keywords actually shared
 *    between the seed and the candidate — nothing is fabricated.
 *
 * This is a lightweight content-based prototype, not a trained model and
 * not connected to a production recommendation backend. It is intentionally
 * isolated in this module so it can be replaced by a real API call later.
 */

function buildDocumentText(item: CatalogItem): string {
  const creator = item.mediaType === "movie" ? item.director : item.author;
  const weightedGenres = [...item.genres, ...item.genres].join(" ");
  const weightedKeywords = [...item.keywords, ...item.keywords].join(" ");
  return [item.description ?? "", weightedGenres, weightedKeywords, creator ?? ""].join(" ");
}

let vectorCache: Map<string, Map<string, number>> | null = null;

function getVectors() {
  if (!vectorCache) {
    const items = getAllItems();
    vectorCache = buildTfIdfVectors(items.map((item) => ({ id: item.id, text: buildDocumentText(item) })));
  }
  return vectorCache;
}

function sharedTerms(source: string[], target: string[]): string[] {
  const targetLower = new Set(target.map((t) => t.toLowerCase()));
  const seen = new Set<string>();
  const shared: string[] = [];
  source.forEach((term) => {
    const lower = term.toLowerCase();
    if (targetLower.has(lower) && !seen.has(lower)) {
      seen.add(lower);
      shared.push(term);
    }
  });
  return shared;
}

export interface RecommendationError {
  code: "ITEM_NOT_FOUND";
  message: string;
}

/**
 * Returns ranked, content-similar items for a given seed item.
 * `targetMedia` of "both" searches across the whole catalog; "movie" or
 * "book" restricts candidates to that media type (enabling cross-media
 * discovery, e.g. a book seed recommending movies).
 */
export function getRecommendations(itemId: string, targetMedia: MediaFilter, limit = 16): RecommendationResult[] {
  const seed = getItemById(itemId);
  if (!seed) return [];

  const vectors = getVectors();
  const seedVector = vectors.get(seed.id);
  if (!seedVector) return [];

  const candidates = getAllItems().filter(
    (item) => item.id !== seed.id && (targetMedia === "both" || item.mediaType === targetMedia)
  );

  return candidates
    .map((candidate) => {
      const candidateVector = vectors.get(candidate.id);
      const score = candidateVector ? cosineSimilarity(seedVector, candidateVector) : 0;
      const sharedGenres = sharedTerms(seed.genres, candidate.genres);
      const sharedKeywords = sharedTerms(seed.keywords, candidate.keywords);
      return { item: candidate, score, sharedGenres, sharedKeywords };
    })
    .filter((result) => result.score > 0.015 || result.sharedGenres.length > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
