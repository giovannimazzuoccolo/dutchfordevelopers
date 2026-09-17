import _ from "lodash";
import { REQUEST_STATUS } from "~/enums/serverRequests";
import { defineStore } from "pinia";
import { useToastStore } from "~/store/toasts";

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
     * Resolve a fetch fn that forwards cookies/headers during SSR.
     * Falls back to global $fetch outside a Nuxt context (e.g. tests).
     */
    getRequestFetch() {
      try {
        return useRequestFetch() as typeof $fetch;
      } catch {
        return $fetch;
      }
    },
    /**
     * Fetch the courses
     */
    async getCourses() {
      if (this.courses.length > 0 && this.request === REQUEST_STATUS.SUCCESS) {
        return this.courses;
      }
      this.request = REQUEST_STATUS.LOADING;
      try {
        const requestFetch = this.getRequestFetch();
        const res = await requestFetch<{ success: boolean; data: Course[] }>(
          "/api/courses",
        );
        this.courses = res.data;
        this.request = REQUEST_STATUS.SUCCESS;
        return this.courses;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
        return [];
      }
    },

    async markCourseAsRead(courseIdOrRoute: string) {
      this.request = REQUEST_STATUS.LOADING;
      const toastStore = useToastStore();
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
        toastStore.showToast("Lesson marked as read");
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
        toastStore.showToast("Error marking lesson as read");
      }
    },

    async unmarkCourseAsRead(courseIdOrRoute: string) {
      this.request = REQUEST_STATUS.LOADING;
      const toastStore = useToastStore();
      try {
        await $fetch("/api/courses/read", {
          method: "DELETE",
          body: { route: courseIdOrRoute },
        });

        // reflect change locally so UI updates immediately
        const idx = this.courses.findIndex(
          (c) => c.route === courseIdOrRoute || c.id === courseIdOrRoute,
        );
        if (idx !== -1 && this.courses[idx]) {
          this.courses[idx].isRead = false;
        }
        this.request = REQUEST_STATUS.SUCCESS;
        toastStore.showToast("Removed from read lessons");
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
        toastStore.showToast("Error removing lesson from read lessons");
      }
    },
    async getCourse(courseName: string) {
      // ask the server for a course with that title; the endpoint supports
      // filtering by title or route via query parameters
      this.request = REQUEST_STATUS.LOADING;
      try {
        const title = _.capitalize(courseName);
        const requestFetch = this.getRequestFetch();
        const res = await requestFetch<{ success: boolean; data: Course[] }>(
          "/api/courses",
          { params: { title } },
        );
        this.courses = res.data;
        this.request = REQUEST_STATUS.SUCCESS;
        return this.courses;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
        return [];
      }
    },

    async getCoursesJoined(fetcher?: typeof $fetch) {
      this.request = REQUEST_STATUS.LOADING;
      try {
        // Prefer an injected fetch (captured via useRequestFetch at the
        // component level where Nuxt context is guaranteed) so cookies are
        // forwarded during SSR. No early-return guard here: the data is
        // user-scoped (isRead) and useAsyncData's per-user cache key handles
        // de-duplication instead.
        const requestFetch = fetcher ?? this.getRequestFetch();
        // The joined endpoint resolves the session server-side via
        // getServerSession, so it serves plain courses to anonymous users
        // and isRead-enriched courses to logged-in users with no branching
        // needed on the client. Cookies are forwarded on the server via
        // useRequestFetch.
        const res = await requestFetch<{ success: boolean; data: Course[] }>(
          "/api/courses/joined",
        );
        this.courses = res.data;
        this.request = REQUEST_STATUS.SUCCESS;
        return this.courses;
      } catch (error: any) {
        this.request = REQUEST_STATUS.ERROR;
        this.error = error.message;
        return [];
      }
    },
  },
});
