import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, BookOpen, Film, RotateCcw, SearchX } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import { MediaTypeSelector } from "@/components/MediaTypeSelector";
import { RecommendationCard } from "@/components/RecommendationCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import type { CatalogItem, MediaFilter, RecommendationResult, ResultsPhase } from "@/types";
import { cn } from "@/utils/cn";

type SortMode = "match" | "alpha";

interface RecommendationSectionProps {
  phase: ResultsPhase;
  seed: CatalogItem | null;
  allResults: RecommendationResult[];
  filter: MediaFilter;
  onFilterChange: (value: MediaFilter) => void;
  onViewDetails: (result: RecommendationResult) => void;
  onNewSearch: () => void;
  onRetry: () => void;
}

export function RecommendationSection({
  phase,
  seed,
  allResults,
  filter,
  onFilterChange,
  onViewDetails,
  onNewSearch,
  onRetry,
}: RecommendationSectionProps) {
  const [sort, setSort] = useState<SortMode>("match");

  useEffect(() => {
    setSort("match");
  }, [seed]);

  const displayed = useMemo(() => {
    const filtered = filter === "both" ? allResults : allResults.filter((r) => r.item.mediaType === filter);
    return [...filtered].sort((a, b) =>
      sort === "match" ? b.score - a.score : a.item.title.localeCompare(b.item.title)
    );
  }, [allResults, filter, sort]);

  if (phase === "idle") return null;

  const SeedIcon = seed?.mediaType === "movie" ? Film : BookOpen;

  return (
    <section
      id="recommendations"
      aria-labelledby="recommendations-heading"
      className="scroll-mt-20 border-y border-border bg-alt/60 px-4 py-12 sm:px-6 lg:px-10 lg:py-14"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4">
            {seed && <Artwork item={seed} size="thumb" className="hidden w-16 flex-shrink-0 rounded-md sm:block" />}
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-normal text-blue">
                <SeedIcon className="h-3.5 w-3.5" />
                {seed?.mediaType === "movie" ? "Movie seed" : "Book seed"}
              </p>
              <h2 id="recommendations-heading" className="mt-1 font-heading text-2xl font-extrabold tracking-normal text-fg sm:text-3xl">
                Because You Loved <span className="text-blue">{seed?.title}</span>
              </h2>
              <p className="mt-1.5 max-w-md text-sm text-fg-muted">
                Explore stories that share related content, themes, or genres.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {phase === "results" && (
              <>
                <MediaTypeSelector
                  value={filter}
                  onChange={onFilterChange}
                  idPrefix="results-filter"
                  aria-label="Filter recommendations"
                />
                <label className="flex items-center gap-2 text-xs font-medium text-fg-muted">
                  Sort
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortMode)}
                    className="h-9 rounded-full border border-border bg-elevated px-3 text-xs font-semibold text-fg focus:border-accent/60"
                    aria-label="Sort recommendations"
                  >
                    <option value="match">Best content match</option>
                    <option value="alpha">Title A–Z</option>
                  </select>
                </label>
              </>
            )}
            <Button variant="ghost" size="auto"
              type="button"
              onClick={onNewSearch}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-elevated px-4 text-xs font-bold text-fg transition-colors hover:border-fg-muted"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              New search
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="mt-9" aria-live="polite">
          {phase === "loading" && (
            <>
              <p role="status" className="mb-5 flex items-center gap-2 text-sm font-medium text-fg-secondary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />
                Finding stories that match...
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </>
          )}

          {phase === "error" && (
            <div
              role="alert"
              className="flex flex-col items-center gap-3 rounded-2xl border border-error/40 bg-error/10 px-6 py-14 text-center"
            >
              <AlertTriangle className="h-8 w-8 text-error" aria-hidden="true" />
              <p className="max-w-sm text-sm text-fg-secondary">
                Something went wrong while loading this content. Please try again.
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Button variant="ghost" size="auto"
                  type="button"
                  onClick={onRetry}
                  className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-accent-hover"
                >
                  Try again
                </Button>
                <Button variant="ghost" size="auto"
                  type="button"
                  onClick={onNewSearch}
                  className="rounded-full border border-border bg-elevated px-5 py-2 text-sm font-semibold text-fg transition-colors hover:border-fg-muted"
                >
                  Return to search
                </Button>
              </div>
            </div>
          )}

          {phase === "results" && displayed.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-elevated/40 px-6 py-14 text-center">
              <SearchX className="h-8 w-8 text-fg-muted" aria-hidden="true" />
              <h3 className="font-heading text-lg font-bold text-fg">No close matches found</h3>
              <p className="max-w-sm text-sm text-fg-muted">Try another title or explore a different category.</p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                {filter !== "both" && (
                  <Button variant="ghost" size="auto"
                    type="button"
                    onClick={() => onFilterChange("both")}
                    className="rounded-full border border-border bg-elevated px-5 py-2 text-sm font-semibold text-fg transition-colors hover:border-fg-muted"
                  >
                    Show both categories
                  </Button>
                )}
                <Button variant="ghost" size="auto"
                  type="button"
                  onClick={onNewSearch}
                  className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-accent-hover"
                >
                  Change search
                </Button>
              </div>
            </div>
          )}

          {phase === "results" && displayed.length > 0 && (
            <>
              <p className="sr-only" role="status">
                Showing {displayed.length} recommendations for {seed?.title}.
              </p>
              <div
                className={cn(
                  "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                )}
              >
                {displayed.map((result) => (
                  <RecommendationCard key={result.item.id} result={result} onViewDetails={() => onViewDetails(result)} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
