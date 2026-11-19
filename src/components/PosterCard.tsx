import { Button } from "@/components/ui/button";
import { BookOpen, Film, Info } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import type { CatalogItem } from "@/types";
import { cn } from "@/utils/cn";

interface PosterCardProps {
  item: CatalogItem;
  onOpen: (item: CatalogItem) => void;
  /** Width utility classes control the card size inside carousels. */
  widthClass?: string;
}

/**
 * OTT-style poster tile for browsing rows. Artwork-driven with an
 * always-visible title overlay; on hover/focus it lifts and reveals extra
 * metadata. The entire tile is a button so it works without hover (touch).
 */
export function PosterCard({ item, onOpen, widthClass = "w-[148px] sm:w-[168px] lg:w-[184px]" }: PosterCardProps) {
  const creator = item.mediaType === "movie" ? item.director : item.author;
  const TypeIcon = item.mediaType === "movie" ? Film : BookOpen;

  return (
    <div role="listitem" className={cn("flex-shrink-0 snap-start", widthClass)}>
      <Button variant="ghost" size="auto"
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`View details for ${item.title} (${item.mediaType === "movie" ? "Movie" : "Book"})`}
        className="group relative block w-full text-left"
      >
      <div className="relative">
        <div className="rounded-lg ring-1 ring-foreground/0 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-background/60 group-hover:ring-foreground/20 group-focus-visible:-translate-y-1.5">
          <Artwork item={item} />
        </div>

        {/* Media type corner tab */}
        <span className="absolute right-2 top-2 flex h-6 items-center gap-1 rounded-full bg-background/60 px-2 text-[10px] font-semibold uppercase tracking-normal text-fg backdrop-blur-sm">
          <TypeIcon className="h-3 w-3" />
          {item.mediaType === "movie" ? "Film" : "Book"}
        </span>

        {/* Always-visible title overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-lg bg-gradient-to-t from-black/85 via-black/45 to-transparent px-2.5 pb-2.5 pt-8">
          <p className="truncate font-heading text-sm font-bold leading-tight text-fg">{item.title}</p>
          <p className="mt-0.5 truncate text-[11px] text-fg-secondary">
            {[item.year, creator].filter(Boolean).join(" · ")}
          </p>
        </div>

        {/* Hover reveal (desktop) — extra info hint */}
        <div className="pointer-events-none absolute inset-0 hidden rounded-lg bg-background/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:flex md:items-center md:justify-center">
          <span className="flex items-center gap-1.5 rounded-full bg-fg px-3.5 py-1.5 text-xs font-bold text-main">
            <Info className="h-3.5 w-3.5" />
            View Details
          </span>
        </div>
      </div>
      </Button>
    </div>
  );
}
