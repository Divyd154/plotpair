import { MOVIES } from "@/data/movies";
import { BOOKS } from "@/data/books";
import type { CatalogItem } from "@/types";

/**
 * Data access layer for the catalog.
 *
 * Every function here reads from the local demo dataset today, but the
 * function signatures are the contract the UI depends on. A future backend
 * integration can reimplement these same functions as API calls without
 * requiring any changes to components.
 */

const ALL_ITEMS: CatalogItem[] = [...MOVIES, ...BOOKS];

export function getAllItems(): CatalogItem[] {
  return ALL_ITEMS;
}

export function getAllMovies() {
  return MOVIES;
}

export function getAllBooks() {
  return BOOKS;
}

export function getItemById(id: string): CatalogItem | undefined {
  return ALL_ITEMS.find((item) => item.id === id);
}

/**
 * Case-insensitive, partial-title search across both movies and books.
 * Results are ranked with "starts with" matches first, then alphabetically.
 */
export function searchItems(query: string, limit = 8): CatalogItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return ALL_ITEMS.filter((item) => item.title.toLowerCase().includes(normalized))
    .sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const aStarts = aTitle.startsWith(normalized) ? 0 : 1;
      const bStarts = bTitle.startsWith(normalized) ? 0 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return aTitle.localeCompare(bTitle);
    })
    .slice(0, limit);
}

/**
 * A deterministic "curated" mixed shelf for the homepage collection row.
 * This is a browsing view over the real catalog — it is NOT personalized
 * and never claims to be an engine result.
 */
export function getCuratedCollection(limit = 14): CatalogItem[] {
  const stable = (id: string) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
    return h;
  };
  const movies = [...MOVIES].sort((a, b) => stable(a.id) - stable(b.id));
  const books = [...BOOKS].sort((a, b) => stable(a.id) - stable(b.id));
  const mixed: CatalogItem[] = [];
  for (let i = 0; i < Math.max(movies.length, books.length); i++) {
    const movie = movies[i];
    const book = books[i];
    if (movie) mixed.push(movie);
    if (book) mixed.push(book);
  }
  return mixed.slice(0, limit);
}

/** Genre/theme counts derived from actual catalog metadata, for the theme explorer. */
export function getTopGenres(limit = 8): { genre: string; count: number }[] {
  const counts = new Map<string, number>();
  ALL_ITEMS.forEach((item) => {
    item.genres.forEach((genre) => counts.set(genre, (counts.get(genre) ?? 0) + 1));
  });
  return [...counts.entries()]
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getItemsByGenre(genre: string, limit = 16): CatalogItem[] {
  return ALL_ITEMS.filter((item) => item.genres.includes(genre)).slice(0, limit);
}
