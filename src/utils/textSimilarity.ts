/**
 * Lightweight, dependency-free TF-IDF + cosine similarity implementation.
 *
 * This is the client-side stand-in for the "proposed methodology" described
 * in the project (TF-IDF vectorization + cosine similarity). It is small
 * enough to run instantly in the browser over the demo dataset and is kept
 * isolated here so it can later be swapped for a real backend recommendation
 * endpoint without touching the UI layer.
 */

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "of", "to", "in", "on", "at", "for",
  "with", "as", "by", "is", "are", "was", "were", "be", "been", "being",
  "it", "its", "this", "that", "these", "those", "his", "her", "their",
  "he", "she", "they", "them", "who", "whom", "which", "into", "over",
  "after", "before", "while", "than", "then", "so", "if", "about", "from",
  "when", "where", "while", "up", "down", "out", "off", "again", "further",
  "once", "own", "same", "too", "very", "can", "will", "just", "also",
  "his", "her", "their", "its", "s",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export interface SimilarityDoc {
  id: string;
  text: string;
}

export type SparseVector = Map<string, number>;

/**
 * Builds L2-normalized TF-IDF vectors for every document in the corpus.
 * Because the vectors are normalized, a plain dot product between two
 * vectors is equivalent to their cosine similarity.
 */
export function buildTfIdfVectors(docs: SimilarityDoc[]): Map<string, SparseVector> {
  const tokenized = docs.map((d) => ({ id: d.id, tokens: tokenize(d.text) }));

  const documentFrequency = new Map<string, number>();
  tokenized.forEach(({ tokens }) => {
    new Set(tokens).forEach((term) => {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    });
  });

  const totalDocs = tokenized.length;
  const vectors = new Map<string, SparseVector>();

  tokenized.forEach(({ id, tokens }) => {
    const termFrequency = new Map<string, number>();
    tokens.forEach((term) => termFrequency.set(term, (termFrequency.get(term) ?? 0) + 1));

    const vector: SparseVector = new Map();
    let sumOfSquares = 0;

    termFrequency.forEach((count, term) => {
      const df = documentFrequency.get(term) ?? 0;
      const idf = Math.log((totalDocs + 1) / (df + 1)) + 1;
      const weight = count * idf;
      vector.set(term, weight);
      sumOfSquares += weight * weight;
    });

    const norm = Math.sqrt(sumOfSquares) || 1;
    vector.forEach((weight, term) => vector.set(term, weight / norm));

    vectors.set(id, vector);
  });

  return vectors;
}

/** Dot product of two normalized vectors, i.e. cosine similarity. */
export function cosineSimilarity(a: SparseVector, b: SparseVector): number {
  const [smaller, larger] = a.size < b.size ? [a, b] : [b, a];
  let dot = 0;
  smaller.forEach((weight, term) => {
    const otherWeight = larger.get(term);
    if (otherWeight) dot += weight * otherWeight;
  });
  return dot;
}
