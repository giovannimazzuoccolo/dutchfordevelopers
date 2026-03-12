import prisma from "../../prisma";

export default defineEventHandler(async (event) => {
  try {
    const session = await $fetch("/api/auth/session");
    const userId = session?.user?.id;

    const courses = await prisma.course.findMany({
      include: { courseUsers: true },
    });

    // map to a lighter structure and compute `isRead` for the current user
    const mapped = courses.map((c) => {
      const isRead = userId
        ? c.courseUsers.some((cu) => cu.userId === userId)
        : false;
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
