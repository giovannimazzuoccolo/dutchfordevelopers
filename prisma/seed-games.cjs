const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

function extractMetaFromVue(fileContent) {
  const titleMatch = fileContent.match(/<UITitle\s+([^>]*)\/>/);
  let name;
  if (titleMatch && titleMatch[1]) {
    const props = titleMatch[1];
    const orange = props.match(/orange\s*=\s*"([^"]+)"/);
    const blue = props.match(/blue\s*=\s*"([^"]+)"/);
    if (orange && orange[1] && blue && blue[1])
      name = `${orange[1]} ${blue[1]}`;
    else if (orange && orange[1]) name = orange[1];
  }

  let description;
  const pMatch = fileContent.match(/<p[^>]*>\s*([\s\S]{10,}?)<\/p>/);
  if (pMatch && pMatch[1]) {
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

  const files = fs
    .readdirSync(pagesDir)
    .filter((f) => f.endsWith(".vue") && !f.startsWith("._"));

  const iconDefaults = {
    memory: "redo",
    detective: "user-secret",
    bijvoemojilijk: "reply",
    deofhet: "coins",
    passport: "passport",
  };

  const games = files.map((file) => {
    const basename = path.basename(file, ".vue");
    const route = `games/${basename}`;
    const content = fs.readFileSync(path.join(pagesDir, file), "utf8");
    const { name, description } = extractMetaFromVue(content);

    return {
      name: name || basename.charAt(0).toUpperCase() + basename.slice(1),
      description: description || "",
      route,
      fa_icon: iconDefaults[basename] || "gamepad",
    };
  });

  return games.sort((a, b) => a.route.localeCompare(b.route));
}

async function main() {
  const games = buildGamesFromPages();

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

  const saved = await prisma.game.findMany({
    where: { route: { in: games.map((gg) => gg.route) } },
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
