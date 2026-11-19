import { Button } from "@/components/ui/button";
import { BookOpen, Film } from "lucide-react";
import { Artwork } from "@/components/Artwork";
import type { RecommendationResult } from "@/types";

interface RecommendationCardProps {
  result: RecommendationResult;
  onViewDetails: () => void;
}

export function RecommendationCard({ result, onViewDetails }: RecommendationCardProps) {
  const { item, score, sharedGenres, sharedKeywords } = result;
  const creator = item.mediaType === "movie" ? item.director : item.author;
  const TypeIcon = item.mediaType === "movie" ? Film : BookOpen;
  const reasonTerms = [...sharedGenres, ...sharedKeywords].slice(0, 3);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-background/50">
      <div className="relative p-3 pb-0">
        <div className="overflow-hidden rounded-lg">
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            <Artwork item={item} />
          </div>
        </div>

        {/* Media type tab */}
        <span className="absolute left-5 top-5 flex items-center gap-1 rounded-full bg-background/65 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-normal text-fg backdrop-blur-sm">
          <TypeIcon className="h-3 w-3" />
          {item.mediaType === "movie" ? "Movie" : "Book"}
        </span>

        {/* Actual calculated score */}
        {score > 0 && (
          <span
            className="absolute right-5 top-5 rounded-full bg-background/65 px-2 py-0.5 text-[10px] font-semibold tracking-normal text-accent backdrop-blur-sm"
            title="Cosine similarity between content profiles — not a probability of enjoyment"
          >
            {score.toFixed(2)} match
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4 pt-3.5">
        <div>
          <h3 className="font-heading text-lg font-bold leading-snug text-fg">{item.title}</h3>
          <p className="mt-1 truncate text-xs text-fg-muted">
            {[creator, item.year].filter(Boolean).join(" · ")}
            {item.genres.length > 0
              ? `${creator || item.year ? " · " : ""}${item.genres.slice(0, 2).join(", ")}`
              : ""}
          </p>
        </div>

        {item.description && <p className="line-clamp-2 text-xs leading-relaxed text-fg-secondary">{item.description}</p>}

        {/* Explanation — derived from actual shared metadata */}
        {reasonTerms.length > 0 && (
          <div className="mt-auto">
            <p className="text-[10px] font-semibold uppercase tracking-normal text-fg-muted">Why this matches</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {reasonTerms.map((term) => (
                <span
                  key={term}
                  className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        )}

        <Button variant="ghost" size="auto"
          type="button"
          onClick={onViewDetails}
          className="mt-3 inline-flex h-10 items-center justify-center rounded-full border border-border bg-elevated text-sm font-semibold text-fg transition-colors hover:border-accent/60 hover:text-accent"
        >
          View details
        </Button>
      </div>
    </article>
  );
}
