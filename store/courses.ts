import _ from "lodash";
import { REQUEST_STATUS } from "~/enums/serverRequests";
import { defineStore } from "pinia";
import { SupabaseClient } from "@supabase/supabase-js";

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

function supabaseClient() {
  const { $supabase } = useNuxtApp();
  return $supabase as SupabaseClient;
}

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
      const client = supabaseClient();
      /**
       * if the courses are already in the store, avoid to refecth them and present the result. the data will be invalidated every day.*/
      // @ts-ignore this should already know by typescript
      if (this.courses.length > 0) {
        //TODO: add a date check, for avoiding stale results
        this.request = REQUEST_STATUS.SUCCESS;
      } else {
        this.request = REQUEST_STATUS.LOADING;
        // convert supabase request
        const { data, error } = await client.from("courses").select();
        if (!error) {
          this.request = REQUEST_STATUS.SUCCESS;
          this.courses = data;
        } else {
          this.request = REQUEST_STATUS.ERROR;
          this.error = error.message;
        }
      }
    },

    async markCourseAsRead(courseId: string) {
      const client = supabaseClient();
      this.request = REQUEST_STATUS.LOADING;
      const userInfo = await client.auth.getUser();
      if (userInfo) {
        const values = { course_id: courseId, user_id: userInfo.data.user?.id };
        const { error } = await client
          .from("courses_users")
          .insert(values as any);
        if (!error) {
          this.request = REQUEST_STATUS.SUCCESS;
        } else {
          this.request = REQUEST_STATUS.ERROR;
          this.error = error.message;
        }
      } else {
        this.request = REQUEST_STATUS.ERROR;
        this.error = "Generic error";
      }
    },
    async getCourse(courseName: string) {
      const client = supabaseClient();
      this.request = REQUEST_STATUS.LOADING;
      const userInfo = await client.auth.getUser();
      if (userInfo) {
        const { data: courseData, error } = await client
          .from("courses")
          .select(
            "id, title, description, image, route, courses_users (course_id, user_id)"
          )
          .eq("title", _.capitalize(courseName))
          .eq("courses_users.user_id", userInfo.data.user?.id);

        if (error) {
          this.request = REQUEST_STATUS.ERROR;
          this.error = error.message;
        } else {
          const composeData = courseData.map((c) => ({
            id: c.id,
            description: c.description,
            title: c.title,
            image: c.image,
            route: c.route,
            isRead: c.courses_users.length > 0,
          }));
          this.courses = composeData;
          this.request = REQUEST_STATUS.SUCCESS;
        }
      }
    },

    async getCoursesJoined() {
      const client = supabaseClient();
      this.request = REQUEST_STATUS.LOADING;
      const userInfo = await client.auth.getUser();
      if (userInfo) {
        const { data, error } = await client
          .from("courses_users")
          .select("course_id")
          .eq("user_id", userInfo.data.user?.id);
        if (!error) {
          await this.getCourses();
          this.courses = this.courses.map((c) => {
            return {
              ...c,
              isRead: data.findIndex((d) => d.course_id === c.id) !== -1, //FIXME: ???
            };
          });
          this.request = REQUEST_STATUS.SUCCESS;
        } else {
          this.request = REQUEST_STATUS.ERROR;
          this.error = "Cannot fetch your courses";
        }
      } else {
        await this.getCourses();
      }
    },
  },
});
