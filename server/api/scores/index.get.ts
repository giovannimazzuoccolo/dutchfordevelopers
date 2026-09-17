import prisma from "~~/server/prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const url = getQuery(event);
    const gameRoute = url.gameRoute as string | undefined;
    // Prefer the explicit query param (client-side), but fall back to the
    // server session so SSR requests with forwarded cookies still resolve
    // the current user without leaking other users' scores.
    let userId = url.userId as string | undefined;
    if (!userId) {
      try {
        const session = await getServerSession(event);
        userId = (session as any)?.user?.id;
      } catch {
        userId = undefined;
      }
    }

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

    // Anonymous users get no scores (public games list still renders SSR).
    return { success: true, data: [] };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
