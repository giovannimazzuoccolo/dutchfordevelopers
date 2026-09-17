import prisma from "~~/server/prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    // Start the public games query immediately and resolve the session in
    // parallel, so dashboard tab switches cost a single round trip for both
    // anonymous and logged-in callers.
    const gamesPromise = prisma.game.findMany();
    const session = await getServerSession(event);
    const userId = (session as any)?.user?.id as string | undefined;
    const games = await gamesPromise;

    if (!userId) {
      return { success: true, data: games };
    }

    const scores = await prisma.score.findMany({ where: { userId } });
    const bestByGame = new Map(scores.map((s) => [s.gameId, s.score]));
    return {
      success: true,
      data: games.map((g) => ({
        ...g,
        score: bestByGame.get(g.id),
      })),
    };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
