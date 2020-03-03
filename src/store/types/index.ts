export interface Course {
    id: number,
    title: string,
    course_code: string,
    credit_load: number,
    semester: number,
    level: number,
    lecturer: object,
    lecturerId: number
}

export interface Lecturer {
    // id: number,
    // title: string,
    // position: string,
    // first_name: string,
    // last_name: string,
    // image_url: string,
    // department: string,
    // courses: any,
    pageItems: any,
    pager: any
}

export interface CourseState {
    courses: Course[],
    course: Course,
    processing: boolean,
    error: any
}