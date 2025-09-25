import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await $fetch("/api/auth/session");
  const userId = session?.user?.id;

  if (!userId) {
    return createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const { gameRoute, score, id } = body as {
    gameRoute: string;
    score: string | number;
    id?: string;
  };

  try {
    // find game by route
    const game = await prisma.game.findFirst({ where: { route: gameRoute } });
    if (!game) {
      return createError({ statusCode: 404, statusMessage: "Game not found" });
    }

    if (id) {
      // update existing score
      const updated = await prisma.score.update({
        where: { id },
        data: { score: String(score) },
      });
      return { success: true, data: updated };
    } else {
      const created = await prisma.score.create({
        data: { gameId: game.id, score: String(score), userId },
      });
      return { success: true, data: created };
    }
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
