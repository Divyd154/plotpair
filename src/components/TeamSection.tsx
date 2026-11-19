const MEMBERS = ["Divy Desai", "Vedant Jadhav", "Piyush Kumar", "Samiksha Auti"];

/** Compact, deliberately low-key team presence near the bottom of the page. */
export function TeamSection() {
  return (
    <section id="team" aria-labelledby="team-heading" className="border-t border-border bg-alt/50 px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md">
          <h2 id="team-heading" className="font-heading text-xl font-extrabold tracking-normal text-fg">
            Built by The Innov8rs
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            Group SY208 · Department of Computer Science &amp; Engineering · MIT School of Computing, MIT-ADT
            University
          </p>
          <p className="mt-2 text-sm text-fg-muted">
            Faculty Guide: <span className="font-semibold text-fg-secondary">Dr. Dolly Kumari</span>
          </p>
        </div>

        <ul className="flex flex-wrap gap-3" aria-label="Team members">
          {MEMBERS.map((name) => (
            <li
              key={name}
              className="flex items-center gap-2.5 rounded-full border border-border bg-card/80 py-1.5 pl-1.5 pr-4"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-elevated text-[11px] font-bold text-accent">
                {name
                  .split(" ")
                  .map((part) => part.charAt(0))
                  .join("")}
              </span>
              <span className="text-sm font-medium text-fg-secondary">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
