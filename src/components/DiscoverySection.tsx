import { ForwardedRef, forwardRef } from "react";
import { SearchBar } from "@/components/SearchBar";
import type { CatalogItem, MediaFilter } from "@/types";

interface DiscoverySectionProps {
  onSubmit: (item: CatalogItem, media: MediaFilter) => void;
  isLoading: boolean;
}

export const DiscoverySection = forwardRef(function DiscoverySection(
  { onSubmit, isLoading }: DiscoverySectionProps,
  ref: ForwardedRef<HTMLElement>
) {
  return (
    <section
      id="discover"
      ref={ref}
      aria-labelledby="discover-heading"
      className="relative scroll-mt-20 px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-14 lg:px-10"
    >
      {/* Soft atmospheric backdrop */}
      <div
        aria-hidden="true"
        className="discovery-halo pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-[920px]">
        <h2
          id="discover-heading"
          className="text-center font-heading text-3xl font-extrabold tracking-normal text-fg sm:text-4xl"
        >
          Find Stories Like the Ones You Love
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-fg-secondary sm:text-base">
          Choose a movie or book you enjoyed, and discover other stories with similar themes, genres, and content.
        </p>

        <div className="mt-9">
          <SearchBar onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
});
