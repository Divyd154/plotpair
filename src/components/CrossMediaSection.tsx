import { Button } from "@/components/ui/button";
import { ArrowLeftRight, ArrowRight, BookOpen, ChevronRight, Film, Sparkles } from "lucide-react";
import crossMediaAsset from "@/assets/cross-media.jpg.asset.json";
import { getItemById } from "@/services/catalogService";
import { Artwork } from "@/components/Artwork";
import { PosterCard } from "@/components/PosterCard";
import type { CatalogItem, RecommendationResult, ResultsPhase } from "@/types";

const crossMediaArt = crossMediaAsset.url;

/**
 * Known book/movie adaptations inside the demo catalog. These are factual
 * catalog connections (same franchise), displayed as clearly labeled
 * examples — they are NOT presented as engine output.
 */
const EXAMPLE_PAIRS: [string, string][] = [
  ["bk-dune", "mv-dune"],
  ["bk-the-martian", "mv-the-martian"],
  ["bk-gone-girl", "mv-gone-girl"],
];

interface CrossMediaSectionProps {
  phase: ResultsPhase;
  seed: CatalogItem | null;
  allResults: RecommendationResult[];
  onOpen: (item: CatalogItem) => void;
  onBegin: () => void;
}

function sharedTermsBetween(a: CatalogItem, b: CatalogItem): string[] {
  const bSet = new Set(b.keywords.map((k) => k.toLowerCase()));
  return a.keywords.filter((k) => bSet.has(k.toLowerCase())).slice(0, 3);
}

export function CrossMediaSection({ phase, seed, allResults, onOpen, onBegin }: CrossMediaSectionProps) {
  // Real, engine-generated cross-media hits from the user's own search.
  const crossResults =
    phase === "results" && seed ? allResults.filter((r) => r.item.mediaType !== seed.mediaType).slice(0, 10) : [];

  const hasRealResults = crossResults.length > 0;

  const examplePairs = EXAMPLE_PAIRS.map(([bookId, movieId]) => ({
    book: getItemById(bookId),
    movie: getItemById(movieId),
  })).filter((pair): pair is { book: CatalogItem; movie: CatalogItem } => Boolean(pair.book && pair.movie));

  const featuredPair = examplePairs[0];
  const sidePairs = examplePairs.slice(1);

  return (
    <section
      id="cross-media"
      aria-labelledby="cross-media-heading"
      className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-border"
    >
      {/* Backdrop */}
      <div className="absolute inset-0">
        <img src={crossMediaArt} alt="" role="presentation" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-main via-main/90 to-main/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-main via-transparent to-main/30" />
      </div>

      <div className="relative p-6 sm:p-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-warm/30 bg-warm/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-normal text-warm">
          <ArrowLeftRight className="h-3 w-3" />
          Cross-media discovery
        </span>
        <h2
          id="cross-media-heading"
          className="mt-3 max-w-lg font-heading text-2xl font-extrabold tracking-normal text-fg sm:text-3xl"
        >
          Loved the movie?
          <br />
          Discover the book.
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-secondary">
          Your next favorite story might be in another format. Explore books and movies connected by related
          themes, genres, and content.
        </p>

        {hasRealResults ? (
          <div className="mt-8">
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-fg-muted">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              From your search — {seed?.mediaType === "movie" ? "books matched to your movie" : "movies matched to your book"}
            </p>
            <div className="no-scrollbar -mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-2">
              {crossResults.map((result) => (
                <PosterCard key={result.item.id} item={result.item} onOpen={onOpen} widthClass="w-[140px] sm:w-[160px]" />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-9">
            <p className="text-xs font-semibold uppercase tracking-normal text-fg-muted">
              Examples from the catalog · one story, two formats
            </p>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:gap-10">
              {/* Featured connected pair */}
              {featuredPair && (
                <div className="flex flex-col gap-5 rounded-3xl border border-fg/10 bg-background/50 p-5 backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:p-6">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="auto"
                      type="button"
                      onClick={() => onOpen(featuredPair.book)}
                      className="group w-24 flex-shrink-0"
                      aria-label={`View details for ${featuredPair.book.title} (book)`}
                    >
                      <Artwork
                        item={featuredPair.book}
                        className="shadow-xl shadow-background/60 ring-1 ring-foreground/10 transition-transform duration-300 group-hover:-translate-y-1"
                      />
                      <span className="mt-2 flex items-center gap-1 text-[11px] font-medium text-fg-muted">
                        <BookOpen className="h-3 w-3 text-blue" /> Book · {featuredPair.book.year}
                      </span>
                    </Button>

                    <div className="flex flex-col items-center gap-1.5 px-1" aria-hidden="true">
                      <span className="h-px w-5 bg-gradient-to-r from-blue to-accent" />
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span className="h-px w-5 bg-gradient-to-r from-accent to-warm/70" />
                    </div>

                    <Button variant="ghost" size="auto"
                      type="button"
                      onClick={() => onOpen(featuredPair.movie)}
                      className="group w-24 flex-shrink-0"
                      aria-label={`View details for ${featuredPair.movie.title} (movie)`}
                    >
                      <Artwork
                        item={featuredPair.movie}
                        className="shadow-xl shadow-background/60 ring-1 ring-foreground/10 transition-transform duration-300 group-hover:-translate-y-1"
                      />
                      <span className="mt-2 flex items-center gap-1 text-[11px] font-medium text-fg-muted">
                        <Film className="h-3 w-3 text-warm" /> Film · {featuredPair.movie.year}
                      </span>
                    </Button>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-lg font-bold text-fg">{featuredPair.book.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-fg-secondary">
                      {featuredPair.book.description}
                    </p>
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-normal text-fg-muted">
                      Shared story elements
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {sharedTermsBetween(featuredPair.book, featuredPair.movie).map((term) => (
                        <span
                          key={term}
                          className="rounded-full border border-blue/25 bg-blue/10 px-2.5 py-0.5 text-[11px] font-medium text-blue"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" size="auto"
                      type="button"
                      onClick={() => onOpen(featuredPair.book)}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent-hover"
                    >
                      Inspect this title
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Compact side pairs */}
              <div className="flex gap-4 lg:flex-col lg:justify-center">
                {sidePairs.map((pair) => (
                  <Button variant="ghost" size="auto"
                    key={pair.book.id}
                    type="button"
                    onClick={() => onOpen(pair.book)}
                    className="group flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-fg/10 bg-background/45 px-4 py-3 backdrop-blur-md transition-colors hover:border-fg/20 lg:flex-none"
                    aria-label={`View details for ${pair.book.title} (book)`}
                  >
                    <Artwork item={pair.book} className="w-10 rounded ring-1 ring-foreground/10" />
                    <ArrowLeftRight className="h-3.5 w-3.5 flex-shrink-0 text-fg-muted transition-colors group-hover:text-accent" aria-hidden="true" />
                    <Artwork item={pair.movie} className="w-10 rounded ring-1 ring-foreground/10" />
                    <span className="hidden text-left sm:block lg:hidden xl:block">
                      <span className="block max-w-[120px] truncate text-xs font-semibold text-fg">{pair.book.title}</span>
                      <span className="block text-[10px] text-fg-muted">
                        {pair.book.year} → {pair.movie.year}
                      </span>
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <Button variant="ghost" size="auto"
              type="button"
              onClick={onBegin}
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-fg px-6 text-sm font-bold text-main transition-colors hover:bg-accent hover:text-primary-foreground"
            >
              <Sparkles className="h-4 w-4" />
              Try cross-media discovery
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
