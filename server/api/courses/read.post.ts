import prisma from "../../prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await $fetch("/api/auth/session");
  const userId = session?.user?.id;

  if (!userId) {
    return createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const { route } = body as { route: string };
  if (!route) {
    return createError({ statusCode: 400, statusMessage: "Missing route" });
  }

  try {
    const course = await prisma.course.findFirst({ where: { route } });
    if (!course) {
      return createError({
        statusCode: 404,
        statusMessage: "Course not found",
      });
    }

    const existing = await prisma.courseUser.findFirst({
      where: { courseId: course.id, userId },
    });

    if (existing) {
      // already marked as read; return success without creating
      return { success: true, data: existing };
    }

    const created = await prisma.courseUser.create({
      data: { courseId: course.id, userId },
    });
    return { success: true, data: created };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
