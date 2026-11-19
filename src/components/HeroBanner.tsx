import { Button } from "@/components/ui/button";
import { Compass, Film, Sparkles } from "lucide-react";
import heroAsset from "@/assets/hero-dune.jpg.asset.json";
import { getItemById } from "@/services/catalogService";
import { Artwork } from "@/components/Artwork";
import type { CatalogItem } from "@/types";

const heroArt = heroAsset.url;

/** Real titles from the catalog, featured with their actual metadata. */
const FEATURED_ID = "mv-dune";
const CLUSTER_IDS = ["mv-interstellar", "bk-circe", "mv-gone-girl"];

interface HeroBannerProps {
  onStartDiscovery: () => void;
  onExploreCollection: () => void;
  onFindSimilar: (item: CatalogItem) => void;
  onOpenItem: (item: CatalogItem) => void;
}

export function HeroBanner({ onStartDiscovery, onExploreCollection, onFindSimilar, onOpenItem }: HeroBannerProps) {
  const featured = getItemById(FEATURED_ID);
  const cluster = CLUSTER_IDS.map((id) => getItemById(id)).filter(
    (item): item is CatalogItem => item !== undefined
  );
  const [leftItem, centerItem, rightItem] = cluster;

  return (
    <section id="home" aria-label="Plot Pair introduction" className="relative isolate overflow-hidden">
      {/* Cinematic backdrop */}
      <div className="absolute inset-0">
        <img src={heroArt} alt="" role="presentation" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-main via-main/85 to-main/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-main via-main/35 to-main/10" />
        <div className="absolute inset-0 hero-vignette" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6 lg:px-10 lg:pb-20 lg:pt-36">
        {/* Left: copy */}
        <div className="max-w-2xl">
          <span className="text-shadow-cine inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-normal text-warm">
            <span className="h-px w-7 bg-warm/80" aria-hidden="true" />
            Your next story starts here
          </span>

          <h1 className="text-shadow-cine mt-4 font-heading text-[42px] font-extrabold leading-[1.05] tracking-normal text-fg sm:text-6xl lg:text-[66px]">
            Find Your Next
            <br />
            <span className="headline-gradient">Obsession.</span>
          </h1>

          <p className="text-shadow-cine mt-5 max-w-lg text-base leading-relaxed text-fg-secondary sm:text-lg">
            Discover movies worth watching and books worth getting lost in. Find stories that match your taste,
            with recommendations inspired by the content you already love.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="ghost" size="auto"
              type="button"
              onClick={onStartDiscovery}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-bold text-primary-foreground shadow-lg shadow-accent/30 transition-colors hover:bg-accent-hover"
            >
              <Sparkles className="h-4 w-4" strokeWidth={2.25} />
              Discover Similar Stories
            </Button>
            <Button variant="ghost" size="auto"
              type="button"
              onClick={onExploreCollection}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-fg/25 bg-fg/5 px-7 text-sm font-semibold text-fg backdrop-blur-sm transition-colors hover:border-fg/50 hover:bg-fg/10"
            >
              <Compass className="h-4 w-4" strokeWidth={2.25} />
              Explore Movies &amp; Books
            </Button>
          </div>

          {/* Featured title from the actual catalog */}
          {featured && (
            <div className="mt-9 flex max-w-lg items-center gap-4 rounded-2xl border border-fg/10 bg-background/50 p-3.5 backdrop-blur-md">
              <Artwork item={featured} size="thumb" className="w-14 flex-shrink-0 rounded-md" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-normal text-blue">
                  <Film className="h-3 w-3" />
                  From the catalog
                  {featured.year ? <span className="text-fg-muted normal-case tracking-normal"> · {featured.year}</span> : ""}
                </p>
                <p className="mt-0.5 truncate font-heading text-base font-bold text-fg">{featured.title}</p>
                <p className="line-clamp-2 text-xs leading-relaxed text-fg-secondary">{featured.description}</p>
              </div>
              <Button variant="ghost" size="auto"
                type="button"
                onClick={() => onFindSimilar(featured)}
                className="inline-flex h-9 flex-shrink-0 items-center gap-1.5 self-center rounded-full bg-fg px-4 text-xs font-bold text-main transition-colors hover:bg-accent hover:text-primary-foreground"
              >
                See similar
              </Button>
            </div>
          )}
        </div>

        {/* Right: layered poster composition (books + movies) */}
        {leftItem && centerItem && rightItem && (
          <div className="relative hidden h-[440px] items-center justify-center lg:flex" aria-hidden="false">
            <Button variant="ghost" size="auto"
              type="button"
              onClick={() => onOpenItem(leftItem)}
              className="group absolute left-6 top-8 z-0 w-[210px] -rotate-[7deg] transition-transform duration-500 hover:-translate-y-2 hover:rotate-[-4deg]"
              aria-label={`View details for ${leftItem.title}`}
            >
              <Artwork item={leftItem} className="shadow-2xl shadow-background/70 ring-1 ring-foreground/10" />
            </Button>
            <Button variant="ghost" size="auto"
              type="button"
              onClick={() => onOpenItem(centerItem)}
              className="group relative z-10 w-[248px] transition-transform duration-500 hover:-translate-y-2"
              aria-label={`View details for ${centerItem.title}`}
            >
              <Artwork item={centerItem} className="shadow-2xl shadow-background/80 ring-1 ring-foreground/15" />
            </Button>
            <Button variant="ghost" size="auto"
              type="button"
              onClick={() => onOpenItem(rightItem)}
              className="group absolute right-6 top-14 z-0 w-[210px] rotate-[7deg] transition-transform duration-500 hover:-translate-y-2 hover:rotate-[4deg]"
              aria-label={`View details for ${rightItem.title}`}
            >
              <Artwork item={rightItem} className="shadow-2xl shadow-background/70 ring-1 ring-foreground/10" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
