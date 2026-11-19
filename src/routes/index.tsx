import { createFileRoute } from "@tanstack/react-router";
import { PlotPairApp } from "@/components/PlotPairApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plot Pair — Find stories worth your time" },
      {
        name: "description",
        content:
          "Discover movies and books with clear, content-based recommendations inspired by the stories you already love.",
      },
      { property: "og:title", content: "Plot Pair — Find stories worth your time" },
      {
        property: "og:description",
        content: "Find books and films with themes, genres, and stories in common.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <PlotPairApp />;
}
