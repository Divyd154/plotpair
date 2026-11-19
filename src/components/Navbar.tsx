import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Clapperboard, Menu, Search, X } from "lucide-react";
import { searchItems } from "@/services/catalogService";
import { Artwork } from "@/components/Artwork";
import type { CatalogItem } from "@/types";
import { cn } from "@/utils/cn";

const LINKS = [
  { href: "#top", label: "Home" },
  { href: "#movies-row", label: "Movies" },
  { href: "#books-row", label: "Books" },
  { href: "#discover", label: "Discover" },
];

interface NavbarProps {
  onSelectItem: (item: CatalogItem) => void;
}

export function Navbar({ onSelectItem }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const suggestions = searchItems(query, 6);

  function handleSelect(item: CatalogItem) {
    onSelectItem(item);
    setQuery("");
    setSearchOpen(false);
    setMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled || menuOpen ? "border-b border-border bg-main/90 backdrop-blur-md" : "bg-gradient-to-b from-black/70 to-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        {/* Wordmark */}
        <a href="#top" className="flex items-center gap-2.5" aria-label="Plot Pair home">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-primary-foreground shadow-md">
            <Clapperboard className="h-4.5 w-4.5" strokeWidth={2.25} />
          </span>
          <span className="font-heading text-lg font-extrabold tracking-normal text-fg">
            Plot <span className="text-accent">Pair</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="ml-6 hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-fg-secondary transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Expanding catalog search (desktop) */}
          <div ref={searchRef} className="relative hidden md:block">
            <div
              className={cn(
                "flex items-center overflow-hidden rounded-full border transition-all duration-300",
                searchOpen ? "w-[300px] border-border bg-elevated" : "w-10 border-transparent"
              )}
            >
              <Button variant="ghost" size="auto"
                type="button"
                aria-label={searchOpen ? "Close catalog search" : "Open catalog search"}
                onClick={() => setSearchOpen((v) => !v)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-fg-secondary transition-colors hover:text-fg"
              >
                <Search className="h-5 w-5" />
              </Button>
              {searchOpen && (
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setSearchOpen(false);
                      setQuery("");
                    }
                    if (e.key === "Enter" && suggestions[0]) handleSelect(suggestions[0]);
                  }}
                  placeholder="Search the catalog..."
                  aria-label="Search the catalog"
                  className="w-full bg-transparent pr-3 text-sm text-fg placeholder:text-fg-muted"
                />
              )}
            </div>

            {searchOpen && query.trim().length > 0 && (
              <div className="absolute right-0 top-12 w-[340px] overflow-hidden rounded-xl border border-border bg-elevated shadow-2xl shadow-background/60">
                {suggestions.length > 0 ? (
                  <ul role="listbox" aria-label="Catalog search results">
                    {suggestions.map((item) => (
                      <li key={item.id}>
                        <Button variant="ghost" size="auto"
                          type="button"
                          onClick={() => handleSelect(item)}
                          className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-card"
                        >
                          <Artwork item={item} size="thumb" className="w-9 flex-shrink-0 rounded-sm" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-fg">{item.title}</span>
                            <span className="block text-xs text-fg-muted">
                              {item.mediaType === "movie" ? "Movie" : "Book"}
                              {item.year ? ` · ${item.year}` : ""}
                            </span>
                          </span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p role="status" className="px-4 py-3 text-sm text-fg-muted">
                    No titles found. Try a different title or browse the available collection.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Mobile: search sends user to the discovery section */}
          <a
            href="#discover"
            onClick={() => setMenuOpen(false)}
            aria-label="Go to search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-fg-secondary transition-colors hover:text-fg md:hidden"
          >
            <Search className="h-5 w-5" />
          </a>

          <Button variant="ghost" size="auto"
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-elevated md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-border bg-main/95 px-4 py-3 backdrop-blur-md md:hidden" aria-label="Primary mobile">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-fg-secondary transition-colors hover:bg-elevated hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
