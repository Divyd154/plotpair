/**
 * Shared data types for the Plot Pair frontend.
 *
 * These interfaces describe the normalized shape the UI consumes.
 * The underlying sample dataset (src/data) is mapped into these shapes
 * so that components never depend on raw/source field names. This keeps
 * the UI ready to be pointed at a real backend/database later without
 * touching component code.
 */

export type MediaType = "movie" | "book";

/** Selector value used for both the pre-search target picker and the results filter. */
export type MediaFilter = "both" | MediaType;

export interface MovieRecord {
  id: string;
  mediaType: "movie";
  title: string;
  year?: number;
  description?: string;
  genres: string[];
  keywords: string[];
  director?: string;
  cast?: string[];
  /** Optional artwork URL. Not present in the current demo dataset. */
  posterUrl?: string;
}

export interface BookRecord {
  id: string;
  mediaType: "book";
  title: string;
  year?: number;
  description?: string;
  genres: string[];
  keywords: string[];
  author?: string;
  /** Optional artwork URL. Not present in the current demo dataset. */
  posterUrl?: string;
}

export type CatalogItem = MovieRecord | BookRecord;

export interface RecommendationResult {
  item: CatalogItem;
  /** Cosine similarity score (0-1) from the TF-IDF content comparison. */
  score: number;
  sharedGenres: string[];
  sharedKeywords: string[];
}

export type ResultsPhase = "idle" | "loading" | "results" | "error";
