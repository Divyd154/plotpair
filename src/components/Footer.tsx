import { Clapperboard } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-alt px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5" aria-label="Plot Pair home">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-main">
                <Clapperboard className="h-4.5 w-4.5" strokeWidth={2.25} />
              </span>
              <span className="font-heading text-lg font-extrabold tracking-normal text-fg">
                Plot <span className="text-accent">Pair</span>
              </span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              A cinematic discovery experience for movies and books, powered by content-based recommendation
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3" aria-label="Footer">
            <div className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-normal text-fg-muted">Explore</p>
              <a href="#movies-row" className="block text-fg-secondary transition-colors hover:text-fg">
                Movies
              </a>
              <a href="#books-row" className="block text-fg-secondary transition-colors hover:text-fg">
                Books
              </a>
              <a href="#collection-row" className="block text-fg-secondary transition-colors hover:text-fg">
                Collection
              </a>
            </div>
            <div className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-normal text-fg-muted">Discover</p>
              <a href="#discover" className="block text-fg-secondary transition-colors hover:text-fg">
                Recommendations
              </a>
              <a href="#cross-media" className="block text-fg-secondary transition-colors hover:text-fg">
                Cross-media
              </a>
              <a href="#how-it-works" className="block text-fg-secondary transition-colors hover:text-fg">
                How it works
              </a>
            </div>
            <div className="space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-normal text-fg-muted">Project</p>
              <a href="#about" className="block text-fg-secondary transition-colors hover:text-fg">
                About
              </a>
              <a href="#team" className="block text-fg-secondary transition-colors hover:text-fg">
                Team
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-fg-muted">
          <p>
            Content-Based Movie and Book Recommendation Engine — The Innov8rs · Group SY208 · Department of Computer
            Science &amp; Engineering · MIT School of Computing, MIT-ADT University · Faculty Guide: Dr. Dolly Kumari
          </p>
          <p className="mt-1.5">
            Academic prototype running on a small demonstration dataset. Matches are computed locally with TF-IDF +
            cosine similarity; this site is not connected to a production recommendation backend.
          </p>
        </div>
      </div>
    </footer>
  );
}
