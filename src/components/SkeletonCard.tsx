export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card" aria-hidden="true">
      <div className="aspect-[2/3] w-full bg-elevated shimmer-surface" />
      <div className="space-y-2.5 p-4">
        <div className="h-4 w-3/4 rounded bg-elevated shimmer-surface" />
        <div className="h-3 w-1/2 rounded bg-elevated shimmer-surface" />
        <div className="h-3 w-full rounded bg-elevated shimmer-surface" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-16 rounded-full bg-elevated shimmer-surface" />
          <div className="h-5 w-20 rounded-full bg-elevated shimmer-surface" />
        </div>
        <div className="h-9 w-full rounded-full bg-elevated shimmer-surface" />
      </div>
    </div>
  );
}
