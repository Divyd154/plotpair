import { Button } from "@/components/ui/button";
import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContentCarouselProps {
  id?: string;
  title: string;
  subtitle?: string;
  headingExtra?: ReactNode;
  /** Content rendered between the header row and the scroller (e.g. filter chips). */
  belowHeader?: ReactNode;
  children: ReactNode;
  ariaLabel?: string;
}

/**
 * Reusable OTT-style horizontal row with edge-fade, snap scrolling,
 * restrained arrow controls on desktop, and natural swipe on mobile.
 */
export function ContentCarousel({ id, title, subtitle, headingExtra, belowHeader, children, ariaLabel }: ContentCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function page(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className="group/row relative scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-4 pr-4">
        <div>
          <h2 id={id ? `${id}-heading` : undefined} className="font-heading text-xl font-bold tracking-normal text-fg sm:text-2xl">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-fg-muted">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          {headingExtra}
          <div className="hidden gap-2 lg:flex">
            <Button variant="ghost" size="auto"
              type="button"
              aria-label={`Scroll ${title} left`}
              onClick={() => page(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-elevated/80 text-fg-secondary transition-all hover:border-fg-muted hover:text-fg disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="auto"
              type="button"
              aria-label={`Scroll ${title} right`}
              onClick={() => page(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-elevated/80 text-fg-secondary transition-all hover:border-fg-muted hover:text-fg"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {belowHeader}

      <div
        ref={scrollerRef}
        role="list"
        aria-label={ariaLabel ?? title}
        className="no-scrollbar -mx-1 flex snap-x snap-proximity gap-4 overflow-x-auto scroll-px-1 px-1 pb-2 pt-1"
      >
        {children}
      </div>
    </section>
  );
}
