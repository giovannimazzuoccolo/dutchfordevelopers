import { PrismaClient } from "@prisma/client";
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

// Helper: attempt to extract a human title and description from a .vue page
function extractMetaFromVue(fileContent: string) {
  // Try to extract UITitle props: orange and blue or single title
  const titleMatch = fileContent.match(/<UITitle\s+([^>]*)\/>/);
  let name = undefined as string | undefined;
  if (titleMatch && titleMatch[1]) {
    const props = titleMatch[1];
    const orange = props.match(/orange\s*=\s*"([^"]+)"/);
    const blue = props.match(/blue\s*=\s*"([^"]+)"/);
    if (orange && orange[1] && blue && blue[1])
      name = `${orange[1]} ${blue[1]}`;
    else if (orange && orange[1]) name = orange[1];
  }

  // Fallback: look for first <UITitle ...> or <h1> or the component file name will be used by caller
  // For description, pick the first <p> after the title or the first <p> in the file
  let description = undefined as string | undefined;

  // Find the first <p> that contains some text
  const pMatch = fileContent.match(/<p[^>]*>\s*([\s\S]{10,}?)<\/p>/);
  if (pMatch && pMatch[1]) {
    // sanitize by removing tags and collapsing whitespace
    description = pMatch[1]
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  return { name, description };
}

function buildGamesFromPages() {
  const pagesDir = path.join(__dirname, "..", "pages", "games");
  if (!fs.existsSync(pagesDir)) return [];

  const files: string[] = fs
    .readdirSync(pagesDir)
    .filter((f: string) => f.endsWith(".vue") && !f.startsWith("._"));

  const iconDefaults: Record<string, string> = {
    memory: "fa6-solid:redo",
    detective: "user-secret",
    bijvoemojilijk: "reply",
    deofhet: "coins",
    passport: "passport",
  };

  const games: any[] = files.map((file: string) => {
    const basename = path.basename(file, ".vue");
    const route = `games/${basename}`;
    const content = fs.readFileSync(path.join(pagesDir, file), "utf8");
    const { name, description } = extractMetaFromVue(content);

    return {
      name:
        name || // human readable fallback
        basename.charAt(0).toUpperCase() + basename.slice(1),
      description: description || "",
      route,
      fa_icon: iconDefaults[basename] || "gamepad",
    };
  });

  // Sort deterministically
  return games.sort((a: any, b: any) => a.route.localeCompare(b.route));
}

const games = buildGamesFromPages();

async function main() {
  for (const g of games) {
    const existing = await prisma.game.findFirst({ where: { route: g.route } });
    if (existing) {
      await prisma.game.update({ where: { id: existing.id }, data: g });
      console.log("updated", g.route);
    } else {
      await prisma.game.create({ data: g });
      console.log("created", g.route);
    }
  }

  // Verification: fetch saved games and compare
  const saved = await prisma.game.findMany({
    where: { route: { in: games.map((g) => g.route) } },
  });
  const savedRoutes = saved.map((s) => s.route).sort();
  const expectedRoutes = games.map((g) => g.route).sort();

  console.log("expected routes:", expectedRoutes);
  console.log("saved routes:   ", savedRoutes);

  if (savedRoutes.length !== expectedRoutes.length) {
    console.error(
      `Seed verification failed: expected ${expectedRoutes.length} games but found ${savedRoutes.length}`,
    );
    process.exitCode = 1;
    return;
  }

  for (let i = 0; i < expectedRoutes.length; i++) {
    if (expectedRoutes[i] !== savedRoutes[i]) {
      console.error("Seed verification failed: routes mismatch");
      process.exitCode = 1;
      return;
    }
  }

  console.log("Seed verification passed: all games present");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
