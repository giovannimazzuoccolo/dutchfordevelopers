import prisma from "../../prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const body = (await readBody(event).catch(() => ({}))) as {
    route?: string;
  };
  const query = getQuery(event) as { route?: string };
  const session = await getServerSession(event);
  const userId = session?.user?.id;

  if (!userId) {
    return createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const route = body.route ?? query.route;
  if (!route) {
    return createError({ statusCode: 400, statusMessage: "Missing route" });
  }

  try {
    // Accept either the canonical route (/learn/<slug>) or the course id.
    const course = await prisma.course.findFirst({
      where: { OR: [{ route }, { id: route }] },
    });
    if (!course) {
      return createError({
        statusCode: 404,
        statusMessage: "Course not found",
      });
    }

    await prisma.courseUser.deleteMany({
      where: { courseId: course.id, userId },
    });
    return { success: true };
  } catch (error: any) {
    return createError({ statusCode: 500, statusMessage: error.message });
  }
});
