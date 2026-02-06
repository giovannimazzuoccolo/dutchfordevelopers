import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    learn: defineCollection({
      // Specify the type of content in this collection
      type: "page",
      // Load every file inside the `content` directory
      source: "**",

      schema: z.object({
        title: z.string(),
        id: z.string(),
        slug: z.string(),
      }),
    }),
  },
});
