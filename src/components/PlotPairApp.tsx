import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { DiscoverySection } from "@/components/DiscoverySection";
import { RecommendationSection } from "@/components/RecommendationSection";
import { ContentCarousel } from "@/components/ContentCarousel";
import { PosterCard } from "@/components/PosterCard";
import { ThemeExplorer } from "@/components/ThemeExplorer";
import { CrossMediaSection } from "@/components/CrossMediaSection";
import { HowItWorks } from "@/components/HowItWorks";
import { AboutProject } from "@/components/AboutProject";
import { TeamSection } from "@/components/TeamSection";
import { Footer } from "@/components/Footer";
import { ItemDetailsModal } from "@/components/ItemDetailsModal";
import { getRecommendations } from "@/services/recommendationService";
import { getAllBooks, getAllMovies, getCuratedCollection } from "@/services/catalogService";
import type { CatalogItem, MediaFilter, RecommendationResult, ResultsPhase } from "@/types";

interface DetailsState {
  item: CatalogItem;
  context?: {
    sharedGenres: string[];
    sharedKeywords: string[];
    score: number;
    seedTitle: string;
  };
}

const MOVIES = getAllMovies();
const BOOKS = getAllBooks();
const COLLECTION = getCuratedCollection(14);

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PlotPairApp() {
  const [seed, setSeed] = useState<CatalogItem | null>(null);
  const [filter, setFilter] = useState<MediaFilter>("both");
  const [phase, setPhase] = useState<ResultsPhase>("idle");
  const [allResults, setAllResults] = useState<RecommendationResult[]>([]);
  const [details, setDetails] = useState<DetailsState | null>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const runSearch = useCallback((item: CatalogItem, media: MediaFilter) => {
    setSeed(item);
    setFilter(media);
    setPhase("loading");
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      try {
        const recommendations = getRecommendations(item.id, "both", 20);
        setAllResults(recommendations);
        setPhase("results");
      } catch {
        setPhase("error");
      }
      window.setTimeout(() => scrollToId("recommendations"), 50);
    }, 300);
  }, []);

  const handleRetry = useCallback(() => {
    if (seed) runSearch(seed, filter);
  }, [seed, filter, runSearch]);

  function handleNewSearch() {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setSeed(null);
    setAllResults([]);
    setFilter("both");
    setPhase("idle");
    setDetails(null);
    scrollToDiscover();
  }

  function scrollToDiscover() {
    scrollToId("discover");
    window.setTimeout(() => {
      document.getElementById("discover-search-input")?.focus({ preventScroll: true });
    }, 550);
  }

  function handleViewDetails(result: RecommendationResult) {
    setDetails({
      item: result.item,
      context: {
        sharedGenres: result.sharedGenres,
        sharedKeywords: result.sharedKeywords,
        score: result.score,
        seedTitle: seed?.title ?? "",
      },
    });
  }

  function openDetails(item: CatalogItem) {
    setDetails({ item });
  }

  function handleFindSimilar(item: CatalogItem) {
    setDetails(null);
    runSearch(item, "both");
  }

  return (
    <div id="top" className="min-h-screen bg-main font-body text-fg antialiased">
      <Navbar onSelectItem={openDetails} />
      <main>
        <HeroBanner
          onStartDiscovery={scrollToDiscover}
          onExploreCollection={() => scrollToId("collection-row")}
          onFindSimilar={(item) => runSearch(item, "both")}
          onOpenItem={openDetails}
        />
        <DiscoverySection onSubmit={runSearch} isLoading={phase === "loading"} />
        <RecommendationSection
          phase={phase}
          seed={seed}
          allResults={allResults}
          filter={filter}
          onFilterChange={setFilter}
          onViewDetails={handleViewDetails}
          onNewSearch={handleNewSearch}
          onRetry={handleRetry}
        />
        <div className="mx-auto flex max-w-[1400px] flex-col gap-12 px-4 pb-16 pt-8 sm:px-6 lg:px-10 lg:pt-10">
          <ContentCarousel
            id="collection-row"
            title="Explore the Collection"
            subtitle="A mixed shelf from the catalog — pick anything to start exploring."
          >
            {COLLECTION.map((item) => (
              <PosterCard key={item.id} item={item} onOpen={openDetails} widthClass="w-[160px] sm:w-[180px] lg:w-[200px]" />
            ))}
          </ContentCarousel>
          <ThemeExplorer onOpen={openDetails} />
          <ContentCarousel
            id="movies-row"
            title="Movies to Explore"
            subtitle="Adventures, dramas, thrillers, and more from the catalog."
          >
            {MOVIES.map((item) => (
              <PosterCard key={item.id} item={item} onOpen={openDetails} />
            ))}
          </ContentCarousel>
          <ContentCarousel
            id="books-row"
            title="Books Worth Discovering"
            subtitle="Stories you can sink into between films."
          >
            {BOOKS.map((item) => (
              <PosterCard key={item.id} item={item} onOpen={openDetails} />
            ))}
          </ContentCarousel>
          <CrossMediaSection
            phase={phase}
            seed={seed}
            allResults={allResults}
            onOpen={openDetails}
            onBegin={scrollToDiscover}
          />
        </div>
        <HowItWorks />
        <AboutProject />
        <TeamSection />
      </main>
      <Footer />
      {details && (
        <ItemDetailsModal
          item={details.item}
          {...(details.context ? { context: details.context } : {})}
          onClose={() => setDetails(null)}
          onFindSimilar={handleFindSimilar}
        />
      )}
    </div>
  );
}