import prisma from "../../prisma";

export default defineEventHandler(async (event) => {
  try {
    const url = getQuery(event);
    const userId = url.userId as string | undefined;
    const gameRoute = url.gameRoute as string | undefined;

    if (userId && gameRoute) {
      // find game id by route
      const game = await prisma.game.findFirst({ where: { route: gameRoute } });
      if (!game) return { success: true, data: [] };
      const scores = await prisma.score.findMany({
        where: { userId, gameId: game.id },
      });
      return { success: true, data: scores };
    }

    if (userId) {
      const scores = await prisma.score.findMany({ where: { userId } });
      return { success: true, data: scores };
    }

    const scores = await prisma.score.findMany();
    return { success: true, data: scores };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
