import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { BookOpen, Film, Sparkles, Wand2, X } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import type { CatalogItem, RecommendationResult } from "@/types";

interface ItemDetailsModalProps {
  item: CatalogItem;
  context?: Pick<RecommendationResult, "sharedGenres" | "sharedKeywords" | "score"> & { seedTitle: string };
  onClose: () => void;
  onFindSimilar: (item: CatalogItem) => void;
}

export function ItemDetailsModal({ item, context, onClose, onFindSimilar }: ItemDetailsModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [onClose]);

  const creator = item.mediaType === "movie" ? item.director : item.author;
  const creatorLabel = item.mediaType === "movie" ? "Director" : "Author";
  const reasonTerms = context ? [...context.sharedGenres, ...context.sharedKeywords].slice(0, 6) : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="item-details-title"
        className="modal-in flex max-h-[94svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-border bg-alt shadow-2xl shadow-background sm:max-h-[88svh] sm:rounded-3xl"
      >
        {/* Body */}
        <div className="relative overflow-y-auto">
          {/* Close */}
          <Button variant="ghost" size="auto"
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/55 text-fg backdrop-blur-sm transition-colors hover:bg-background/80"
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
            {/* Artwork */}
            <div className="w-36 flex-shrink-0 sm:w-48">
              <Artwork item={item} size="detail" className="shadow-2xl shadow-background/60" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-fg/15 bg-elevated px-3 py-1 text-[11px] font-semibold uppercase tracking-normal text-fg-secondary">
                {item.mediaType === "movie" ? <Film className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                {item.mediaType === "movie" ? "Movie" : "Book"}
              </span>

              <h2 id="item-details-title" className="mt-3 font-heading text-3xl font-extrabold tracking-normal text-fg sm:text-4xl">
                {item.title}
              </h2>

              <p className="mt-2 text-sm text-fg-muted">
                {creator ? `${creatorLabel} — ${creator}` : null}
                {creator && item.year ? " · " : ""}
                {item.year || ""}
              </p>

              {item.genres.length > 0 && (
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {item.genres.map((genre) => (
                    <span key={genre} className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-fg-secondary">
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {context && (
                <div className="mt-4 rounded-2xl border border-accent/25 bg-accent/10 p-4">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-normal text-accent">
                    <Sparkles className="h-3.5 w-3.5" />
                    Why this matches — content similarity · {context.score.toFixed(2)}
                  </p>
                  {reasonTerms.length > 0 ? (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {reasonTerms.map((term) => (
                        <span
                          key={term}
                          className="rounded-full border border-accent/30 bg-background/25 px-2.5 py-0.5 text-[11px] font-medium text-accent"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1.5 text-xs text-fg-secondary">
                      Matched on overall content profile with {context.seedTitle}.
                    </p>
                  )}
                </div>
              )}

              {item.description && (
                <div className="mt-5">
                  <h3 className="text-xs font-semibold uppercase tracking-normal text-fg-muted">Synopsis</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-secondary">{item.description}</p>
                </div>
              )}

              {item.mediaType === "movie" && item.cast && item.cast.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xs font-semibold uppercase tracking-normal text-fg-muted">Cast</h3>
                  <p className="mt-1.5 text-sm text-fg-secondary">{item.cast.join(", ")}</p>
                </div>
              )}

              {item.keywords.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xs font-semibold uppercase tracking-normal text-fg-muted">Themes & keywords</h3>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {item.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-border bg-elevated px-2.5 py-0.5 text-[11px] text-fg-secondary"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="ghost" size="auto"
                  type="button"
                  onClick={() => onFindSimilar(item)}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-primary-foreground transition-colors hover:bg-accent-hover"
                >
                  <Wand2 className="h-4 w-4" />
                  Find stories like this
                </Button>
                <Button variant="ghost" size="auto"
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 items-center rounded-full border border-border bg-elevated px-6 text-sm font-semibold text-fg transition-colors hover:border-fg-muted"
                >
                  Back to browsing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
