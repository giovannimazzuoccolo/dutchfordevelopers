import _ from "lodash";
import { REQUEST_STATUS } from "~/enums/serverRequests";
import { defineStore } from "pinia";

export type Course = {
  id: String;
  title: String;
  description: String;
  image: String;
  route: String;
  isRead?: boolean;
};

export type Courses = Course[];

interface CoursesJoinedWithReading extends Course {
  courses_users: string[];
}

export interface CoursesState {
  courses: Courses;
  request: REQUEST_STATUS;
  error: string;
}

export const state: CoursesState = {
  courses: [],
  request: REQUEST_STATUS.IDLE,
  error: "",
};

export const useCoursesStore = defineStore("courses", {
  state: (): CoursesState => ({
    courses: [],
    request: REQUEST_STATUS.IDLE,
    error: "",
  }),
  actions: {
    /**
     * Fetch the courses
     */
    async getCourses() {
      this.request = REQUEST_STATUS.LOADING;
      try {
        // No Prisma model for courses in schema; use local content
        // import course topics from content
        const topics = await import("~/content/courseTopics");
        // @ts-ignore
        this.courses = topics.courseTopic.map((t: any, i: number) => ({
          id: String(i),
          title: t.title,
          description: t.description,
          image: "",
          route: `/learn/${t.title.toLowerCase()}`,
        }));
        this.request = REQUEST_STATUS.SUCCESS;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
      }
    },

    async markCourseAsRead(courseId: string) {
      // No server-side model for courses_users; mark locally only
      this.request = REQUEST_STATUS.LOADING;
      const idx = this.courses.findIndex(
        (c) => String(c.id) === String(courseId)
      );
      if (idx !== -1 && this.courses[idx]) {
        this.courses[idx].isRead = true;
        this.request = REQUEST_STATUS.SUCCESS;
      } else {
        this.request = REQUEST_STATUS.ERROR;
        this.error = "Course not found";
      }
    },
    async getCourse(courseName: string) {
      // Return local course that matches the title
      this.request = REQUEST_STATUS.LOADING;
      const title = _.capitalize(courseName);
      const found = this.courses.filter((c) => String(c.title) === title);
      this.courses = found;
      this.request = REQUEST_STATUS.SUCCESS;
    },

    async getCoursesJoined() {
      // Local-only: return courses (no per-user data stored)
      await this.getCourses();
    },
  },
});
