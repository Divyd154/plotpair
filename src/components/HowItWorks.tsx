import { FileSearch, GitCompareArrows, MessageSquareQuote, MousePointerClick } from "lucide-react";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Choose a title",
    description: "Search the catalog and pick a book or movie you already enjoy.",
  },
  {
    icon: FileSearch,
    title: "Analyze the content",
    description: "Its description, genres, and themes are turned into a content profile.",
  },
  {
    icon: GitCompareArrows,
    title: "Compare related items",
    description: "That profile is compared against every other title to find the closest matches.",
  },
  {
    icon: MessageSquareQuote,
    title: "Explain the match",
    description: "Each recommendation lists the genres and themes it actually shares with your pick.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-20 border-t border-border bg-alt/50 px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <h2 id="how-heading" className="font-heading text-2xl font-extrabold tracking-normal text-fg sm:text-3xl">
            How it works
          </h2>
          <p className="mt-2 text-sm text-fg-secondary sm:text-base">
            Plot Pair uses content-based filtering: it compares what a story is <em>about</em>, not what other
            viewers clicked on.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-5 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <step.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="font-heading text-sm font-extrabold text-fg-muted/60">0{index + 1}</span>
              </div>
              <h3 className="font-heading text-base font-bold text-fg">{step.title}</h3>
              <p className="text-sm leading-relaxed text-fg-muted">{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-fg-muted/80">
          Proposed methodology: TF-IDF text vectorization and cosine similarity over genres, keywords, and
          descriptions. This prototype runs a lightweight version of that approach directly in the browser against a
          small demonstration dataset — it is not connected to a trained model or a production recommendation
          backend.
        </p>
      </div>
    </section>
  );
}
