import type { MovieRecord } from "@/types";

/**
 * DEMONSTRATION DATASET
 * ---------------------
 * This project does not yet have a connected production database.
 * The records below are a small, hand-curated sample used only to
 * demonstrate the Plot Pair frontend and its content-based matching
 * logic (genres, keywords/themes, description text).
 *
 * Years, genres, directors and short synopses reflect widely known,
 * publicly documented facts about each title. Descriptions are written
 * originally for this demo and are intentionally brief.
 *
 * This file is isolated from UI code so it can be swapped for a real
 * data source (API/database) later without changing any component.
 */
export const MOVIES: MovieRecord[] = [
  {
    id: "mv-dune",
    mediaType: "movie",
    title: "Dune",
    year: 2021,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
    genres: ["Sci-Fi", "Adventure"],
    keywords: ["desert planet", "prophecy", "political intrigue", "survival", "coming of age", "destiny"],
    description:
      "On a harsh desert planet prized for a rare resource, a young heir is drawn into a web of prophecy, political betrayal, and survival as his family's fate becomes entangled with the planet's native people.",
  },
  {
    id: "mv-blade-runner-2049",
    mediaType: "movie",
    title: "Blade Runner 2049",
    year: 2017,
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    genres: ["Sci-Fi", "Neo-Noir"],
    keywords: ["artificial intelligence", "identity", "dystopian future", "memory", "what it means to be human"],
    description:
      "In a bleak future city, an officer uncovers a buried secret that forces him to question memory, identity, and what separates artificial life from human life.",
  },
  {
    id: "mv-the-martian",
    mediaType: "movie",
    title: "The Martian",
    year: 2015,
    director: "Ridley Scott",
    cast: ["Matt Damon", "Jessica Chastain"],
    genres: ["Sci-Fi", "Drama"],
    keywords: ["space survival", "scientific problem-solving", "isolation", "resourcefulness", "mars"],
    description:
      "Stranded alone on Mars after a mission goes wrong, an astronaut relies on ingenuity and scientific problem-solving to survive long enough to be rescued.",
  },
  {
    id: "mv-interstellar",
    mediaType: "movie",
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    genres: ["Sci-Fi", "Drama"],
    keywords: ["space exploration", "time", "family", "survival", "scientific problem-solving"],
    description:
      "As Earth becomes uninhabitable, a pilot leaves his family behind to journey through a wormhole in search of a new home for humanity, racing against time itself.",
  },
  {
    id: "mv-shawshank",
    mediaType: "movie",
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman"],
    genres: ["Drama"],
    keywords: ["hope", "friendship", "prison", "redemption", "injustice", "perseverance"],
    description:
      "A wrongly convicted banker forms an unlikely friendship inside prison walls, holding on to hope and quiet defiance through years of injustice.",
  },
  {
    id: "mv-godfather",
    mediaType: "movie",
    title: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino"],
    genres: ["Crime", "Drama"],
    keywords: ["family loyalty", "power", "organized crime", "betrayal", "legacy"],
    description:
      "The reluctant heir of a powerful crime family is drawn deeper into loyalty, power, and betrayal as he fights to protect what his father built.",
  },
  {
    id: "mv-gone-girl",
    mediaType: "movie",
    title: "Gone Girl",
    year: 2014,
    director: "David Fincher",
    cast: ["Ben Affleck", "Rosamund Pike"],
    genres: ["Thriller", "Mystery"],
    keywords: ["marriage", "deception", "media frenzy", "psychological suspense", "dark secrets"],
    description:
      "When his wife vanishes on their anniversary, a husband becomes the prime suspect in a media frenzy that unravels the deception at the heart of their marriage.",
  },
  {
    id: "mv-dragon-tattoo",
    mediaType: "movie",
    title: "The Girl with the Dragon Tattoo",
    year: 2011,
    director: "David Fincher",
    cast: ["Daniel Craig", "Rooney Mara"],
    genres: ["Thriller", "Mystery"],
    keywords: ["investigation", "corruption", "dark secrets", "justice", "psychological suspense"],
    description:
      "A disgraced journalist and a brilliant, guarded hacker investigate a decades-old disappearance that exposes a family's corruption and dark secrets.",
  },
  {
    id: "mv-pride-prejudice",
    mediaType: "movie",
    title: "Pride & Prejudice",
    year: 2005,
    director: "Joe Wright",
    cast: ["Keira Knightley", "Matthew Macfadyen"],
    genres: ["Romance", "Drama"],
    keywords: ["class", "misunderstanding", "courtship", "british society", "wit"],
    description:
      "A spirited young woman and a proud, wealthy landowner clash and slowly reconsider each other across the rigid class expectations of British society.",
  },
  {
    id: "mv-fellowship",
    mediaType: "movie",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
    genres: ["Fantasy", "Adventure"],
    keywords: ["quest", "friendship", "good vs evil", "epic journey", "sacrifice"],
    description:
      "A hobbit and a fellowship of companions set out on an epic journey to destroy a powerful ring before it falls into the hands of a rising dark power.",
  },
  {
    id: "mv-harry-potter",
    mediaType: "movie",
    title: "Harry Potter and the Sorcerer's Stone",
    year: 2001,
    director: "Chris Columbus",
    cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
    genres: ["Fantasy", "Adventure"],
    keywords: ["magic", "coming of age", "friendship", "boarding school", "good vs evil"],
    description:
      "An orphaned boy discovers he is a wizard and begins his first year at a magical boarding school, forging friendships while uncovering a hidden threat.",
  },
  {
    id: "mv-jurassic-park",
    mediaType: "movie",
    title: "Jurassic Park",
    year: 1993,
    director: "Steven Spielberg",
    cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
    genres: ["Sci-Fi", "Adventure"],
    keywords: ["genetic engineering", "survival", "chaos theory", "dinosaurs", "scientific problem-solving"],
    description:
      "A theme park built from cloned dinosaurs spirals into chaos, forcing visiting scientists and children to survive the very creatures science brought back.",
  },
  {
    id: "mv-hunger-games",
    mediaType: "movie",
    title: "The Hunger Games",
    year: 2012,
    director: "Gary Ross",
    cast: ["Jennifer Lawrence", "Josh Hutcherson"],
    genres: ["Dystopian", "Adventure"],
    keywords: ["survival", "rebellion", "inequality", "reality television", "sacrifice"],
    description:
      "In a dystopian nation that forces children to fight to the death on television, a young woman volunteers to take her sister's place and becomes a symbol of rebellion.",
  },
  {
    id: "mv-it",
    mediaType: "movie",
    title: "It",
    year: 2017,
    director: "Andy Muschietti",
    cast: ["Bill Skarsgård", "Jaeden Martell"],
    genres: ["Horror"],
    keywords: ["fear", "childhood trauma", "small town", "supernatural evil", "friendship"],
    description:
      "A group of childhood friends in a small town confront a shape-shifting evil that feeds on fear, forcing them to face their deepest traumas together.",
  },
  {
    id: "mv-social-network",
    mediaType: "movie",
    title: "The Social Network",
    year: 2010,
    director: "David Fincher",
    cast: ["Jesse Eisenberg", "Andrew Garfield"],
    genres: ["Drama", "Biography"],
    keywords: ["ambition", "betrayal", "technology", "friendship", "legacy"],
    description:
      "The founding of a world-changing social network unravels into lawsuits and broken friendships as ambition outpaces loyalty.",
  },
];
