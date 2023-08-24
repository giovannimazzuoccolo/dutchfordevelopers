import {capitalize} from 'lodash'
import {REQUEST_STATUS} from '~/enums/serverRequests'
import {defineStore} from "pinia";
import {useSupabaseClient} from "#imports";

export type Course = {
    id: String
    title: String
    description: String
    image: String
    isRead?: boolean
}

export type Courses = Course[]

interface CoursesJoinedWithReading extends Course {
    courses_users: string[]
}

export interface CoursesState {
    courses: Courses
    request: REQUEST_STATUS,
    error: string
}

export const state: CoursesState = {
    courses: [],
    request: REQUEST_STATUS.IDLE,
    error: ''
}

const client = useSupabaseClient()

export const useCoursesStore = defineStore('courses',
        {
            state: ():CoursesState => ({
                courses: [],
                request: REQUEST_STATUS.IDLE,
                error: ''
            }),
            actions: {
                async getCourses() {
                   this.request = REQUEST_STATUS.LOADING
                    // convert supabase request
                    const { data, error } = await client.from('courses').select()
                    if (!error) {
                        this.request = REQUEST_STATUS.SUCCESS
                        this.courses = data;
                    } else {
                        this.request = REQUEST_STATUS.ERROR
                        this.error = error.message;
                    }
                },

                async markCourseAsRead(courseId: string) {
                    this.request = REQUEST_STATUS.LOADING
                    const userInfo  = await client.auth.getUser()
                    if (userInfo) {
                        const values = { course_id: courseId, user_id: userInfo.data.user?.id }
                        const { error } = await client
                            .from('courses_users')
                            .insert(values as any)
                        if (!error) {
                            this.request = REQUEST_STATUS.SUCCESS
                        } else {
                            this.request = REQUEST_STATUS.ERROR
                            this.error = error.message;
                        }
                    } else {
                        this.request = REQUEST_STATUS.ERROR
                        this.error = 'Generic error';
                    }
                },
                async getCourse(courseName:string) {
                    this.request = REQUEST_STATUS.LOADING
                    const userInfo = await client.auth.getUser();
                    if (userInfo) {
                        const { data: courseData, error } = await client
                            .from('courses')
                            .select('id, title, description, image, courses_users (course_id, user_id)')
                            .eq('title', capitalize(courseName))
                            .eq('courses_users.user_id', userInfo.data.user?.id)

                        if (error) {
                            this.request = REQUEST_STATUS.ERROR;
                            this.error = error.message;
                        } else {
                            const composeData = courseData.map((c:CoursesJoinedWithReading) => ({
                                id: c.id,
                                description: c.description,
                                title: c.title,
                                image: c.image,
                                isRead: c.courses_users.length > 0,
                            }))
                            this.courses = composeData;
                            this.request = REQUEST_STATUS.SUCCESS;
                        }
                    }
                },

                async getCoursesJoined() {
                    this.request = REQUEST_STATUS.LOADING;
                    const userInfo = await client.auth.getUser();
                    if (userInfo) {
                        const { data, error } = await client
                            .from('courses_users')
                            .select('courses (id, title, description, image)')
                            .eq('user_id', userInfo.data.user?.id)
                        if (!error) {
                            await this.getCourses();
                            this.courses = this.courses.map((c) => {
                                return {
                                    ...c,
                                    isRead: data.findIndex((d) => d.courses === c.id) !== -1,
                                }
                            })
                            this.request = REQUEST_STATUS.SUCCESS;
                        } else {
                            this.request = REQUEST_STATUS.ERROR;
                            this.error = 'Cannot fetch your courses';
                        }
                    } else {
                        await this.getCourses();
                    }
                },

            }
        }
)
