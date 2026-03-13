import prisma from "../../prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    // use built-in helper instead of internal fetch to avoid networking and 404s
    const session = await getServerSession(event);
    const userId = session?.user?.id;

    const courses = userId
      ? await prisma.course.findMany({
          include: { courseUsers: { where: { userId } } },
        })
      : await prisma.course.findMany();

    // map to a lighter structure and compute `isRead` for the current user
    const mapped = courses.map((c) => {
      const isRead = userId ? !!c.courseUsers?.length : false;
      return {
        id: c.id,
        title: c.title,
        description: c.description,
        image: c.image,
        route: c.route,
        isRead,
      };
    });

    return { success: true, data: mapped };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
