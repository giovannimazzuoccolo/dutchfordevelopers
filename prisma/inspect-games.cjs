const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

async function main() {
  try {
    await prisma.$connect();
    // print some postgres info if available
    let info = null;
    try {
      info =
        await prisma.$queryRaw`SELECT current_database() as db, current_user as user;`;
    } catch (e) {
      // ignore
    }

    const games = await prisma.game.findMany({
      select: {
        id: true,
        name: true,
        route: true,
        fa_icon: true,
        description: true,
      },
    });

    console.log("db info:", info);
    console.log("games count:", games.length);
    for (const g of games) {
      console.log(g.id, g.name, g.route, g.fa_icon);
    }
  } catch (e) {
    console.error("error", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
