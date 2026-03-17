import prisma from "~~/server/prisma";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event) as Record<string, string>;
    const where: any = {};

    if (query.title) {
      where.title = query.title;
    }
    if (query.route) {
      where.route = query.route;
    }

    const courses = await prisma.course.findMany({ where });
    return {
      success: true,
      data: courses,
    };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
