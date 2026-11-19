import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { getItemsByGenre, getTopGenres } from "@/services/catalogService";
import { ContentCarousel } from "@/components/ContentCarousel";
import { PosterCard } from "@/components/PosterCard";
import type { CatalogItem } from "@/types";
import { cn } from "@/utils/cn";

interface ThemeExplorerProps {
  onOpen: (item: CatalogItem) => void;

  /** Headline is intentional: themes are generated from actual catalog genres. */
}

export function ThemeExplorer({ onOpen }: ThemeExplorerProps) {
  const themes = useMemo(() => getTopGenres(8), []);
  const [active, setActive] = useState<string>(themes[0]?.genre ?? "");
  const items = useMemo(() => (active ? getItemsByGenre(active, 16) : []), [active]);

  if (themes.length === 0) return null;

  const themeChips = (
    <div className="mb-5 flex flex-wrap gap-1.5" role="tablist" aria-label="Themes">
      {themes.map((theme) => (
        <Button variant="ghost" size="auto"
          key={theme.genre}
          type="button"
          role="tab"
          aria-selected={active === theme.genre}
          onClick={() => setActive(theme.genre)}
          className={cn(
            "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
            active === theme.genre
              ? "border-accent bg-accent/15 text-accent"
              : "border-border bg-elevated/70 text-fg-secondary hover:text-fg"
          )}
        >
          {theme.genre}
          <span className="ml-1.5 text-[10px] font-medium opacity-60">{theme.count}</span>
        </Button>
      ))}
    </div>
  );

  return (
    <div id="themes-row" className="scroll-mt-24">
      <ContentCarousel
        id="themes"
        title="Explore by Theme"
        subtitle="Browse the catalog through its most represented genres and moods."
        belowHeader={themeChips}
        ariaLabel={`${active} titles`}
      >
        {items.map((item) => (
          <PosterCard key={item.id} item={item} onOpen={onOpen} />
        ))}
      </ContentCarousel>
    </div>
  );
}
