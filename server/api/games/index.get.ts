import prisma from "../../prisma";

export default defineEventHandler(async (event) => {
  try {
    const games = await prisma.game.findMany();
    return {
      success: true,
      data: games,
    };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
