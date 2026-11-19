import { Button } from "@/components/ui/button";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { BookOpen, Check, Film, Loader2, Search, X } from "lucide-react";
import { searchItems } from "@/services/catalogService";
import { Artwork } from "@/components/Artwork";
import { MediaTypeSelector } from "@/components/MediaTypeSelector";
import type { CatalogItem, MediaFilter } from "@/types";
import { cn } from "@/utils/cn";

interface SearchBarProps {
  onSubmit: (item: CatalogItem, media: MediaFilter) => void;
  isLoading: boolean;
}

export function SearchBar({ onSubmit, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [media, setMedia] = useState<MediaFilter>("both");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const listboxId = useId();
  const INPUT_ID = "discover-search-input";

  const suggestions = useMemo(() => {
    if (selectedItem) return [];
    return searchItems(query, 8);
  }, [query, selectedItem]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleQueryChange(value: string) {
    setQuery(value);
    setSelectedItem(null);
    setValidationMessage(null);
    setIsOpen(value.trim().length > 0);
    setHighlightedIndex(-1);
  }

  function selectItem(item: CatalogItem) {
    setSelectedItem(item);
    setQuery(item.title);
    setIsOpen(false);
    setHighlightedIndex(-1);
    setValidationMessage(null);
  }

  function clearSelection() {
    setSelectedItem(null);
    setQuery("");
    setValidationMessage(null);
    setIsOpen(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (isOpen && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((i) => (i + 1) % suggestions.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const target = highlightedIndex >= 0 ? suggestions[highlightedIndex] : suggestions[0];
        if (target) selectItem(target);
        return;
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
    } else if (e.key === "ArrowDown" && query.trim().length > 0) {
      setIsOpen(true);
    }
  }

  function handleFindClick() {
    if (!selectedItem) {
      setValidationMessage("Select a movie or book from the search suggestions to continue.");
      return;
    }
    onSubmit(selectedItem, media);
  }

  const showNoResults = !selectedItem && query.trim().length > 0 && isOpen && suggestions.length === 0;

  return (
    <div className="w-full">
      <div ref={containerRef} className="relative">
        {/* Selected-item preview */}
        {selectedItem ? (
          <div className="flex items-center gap-4 rounded-2xl border border-accent/40 bg-elevated p-3 shadow-lg shadow-background/40">
            <Artwork item={selectedItem} size="thumb" className="w-12 flex-shrink-0 rounded-md" />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-normal text-accent">
                <Check className="h-3.5 w-3.5" />
                Selected seed
              </p>
              <p className="mt-0.5 truncate font-heading text-base font-bold text-fg">
                {selectedItem.title}{" "}
                <span className="font-body text-xs font-medium text-fg-muted">
                  · {selectedItem.mediaType === "movie" ? "Movie" : "Book"}
                  {selectedItem.year ? ` · ${selectedItem.year}` : ""}
                </span>
              </p>
            </div>
            <Button variant="ghost" size="auto"
              type="button"
              onClick={clearSelection}
              aria-label="Clear selected title"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border text-fg-secondary transition-colors hover:border-fg-muted hover:text-fg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          /* Search field */
          <div
            className={cn(
              "flex items-center gap-3 rounded-2xl border bg-elevated/95 px-5 py-4 shadow-lg shadow-background/40 transition-colors",
              validationMessage ? "border-error/70" : "border-border focus-within:border-accent/60"
            )}
          >
            <Search className="h-5 w-5 flex-shrink-0 text-fg-muted" aria-hidden="true" />
            <input
              ref={inputRef}
              id={INPUT_ID}
              role="combobox"
              aria-expanded={isOpen}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined}
              aria-label="Search for a movie or book you love"
              type="text"
              autoComplete="off"
              placeholder="Search for a movie or book you love..."
              className="w-full min-w-0 bg-transparent text-base text-fg placeholder:text-fg-muted focus:outline-none"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onFocus={() => {
                if (query.trim().length > 0) setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
            />
            {query && (
              <Button variant="ghost" size="auto"
                type="button"
                aria-label="Clear search"
                onClick={clearSelection}
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-card hover:text-fg"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {/* Suggestions */}
        {isOpen && suggestions.length > 0 && !selectedItem && (
          <ul
            id={listboxId}
            role="listbox"
            aria-label="Search suggestions"
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-elevated shadow-2xl shadow-background/70"
          >
            {suggestions.map((item, index) => (
              <li
                key={item.id}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={highlightedIndex === index}
              >
                <Button variant="ghost" size="auto"
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectItem(item)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors",
                    highlightedIndex === index ? "bg-card" : "hover:bg-card/60"
                  )}
                >
                  <Artwork item={item} size="thumb" className="w-10 flex-shrink-0 rounded" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-fg">{item.title}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-fg-muted">
                      {item.mediaType === "movie" ? (
                        <Film className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <BookOpen className="h-3 w-3" aria-hidden="true" />
                      )}
                      {item.mediaType === "movie" ? "Movie" : "Book"}
                      {item.year ? ` · ${item.year}` : ""}
                      {item.genres[0] ? ` · ${item.genres[0]}` : ""}
                    </span>
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        )}

        {showNoResults && (
          <div
            role="status"
            className="absolute z-30 mt-2 w-full rounded-2xl border border-border bg-elevated px-4 py-3.5 shadow-2xl shadow-background/70"
          >
            <p className="text-sm font-semibold text-fg">No titles found</p>
            <p className="mt-0.5 text-xs text-fg-muted">Try a different title or browse the available collection.</p>
          </div>
        )}
      </div>

      {validationMessage && (
        <p role="alert" className="mt-3 text-sm font-medium text-error">
          {validationMessage}
        </p>
      )}

      {/* Options + submit */}
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <MediaTypeSelector
          value={media}
          onChange={setMedia}
          idPrefix="discover-media"
          aria-label="Recommendation category"
          allLabel="All Similar Stories"
        />

        <Button variant="ghost" size="auto"
          type="button"
          onClick={handleFindClick}
          disabled={isLoading}
          className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-accent/25 transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Finding stories that match...
            </>
          ) : (
            "Find My Recommendations"
          )}
        </Button>
      </div>
    </div>
  );
}
