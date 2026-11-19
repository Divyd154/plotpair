import { Lightbulb, Link2, MessagesSquare, Target } from "lucide-react";

const POINTS = [
  {
    icon: Target,
    title: "Objective",
    description:
      "Help readers and viewers discover relevant books and movies quickly, based on what a story is about rather than popularity alone.",
  },
  {
    icon: Lightbulb,
    title: "Content-based approach",
    description: "Recommendations are built from each title's genres, themes, and description — not user ratings.",
  },
  {
    icon: Link2,
    title: "Cross-media discovery",
    description: "A book you loved can surface similar movies, and a movie can surface similar books.",
  },
  {
    icon: MessagesSquare,
    title: "Explainable recommendations",
    description: "Every suggestion shows the shared genres and keywords that justify the match.",
  },
];

export function AboutProject() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 border-t border-border px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <h2 id="about-heading" className="font-heading text-2xl font-extrabold tracking-normal text-fg sm:text-3xl">
            About the project
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-fg-secondary sm:text-base">
            Plot Pair is an academic prototype of a{" "}
            <strong className="font-semibold text-fg">Content-Based Movie and Book Recommendation Engine</strong>. It
            demonstrates how content-based matching and explainable results would work for a user like Aanya — a busy
            student who wants relevant stories without endless browsing.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {POINTS.map((point) => (
            <div key={point.title} className="rounded-2xl border border-border bg-card/80 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <point.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-heading text-base font-bold text-fg">{point.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
