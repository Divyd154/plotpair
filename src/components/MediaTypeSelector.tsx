import { Button } from "@/components/ui/button";
import type { MediaFilter } from "@/types";
import { cn } from "@/utils/cn";

interface MediaTypeSelectorProps {
  value: MediaFilter;
  onChange: (value: MediaFilter) => void;
  idPrefix: string;
  "aria-label": string;
  /** Optional custom label for the "both" option (default "All"). */
  allLabel?: string;
}

export function MediaTypeSelector({ value, onChange, idPrefix, allLabel = "All", ...rest }: MediaTypeSelectorProps) {
  const options: { value: MediaFilter; label: string }[] = [
    { value: "both", label: allLabel },
    { value: "movie", label: "Movies" },
    { value: "book", label: "Books" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label={rest["aria-label"]}
      className="inline-flex gap-1 rounded-full border border-border bg-elevated/90 p-1"
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <Button variant="ghost" size="auto"
            key={option.value}
            type="button"
            id={`${idPrefix}-${option.value}`}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
              isSelected ? "bg-accent text-primary-foreground shadow-sm shadow-accent/30" : "text-fg-secondary hover:text-fg"
            )}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}
