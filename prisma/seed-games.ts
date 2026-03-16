import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL must be set to run the seed script");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function extractMetaFromVue(fileContent: string) {
  const titleMatch = fileContent.match(/<UITitle\s+([^>]*)\/>/);
  let name: string | undefined;

  if (titleMatch?.[1]) {
    const props = titleMatch[1];
    const orange = props.match(/orange\s*=\s*"([^"]+)"/);
    const blue = props.match(/blue\s*=\s*"([^"]+)"/);

    if (orange?.[1] && blue?.[1]) {
      name = `${orange[1]} ${blue[1]}`;
    } else if (orange?.[1]) {
      name = orange[1];
    }
  }

  let description: string | undefined;
  const pMatch = fileContent.match(/<p[^>]*>\s*([\s\S]{10,}?)<\/p>/);
  if (pMatch?.[1]) {
    description = pMatch[1]
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  return { name, description };
}

function buildGamesFromPages() {
  const pagesDir = path.join(process.cwd(), "app", "pages", "games");
  if (!fs.existsSync(pagesDir)) return [];

  const files = fs
    .readdirSync(pagesDir)
    .filter((f) => f.endsWith(".vue") && !f.startsWith("._"));

  const iconDefaults: Record<string, string> = {
    memory: "fa6-solid:redo",
    detective: "user-secret",
    bijvoemojilijk: "reply",
    deofhet: "coins",
    passport: "passport",
  };

  return files
    .map((file) => {
      const basename = path.basename(file, ".vue");
      const route = `games/${basename}`;
      const content = fs.readFileSync(path.join(pagesDir, file), "utf8");
      const { name, description } = extractMetaFromVue(content);

      return {
        name: name ?? basename.charAt(0).toUpperCase() + basename.slice(1),
        description: description ?? "",
        route,
        fa_icon: iconDefaults[basename] ?? "gamepad",
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));
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
    where: { route: { in: games.map((g) => g.route) } },
  });

  console.log("seeded games", saved.length);
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
