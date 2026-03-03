import Parser from "rss-parser";

// De Telegraaf free RSS feed URL
const TELEGRAAF_RSS_URL = "https://www.telegraaf.nl/rss";

// rss-parser instance for fetching and parsing RSS feeds
const parser = new Parser();

export default defineEventHandler(async () => {
  try {
    const feed = await parser.parseURL(TELEGRAAF_RSS_URL);

    // Map feed items to the Article shape expected by the frontend.
    // contentSnippet is plain text (HTML stripped), used for both description and contentSnippet.
    const items = (feed.items || []).map((item) => ({
      title: item.title ?? "",
      description: item.contentSnippet ?? "",
      link: item.link ?? "",
      contentSnippet: item.contentSnippet ?? "",
    }));

    return { items };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch RSS feed: ${error.message}`,
    });
  }
});
