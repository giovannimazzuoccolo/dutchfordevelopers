import _ from "lodash";
import { REQUEST_STATUS } from "~/enums/serverRequests";
import { defineStore } from "pinia";

// courses are now persisted in the database; the client talks to the
// REST endpoints under /api/courses.

export type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  route: string;
  // timestamps provided by Prisma
  createdAt?: string;
  updatedAt?: string;
  // the joined endpoint computes this for the current user
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
        const res = await $fetch<{ success: boolean; data: Course[] }>(
          "/api/courses",
        );
        this.courses = res.data;
        this.request = REQUEST_STATUS.SUCCESS;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
      }
    },

    async markCourseAsRead(courseIdOrRoute: string) {
      this.request = REQUEST_STATUS.LOADING;
      try {
        await $fetch("/api/courses/read", {
          method: "POST",
          body: { route: courseIdOrRoute },
        });

        // reflect change locally so UI updates immediately
        const idx = this.courses.findIndex(
          (c) => c.route === courseIdOrRoute || c.id === courseIdOrRoute,
        );
        if (idx !== -1 && this.courses[idx]) {
          this.courses[idx].isRead = true;
        }
        this.request = REQUEST_STATUS.SUCCESS;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
      }
    },
    async getCourse(courseName: string) {
      // ask the server for a course with that title; the endpoint supports
      // filtering by title or route via query parameters
      this.request = REQUEST_STATUS.LOADING;
      try {
        const title = _.capitalize(courseName);
        const res = await $fetch<{ success: boolean; data: Course[] }>(
          "/api/courses",
          { params: { title } },
        );
        this.courses = res.data;
        this.request = REQUEST_STATUS.SUCCESS;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
      }
    },

    async getCoursesJoined() {
      this.request = REQUEST_STATUS.LOADING;
      try {
        const res = await $fetch<{ success: boolean; data: Course[] }>(
          "/api/courses/joined",
        );
        this.courses = res.data;
        this.request = REQUEST_STATUS.SUCCESS;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
      }
    },
  },
});
