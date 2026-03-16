/// <reference types="node" />
import { PrismaClient } from "@prisma/client";

// static list of course topics was originally defined in the frontend
// content file.  We inline it here so that the seed script doesn’t have to
// resolve application modules at runtime.
const courseTopic = [
  {
    title: "Nouns",
    description:
      "Learn about nouns, articles and play the memory game to increase your vocabulary ",
  },
  {
    title: "Pronouns",
    description:
      "Learn about Pronouns, to replace effectively nouns in sentences. Play the detective game to improve your dutch pronouns knowledge!",
  },
  {
    title: "Verbs",
    description:
      'The "function" of your sentences. Read this chapter to learn everything about it!',
  },
  {
    title: "Adverbs",
    description:
      "Add important pieces of information about your sentences with adverbs!",
  },
  {
    title: "Prepositions",
    description:
      "Prepositions are necessary for your sentences, discover how to use them!",
  },
  {
    title: "Adjectives",
    description:
      '"A picture is worth a thousand words", but you can learn them here.',
  },
  {
    title: "Conjunctions",
    description:
      "Learn how to structure complex sentences with the use of conjunctions.",
  },
  {
    title: "Numbers",
    description:
      "As a developer, numbers are things that we are using every day. But in Dutch.",
  },
];

const prisma = new PrismaClient();

async function main() {
  for (const t of courseTopic) {
    const route = `/learn/${t.title.toLowerCase()}`;
    const data = {
      title: t.title,
      description: t.description,
      route,
      image: "",
    };

    const existing = await prisma.course.findFirst({ where: { route } });
    if (existing) {
      await prisma.course.update({ where: { id: existing.id }, data });
      console.log("updated course", route);
    } else {
      await prisma.course.create({ data });
      console.log("created course", route);
    }
  }

  // confirm
  const saved = await prisma.course.findMany({
    where: {
      route: { in: courseTopic.map((t) => `/learn/${t.title.toLowerCase()}`) },
    },
  });
  console.log("seeded courses count", saved.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
