import type { BookRecord } from "@/types";

/**
 * DEMONSTRATION DATASET
 * ---------------------
 * See src/data/movies.ts for notes on the nature of this sample data.
 * The same approach applies here: a small, hand-curated set of
 * well-documented books used to demonstrate content-based matching.
 */
export const BOOKS: BookRecord[] = [
  {
    id: "bk-dune",
    mediaType: "book",
    title: "Dune",
    year: 1965,
    author: "Frank Herbert",
    genres: ["Sci-Fi"],
    keywords: ["desert planet", "prophecy", "political intrigue", "survival", "coming of age", "destiny"],
    description:
      "On the desert world of Arrakis, a young heir is thrust into prophecy and political intrigue as noble houses fight for control of the universe's most valuable resource.",
  },
  {
    id: "bk-androids",
    mediaType: "book",
    title: "Do Androids Dream of Electric Sheep?",
    year: 1968,
    author: "Philip K. Dick",
    genres: ["Sci-Fi", "Neo-Noir"],
    keywords: ["artificial intelligence", "identity", "dystopian future", "memory", "what it means to be human"],
    description:
      "In an irradiated, near-empty future, a bounty hunter who tracks escaped androids begins questioning the line between artificial life and genuine humanity.",
  },
  {
    id: "bk-the-martian",
    mediaType: "book",
    title: "The Martian",
    year: 2011,
    author: "Andy Weir",
    genres: ["Sci-Fi"],
    keywords: ["space survival", "scientific problem-solving", "isolation", "resourcefulness", "mars"],
    description:
      "Stranded on Mars and presumed dead, an astronaut documents his resourceful, science-driven fight to grow food, generate water, and survive until rescue.",
  },
  {
    id: "bk-project-hail-mary",
    mediaType: "book",
    title: "Project Hail Mary",
    year: 2021,
    author: "Andy Weir",
    genres: ["Sci-Fi"],
    keywords: ["space exploration", "survival", "friendship", "scientific problem-solving"],
    description:
      "A lone astronaut wakes with no memory on a last-chance mission to save Earth, relying on scientific ingenuity and an unexpected friendship to survive.",
  },
  {
    id: "bk-rita-hayworth",
    mediaType: "book",
    title: "Rita Hayworth and Shawshank Redemption",
    year: 1982,
    author: "Stephen King",
    genres: ["Drama"],
    keywords: ["hope", "friendship", "prison", "redemption", "injustice", "perseverance"],
    description:
      "A quiet, wrongly convicted man endures decades in prison, holding on to hope and an unlikely friendship as he quietly works toward redemption.",
  },
  {
    id: "bk-godfather",
    mediaType: "book",
    title: "The Godfather",
    year: 1969,
    author: "Mario Puzo",
    genres: ["Crime", "Drama"],
    keywords: ["family loyalty", "power", "organized crime", "betrayal", "legacy"],
    description:
      "The saga of a powerful crime family explores loyalty, power, and betrayal as a reluctant son is pulled into his father's world.",
  },
  {
    id: "bk-gone-girl",
    mediaType: "book",
    title: "Gone Girl",
    year: 2012,
    author: "Gillian Flynn",
    genres: ["Thriller", "Mystery"],
    keywords: ["marriage", "deception", "media frenzy", "psychological suspense", "dark secrets"],
    description:
      "A marriage unravels into a web of lies and media spectacle after a wife disappears on her anniversary and suspicion falls on her husband.",
  },
  {
    id: "bk-dragon-tattoo",
    mediaType: "book",
    title: "The Girl with the Dragon Tattoo",
    year: 2005,
    author: "Stieg Larsson",
    genres: ["Thriller", "Mystery"],
    keywords: ["investigation", "corruption", "dark secrets", "justice", "psychological suspense"],
    description:
      "A journalist and a fiercely independent hacker dig into a decades-old disappearance that exposes a family's buried corruption.",
  },
  {
    id: "bk-pride-prejudice",
    mediaType: "book",
    title: "Pride and Prejudice",
    year: 1813,
    author: "Jane Austen",
    genres: ["Romance", "Drama"],
    keywords: ["class", "misunderstanding", "courtship", "british society", "wit"],
    description:
      "A witty, independent-minded young woman navigates courtship and misjudgment with a proud landowner amid the rigid class structures of British society.",
  },
  {
    id: "bk-fellowship",
    mediaType: "book",
    title: "The Fellowship of the Ring",
    year: 1954,
    author: "J.R.R. Tolkien",
    genres: ["Fantasy", "Adventure"],
    keywords: ["quest", "friendship", "good vs evil", "epic journey", "sacrifice"],
    description:
      "A hobbit inherits a dangerous ring and sets out with a fellowship of companions on an epic quest to keep it from a growing dark power.",
  },
  {
    id: "bk-harry-potter",
    mediaType: "book",
    title: "Harry Potter and the Sorcerer's Stone",
    year: 1997,
    author: "J.K. Rowling",
    genres: ["Fantasy", "Adventure"],
    keywords: ["magic", "coming of age", "friendship", "boarding school", "good vs evil"],
    description:
      "An orphaned boy learns he is a wizard and enters a magical boarding school, where friendship and courage help him face a hidden evil.",
  },
  {
    id: "bk-jurassic-park",
    mediaType: "book",
    title: "Jurassic Park",
    year: 1990,
    author: "Michael Crichton",
    genres: ["Sci-Fi", "Adventure"],
    keywords: ["genetic engineering", "survival", "chaos theory", "dinosaurs", "scientific problem-solving"],
    description:
      "A theme park of cloned dinosaurs spins into disaster, forcing scientists to confront the unpredictable consequences of genetic engineering.",
  },
  {
    id: "bk-hunger-games",
    mediaType: "book",
    title: "The Hunger Games",
    year: 2008,
    author: "Suzanne Collins",
    genres: ["Dystopian", "Adventure"],
    keywords: ["survival", "rebellion", "inequality", "reality television", "sacrifice"],
    description:
      "In a dystopian nation that broadcasts children fighting to the death, a young woman's act of sacrifice sparks the first sparks of rebellion.",
  },
  {
    id: "bk-it",
    mediaType: "book",
    title: "It",
    year: 1986,
    author: "Stephen King",
    genres: ["Horror"],
    keywords: ["fear", "childhood trauma", "small town", "supernatural evil", "friendship"],
    description:
      "A group of childhood friends face a shape-shifting entity that preys on fear, confronting it again decades later as adults.",
  },
  {
    id: "bk-circe",
    mediaType: "book",
    title: "Circe",
    year: 2018,
    author: "Madeline Miller",
    genres: ["Fantasy"],
    keywords: ["mythology", "transformation", "isolation", "power", "self-discovery"],
    description:
      "Banished to a lonely island for her dangerous gifts, a minor goddess hones her power and forges her own identity outside her family's shadow.",
  },
];
