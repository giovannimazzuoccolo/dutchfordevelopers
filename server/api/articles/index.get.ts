import Parser from "rss-parser";

// RSS feeds that work reliably from a server-side environment
const RSS_FEEDS = ["https://www.nu.nl/rss/Algemeen", "https://www.nrc.nl/rss/"];

// rss-parser instance for fetching and parsing RSS feeds
const parser = new Parser();

export default defineEventHandler(async () => {
  let feed: any | null = null;
  let lastError: unknown = null;

  // Try feeds in order until one works.
  for (const url of RSS_FEEDS) {
    try {
      feed = await parser.parseURL(url);
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!feed) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch RSS feed: ${lastError ?? "unknown error"}`,
    });
  }

  // Map feed items to the Article shape expected by the frontend.
  // contentSnippet is plain text (HTML stripped), used for both description and contentSnippet.
  const items = (feed.items || []).map((item) => ({
    title: item.title ?? "",
    description: item.contentSnippet ?? "",
    link: item.link ?? "",
    contentSnippet: item.contentSnippet ?? "",
  }));

  return { items };
});
