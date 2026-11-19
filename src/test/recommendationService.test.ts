import { describe, expect, it } from "vitest";
import { getRecommendations } from "@/services/recommendationService";

describe("content-based recommendations", () => {
  it("finds the Dune book when starting from the Dune movie", () => {
    const results = getRecommendations("mv-dune", "both", 20);
    const duneBook = results.find((result) => result.item.id === "bk-dune");

    expect(duneBook?.item.title).toBe("Dune");
    expect(duneBook?.sharedGenres).toContain("Sci-Fi");
    expect(duneBook?.sharedKeywords).toContain("desert planet");
  });
});