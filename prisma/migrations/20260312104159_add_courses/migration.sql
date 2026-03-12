-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "route" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseUser" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CourseUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_route_key" ON "Course"("route");

-- CreateIndex
CREATE UNIQUE INDEX "CourseUser_courseId_userId_key" ON "CourseUser"("courseId", "userId");

-- AddForeignKey
ALTER TABLE "CourseUser" ADD CONSTRAINT "CourseUser_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseUser" ADD CONSTRAINT "CourseUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
